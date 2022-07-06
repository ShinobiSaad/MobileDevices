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
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Deleted</th>
              <th scope="col">Created</th>
              <th scope="col">Updated</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="list in dataVarr" :key="list.id">
            <th> {{ list.Id }} </th>
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

      <!-- Pagination Buttons -->
      <div class="d-flex align-items-center row" v-if="token !== 'null' && dataVarr.length">
        <div class="col" style="margin-top:-2vh; margin-left:2vw;">
          <label class="form-label fw-bold" style="float:left; margin-right:2vw; color:#fff;">Total data per page:</label>
          <select class="form-select d-inline-block" aria-label="Default select example" style="width:20%;float:left;margin-right:10vw" v-model="pageN" v-on:change="changePage()">
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

      <nav aria-label="Page navigation example" class="d-inline-block col" v-if="token !== 'null' && dataVarr.length">
        <ul class="pagination ">
          <li class="page-item"><button class="page-link fw-bold" :disabled="showPrevButton == false" @click="goToPrev()">Previous</button></li>
          <li class="page-item"><button class="page-link fw-bold" :disabled="showNextButton == false" @click="goToNext()">Next</button></li>
        </ul>
      </nav>
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
import { URL_OF_API } from '../api/main-api.js'
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

        //pagination variables
        
        dataVarr:[], //filtered array of mobile devices
        page:'', //How many pages after paggination
        showNextButton:false, //buton show
        showPrevButton:false, //buton show
        pageNum:1, //Start Page
        pageN:7, //Data Per page
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
            // this.mobileDevice = this.mobileDevice.slice(1,100)
        })
        console.log('All the mobile devices = ', this.mobileDevice)
    } catch (err) {
        console.log(err)
    }
    this.page = Math.ceil(this.mobileDevice.length/this.pageN)
    await this.Pagination();
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
            const url = URL_OF_API
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
            const url = URL_OF_API
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
    },
    async Pagination(){
                console.log('paggination',this.pageNum, this.page, this.mobileDevice.length);
                this.showNextButton= false
                this.showPrevButton= false
                if (this.page>1) {
                    if (this.pageNum==1) {
                        this.showNextButton=true
                        this.dataVarr=[]

                        for (let i = 0; i < this.pageN; i++) {
                            this.dataVarr.push(this.mobileDevice[i])
                        }
                    }
                    else if (this.pageNum==this.page) {
                        this.showPrevButton=true
                        this.dataVarr=[]

                        for (let i = this.pageN*(this.pageNum-1); i < this.mobileDevice.length; i++) {
                            this.dataVarr.push(this.mobileDevice[i])
                        }
                    }
                    else{
                        this.showNextButton= true
                        this.showPrevButton= true
                        this.dataVarr=[]

                        for (let i = this.pageN*(this.pageNum-1); i < (this.pageNum*this.pageN); i++) {
                            this.dataVarr.push(this.mobileDevice[i])
                        }
                    }
                }
                else{
                    this.dataVarr=this.mobileDevice;
                }
            },

          async goToPrev(){
            this.pageNum--
            await this.Pagination()
          },
          async goToNext(){
            this.pageNum++
            await this.Pagination()
          },
          async changePage(){
            await this.Pagination()
          }
  }
};
</script>
<style scoped>

</style>