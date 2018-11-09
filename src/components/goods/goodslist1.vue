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
                                <li v-for="item in goodsData.catelist" :key="item.id">
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
                                                <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{subitem.title}}</a>
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
                               <el-carousel :interval="3000" arrow="always" height="341px">
                                    <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                        <img :src="item.img_url">
                                    </el-carousel-item>
                                 </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goodsData.toplist" :key="item.id"> 
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
        <div class="section" v-for="item in goodsList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="subitem in item.level2catelist" :key="subitem.subcateid">{{subitem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="subitem in item.datas" :key='subitem.artID' >
                            <a href="#/site/goodsinfo/87" class="">
                                <div class="img-box">
                                    <img :src="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitem.sell_price}}</strong>
                                        <span>市场价：
                                            <s>{{subitem.sell_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .el-carousel-item img {
        width:100%;
        height:100%;
    }
</style>

<script>
    //导入发送请求
    import axios from 'axios'

    export default {
        data(){
            return {
                // 头部的数据
                goodsData:{},
                //商品列表数据
                goodsList:[]
            }
        },
        // created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
        created(){
            // 获取头部的数据
            this.getGoodsData()
            //获取商品列表数据
            this.getGoodsGroup()
        },
        methods:{
            getGoodsData(){
                const url = `http://47.106.148.205:8899/site/goods/gettopdata/goods`

                axios.get(url).then(response=>{
                    this.goodsData = response.data.message
                })
            },
            getGoodsGroup() {
                 const url = `http://47.106.148.205:8899/site/goods/getgoodsgroup`

                 axios.get(url).then(response => {
                     this.goodsList = response.data.message
                 })
            }
        }
    }
</script>
