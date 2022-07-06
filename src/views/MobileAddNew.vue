<template>
   <div id="app" style="margin-top:20vh" class="home">
    <div class="container">
      <div class="card p-3" style="border-radius:15px; margin-top:-10vh" v-if="token !== 'null' && mobileBrands.length">
        
    <!-- Modal for Actions -->
    <div class="modal-content" style="border:none">
        <p class="fw-bold">New Mobile Device Add</p>
        <div class="mb-3">
            <label class="form-label fw-bold" style="float:left">Mobile Name:</label>
            <input type="text" class="form-control" aria-describedby="Name" v-model="mobileName">
        </div>
        <div class="mb-3">
            
            <div class="row mt-3">
                <div class="col">
                    <label class="form-label fw-bold" style="float:left">Brand Name:</label>
                    <br>
                    <span v-for="brand in mobileBrands" :key="brand.id" style="float:left">
                        <span v-if="brandName === brand.Id">
                            <p class="fw-bold">{{brand.Name}}</p>
                        </span>
                    </span>
                </div>
                <div class="col">
                    <label class="form-label fw-bold" style="float:left">Select Brand:</label>
                    <select class="form-select" aria-label="Default select example" v-model="brandName">
                        <option v-for="list in mobileBrands" :key="list.id" :value="list.Id">
                            {{list.Name}}
                        </option>
                    </select>
                </div>
            </div>

            
        </div>
        <div class="mb-3">
            <label class="form-label fw-bold" style="float:left">Shop:</label>
            <input type="text" class="form-control" aria-describedby="Name" v-model="shop">
        </div>
        <div class="mb-3 mt-5">
            <div class="row p-2">
                <div class="col p-2" style="background-color:#bdffdc; margin-right:10px; border-radius:10px;">
                    <label class="form-label fw-bold">Click this button to add:</label>
                    <br>
                    <button type="button" class="btn btn-success fw-bold" @click="postData">Post</button>
                </div>
            </div>
        </div>
        
        
      </div>
      </div>
      

      <!-- Show when user is not found -->

      <span v-if="token === 'null'">
        <h1 class="display-3">You must be signed in to display Mobile Add New!</h1>
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
import { URL_OF_API } from '../api/main-api.js'
import axios from "axios"

export default {
  name: "Home",
  data() {
    return {
        happy : false,
        mobileBrands: [],
        mobileDevice: [],
        token: null,
        modalActive: true,

        // Modal variables

        currentId:null,
        mobileName: '',
        brandName: '',
        created:null,
        shop: 0,
    }
  },
  async created() {
    this.token = localStorage.getItem("bearer_token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('bearer_token')}`
    
    document.body.style.backgroundColor = "#42c9db";

    await this.getMobileBrands();
    await this.getMobileDevice();
  },
  methods: {
    async getMobileBrands() {
        try {
        const url = URL_OF_API
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
    async getMobileDevice() {
    try {
    const url = URL_OF_API
    await axios.get( url + 'model', 
        { 
            headers: {"Content-type" : "application/json"}

        }).then(response => {
            this.mobileDevice = response.data 
            this.mobileDevice = this.mobileDevice.slice(1,100)
        })
        console.log('All the mobile devices = ', this.mobileDevice)
    } catch (err) {
        console.log(err)
    }
    },
    // Add new mobile device
    async postData(){
        try {
            const url = URL_OF_API
            await axios.post( url + 'model', 
                // { 
                //     headers: {"Content-type" : "application/json"}

                // },
                {   
                    // headers: {"Content-type" : "application/json"},
                    Name: this.mobileName,
                    ShopId: this.shop,
                    BrandId: this.brandName,
                }
                ).then(response => {
                    console.log(response)
                })
            } catch (err) {
                console.log(err)
        }
    },
  }
};
</script>
<style scoped>

</style>