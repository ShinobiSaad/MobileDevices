import { createStore, createLogger } from 'vuex'
import { URL_OF_API } from '../api/main-api.js'
import axios from 'axios'

const user = {
  namespaced: true,
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
        const url = URL_OF_API
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
} 


export default createStore({
  plugins: [createLogger()],
  state: {},
  mutations: {},
  actions: {},
  modules: { user }
})
