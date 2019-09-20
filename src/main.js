import Vue from 'vue';
import { Lazyload, Toast } from 'vant';
import App from './App.vue';
import RouteTransition from '@/components/vue-route-transition';
import router from './router/router';
import store from './store/store';
import '@/less/index.less';

Vue.use(Lazyload, {});
Vue.use(Toast);
Vue.config.productionTip = false;
Vue.use(RouteTransition);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
