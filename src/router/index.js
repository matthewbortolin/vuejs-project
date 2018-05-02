import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Update from '@/components/Update'
import Practitioners from '@/components/Practitioners'
import Practitioner from '@/components/Practitioner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/practitioners',
      name: 'Practitioners',
      component: Practitioners
    },
    {
      path: '/practitioner',
      name: 'Practitioner',
      component: Practitioner
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/update',
      name: 'Update',
      component: Update
    }
  ]
})
