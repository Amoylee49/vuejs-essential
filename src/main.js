import { createApp } from 'vue'
import App from './App.vue'

// 如果引入的是 index.js，可以使用下面的简写，等价于 import router from './router/index.js'
import router from './router'

createApp(App).use(router).mount('#app')
