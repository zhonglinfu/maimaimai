<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for='(item,index) in goodsList' :key='item.id'>
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelect">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">

                                        <inputnumber :goodsId='item.id' :count="item.buycount" @goodsCountChange='getChangedGoods'></inputnumber>

                                    </td>
                                    <td width="104" align="left"> </td>
                                    <td width="54" align="center">
                                        <a @click='deleteGoods(index)'>删除</a>
                                    </td>
                                </tr>
                                <tr v-if='goodsList.length===0'>
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click='continueBuy'>继续购物</button>
                            <button class="submit" @click="gotoPay">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.shopInfo {
  display: flex;
  align-items: center;
}
</style>


<script>
import { getLocalGoods } from '../../common/localStorage.js'
import inputnumber from '../subcomponents/inputnumber.vue'
export default {
  components: {
    inputnumber
  },
  data() {
    return {
      goodsList: []
    }
  },
  created() {
    this.getGoodsListData()
  },
  computed: {
    // 获取总数量
    getTotalCount() {
      let totalCount = 0
      this.goodsList.forEach(item => {
        if (item.isSelect) {
        }
        totalCount += item.buycount
      })
      return totalCount
    },
    // 获取总价格
    getTotalAmount() {
      let totalAmount = 0
      this.goodsList.forEach(item => {
        if (item.isSelect) {
          totalAmount += item.buycount * item.sell_price
        }
      })
      return totalAmount
    }
  },
  methods: {
    getGoodsListData() {
        console.log(this,"this");
      const localGoods = getLocalGoods()
      // 获取对象中的KEY
      const keys = Object.keys(localGoods)
      if (keys.length === 0) {
        return
      }
      const url = `site/comment/getshopcargoods/${keys.join(',')}`
      this.$ajax.get(url).then(response => {
        response.data.message.forEach(item => {
          item.buycount = localGoods[item.id]
          item.isSelect = true
        })
        console.log(response.data.message)
        this.goodsList = response.data.message
      })
    },
    getChangedGoods(changeGoods) {
      this.goodsList.forEach(item => {
        if (item.id == changeGoods.goodsId) {
          item.buycount = changeGoods.count
        }
      })
      this.$store.commit('updateGoods', changeGoods)
    },
    deleteGoods(index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('deleteGoods', this.goodsList[index].id)
          this.goodsList.splice(index, 1)
        })
        .catch(() => {})
    },
    continueBuy() {
      this.$router.push({ path: './goodslist' })
    },
    gotoPay() {
      const ids = []
      this.goodsList.forEach(item => {
        if (item.isSelect) {
          ids.push(item.id)
        }
      })
      if (ids.length === 0) {
        this.$message({
          message: '购物车不能为空',
          type: 'warning'
        });
        return;
      }
        this.$router.push({path:'/order',query:{ids:ids.join(',')}});
    }
  }
}
</script>