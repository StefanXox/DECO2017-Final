import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.css'
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/en'
import './assets/my_theme.scss'
import * as echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI, {locale});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')