<template>
  <v-card>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate
          :size="70"
          :width="7"
          color="card"></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped>
  .progress-circular{
    margin: 1rem
  }
</style>
