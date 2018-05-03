<template>
  <v-layout>
    <v-flex xs12 class="text-xs-center">
      <v-card class="elevation-0 transparent">
        <v-progress-circular indeterminate
          :size="70"
          :width="7"
          color="primary"></v-progress-circular>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped>
  .progress-circular{
    margin: 1em
  }
</style>
