import Vue from 'vue';
import Vuex from 'vuex';

import {addLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoods} from '../common/localStorage.js';
Vue.use(Vuex);
const store=new Vuex.Store({
    state:{
        buycount:0
    },
    getters:{
        getBuyCount(state){
            return state.buycount===0?getTotalCount():state.buycount
        }
    },
    mutations:{
        addGoods(state,goods){
            // state.buycount+=goods.count;
            state.buycount=addLocalGoods(goods);

        },
        updateGoods(state,goods){
            state.buycount=updateLocalGoods(goods);
        },
        deleteGoods(state,goodsId){
            state.buycount=deleteLocalGoods(goodsId);
        }
    }
});
// module.exports= store;
export default store;