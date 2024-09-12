import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'

import { auth } from './firebase'
import { useAuthStore } from './store/auth'
import { useRouter } from 'vue-router'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'

// Mount vue app
// app.mount('#app')

let firstInit = false;

auth.onAuthStateChanged(async user => {
  console.log("user state changed")  
  console.log("current user", user)
  if(!firstInit) {
    // Create vue app
    const app = createApp(App)


    // Register plugins
    registerPlugins(app)

    // init user data and ability    
    if (user) {
      try{    
        let idToken = await user.getIdTokenResult(true);        
        let authStore = useAuthStore()
        authStore.user = { ... user, token: idToken.claims }
        //console.log("init res", res)
      }catch(e){
        console.log(e)
      }
      
    }else{
      //console.log("no user") go to login page
      //check if current page is login page

    }

    app.mount('#app')
    firstInit = true;
  }
})
