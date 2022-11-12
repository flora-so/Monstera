import { createApp } from 'vue'
import './styles/reset.css'
import App from './App.vue'

const app = createApp(App)
app.config.unwrapInjectedRef = true;

app.mount('#app');