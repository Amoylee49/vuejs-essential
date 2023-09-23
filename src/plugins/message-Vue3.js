import MessageComponent from '../components/Message.vue'
import { createApp, nextTick } from 'vue';
import Vue from 'vue'
// eventBus.js
import emitter from '../../node_modules/tiny-emitter/instance'


export default {
  function:{
    $on: (...args) => emitter.on(...args),
  },
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),

  install: (app,$nextTick) => {

    // const {Message} = { MessageComponent }
    const vm = app.use({MessageComponent})

    // const vm = app.use('Message',MessageComponent)

    const $el = vm.$el

    nextTick(() => {
      console.log('................')
      document.querySelector('#main-container').prepend($el)
    })

    emitter.on('update:show', (value) => {
      console.log('===================')
      vm.show = value
    })

    const message = {
      show(msg = '', type = 'success') {
        vm.msg = msg
        vm.type = type
        vm.show = false

        nextTick(() => {
          vm.show = true
          console.log(vm.msg)
          console.log(vm.type)
        })
      },
      hide() {
        nextTick(() => {
          vm.show = false
        })
      }
    }
    // 添加实例方法
    app.config.globalProperties.$message = message
    // app.prototype.$message = message
  }
}
