import { setupMessageComponent } from './Message.vue';

// 注册全局组件
export function setupGlobComponents(app) {
  setupMessageComponent(app);
}

import { createApp } from 'vue'
import App from '../App.vue'

// app.use(ModalComponent)
// const components = {
//   Message,
//   Modal
// }

// // app.use(Modal)

// for (const [key, value] of Object.entries(ModalComponent)) {
//   app.component(key, value)
// }
// app.mount('#app')
