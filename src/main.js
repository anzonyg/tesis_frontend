import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'; // Cambia min.css por css
import 'bootstrap/dist/js/bootstrap.bundle.js'; // Añade el bundle de JavaScript para que funcione correctamente con Popper
import 'bootstrap-icons/font/bootstrap-icons.css'; // Esto sigue igual



const app = createApp(App)

app.use(router)

app.mount('#app')
