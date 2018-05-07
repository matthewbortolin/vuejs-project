<template>
  <v-container>
    <app-loading v-if="loading"></app-loading>
    <v-layout row wrap>
    <v-flex xs12>
      <div>
        <h2 class="headline">Our Team</h2>
        <span class="subheading">
          Meet our gifted healers 
        </span>
      </div>
    </v-flex>
    </v-layout> 
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="prac in practitioners" :key="prac.name">
        <v-card class="elevation-0 transparent">
          <v-container fluid>
            <v-card-media src=""
              height="200px">
              </v-card-media>
              <v-card-title class="justify-center">
                <div class="headline text-xs-center">{{ prac.name }}</div>
              </v-card-title>
              <v-card-text>
                <p class="mb-0"><span v-for='mod in prac.modalities'>{{ mod }} - </span></p>
                <p class="mb-0">{{ prac.price }}</p>
                <p class="mb-0" style="white-space: pre">{{ prac.shortDescription }}</p>
                <p class="mb-0"><a :href="'tel:'+prac.phone"><v-btn class="primary">{{ prac.phone }}</v-btn></a>
                <v-btn class="primary" @click="selectedPractitioner(prac.name)">Show More</v-btn></p>
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

