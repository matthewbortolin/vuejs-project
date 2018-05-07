<template>
  <v-container>
    <app-loading v-if="!practitioner"></app-loading>
    <v-layout fluid v-if="practitioner">
      <v-flex xs12>
        <v-card class="elevation-0">
          <v-card-title>
              <h3 class="primary--text text-xs-center">{{ practitioner.name }}</h3>
          </v-card-title>
          <v-card-media src="" height="300px">
          </v-card-media>
          <v-card-text>
            <p><span v-for='mod in practitioner.modalities'>{{ mod }} - </span></p>
            <p>Price: {{ practitioner.price }}</p>
            <p>Availability: <span v-for='(value, key) in practitioner.availability'
                v-if="value" style="text-transform: uppercase">{{ key }} - </span></p>
            <p><a :href='practitioner.website'>{{ practitioner.website }}</a></p>
            <p><a :href="'tel:'+practitioner.phone"><v-btn class="primary">{{ practitioner.phone }}</v-btn></a></p>
            <p style="white-space: pre">{{ practitioner.longDescription }}</p>
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
    practitioner() {
      return this.$store.getters.getPractitioner(this.name)
    },
    firstLetterToUppercase(str) {
      return str.charAt(0).toUppercase() + str.slice(1)
    }
  }
}
</script>
