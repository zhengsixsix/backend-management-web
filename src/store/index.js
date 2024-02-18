import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
    // { storage: window.sessionStorage } // 默认是 window.localStorage
  ],
  state: {
    token: '',
    menus: '',
  },
  getters: {
    token(state) {
      return state.token
    },
    menus(state) {
      return state.menus
    },
  },
  mutations: {
    // 存储token
    setToken(state, token) {
      state.token = token
    },
    // 删除token
    removeToken(state) {
      state.token = ''
    },
    // 存储菜单
    setMenus(state, menus) {
      state.menus = menus
    },
    // 删除token
    removeMenus(state) {
      state.menus = ''
    },
  },
  actions: {},
})
