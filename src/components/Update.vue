<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md6 offset-md3>
        <v-alert type="error" :value="error" dismissible @input="onClose">
          {{ errorMsg }}</v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 lg6 offset-lg3>
        <v-card class="elevation-0">
          <v-card-title class="justify-center primary--text">
            <h1>{{ user.name }}</h1>
          </v-card-title>
          <v-flex sm6 offset-sm3>
            <v-text-field label="Website" 
              v-model='website'
              type="url"></v-text-field>
            <v-btn class='primary' @click='updateWebsite()'>Update Website</v-btn> 
            <v-text-field label="Price" v-model='price'></v-text-field>
            <v-btn class='primary' @click='updatePrice()'>Update Price</v-btn> 
            <v-layout mt-3>
              <v-flex xs6>
            <v-checkbox
              label='Monday'
              type='checkbox'
              v-model='user.availability.monday'>
            </v-checkbox>
            <v-checkbox
              label='Tuesday'
              type='checkbox'
              v-model='user.availability.tuesday'>
            </v-checkbox>
            <v-checkbox
              label='Wednesday'
              v-model='user.availability.wednesday'>
            </v-checkbox>
            <v-checkbox
              label='Thursday'
              v-model='user.availability.thursday'>
            </v-checkbox>
            </v-flex>
            <v-flex xs6>
            <v-checkbox
              label='Friday'
              v-model='user.availability.friday'>
            </v-checkbox>
            <v-checkbox
              label='Saturday'
              v-model='user.availability.saturday'>
            </v-checkbox>
            <v-checkbox
              label='Sunday'
              v-model='user.availability.sunday'>
            </v-checkbox>
            </v-flex>
            </v-layout>
            <v-btn class='primary' @click='updateAvailability()'>Update Availability
            </v-btn> 
          </v-flex>
          <v-text-field box multi-line :label="'Short Description ('+shortDescCount+'/255)'" 
            v-model='shortDesc' maxlength='255' rows='5'>
          </v-text-field>
          <v-btn class='primary' @click='updateShortDesc()'>Update Short Description</v-btn> 
          <v-text-field box multi-line label="Long Description" 
            v-model.lazy='longDesc' rows='5'>
          </v-text-field>
          <v-btn class='primary' @click='updateLongDesc()'>Update Long Description</v-btn> 
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Update',
  data () {
    return {
      shortDesc: this.$store.getters.getUser.shortDescription,
      longDesc: this.$store.getters.getUser.longDescription,
      price: this.$store.getters.getUser.price,
      website: this.$store.getters.getUser.website,
      errorMsg: ''
    }
  },
  methods: {
    onClose () {
      this.errorMsg = ''
    },
    // Update Price
    updatePrice () {
      if (this.price !== '') {
        var key = this.user.id
        this.$store.dispatch('updatePrice', {id: key, price: this.price})
      } else {
        this.errorMsg = 'Price cannot be empty'
      }
    },
    updateWebsite () {
    },
    updateShortDesc () {
      if (this.shortDesc !== '' && this.shortDesc.length < 255) {
        var key = this.user.id
        this.$store.dispatch('updateShortDescription', {id: key, shortDesc: this.shortDesc})
      } else {
        this.errorMsg = 'Short Description cannot be empty or longer than 255'
      }
    },
    updateLongDesc () {
      if (this.longDesc !== '') {
        var key = this.user.id
        this.$store.dispatch('updateLongDescription', {id: key, longDesc: this.longDesc})
      } else {
        this.errorMsg = 'Long Description cannot be empty'
      }
    },
    updateAvailability () {
      var key = this.user.id
      this.$store.dispatch('updateAvailability', {
        id: key,
        availability: {
          monday: this.user.availability.monday,
          tuesday: this.user.availability.tuesday,
          wednesday: this.user.availability.wednesday,
          thursday: this.user.availability.thursday,
          friday: this.user.availability.friday,
          saturday: this.user.availability.saturday,
          sunday: this.user.availability.sunday
        }
      })
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    error () {
      if (this.errorMsg !== '') {
        return true
      } else {
        return false
      }
    },
    shortDescCount () {
      return this.shortDesc.length
    }
  }
}
</script>
