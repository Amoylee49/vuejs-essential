import { createApp } from 'vue'
import App from './App.vue'

// 引入 store/index.js 的默认值
import store from './store'

import { setupGlobComponents } from './components';

// import VueSweetalert2 from  './plugins/vue-sweetalert2'

// 如果引入的是 index.js，可以使用下面的简写，等价于 import router from './router/index.js'
import router from './router'

const app = createApp(App)

app.use(router)
// app.use(VueSweetalert2)

// 将 store 实例作为插件安装
app.use(store)

app.mount('#app')

setupGlobComponents(app);

// createApp(App).use(router).mount('#app')
