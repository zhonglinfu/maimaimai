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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form :model="order" status-icon :rules="rules" ref="orderRef" label-width="100px">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input style="width:500px;" v-model="order.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="area">
                                        <V-distpicker style="width:500px;" :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value" @selected="onSelected"></V-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input style="width:500px;" v-model="order.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input style="width:500px;" v-model="order.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input style="width:500px;" v-model="order.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input style="width:500px;" v-model="order.post_code"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio-group v-model="order.express_id" @change='expresschange'>
                                            <el-radio label="1">顺丰快递
                                                <em>费用: 20.0 元</em>
                                            </el-radio>
                                            <el-radio label="2">圆通快递
                                                <em>费用: 10.0 元</em>
                                            </el-radio>
                                            <el-radio label="3">韵达快递
                                                <em>费用: 8.0 元</em>
                                            </el-radio>
                                        </el-radio-group>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key='item.id'>
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.buycount*item.sell_price}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" v-model="order.message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" @click='goback' >返回购物车</a>
                                        <a id="btnSubmit" @click='goToOrder' class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import { getLocalGoods } from '../../common/localStorage.js'

export default {
  components: { VDistpicker },
  data() {
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      if (/^1[3,5,8,7][0-9]{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号码不合法'))
      }
    }
    return {
      goodsList: [],
      totalCount: 0,
      totalPrice: 0,
      order: {
        accept_name: '李亚鹏',
        area: {
          // 所属区域
          province: {
            code: '440000',
            value: '广东省'
          },
          city: {
            code: '440300',
            value: '深圳市'
          },
          area: {
            code: '440306',
            value: '宝安区'
          }
        },
        address: '庭威402',
        mobile: '13833333333',
        email: 'liyapeng@163.com',
        post_code: '5180000',
        payment_id: '6',
        express_id: '1',
        expressMoment: 20,
        message:'请快点发货'
      },
      rules: {
        accept_name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        area: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getGoodsListData()
  },
  computed: {
    getTotalAmount() {
      return this.totalPrice + this.order.expressMoment
    }
  },
  methods: {
    getGoodsListData() {
      const localGoods = getLocalGoods();
      const tempObj={};
        this.order.goodsids=this.$route.query.ids;
      this.$ajax
        .get(`site/validate/order/getgoodslist/${this.$route.query.ids}`)
        .then(response => {
          response.data.message.forEach(item => {
            item.buycount = localGoods[item.id]

            tempObj[item.id]=item.buycount;
            this.totalCount += item.buycount
            this.totalPrice += item.sell_price * item.buycount
          })
          this.goodsList = response.data.message;
          this.order.goodsAmount=this.totalPrice;
          this.order.cargoodsobj=tempObj;
        });
    },
    onSelected(data) {
      this.order.area = data
    },
    expresschange(label) {
      switch (label) {
        case '1':
          this.order.expressMoment = 20
          break
        case '2':
          this.order.expressMoment = 10
          break
        case '3':
          this.order.expressMoment = 8
          break
        default:
          break
      }
      console.log(this.order.expressMoment)
    },
    goback() {
    //   this.$router.go(-1);
      this.$router.push({path:'/shopCart'});
    },
    goToOrder(){
        this.$refs.orderRef.validate((valid) => {
          if (!valid) {
              console.log('error submit!!');
            return false;
           
          } 
          this.$ajax.post('site/validate/order/setorder',this.order).then(response=>{
              console.log(response);
              console.log(this.order)
              if(response.data.status===0){
                  this.$router.push({path:'/pay',query:{orderid:response.data.message.orderid}});
                  console.log(this.$route.query,2222);
                  const idsArray=this.$route.query.ids.split(',');
                //   console.log(idsArray);
                  idsArray.forEach(id=>{
                      this.$store.commit('deleteGoods',id)
                  })


              }

          })

        });
    }

  }
}
</script>