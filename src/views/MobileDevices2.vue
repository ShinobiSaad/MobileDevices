<template>
   <div id="app" style="margin-top:20vh" class="home">
    <div class="container">
      <div class="card p-3" style="border-radius:15px; margin-top:-10vh" v-if="token !== 'null' && mobileBrands.length">
        
    <!-- Modal for Actions -->
    <Modal @close="toggleModal" :modalActive="modalActive">
    <div class="modal-content" style="border:none">
        <p class="fw-bold">Id of Mobile: {{ currentId }}</p>
        <div class="mb-3">
            <label class="form-label fw-bold" style="float:left">Mobile Name:</label>
            <input type="text" class="form-control" aria-describedby="Name" v-model="mobileName">
        </div>
        <div class="mb-3">
            
            <div class="row mt-3">
                <div class="col">
                    <label class="form-label fw-bold" style="float:left">Brand :</label>
                    <br>
                    <span v-for="brand in mobileBrands" :key="brand.id" style="float:left">
                        <span v-if="brandName === brand.Id">
                            <p class="fw-bold">{{brand.Name}}</p>
                        </span>
                    </span>
                </div>
                <div class="col">
                    <label class="form-label fw-bold" style="float:left">Change Brand:</label>
                    <select class="form-select" aria-label="Default select example" v-model="brandName">
                        <option v-for="list in mobileBrands" :key="list.id" :value="list.Id">
                            {{list.Name}}
                        </option>
                    </select>
                </div>
            </div>

            
        </div>
        <div class="mb-3 mt-5">
            <div class="row p-2">
                <div class="col p-2" style="background-color:#fcf9b1; margin-right:10px; border-radius:10px;">
                    <label class="form-label fw-bold">To update information of mobile:</label>
                    <br>
                    <button type="button" class="btn btn-success fw-bold" @click="updateData">Update</button>
                </div>
                <div class="col p-2" style="background-color:#ffbdbd; margin-right:10px; border-radius:10px;">
                    <label class="form-label fw-bold">To delete this mobile:</label>
                    <br>
                    <button type="button" class="btn btn-danger fw-bold" @click="deleteData">Delete</button>
                </div>
            </div>
        </div>
        
        
      </div>
    </Modal> 

    <!-- Table to show data -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Deleted</th>
              <th scope="col">Created</th>
              <th scope="col">Updated</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list,index) in mobileDevice" :key="list.id">
            <th> {{ index+1 }} </th>
            <td> {{ list.Name }} </td>
            <td>
            <span v-for="brand in mobileBrands" :key="brand.id">
                <span v-if="list.BrandId === brand.Id"> 
                {{ brand.Name }}
                </span>
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
            <td> 
                <span v-if="list.Updated != null">
                     {{ list.Updated }} 
                </span> 
                <span v-else style="color:blue">
                  Not Updated yet
                </span>

            </td>
            <td>
                <button type="button" class="btn btn-warning fw-bold" @click="takeAction(list.Id, list.Name, list.BrandId, list.Created)">Action</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
      

      <!-- Show when user is not found -->

      <span v-if="token === 'null'">
        <h1 class="display-3">You must be signed in to display Mobile Devices!</h1>
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
import Modal from "@/components/Modal.vue";
import { ref } from "vue";

export default {
  name: "Home",
  data() {
    return {
        happy : false,
        mobileBrands: [],
        mobileDevice: [],
        token: null,
        modalActive: false,

        // Modal variables

        currentId:null,
        mobileName: '',
        brandName: '',
        created:null,
    }
  },
  components: {
    Modal
  },
    setup() {
        const modalActive = ref(false);
        const toggleModal = () => {
        modalActive.value = !modalActive.value;
        };
        return { modalActive, toggleModal };
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
    async getMobileDevice() {
    try {
    const url = '/api/'
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
    async takeAction(id, name, brand, created) {
        this.modalActive = true
        this.currentId = id
        this.mobileName = name
        this.brandName = brand 
        this.created = created
    },
    // Updating the Data
    async updateData(){
        try {
            const url = '/api/'
            await axios.put( url + 'model' + `/${this.currentId}`, 
                // { 
                //     headers: {"Content-type" : "application/json"}

                // },
                {   
                    // headers: {"Content-type" : "application/json"},
                    Name: this.mobileName,
                    BrandId: this.brandName,
                    Id: this.currentId,
                    Updated: new Date().toISOString(),
                    Created: this.created,
                }
                ).then(response => {
                    console.log(response)
                })
            } catch (err) {
                console.log(err)
        } 
        
        await this.getMobileDevice()
    },
    //Deleting the data
    async deleteData(){
        try {
            const url = '/api/'
            await axios.delete( url + 'model' + `/${this.currentId}`, 
                { 
                    headers: {"Content-type" : "application/json"}

                },
                ).then(response => {
                    console.log(response)
                })
            } catch (err) {
                console.log(err)
        } 
        await this.getMobileDevice()
    }
  }
};
</script>
<style scoped>

</style>