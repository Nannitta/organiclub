import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// importar aqui el index de routes
import './global.css'

const app = createApp(App)

app.use(createPinia())
//app.use(routes) -> Importacion de arriba

app.mount('#app')
