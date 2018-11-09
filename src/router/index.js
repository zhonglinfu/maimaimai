import Vue from 'vue';
import axios from 'axios';
axios.defaults.baseURL=`http://47.106.148.205:8899`;
// 允许携带cookie
axios.defaults.withCredentials = true;
Vue.prototype.$ajax=axios;
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// import goodslist from '../components/goods/goodslist.vue';
// import goodsinfo from '../components/goods/goodsinfo.vue';
// import shopCart from '../components/shopCart/shopcart.vue';
// import order from'../components/order/orderpay.vue';
// import login from '../components/login/login.vue';
// import payorder from '../components/pay/payorder.vue';
// import paysuccess from '../components/pay/paysuccess.vue';
// import vipcenter from '../components/vip/vipcenter.vue';
// import orderlist from '../components/vip/myorders.vue';
// import orderinfo from '../components/vip/orderinfo.vue';


const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue');
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue');
const shopCart = () => import(/* webpackChunkName: "shopCart" */ '../components/shopCart/shopcart.vue');
const order = () => import(/* webpackChunkName: "order" */ '../components/order/orderpay.vue');
const login = () => import(/* webpackChunkName: "login" */ '../components/login/login.vue');
const payorder = () => import(/* webpackChunkName: "payorder" */ '../components/pay/payorder.vue');
const paysuccess = () => import(/* webpackChunkName: "paysuccess" */ '../components/pay/paysuccess.vue');
const vipcenter = () => import(/* webpackChunkName: "vipcenter" */ '../components/vip/vipcenter.vue');
const orderlist = () => import(/* webpackChunkName: "orderlist" */ '../components/vip/myorders.vue');
const orderinfo = () => import(/* webpackChunkName: "orderinfo" */ '../components/vip/orderinfo.vue');


const router =new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {
        path:'/goodslist',component:goodslist
    },
    {path:'/goodsinfo/:goodsId',component:goodsinfo},
    {path:'/shopcart',component:shopCart},
    {path:'/login',component:login},
    {path:'/order',component:order,meta:{checkLogin:true}},
    {path:'/pay',component:payorder,meta:{checkLogin:true}},
    {path:'/paysuccess',component:paysuccess,meta:{checkLogin:true}},
    {path:'/vip',component:vipcenter,meta:{checkLogin:true}},
    {path:'/orderlist',component:orderlist,meta:{checkLogin:true}},
    {path:'/orderinfo',component:orderinfo,meta:{checkLogin:true}},
]
});
router.beforeEach((to,from,next)=>{
    console.log(from,"from")
    console.log(to,'to');
    if(to.path!=='/login'){
        localStorage.setItem('wantVisit',to.fullPath);
    }
    if(to.meta.checkLogin){
        axios.get('site/account/islogin/').then(response=>{
            if(response.data.code==='logined'){
                next();
            }else{
                router.push({path:'/login'})
            }
        })
    }else {
        next();
    }
})
export default router;
