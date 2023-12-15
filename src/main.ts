import { createApp } from 'vue'
import '../src/assets/style/main.scss'
import App from './App.vue'
import { store } from './store/index'

createApp(App).use(store).mount('#app')
