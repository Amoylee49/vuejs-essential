import { setupMessageComponent } from './Message.vue';


/* import Slider from './Slider.vue';

// 注册全局组件
export function setupGlobComponents(app) {
  setupMessageComponent(app);
}

import { createApp } from 'vue'
import App from '../App.vue'

export default{
  install(app){
    app.component('Slider',Slider)
  }
} */

// 引入 Slider.vue 的默认值
import Slider from './Slider'

const components = {
  // Message,
  // Modal,
  // Pagination,
  // 添加到对象以便在循环中进行注册
  Slider
}
export default{
  install(app){
    for (const [key, value] of Object.entries(components)) {
      app.component(key, value)
    }
  }
}



