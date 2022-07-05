<template>


      <div class="card p-3" style="border-radius:15px; margin-top:-10vh" v-if="token !== 'null' && mobileBrands.length">
        <table class="table">
          <thead>
            <tr v-for="th in tableHeaders" :key=th.id>
              <th>{{ th.text }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list,index) in tableData" :key="list.id">
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
              <td> 
                 {{ list.ShopId }}
              </td>
              <td> {{ list.Created }} </td>
              <td> {{ list.Updated }} </td>
            </tr>
          </tbody>
        </table>
      </div> 


</template>
<script>
import axios from "axios"
export default {
  props: {
    entries: Array,
    columns: Array
  },
  data() {
    return {
        perPage: 100,
        currentPage: 1,
        happy : false,
        mobileBrands: [],
        mobileDevice: [],
        token: null,
    }
  },
  computed:{
    tableData() {
        return this.entries || []
    },
    tableHeaders() {
        return this.columns || []
    },
  },
  async created() {
    this.token = localStorage.getItem("bearer_token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('bearer_token')}`
    
    document.body.style.backgroundColor = "#42c9db";

    await this.getMobileBrands();
    // await this.getMobileDevice();
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
        })
        console.log('All the mobile devices = ', this.mobileDevice)
    } catch (err) {
        console.log(err)
    }
    },
  }
};
</script>
<style scoped>
</style>