<template>
  <div v-show="show" :class="`alert alert-${type} alert-dismissible`">
    <button @click="close" type="button" class="close"><span>×</span></button>
    <span v-if="msg">{{ msg }}</span>
    <!-- <span v-else>{{  }}</span> -->


  </div>
</template>

<script>
const message = {
  name: 'Messageeeeeeeeeeeeeeeee',

  data(){
    return{
      // 是否显示消息框
      show: {
        type: Boolean,
        default: false
      },
      // 消息框的类型
      type: {
        type: String,
        default: 'success'
      },
      // 消息
      msg: {
        type: String,
        default: ''
      }
    }
  },

  props: {
    // 是否显示消息框
    // show: {
    //   type: Boolean,
    //   default: false
    // },
    // // 消息框的类型
    // type: {
    //   type: String,
    //   default: 'success'
    // },
    // // 消息
    // msg: {
    //   type: String,
    //   default: ''
    // }
  },
  setup(props, cxt) {
    const close = () => {
      console.log('Message.vue setup Close method ' + cxt.emit('update:show', false))
      cxt.emit('update:show', false)
    }



    return {
      close
    }

  },
  watch: {
    show(value) {
      console.log('Message.vue show method value:' + value)
      if (value) {
        this.$nextTick(() => {
          this.$el.scrollIntoView(true)
        })
      }
    }
  },
  methods: {
    // close(cxt) {
    //   console.log('Message.vue Close method value:')
    //   cxt.emit('update:show', false)
    // }
  },

}

export function setupMessageComponent(app) {
  app.component("Message", message);
}

export default message;
</script>
