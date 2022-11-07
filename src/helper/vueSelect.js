import vSelect from 'vue-select';

export default {
    install(app) {
        app.component('v-select', vSelect);
    },
};