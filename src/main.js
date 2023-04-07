import { createApp } from 'vue'
import App from './App.vue'



createApp(App).mount('#app')

import VueHtml2Canvas from 'vue-html2canvas';
 
App.use(VueHtml2Canvas);