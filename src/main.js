import { createApp } from 'vue'
import App from './App.vue'

// 引入 store/index.js 的默认值
import store from './store'

import { setupGlobComponents } from './components';

import VueSweetalert2 from './plugins/vue-sweetalert2'

// 如果引入的是 index.js，可以使用下面的简写，等价于 import router from './router/index.js'
import router from './router'

import Messagee from './plugins/message.js'
import MessageComponent from './components/Message.vue'

import { mockArticles } from './mock/data' //添加 mock测试文章
import ls from './utils/localStorage'

const app = createApp(App)

// Vue.config.productionTip = false

app.use(router)
app.use(VueSweetalert2)

// 将 store 实例作为插件安装
app.use(store)

//全局消息组件未生效
// const Message = app.component('Message',Messagee)
app.use(Messagee)


const AddMockData = (() => {
  // 是否加入测试数据
  const isAddMockData = true
  // 用户数据
  let userArticles = ls.getItem('articles')


  if (Array.isArray(userArticles)) {
    userArticles = userArticles.filter(article => parseInt(article.uid) === 1)
  } else {
    userArticles = []
  }

  if (isAddMockData) {
    // 合并用户数据和测试数据，使用合并值作为所有文章
    store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(10)])
  } else {
    // 使用用户数据作为所有文章
    store.commit('UPDATE_ARTICLES', userArticles)
  }
})()
app.mount('#app')


// app.config.globalProperties.$message =
// setupGlobComponents(app);


// createApp(App).use(router).use(store).use(message).mount('#app')

// 使用插件
/* Vue.use(Message)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App), // 按照 ES6 箭头函数的写法，就得到了： render: h => h(App);
}).$mount('#app') */





/* import Vue from 'vue'
import App from './App'
import router from './router'
// import './directives'
import './components'
import store from './store'
// import VueSweetalert2 from './plugins/vue-sweetalert2'
// 引入插件
import Message from './plugins/message'

// Vue.use(VueSweetalert2)
// 使用插件
// Vue.use(Message)

// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: createApp => createApp(App),
}).$mount('#app') */
