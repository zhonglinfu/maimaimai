<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div v-if='goods.goodsinfo' class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goods.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{ goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="small" :max='goods.goodsinfo.stock_quantity' :min="1" v-model="buyCount"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click='addToShopCart' class="add" ref="addToShopCartOffset">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" :class="isShowComment ? '':'selected'" @click="isShowComment=false">商品介绍</a>
                                        </li>
                                        <li>
                                            <a :class="isShowComment ? 'selected':''" @click="isShowComment=true" href="javascript:;">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="!isShowComment" class="tab-content entry" style="display: block;">

                                <div style="padding:5px" v-html="goods.goodsinfo.content"> </div>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="isShowComment" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="textareaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postComent" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length===0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList" :key='item.id'>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time |dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for='item in goods.hotgoodslist' :key='item.id'>
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFormat()}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div v-show="isShow" ref="animateDivRef" class="animateDiv" v-if="goods.imglist">
                <img :src="goods.imglist[0].original_path" alt="">
            </div>
        </transition>
    </div>

</template>
<style scoped>
@import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';
.animateDiv {
    width:50px;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
}
.animateDiv img {
    width: 100%;
    height: 100%;
}
</style>
<script>
// import axios from 'axios';
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'

import { Affix } from 'iview'
export default {
  components: {
    Affix
  },
  data() {
    return {
      goods: {},
      buyCount: 1,
      isShowComment: false,
      commentList: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      isShow:false,
      addToShopCartOffset:null,
      shopCartOffset:null,

    }
  },
  created() {
    this.getGoodsData()
    this.getCommentListData()
  },
  updated() {
    $(function() {
      $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })
    })
  },
  watch: {
    $route() {
      this.getGoodsData()
      console.log(this)
      this.getCommentListData()
    }
  },
  methods: {
    getGoodsData() {
      const url = `/site/goods/getgoodsinfo/${this.$route.params.goodsId}`
      this.$ajax.get(url).then(response => {
        this.goods = response.data.message;
        // 获取加入购物车dom 元素的偏移量
        setTimeout(()=>{
            this.addToShopCartOffset=$(this.$refs.addToShopCartOffset).offset();
            $(this.$refs.animateDivRef).css({
                top:this.addToShopCartOffset.top,
                left:this.addToShopCartOffset.left

            });
            this.shopCartOffset=$('#shoppingCartCount').offset();
        },200)
      })
    },
    getCommentListData() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      this.$ajax.get(url).then(response => {
          console.log(response,1234455556)
        this.commentList = response.data.message
        this.total = response.data.totalcount
        // console.log(response);
      })
    },
    handleSizeChange(pageSize) {
      this.pageIndex = 1
      this.pageSize = pageSize
      this.getCommentListData()
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.getCommentListData()
    },
    postComent() {
      const content = this.$refs.textareaRef.value
      if (content.trim().length === 0) {
        this.$message({
          message: '评论内容不能为空哦....',
          type: 'warning'
        })
        return
      }
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`
      this.$ajax.post(url, { commenttxt: content }).then(response => {
        this.$message({
          message: '恭喜你，评论成功',
          type: 'success'
        })
        this.$refs.textareaRef.value = ''
        this.pageIndex = 1
        this.getCommentListData()
      })
    },
    addToShopCart(){
        this.isShow=true;
        const goods={
            goodsId:this.$route.params.goodsId,
            count:this.buyCount

        };
        this.$store.commit('addGoods',goods);

    },
    beforeEnter(el){
        el.style.top=this.addToShopCartOffset.top;
        el.style.left=this.addToShopCartOffset.left+'px';
        el.style.transform='scale(1.0)';
    },
    enter(el,done){
        el.style.transition="all 2s";
        el.offsetHeight;
        el.style.top=this.shopCartOffset.top+"px";
        el.style.left=this.shopCartOffset.left+'px';
        el.style.transform="scale(0.4)";
        done();
       
    },
    afterEnter(){
        this.isShow=false;

    }
  }
}
</script>