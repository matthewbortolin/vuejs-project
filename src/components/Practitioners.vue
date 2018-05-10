<template>
  <v-container mt-5 style="min-height: 700px">
    <app-loading v-if="loading"></app-loading>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="primary--text">Our Team</h1>
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing</h4>
      </v-flex>
    </v-layout> 
    <v-layout row wrap mt-3>
      <v-flex xs12 sm6 lg4 v-for="prac in practitioners" :key="prac.name">
        <v-card class="elevation-0 transparent">
          <v-container fluid>
            <v-avatar size="250px" class="elevation-7">
              <img :src="require('../assets/thumbnails/'+prac.profile_picture)"
              class="img-circle" />
            </v-avatar>
            <v-card-title class="justify-center mb-0">
                <h2 class="primary--text">{{ prac.name }}</h2>
            </v-card-title>
            <v-card-text class="mt-0">
              <p class="mb-0">
                <span v-for='mod in prac.modalities'>{{ mod }} - </span></p>
              <p class="mb-0">{{ prac.price }}</p>
              <p class="mb-0"
                style="white-space: pre-wrap">{{ prac.shortDescription }}</p>
              <p class="mb-0">
                <a :href="'tel:'+prac.phone" 
                  v-if="prac.preferredContact === 'phone'">
                  <v-btn class="primary">{{ prac.phone }}</v-btn></a>
                <a :href="'mailto:'+prac.email" 
                  v-if="prac.preferredContact === 'email'">
                  <v-btn class="primary"
                    style="text-transform: lowercase">{{ prac.email }}</v-btn>
                </a>
                <v-btn class="primary" 
                  @click="selectedPractitioner(prac.name)">Show More</v-btn>
              </p>
            </v-card-text>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout> 
  </v-container>
</template>

<script>
import Loading from './Loading'

export default {
  name: 'Practitioners',
  components: {
    'app-loading': Loading
  },
  methods: {
    selectedPractitioner (name) {
      this.$router.push('/practitioners/' + name)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    practitioners () {
      return this.$store.getters.getPractitioners
    }
  }
}
</script>

