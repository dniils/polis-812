import { createApp } from 'vue'
import '../src/assets/style/main.scss'
import App from './App.vue'
import { store } from './store/index'
import router from './router'

createApp(App).use(router).use(store).mount('#app')
