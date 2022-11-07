import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/main.css';
import 'vue-select/dist/vue-select.css';
import vueSelect from './helper/vueSelect';

axios.defaults.baseURL =
    import.meta.env.VITE_APP_BASE_URL;

const app = createApp(App);
app.use(router);
app.use(vueSelect);

app.mount('#app');