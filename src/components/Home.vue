<template>
  <div id="home">
    <v-container>
      <v-layout row style="min-height: 400px">
        <v-flex xs12 mt-5>
          <h1>Lorem ipsum dolor sit amet</h1>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed at accumsan erat. Aenean fermentum est sapien, ac blandit 
            lectus mollis id. Pellentesque euismod tempor felis, id vulputate 
            tellus eleifend eget. Vivamus luctus odio vitae tortor vulputate 
            eleifend. In hac habitasse platea dictumst. Pellentesque dignissim 
            dolor eget tellus imperdiet, pretium pharetra neque iaculis. 
            Cras iaculis varius sollicitudin. Aenean consectetur tellus nisl, 
            gravida dictum dui scelerisque non. Vivamus malesuada porta hendrerit. 
            Proin eu iaculis lectus. Sed vehicula fringilla condimentum. Suspendisse 
            interdum, lorem quis egestas luctus, lorem est semper sapien, 
            et auctor turpis nisi sit amet ligula. Morbi auctor risus eu mi pellentesque
            molestie. Quisque nec est pulvinar, mattis augue vitae, volutpat est. 
            Morbi et urna iaculis, eleifend est at, consectetur eros.
          </p>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed at accumsan erat. Aenean fermentum est sapien, ac blandit 
            lectus mollis id. Pellentesque euismod tempor felis, id vulputate 
            tellus eleifend eget. Vivamus luctus odio vitae tortor vulputate 
            eleifend. In hac habitasse platea dictumst. Pellentesque dignissim 
            dolor eget tellus imperdiet, pretium pharetra neque iaculis. 
            Cras iaculis varius sollicitudin. Aenean consectetur tellus nisl, 
            gravida dictum dui scelerisque non. Vivamus malesuada porta hendrerit. 
            Proin eu iaculis lectus. Sed vehicula fringilla condimentum. Suspendisse 
            interdum, lorem quis egestas luctus, lorem est semper sapien, 
            et auctor turpis nisi sit amet ligula. Morbi auctor risus eu mi pellentesque
            molestie. Quisque nec est pulvinar, mattis augue vitae, volutpat est. 
            Morbi et urna iaculis, eleifend est at, consectetur eros.
          </p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-parallax :src="require('../assets/clouds.jpg')" height="450" class="elevation-7">
    </v-parallax>
    <v-container>
      <app-practitioners></app-practitioners>
    </v-container>
  </div>
</template>

<script>
import Practitioners from './Practitioners'

export default {
  name: 'Home',
  components: {
    'app-practitioners': Practitioners
  }
}
</script>

