<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <!-- <dzh-qrcode></dzh-qrcode> -->
                                <img id="imgLogo" :src="img_url" hidden>

                                <div id="container2">
                                    <canvas width="400" height="400"></canvas>
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
// import DZHQRCode from 'dzh-qrcode';
import '../../statics/site/erweima/qrcode.js'
export default {
  data() {
    return {
      orderInfo: {},
      img_url: '',
      setIntervalId:null
    }
  },
  created() {
    this.getOrderInfoData()
    this.img_url = require('../../statics/site/images/alipay.png');
    clearInterval(this.setIntervalId);
    this.task();
  },
  mounted() {
    //文字logo
    // $("#container").erweima({
    //     label: 'jQuery'
    // });

    //图片logo
    setTimeout(() => {
      $('#container2').erweima({
        mode: 4,
        mSize: 20,
        image: $('#imgLogo')[0],
        text:`http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.query.orderid}`
      })
    }, 200)
  },
  methods: {
      task(){
         this.setIntervalId= setInterval(()=>{
              this.getOrderInfoData();
          },3000)
      },
    getOrderInfoData() {
      this.$ajax
        .get(`site/validate/order/getorder/${this.$route.query.orderid}`)
        .then(response => {
            console.log(response);
            if(response.data.message[0].status===2){
                this.$router.push({path:'/paySuccess'})
            }
          this.orderInfo = response.data.message[0]
        })
    }
  },
  beforeDestroy(){
      clearInterval(this.setIntervalId);
  }
}
</script>
