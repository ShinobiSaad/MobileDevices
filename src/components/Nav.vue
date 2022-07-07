<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to= "{name:'home'}" >
      <img src="../assets/mobilelogo.png" alt="" width="30" height="30">
      Mobile Devices
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" :to= "{name:'MobileDevices'}" >
            Devices
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to= "{name:'MobileBrands'}" >
            Brands
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to= "{name:'MobileAddNew'}" >
            Add new
          </router-link>
        </li>
      </ul>
      <div class="d-flex" v-if="checkToken">
        <a class="navbar-item" >
          <button type="button" class="btn btn-outline-success fw-bold" @click="login">Log out</button>
        </a>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  data() {
    return {
      happy: false,
      token: null,
      showToken: false,
    }
  },
  computed : {
    checkToken() {
      if (this.token !== 'null') {
        return true 
      }
      return false
    }
  },
  async created(){
    this.token = localStorage.getItem("bearer_token")
    // await this.tokenGet();
  },
  methods : {
    async tokenGet(){
      // this.token = localStorage.getItem("bearer_token");
      console.log(typeof(this.token))
    },
    async login() {
      this.$store.dispatch('user/logoutUser')
    }
  }
}
</script>
<style scoped>
.navbar-nav > li{
  margin-left:50px;
}
.navbar{
  background-color: rgba(255, 255, 255, 0.815);
  backdrop-filter: blur(10px);
}
</style>