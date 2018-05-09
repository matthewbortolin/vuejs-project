<template>
  <div id='admin' class='container text-center'>
   <div v-if='auth.showAdmin'>
    <button class='btn btn-lg btn-primary' v-on:click='logout()'>Logout</button>
    <fieldset class='form-group'>
      <legend>Add Practitioner</legend>
      <input class='form-control' v-model='name' placeholder='Name' /> 
      <br>
      <input class='form-control' v-model='email' placeholder='Email' /> 
      <br>
      <input class='form-control' v-model='phone' placeholder='Phone' /> 
      <br>
      <input class='form-control' v-model='price' placeholder='Price' /> 
      <br>
      <input class='form-control' v-model='website' placeholder='Website URL' /> 
      <br>
      <textarea class='form-control' v-model='shortDesc' placeholder='Short Description' maxlength='255'>
      </textarea>
      <br>
      <v-btn class="primary" @click="onPickFile">Upload Image</v-btn>
      <input 
        type="file" 
        style="display: none" 
        ref="fileInput" 
        accept="image/*"
        @change="onFilePicked" />
      <br>
      <legend>Modalities</legend>
      <div v-for='mod in modalities'>
          <input type='checkbox' :value='mod.modality' v-model='practitionerModalities'>
          <label for='mod.modality'>{{ mod.modality }}</label>
      </div>
      </fieldset>
      <button class='btn btn-lg btn-primary' v-on:click='addPractitioner(name, email, imageUrl, phone, shortDesc, price, website, practitionerModalities)'>Add Practitioner</button> 
    </fieldset>
    <fieldset class='form-group'>
      <legend>Add Modality</legend>
      <input class='form-control' v-model='modality' placeholder='Modality' />
      <br>
      <button class='btn btn-lg btn-primary' v-on:click='addModality(modality)'>Add</button>
    </fieldset>
   </div>
   <!-- Sign in Page-->
   <div v-if='auth.showSignin' class='form-group'>
      <h2>Sign-In</h2>
      <input class='form-control'  v-model='username' placeholder='Username' /> 
      <br>
      <input v-on:keyup.enter='signin(username, password)' class='form-control' type='password' v-model='password' placeholder='Password' /> 
      <br>
      <button class='btn btn-lg btn-primary' v-on:click='signin(username, password)'>Sign-In</button>
      <span v-model='errorMsg'></span>
   </div>
  </div>
</template>

<script>
import db from '@/firebase'
import Firebase from 'firebase'

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'

let practitionerRef = db.ref('practitioners')
let modalityRef = db.ref('modalities')

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      dropzoneOptions: {
        url: 'localhost:8080/src/assets/thumbnails',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'header value' }
      },
      name: '',
      email: '',
      image: null,
      imageUrl: '',
      shortDesc: '',
      price: '',
      phone: '',
      website: '',
      practitionerModalities: [],
      modality: '',
      errorMsg: '',
    }
  },

  // Firebase database references
  firebase: {
    practitioners: practitionerRef,
    modalities: modalityRef
  },

  // Check to see if user is already logged in
  // Assign user to this user
  created: function () {
    var self = this
    Firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (user.email.localeCompare('matthew.bortolin1@gmail.com') === 0) {
          self.auth.showAdmin = true
          self.auth.showSignin = false
        } else {
          self.errorMsg = "You Don't Have Access To This Page"
        }
      } else {
        self.auth.showAdmin = false
        self.auth.showSignin = true
      }
    })
  },

  methods: {
    onFilePicked (event) {
      const files = event.target.files
      let fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        return alert("File is invalid")
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])

      this.image = files[0]
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    showSuccess: function (file) {
      this.imageUrl = file.name
    },
    // Sign in with email and password
    signin: function (email, password) {
      var self = this
      Firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        location.reload()
      }).catch(function (error) {
        // Handle Errors here.
        self.errorMsg = error.message
      })
    },

    // Logs out user
    logout: function () {
      var self = this
      Firebase.auth().signOut().then(function () {
        location.reload()
      }, function (error) {
        self.errorMsg = 'Sign Out Error: ' + error.message
      })
    },

    addPractitioner: function (name, email, imageUrl, phone, shortDesc, price, website, practitionerModalities) {
      this.$firebaseRefs.practitioners.push({
        name: name,
        email: email,
        profile_picture: image,
        phone: phone,
        shortDescription: shortDesc,
        price: price,
        website: website,
        modalities: practitionerModalities,
        availability: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
        }
      })
    },
    addModality: function (modality) {
      this.$firebaseRefs.modalities.push({
        modality
      })
    }
  }
}
</script>
