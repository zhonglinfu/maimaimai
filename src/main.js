import Vue from 'vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import 'vue-resource';
import 
{ Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Row,
  Col }
 from 'element-ui';
 Vue.use(Carousel);
 Vue.use(CarouselItem);
 Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
 Vue.use(Pagination)
 Vue.use(InputNumber)
 Vue.use(Form)
 Vue.use(FormItem)
 Vue.use(Radio)
 Vue.use(RadioGroup)
 Vue.use(Input)
 Vue.use(Switch)
 Vue.use(Row)
 Vue.use(Col)
 Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// Vue.use(ElementUI);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
    // error:'./static/error.png',
    loading:require('./statics/site/images/01.gif')
})

import './filters';
import App from "./App.vue";
// console.log(111);
import "./statics/site/css/style.css";
Vue.config.productionTip = false;
console.log(111);
console.log(222)
import router from './router/index.js';
import store from './store/index.js'
const hh=new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
console.log(hh,"new Vue");
console.log(Vue,'Vue1')