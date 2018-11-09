<template>
     <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
                                      <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodsdata.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}&nbsp;
                                            </span>
                                           
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html"> {{subitem.title}}</a>
                                               
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                         
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel :interval="2000" arrow="always">
                                    <el-carousel-item v-for="item in goodsdata.sliderlist" :key="item.id">
                                    <img :src="item.img_url"> 
                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goodsdata.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | dateFormat}}</span>
                                </div>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="item in goodsList" class="section" :key="item.id">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="setitem in item.level2catelist" href="/goods/43.html"  :key='setitem.subcateid'>{{setitem.subcatetitle}}</a>
                   
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="setitem in item.datas" :key="setitem.artID" >
                            <router-link :to="'/goodsinfo/'+setitem.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="setitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{setitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{setitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{setitem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{setitem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    
                    </ul>
                </div>
            </div>
        </div>
     
    </div>
    
</template>
<style scoped>
    .el-carousel__item img {
        width:100%;
        height:100%;
    }
</style>
<script>
    // import axios from 'axios';
    export default {
        data(){
            return {
                goodsdata:{},
                goodsList:[]
            }
        },
        created(){
            this.getGoodsData();
            this.getGoodsList();

        },
        methods:{
            
            getGoodsData(){
                const url = `/site/goods/gettopdata/goods`;
                this.$ajax.get(url,).then(response=>{
                    this.goodsdata=response.data.message;
                })
            },
            getGoodsList(){
                 const url = `/site/goods/getgoodsgroup`;
                this.$ajax.get(url).then(response=>{
                    this.goodsList=response.data.message
                })
            }
        }
    }
</script>