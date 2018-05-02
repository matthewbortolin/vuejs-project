import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex);
Vue.use(firebase);

export const store = new Vuex.Store({
  state: {
    practitioners: [],
    modalities: [],
    user: null,
    loading: false,
    errorMsg: ''
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getPractitioners: function (state) {
      return state.practitioners
    },
    getModalities: function (state) {
      return state.modalities
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.errorMsg
    }
  },
  mutations: {
    setPractitioners (state, payload) {
      state.practitioners = payload
    },
    setModalities (state, payload) {
      state.modalities = payload
    },
    setUser (state, payload) {
      const users = state.practitioners
      for (let key in users) {
        if(payload === users[key].email) {
          state.user = users[key]
          break
        }
      }
    },
    logoutUser (state) {
      state.user = null
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.errorMsg = payload 
    },
    clearError (state) {
      state.errorMsg = null
    }
  },
  actions: {
    loadPractitioners ({commit}) {
      // set loading spinner to true
      commit('setLoading', true)
      // Clear error message
      commit('clearError')
      firebase.database().ref('practitioners').on('value', function(data) {
        const practitioners = []
        const obj = data.val()
        for(let key in obj) {
          practitioners.push(obj[key])
        }
        commit('setLoading', false),
        commit('setPractitioners', practitioners)
      })
    },
    // Load modalities from firebase
    loadModalities ({commit}) {
      //set loading spinner to true
      commit('setLoading', true),
      //Clear error message
      commit('clearError')
      firebase.database().ref('modalities').on('value', function(data) {
        const modalities = []
        const obj = data.val()
        for(let key in obj) {
          modalities.push(obj[key])
        }
        commit('setLoading', false),
        commit('setModalities', modalities)
      })
    },
    signIn ({commit}, payload) {
      //set loading spinner to true
      commit('setLoading', true),
      //Clear error message
      commit('clearError')

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const userEmail = user.email
            //set loading spinner to false
            commit('setLoading', false),
            commit('setUser', userEmail)
          })
        .catch(error => {
          //set loading spinner to false
          commit('setLoading', false),
          //Add error message
          commit('setError', error.message)
        })
    },
    logout ({commit}) {
      firebase.auth().signOut().then(function () {
        commit('logoutUser')
      }, function (error) {
        commit('setError', error.message) 
      })
    },
    setUser ({commit}, payload) {
      commit('setUser', payload)
    },
    clearError ({commit}) {
      commit('clearError') 
    }
  }
})
