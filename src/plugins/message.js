import MessageComponent from '../components/Message.vue'
import { createApp, nextTick, watch } from 'vue';

const createMount = options => {
  const mountNode = document.createElement('div')
  // mountNode.style.visibility="hidden";
  document.body.appendChild(mountNode)

  const app = createApp(MessageComponent, {
    ...options,
    remove() {
      app.unmount(mountNode)
      document.body.removeChild(mountNode)
    }
  })
  return app.mount(mountNode)
}

const Message = options => {
  return createMount(options)
}

// 插件的公开方法 install
Message.install = (app) => {
  // $on: (...args) => emitter.on(...args)
  // 使用 Vue.extend 基于我们传入的组件生成一个新的子类

  // new 一个新的实例

  const vm = Message()

  // 挂载实例后返回实例目标
  const $el = vm.$el

  vm.$nextTick(() => {
    // 在下一次 DOM 更新后，将实例目标添加到 #main-container 元素内部的最前面
    document.querySelector('#main-container').prepend($el)
  })

  // 监听 show 值的改变 这里有问题
  // vm.on(
  //   ('update:show', (value) => {
  //     // 更改当前的 show 值
  //     vm.show = value
  //   })
  // )


  // 添加 show 和 hide 方法来显示和关闭提示框
  const message = {
    //  更改消息并显示提示框，其逻辑跟我们之前写的 showMsg 一模一样
    show(msg = '', type = 'error') {
      vm.msg = msg
      vm.type = type
      vm.show = false

      vm.$nextTick(() => {
        vm.show = true
      })
    },
    // 关闭提示框
    hide() {
      vm.$nextTick(() => {
        vm.show = false
      })
    }
  }

  // 添加实例方法
  // app.prototype.$message = message vue2

  // 添加实例方法
  app.config.globalProperties.$message = message
}

export default Message
