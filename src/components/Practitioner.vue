<template>
  <v-container fluid>
    <app-loading v-if="!practitioner"></app-loading>
    <v-layout v-if="practitioner">
      <v-flex xs12 lg6 offset-lg3>
        <v-card class="elevation-0" transparent>
          <v-card-title class="justify-center">
              <h1 class="primary--text">{{ practitioner.name }}</h1>
          </v-card-title>
          <v-flex xs12 sm4 offset-sm4>
            <v-card-media 
              :src="require('../assets/thumbnails/'+practitioner.profile_picture)" 
              height="300px">
            </v-card-media>
          </v-flex>
          <v-card-text>
            <p><span v-for='mod in practitioner.modalities'>{{ mod }} - </span></p>
            <p>Price: {{ practitioner.price }}</p>
            <p>Availability: <span v-for='(value, key) in practitioner.availability'
                v-if="value" style="text-transform: uppercase">{{ key }} - </span></p>
            <p><a :href='practitioner.website'>{{ practitioner.website }}</a></p>
            <p>
              <a :href="'tel:'+practitioner.phone" 
                v-if="practitioner.preferredContact === 'phone'">
                <v-btn class="primary">{{ practitioner.phone }}</v-btn>
              </a>
              <a :href="'mailto:'+practitioner.email" 
                v-if="practitioner.preferredContact === 'email'">
                <v-btn class="primary" style="text-transform: lowercase">
                  {{ practitioner.email }}</v-btn>
              </a>
            </p>
            <p style="white-space: pre-wrap">{{ practitioner.longDescription }}</p>
            <v-btn class="primary" @click="back">Back</v-btn></p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Loading from './Loading'

export default {
  name: 'Practitioner',
  props: ['name'],
  components: {
    'app-loading': Loading
  },
  methods: {
    back () {
      this.$router.push('/practitioners')
    }
  },
  computed: {
    practitioner () {
      return this.$store.getters.getPractitioner(this.name)
    }
  }
}
</script>
