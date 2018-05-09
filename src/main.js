// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'

import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.amber.darken1,
    secondary: colors.indigo.accent4,
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // Initialise Firebase
    firebase.initializeApp({
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: ''
    })

    // Check if a user is logged into firebase
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.$store.dispatch('setUser', user.email)
      }
    })

    // load practitioners from firebase
    this.$store.dispatch('loadPractitioners')

    // load modalities from firebase
    this.$store.dispatch('loadModalities')
  }
})
