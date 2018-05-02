// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'

import './stylus/main.styl'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

// Initialise Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyC8o9fGak_TQQFqsq5o_ZyhMWf-mk2CB0Y',
  authDomain: 'fahf-2d5a0.firebaseapp.com',
  databaseURL: 'https://fahf-2d5a0.firebaseio.com',
  projectId: 'fahf-2d5a0',
  storageBucket: 'fahf-2d5a0.appspot.com',
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // load practitioners from firebase
    this.$store.dispatch('loadPractitioners')

    // load modalities from firebase
    this.$store.dispatch('loadModalities')
  },
})
