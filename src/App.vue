<template>
  <v-app id="app">
    <v-navigation-drawer temporary v-model="showSideNav" app>
      <v-list>
        <v-list-tile v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/update" 
          tag="span" 
          style="cursor: pointer"
          v-if="user">
          <v-list-tile-action>
            <v-icon left>update</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Update Details</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user" @click="logout">
          <v-list-tile-action>
            <v-icon left>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Log-out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary elevation-7" app dark>
      <v-toolbar-side-icon @click.stop="showSideNav = !showSideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"
          >Lorem ipsum dolor</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          {{ item.title }}</v-btn>
        <v-btn flat to="/update" 
          tag="span" 
          style="cursor: pointer"
          v-if="user">
          Update Details</v-btn>
        <v-btn flat v-if="user" @click="logout">
          Log-out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-parallax :src="require('./assets/clouds.jpg')" height="500" class="elevation-7">
      <v-layout column align-center justify-center>
        <h1 class="white--text">Lorem Ipsum Dolor</h1>
        <h4 class="white--text">Lorem ipsum dolor lorem ipsum dolor</h4>
      </v-layout>
    </v-parallax>
    <main>
      <router-view/>
    </main>
    <v-footer class="primary justify-center" dark>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      showSideNav: false,
      menuItems: [
        {
          icon: 'schedule',
          title: 'Daily Availability',
          link: '/availability'
        },
        {
          icon: 'supervisor_account',
          title: 'Practitioners',
          link: '/practitioners'
        },
        {
          icon: 'lock_open',
          title: 'Sign-in',
          link: '/signin'
        }
      ]
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
