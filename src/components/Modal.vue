<template>
  <div>
    <div class="modal" v-show="show" style="display:block" @click.self="close">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button @click="close" class="close">×</button>
            <h4 class="modal-title">
              <slot name="header"></slot>
            </h4>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
    <!-- 背景 灰色阴影 -->
    <div v-show="show" class="modal-backdrop fade in" @click="close"></div>
  </div>
</template>
<script>
import { ref, onMounted, Vue } from 'vue';
export default {

  name: 'Modal',
  data() {
    return {

    }
  },
  // emits: ['update:show'],

  props: {
    // 是否显示弹窗
    show: {
      type: Boolean,
      default: false
    }
  },

  setup(props, cxt) {
    const close = () => {
      // 触发事件以关闭弹窗
      // console.log('close:' + cxt.emit("update:show", false))
      cxt.emit('update:show', false)
      console.log(props.show)

    }

    onMounted(() => {
      console.log('props init Value: ' + props.show)
    })

    return {
      close
    }

  },
  methods: {

    // close() {
    //   // 触发事件以关闭弹窗
    //   console.log('close:' + this.$emit('update:show', false))
    //   this.$emit('update:show', false)
    //   console.log(this.$props.show)

    // }
  },
  watch: {
    show(value) {
      console.log('watch method pase Value:' + value)
      // 监听 show 值以切换 body 上 modal-open 类
      const bodyClassList = document.body.classList

      if (value) {
        bodyClassList.add('modal-open')
      } else {
        bodyClassList.remove('modal-open')
      }
    }
  },



}
</script>
<style scoped></style>
