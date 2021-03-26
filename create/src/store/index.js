import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import BP from './modules/buryingPoint'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    User,
    BP,
  }
})
