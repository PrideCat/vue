import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios';
import VueQuillEditor from 'vue-quill-editor'
import VueChart from 'vue-chart-js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import "static/css/reset.css";
import App from './App';
import router from './router';
import {global, api} from 'static/js/Global.js';

// Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueChart);
Vue.use(VueQuillEditor);
Vue.config.productionTip = false;
// Vue.prototype.$axios = axios;
Vue.prototype.global = global;
Vue.prototype.api = api;
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
});

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  mounted() {
    if (!global.userInfo&&window.location.href.indexOf("/notify")==-1) this.$router.push('/');
  }
});
