import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entries: [],
    keebs: []
  },
  mutations: {
    setEntries(state, payload) {
      state.entries = payload
    },
    setKeebs(state, payload) {
      state.keebs = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
