import MessageComponent from '../components/Message.vue'
// import { createApp, nextTick } from 'vue';
import Vue from 'vue'
// eventBus.js
import emitter from '../../node_modules/tiny-emitter/instance'



import { createVNode ,render,nextTick} from 'vue'
const body = document.body;
const root = document.createElement("div");
body.appendChild(root);
root.className = "custom-root";
export default {
    install(app){
        let div = document.createElement("div");
        root.appendChild(div);
        // youCom 为自己写的组件,  SoltChild 可以是自己的子组件 ，也可以不传
        let vm = createVNode(MessageComponent,{},{
            // slots
            // default:()=>createVNode(SoltChild)
            onCreate: (event) => {
              console.log(event)
          }
        });
        vm.appContext = app._context; // 这句很关键，关联起了上下文
        render(vm,div);

        console.log(vm)
 // 挂载实例后返回实例目标
 const $el = vm.el

        nextTick(() => {
          // 在下一次 DOM 更新后，将实例目标添加到 #main-container 元素内部的最前面
          document.querySelector('#main-container').prepend($el)
        })

        // 监听 show 值的改变
        // on('update:show', (value) => {
        //   // 更改当前的 show 值
        //   vm.show = value
        // })

        // 添加 show 和 hide 方法来显示和关闭提示框
        const message = {
          //  更改消息并显示提示框，其逻辑跟我们之前写的 showMsg 一模一样
          show(msg = '', type = 'success') {
            vm.msg = msg
            vm.type = type
            vm.show = false

            nextTick(() => {
              vm.show = true
            })
          },
          // 关闭提示框
          hide() {
            nextTick(() => {
              vm.show = false
            })
          }
        }

         // 添加实例方法
    app.config.globalProperties.$message = message

    }
}







/* export default {
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
 */
