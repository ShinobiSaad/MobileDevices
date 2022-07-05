<template>
   <div id="app" style="margin-top:30vh">
    <div class="container">
	<div class="d-flex justify-content-center">
		<div class="card" style="width: 40vw; border-radius: 20px;">
			<div class="card-header">
				<h3 class="fw-bold">Sign In</h3>
			</div>
			<div class="card-body mt-4">
      <form>
        <div class="input-group form-group">
          <input type="text" class="form-control" placeholder="username" v-model="user.email">
          
        </div>
        <div class="input-group form-group mt-3">
          <input type="password" class="form-control" placeholder="password" v-model="user.password">
        </div>
        <div class="form-group mt-3">
          
        </div>
      </form>
      <button type="submit" class="btn btn-outline-primary fw-bold" @click="fireSubmit()">Submit</button>
			</div>
		</div>
	</div>
</div>
<div class="alert alert-danger mt-4" role="alert" v-if="error"> 
  Wrong credentials! try again.
</div>
   </div>
</template>
<script>
import axios from "axios"
export default {
  name: "Home",
  created() {
    document.body.style.backgroundColor = "#42c9db";
  },
  data() {
    return {
      email: null,
      password: null,
      cache: null,
      error: null,
      success: false,

      user: {
        email:null,
        password:null
      }
    }

  },
  methods: {
     async fireSubmit(){
      this.$store.dispatch('loginUser', this.user)


      // try {
      //   const email  = this.email;
      //   const password = this.password;
      //   const url = '/api/';
      //   await axios.post( url + 'login',
      //   {
      //     email: email,
      //     password: password
      //   }, 
      //   { 
      //     headers: {"Content-type" : "application/json"}
      //     } 
      //   ).then(response => {
      //     console.log(response.data)
      //     this.cache = response.data
          
      //   });
      //   this.success = true;
      //   this.error = null;
      //   console.log('I have the access token: ' + this.cache)
      // } catch (err) {
      //   this.error = err.message;
      //   console.log(this.error)
      // }
      },
  },

  beforeMount(){
    this.$store.dispatch('checkUser')
  }
};
</script>
<style scoped>
</style>