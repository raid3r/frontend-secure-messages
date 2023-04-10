import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './components/HomePage.vue'
import ReadMessage from "@/components/ReadMessage";
import axios from "axios";

var app = createApp(App)
let myAxios = axios
myAxios.defaults.baseURL = 'https://localhost:7297'

const routes = [
    { path: '/', component: HomePage },
    { path: '/read/:code', component: ReadMessage }
]
const router = createRouter({ routes, history: createWebHistory('/') })



app
    .use({ axios: myAxios })
    .use(router)
    .mount('#app')
