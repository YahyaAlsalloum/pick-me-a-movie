import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//Emitter 
import mitt from "mitt";
const Emitter = mitt();
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css"
const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(store).use(vuetify).provide('Emitter',Emitter).use(router).mount('#app')
