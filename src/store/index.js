import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: {},
    bearer_token: localStorage.getItem('bearer_token') || null,
  },
  getters: {
  },
  mutations: {
    destroyToken(state) {
      state.bearer_token = null;
      localStorage.setItem('bearer_token', 'null')
      window.location.replace("/")
    },
  },
  actions: {
    //Log in User
    loginUser( {}, user ) {
      try {
        const url = '/api/'
        axios.post(url+'login', {
          email: user.email,
          password: user.password
        }).then( response => {
          if (response.data) {
           
            //storing the access token in local storage
  
            localStorage.setItem(
              "bearer_token",
              response.data
            )
            console.log(response.data)
            window.location.replace("/mobiledevices")
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    
    //Log out user
    logoutUser(context) {
        context.commit('destroyToken');  
    },

    //Check if token available before login
    checkUser() {
      if (this.state.bearer_token !== 'null') {
        try {
          window.location.replace("/mobiledevices")
        } catch (error) {
          console.log(error)
        }

      }
    },
  },
  modules: {
  }
})
