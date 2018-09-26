<template>
  <div>
    <div v-title data-title="電子錢包"></div>
    <div class="fromBox">
      <!-- <p class="form-title searchBox">
        <b>
          <span>交易日期：</span>
          <el-date-picker v-model="search.startDate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          <span style="margin: 0 5px;">到</span>
          <el-date-picker v-model="search.endDate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </b>
        <b>
          <el-input style="width: 300px;margin-left: 60px;" placeholder="输入您要搜索的内容"></el-input>
        </b>
        <b>
          <el-button @click="init">搜索</el-button>
        </b>
      </p> -->
      <div class="order">
        <!-- <ul class="o_head">
          <li>
            <p>購貨模式</p>
            <ol>
              <li>購貨模式</li>
            </ol>
          </li>
          <li>
            <p>收貨模式</p>
            <ol>
              <li>收貨模式</li>
            </ol>
          </li>
          <li>
            <p>付款模式</p>
            <ol>
              <li>付款模式</li>
            </ol>
          </li>
          <li>
            <p>我的訂單</p>
            <ol>
              <li>我的訂單</li>
            </ol>
          </li>
        </ul> -->
        <ul class="o_body">
          <li class="b_item" v-for="(item,index) in tableData" :key="index">
            <div class="i_head">
              <p>{{item.createTime.split(" ")[0]}}</p>
              <p>{{lang.lang=='cn'?'訂單編號':'Order Number'}}：{{item.orderNumber}}</p>
              <p>
                {{
                  lang.lang=='cn'?
                    (item.trace==0?
                      '失效':(
                        item.trace==1?
                        '待付款':(
                          item.trace==2?
                          '已付款':(
                            item.trace==3?
                            '已發貨':(
                              item.trace==4?
                              '已收貨':''
                            )
                          )
                        )
                      )
                    ):
                    (item.trace==0?
                      'Invalid':(
                        item.trace==1?
                        'Pending Payment':(
                          item.trace==2?
                          'Already Paid':(
                            item.trace==3?
                            'Shipped':(
                              item.trace==4?
                              'Received':''
                            )
                          )
                        )
                      )
                    )
                }}
              </p>
              <!-- <p>重消</p> -->
              <p style="cursor:pointer;" @click="remove(item.orderNumber)">X</p>
            </div>
            <div class="i_content">
              <div>
                <ol>
                  <li v-for="(items,indexs) in item.details" :key="indexs">
                    <div>
                      <p><img :src="items.pic"></p>
                      <p>{{items.name}}</p>
                    </div>
                    <div>
                      <p>hkd {{items.money}}</p>
                      <!-- <p>16 BV</p> -->
                    </div>
                    <div>X{{items.amount}}</div>
                  </li>
                </ol>
              </div>
              <div style="width:100%;">
                <p>HKD {{item.money}}</p>
                <a v-if="item.trace==1" href="javascript:void(0);" @click="showPay(item.money,item.orderNumber)">{{lang.lang=='cn'?'付款':'Payment'}}</a>
                <!-- <p>16 bv</p>
                <p>
                  <span>（含運費 HKD 0.00）</span>
                  <span>（含總稅 HKD 0.00）</span>
                </p>
                <p>
                  <span>EP3</span>
                  <span>物流運輸</span>
                </p>
                <p>
                  <a href="javascript:void(0);">查看發票</a>
                </p> -->
              </div>
            </div>
          </li>
          <!-- <li class="b_item">
            <div class="i_head">
              <p>2018-02-09</p>
              <p>訂單編號：SO20180209130935656CDY</p>
              <p>已簽收</p>
              <p>重消</p>
            </div>
            <div class="i_content">
              <div>
                <ol>
                  <li>
                    <div>
                      <p><img src="../../../static/img/avatar.png"></p>
                      <p>ONALAT 100% 純牛奶（125G）</p>
                    </div>
                    <div>
                      <p>hkd 498.00</p>
                      <p>16 BV</p>
                    </div>
                    <div>X1</div>
                  </li>
                  <li>
                    <div>
                      <p><img src="../../../static/img/avatar.png"></p>
                      <p>ONALAT 100% 純牛奶（125G）</p>
                    </div>
                    <div>
                      <p>hkd 498.00</p>
                      <p>16 BV</p>
                    </div>
                    <div>X1</div>
                  </li>
                </ol>
              </div>
              <div>
                <p>HKD 498.00</p>
                <p>16 bv</p>
                <p>
                  <span>（含運費 HKD 0.00）</span>
                  <span>（含總稅 HKD 0.00）</span>
                </p>
                <p>
                  <span>EP3</span>
                  <span>物流運輸</span>
                </p>
                <p>
                  <a href="javascript:void(0);">查看發票</a>
                </p>
                <p>
                  <b>
                    <a href="javascript:void(0);">確認發貨</a>
                  </b>
                </p>
              </div>
            </div>
          </li> -->
        </ul>
        <el-pagination :class="lang.lang" style="margin-top: 20px;text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.no" :page-sizes="[10, 20, 30, 40]" :page-size="search.size" :small="true" :layout="collapseAttr.paginationLayout" :total="record">
        </el-pagination>
      </div>
    </div>
    <div>
      <div :class="pis?'position':'position hide'">
        <div>
          <h3>
            {{lang.lang=='cn'?'請選擇您的支付方式':'Please choose your payment method'}}
            <i @click="pis=0">x</i>
          </h3>
          <div>
            <div class="payType">
              <span :class="epSwitch?'':'check'" @click="epSwitch=!epSwitch">EP1</span>
              <span :class="epSwitch?'check':''" @click="epSwitch=!epSwitch">EP2</span>
            </div>
            <div class="payTypeCheck">
              <span>{{lang.lang=='cn'?'支付方式':'payment method'}}：</span>
              <span>{{!epSwitch?'EP1':'EP2'}}</span>
            </div>
            <p>{{lang.lang=='cn'?'應付金額':'Amounts payable'}}：
              <span class="sum">${{total}}</span>
            </p>
            <div class="pwd">
              <p>{{lang.lang=='cn'?'請輸入您的支付密碼':'Please enter your payment password'}}：</p>
              <input type="password" v-model="password">
              <span @click="pay">{{lang.lang=='cn'?'確定':'determine'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "wallet",
  data() {
    const global = this.global,
      collapseAttr = global.collapseAttr,
      lang = global.lang,
      langJson = global.langJson.wallet,
      userInfo = global.userInfo;
    langJson.lang = lang;
    return {
      lang: langJson,
      collapseAttr,
      userInfo,
      search: {
        no: 1,
        size: 10
        // account: "0",
        // type: "0",
        // startDate: "2018-06-01",
        // endDate: "2018-06-30"
      },
      record: 2,
      tableData: [],

      pis:0,
      epSwitch:0,
      password:'',
      total:0,
      orderNumber:''
    };
  },
  methods: {
    showPay(money,orderNumber){
      this.pis=1;
      this.total=money;
      this.orderNumber=orderNumber;
    },
    pay(){
      this.api(this, "/commodity/order/pay", {
        payWay:this.epSwitch,
        orderNumber:this.orderNumber,
        password:this.password
      }, res => {
        console.log(res);
        this.pis=0;
        this.$message.success({message: this.lang.lang=='cn'?'付款成功':'Successful Payment'})
        this.init();
      });
    },
    handleSizeChange: function(val) {
      this.search.size = val;
      this.init();
    },
    handleCurrentChange: function(val) {
      this.search.no = val;
      this.init();
    },
    init() {
      this.api(this, "/commodity/order/retrive", this.search, res => {
        console.log(res);
        this.tableData = res.items;
        this.record = res.record;
      });
    },
    remove(orderNumber) {
      this.$confirm(
        this.lang.lang == "cn" ? "是否取消該訂單?" : "Can I cancel the order?",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.api(this, "/commodity/order/cancel", { orderNumber }, res => {
          console.log(res);
          this.init();
        });
      });
    }
  },
  mounted() {
    this.init();
    $(".order .o_head>li").click(function() {
      $(this)[$(this).hasClass("active") ? "removeClass" : "addClass"](
        "active"
      );
    });
  },
  created() {
    this.$root.$on("selectLang", res => {
      this.lang.lang = res;
    });
  }
};
</script>

<style scoped>
.order .o_head {
  display: flex;
  justify-content: space-between;
  background: #f2f2f2;
  font-size: 14px;
  color: #333;
  padding: 15px 20px;
}
.order .o_head > li {
  position: relative;
}
.order .o_head > li p {
  cursor: pointer;
}
.order .o_head > li p:after {
  content: "";
  border-top: 4px solid #000;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  display: inline-block;
  transform: rotate(-45deg);
  margin-left: 10px;
}
.order .o_head > li ol {
  position: absolute;
  display: none;
  background: #fff;
  border: 1px solid #ccc;
  width: 84px;
  top: 35px;
  left: -15px;
}
.order .o_head > li.active ol {
  display: block;
}
.order .o_head > li ol li {
  padding: 10px;
  margin: 0 -1px;
  position: relative;
  text-align: center;
}
.order .o_head > li ol li:nth-child(n + 2) {
  border-top: 1px solid #f1f1f1;
}
.order .o_head > li ol li:hover {
  background: #494232;
  cursor: pointer;
  color: #fff;
}
.order .o_body {
  font-size: 14px;
}
.order .o_body .b_item {
  border: 1px solid #ccc;
  margin: 20px 0;
}
.order .o_body .b_item .i_head {
  display: flex;
  justify-content: space-between;
  background: #f2f2f2;
  padding: 12px 20px;
}
.order .o_body .b_item .i_content {
  display: flex;
}
.order .o_body .b_item .i_content > div > ol > li {
  display: flex;
  height: 160px;
}
.order .o_body .b_item .i_content > div > ol > li:nth-child(n + 2) {
  border-top: 1px solid #ccc;
}
.order .o_body .b_item .i_content > div > ol > li > div {
  border-right: 1px solid #ccc;
}
.order .o_body .b_item .i_content > div > ol > li > div:first-child {
  display: flex;
  width: 400px;
  align-items: center;
}
.order .o_body .b_item .i_content > div > ol > li > div:first-child img {
  width: 90px;
  height: 90px;
  margin: 0 20px;
}
.order .o_body .b_item .i_content > div > ol > li > div:first-child p {
  line-height: 20px;
}
.order .o_body .b_item .i_content > div > ol > li > div:nth-child(2) {
  display: flex;
  flex-direction: column;
}
.order .o_body .b_item .i_content > div > ol > li > div:nth-child(2) p {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.order .o_body .b_item .i_content > div > ol > li > div:nth-child(2) p + p {
  border-top: 1px solid #ccc;
}
.order .o_body .b_item .i_content > div > ol > li > div:nth-child(3) {
  display: flex;
  align-items: center;
  justify-content: center;
}
.order .o_body .b_item .i_content > div > ol > li > div:nth-child(n + 2) {
  width: 125px;
  color: #999;
}
.order .o_body .b_item .i_content > div:last-child {
  text-align: center;
  color: #999;
  line-height: 25px;
  padding: 20px 0 0;
}
.order .o_body .b_item .i_content > div:last-child p:first-child {
  color: #333;
}
.order .o_body .b_item .i_content > div:last-child p a {
  color: #5da4e5;
}
.order .o_body .b_item .i_content > div:last-child p b {
  background: #494232;
  padding: 7px 15px;
  margin: 10px 0;
  display: inline-block;
}
.order .o_body .b_item .i_content > div:last-child p b a {
  color: #fff;
  text-decoration: initial;
}

.position {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #00000021;
  display: flex;
  align-items: center;
  justify-content: center;
}
.position > div {
  background: #fff;
  width: 500px;
  border: 1px solid #ddd;
  font-size: 16px;
}
.position > div > h3 {
  background: #4ca9cd;
  color: #fff;
  padding: 10px 0;
  text-indent: 15px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.position > div > h3 > i {
  width: 15px;
  height: 15px;
  margin-right: 20px;
  background-size: 100%;
  cursor: pointer;
}
.position > div > div {
  padding: 20px;
  box-sizing: border-box;
}
.position > div > div > * {
  margin-bottom: 30px;
}
.payType {
  display: flex;
  align-items: center;
}
.payType > span {
  margin-right: 80px;
  cursor: pointer;
}
.payType > .check {
  color: #4ca9cd;
  font-weight: 600;
  border-bottom: 2px solid;
}
.payTypeCheck {
  display: flex;
  align-items: center;
}
.payTypeCheck > span:nth-child(2) {
  width: 80px;
  height: 31px;
  text-align: center;
  line-height: 31px;
  border: 1px solid #4ca9ce;
  box-sizing: border-box;
  background-size: 20px;
  background-position: 100% 100%;
}
.sum {
  font-size: 20px;
  color: #e94545;
}
.pwd {
  display: flex;
  align-items: center;
}
.pwd > input {
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 200px;
  outline: medium;
  height: 30px;
  font-size: 20px;
}
.pwd > span:last-child {
  background: #4ca9cd;
  color: #fff;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  margin-left: auto;
  margin-right: 0;
  cursor: pointer;
}
.hide {
  display: none !important;
}
.button {
  display: flex;
  justify-content: center;
}
.button span {
  width: 35%;
  text-align: center;
  border: 1px solid #4ca9cd;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background: #4ca9cd;
  cursor: pointer;
}
.button span:first-child {
  margin-right: 20px;
  background: #fff;
  color: #4ca9cd;
}
</style>
