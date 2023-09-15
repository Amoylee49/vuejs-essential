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

const store = createStore({
  state,
  mutations,
  actions
})

export default store
