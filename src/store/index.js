import { createStore } from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'



const state = {
  user: ls.getItem('user')
}

const mutations = {
  UPDATE_USER(state, user) {
    state.user = user
    ls.setItem('user', user)
  }
}

const actions = {
  login({ commit }, user) {
    if (user) commit('UPDATE_USER', user)
    router.push('/')
  },

  // 更新个人信息
  updateUser({ state, commit }, user) {
    const stateUser = state.user

    if (stateUser && typeof stateUser === 'object') {
      user = { ...stateUser, ...user }
    }

    commit('UPDATE_USER', user)
  }

}

// 添加 getters
const getters = {
  // 第一参数是 state，因为要传 id，所以这里返回一个函数
  getArticleById: (state) => (id) => {
    // 从仓库获取所有文章
    let articles = state.articles

    // 所有文章是一个数组时
    if (Array.isArray(articles)) {
      // 传进来的 id 和文章的 articleId 相同时，返回这些文章
      articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
      // 根据文章长度，返回文章或者 null
      return articles.length ? articles[0] : null
    } else {
      // 返回 null
      return null
    }
  }
}

const store = createStore({
  state,
  // 注册 getters
  getters,
  mutations,
  actions
})

export default store
