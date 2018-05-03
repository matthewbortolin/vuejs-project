import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Update from '@/components/Update'
import Practitioners from '@/components/Practitioners'
import Practitioner from '@/components/Practitioner'
import AuthGuard from './auth-guard'

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
      path: '/practitioners/:name',
      name: 'Practitioner',
      props: true,
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
      component: Update,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
