<template>
  <v-container mt-5 style="min-height: 700px">
    <v-layout row v-if="error">
      <v-flex xs12 md6 offset-md3>
        <v-alert type="error" value="true" dismissible @input="onClose">
          {{ error.message }}</v-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title class="justify-center primary--text">
            <h2>Practitioner Sign-in</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" 
                      :loading="loading" 
                      :disabled="loading"
                      class="primary">
                      Sign-in<span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {
    // Check if a user is logged into firebase
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.$store.dispatch('setUser', user.email)
        self.$router.push('/update')
      }
    })
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signIn', {email: this.email, password: this.password})
    },
    onClose () {
      this.$store.dispatch('clearError')
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        // change to practitioner update page
        this.$router.push('/update')
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
