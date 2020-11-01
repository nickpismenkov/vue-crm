import Vue from 'vue';
import Vuelidate from 'vuelidate';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/Loader.vue';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import 'firebase/auth';
import 'firebase/database';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.component('Loader', Loader);

const firebaseConfig = {
  apiKey: 'AIzaSyBWerlwpNIdz0agr3o1DV7PEHF92CZlqvk',
  authDomain: 'vue-crm-ed81f.firebaseapp.com',
  databaseURL: 'https://vue-crm-ed81f.firebaseio.com',
  projectId: 'vue-crm-ed81f',
  storageBucket: 'vue-crm-ed81f.appspot.com',
  messagingSenderId: '106425230354',
  appId: '1:106425230354:web:b54276449bee8f4576e4cb',
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
