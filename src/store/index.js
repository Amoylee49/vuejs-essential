import { createStore } from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

// 引入 actions.js 的所有导出
import * as moreActions from './actions'
import * as moreGetters from './getters'



const state = {
  user: ls.getItem('user'),
  auth: ls.getItem('auth'),
   // 所有文章状态
   articles: ls.getItem('articles')
}

const mutations = {
  UPDATE_USER(state, user) {
    state.user = user
    ls.setItem('user', user)
  },
  UPDATE_AUTH(state, auth) {
    state.auth = auth
    ls.setItem('auth', auth)
  },
  // 更改所有文章的事件类型
  UPDATE_ARTICLES(state, articles) {
    state.articles = articles
    ls.setItem('articles', articles)
  }
}

const actions = {
  login({ commit }, user) {
    if (user) commit('UPDATE_USER', user)
    commit('UPDATE_AUTH', true)
    router.push('/')
  },
  logout({ commit }) {
    commit('UPDATE_AUTH', false)
    router.push({ name: 'Home', params: { logout: true } })
  },
  updateUser({ state, commit }, user) {
    const stateUser = state.user

    if (stateUser && typeof stateUser === 'object') {
      user = { ...stateUser, ...user }
    }

    commit('UPDATE_USER', user)
  },
  // 使用对象展开运算符混入 moreActions
  ...moreActions
}

// 添加 getters
const getters = {
  getArticleById: (state, getters) => (id) => {
    // 使用派生状态 computedArticles 作为所有文章
    let articles = getters.computedArticles

    console.log(getters)
    if (Array.isArray(articles)) {
      articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
      return articles.length ? articles[0] : null
    } else {
      return null
    }
  },
  // 混入 moreGetters, 你可以理解为 getters = Object.assign(getters, moreGetters)
  ...moreGetters
}

const store = createStore({
  state,
  // 注册 getters
  getters,
  mutations,
  actions
})

export default store
