import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import menu from './modules/menu'

var localForage = require('localforage')

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules: {
    app,
    menu
  },
  state: {
    pkg,
    settings: {
      token: '',
      projectId: ''
    }
  },
  mutations: {
    setToken(state, token){
      state.settings.token = token
    },
    setProjectId(state, projectId){
      state.settings.projectId = projectId
    },
    initSettings(state){
      // let _state = state
      // localForage.getItem('mvToken', function (err, value) {
      //   _state.settings.token = value
      // });
      // localForage.getItem('mvProjectId', function (err, value) {
      //   _state.settings.projectId = value
      // }); 
    }
  }
})

export default store
