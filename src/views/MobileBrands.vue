<template>
   <div id="app" style="margin-top:20vh">
    <div class="container">
      <div class="card p-3" style="border-radius:15px; margin-top:-10vh" v-if="token !== 'null' && mobileBrands.length">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Name</th>
              <th scope="col">Logo</th>
              <th scope="col">Deleted</th>
              <th scope="col">Created</th>
              <th scope="col">Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list,index) in mobileBrands" :key="list.id">
              <th> {{ index+1 }} </th>
              <td> {{ list.Name }} </td>
              <td>
                <span v-if="list.Logo != null">
                  {{ list.Logo }}
                </span> 
                <span v-else style="color:red">
                  Logo not found
                </span>
              </td>
              <td> 
                <span v-if="list.Deleted != null">
                   {{ list.Deleted }} 
                </span> 
                <span v-else style="color:green">
                  Not Deleted
                </span>
               
              
              </td>
              <td> {{ list.Created }} </td>
              <td> {{ list.Updated }} </td>
            </tr>
          </tbody>
        </table>
      </div>
      

      <!-- Show when user is not found -->

      <span v-if="token === 'null'">
        <h1 class="display-3">You must be signed in to display Mobile Brands!</h1>
        <br>
        <br>
        <router-link :to="'/'"> 
          <button type="button" class="btn btn-success btn-lg fw-bold">Sign in</button>
        </router-link>
      </span>
      
    </div>
   </div>
</template>
<script>
import axios from "axios"
export default {
  name: "Home",
  data() {
    return {
        happy : false,
        mobileBrands: [],
        token: null,
    }
  },
  async created() {
    this.token = localStorage.getItem("bearer_token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('bearer_token')}`
    document.body.style.backgroundColor = "#42c9db";

    await this.getMobileDevices();
  },
  methods: {
    async getMobileDevices() {
        try {
        const url = '/api/'
        await axios.get( url + 'brand', 
            { 
                headers: {"Content-type" : "application/json"}

            }).then(response => {
                this.mobileBrands = response.data 
            })
            console.log('All the mobile brands = ', this.mobileBrands)
        } catch (err) {
            console.log(err)
        }
    },
  }
};
</script>
<style scoped>
</style>