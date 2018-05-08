<template>
  <v-container id="availability">
  <app-loading v-if="loading"></app-loading>
  <v-layout row wrap>
    <v-flex xs12 v-if="!loading">
      <v-btn @click='previousDay'class="primary">Previous Day</v-btn>
      <v-btn @click='nextDay' class="primary">Next Day</v-btn>
    </v-flex>
  </v-layout>
  <h2 style='text-transform: uppercase'>Practitioners Available for {{ getDayOfTheWeek }}</h2>
    <v-layout row wrap "min-height: 500px">
      <v-flex xs12 sm6 md4 v-for="prac in practitioners" :key="prac.name" 
        v-if="prac.availability[getDayOfTheWeek]">
        <v-card class="elevation-0 transparent">
          <v-container fluid>
            <v-avatar size="250px" class="elevation-7">
              <img :src="require('../assets/thumbnails/'+prac.profile_picture)"
              class="img-circle" />
            </v-avatar>
              <v-card-title class="justify-center">
                  <h2 class="primary--text">{{ prac.name }}</h2>
              </v-card-title>
              <v-card-text>
                <p class="mb-0"><span v-for='mod in prac.modalities'>{{ mod }} - </span></p>
                <p class="mb-0">{{ prac.price }}</p>
                <p class="mb-0" style="white-space: pre">{{ prac.shortDescription }}</p>
                <p class="mb-0"><a :href="'tel:'+prac.phone"><v-btn class="primary">{{ prac.phone }}</v-btn></a>
                <v-btn class="primary" @click="selectedPractitioner(prac, prac.name)">Show More</v-btn></p>
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
  name: 'Availability',
  data () {
    return {
      currentDay: '',
      errorMsg: '',
    }
  },
  components: {
    'app-loading': Loading
  },
  created () {
    return this.getCurrentDay
  },
  methods: {
    selectedPractitioner (prac, name) {
      this.$store.dispatch('setPractitioner', prac)
      this.$router.push('/practitioners/' + name)
    },
    // Increments currentDay
    nextDay: function () {
      if (this.currentDay < 6) {
        this.currentDay++
      } else {
        this.currentDay = 0
      }
    },

    // Decrements currentDay
    previousDay: function () {
      if (this.currentDay > 0) {
        this.currentDay--
      } else {
        this.currentDay = 6
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    practitioners () {
      return this.$store.getters.getPractitioners
    },
    // Gets the day of the week and assigns to
    // Data variable currentDay
    getCurrentDay: function () {
      var date = new Date()
      var day = date.getDay()
      this.currentDay = day
    },

    // Returns day of the week
    getDayOfTheWeek: function (day) {
      var daysOfTheWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
      ]
      return daysOfTheWeek[this.currentDay]
    }
  }
}
</script>
