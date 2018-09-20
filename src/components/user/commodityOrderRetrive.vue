<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en144"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b>
          <span>{{lang[lang.lang].en6}}：</span>
          <el-input v-model="search.orderNumber" @input="init"></el-input>
        </b>
        <b>
          <span>{{lang[lang.lang].en62}}：</span>
          <el-input v-model="search.uid" @input="init"></el-input>
        </b>
        <b>
          <span>{{lang[lang.lang].en2}}：</span>
          <el-select v-model="search.trace" @change="init">
            <el-option :label="lang[lang.lang].en3" :value="'0'"></el-option>
            <el-option :label="lang[lang.lang].en127" :value="'1'"></el-option>
            <el-option :label="lang[lang.lang].en128" :value="'2'"></el-option>
            <el-option :label="lang[lang.lang].en129" :value="'3'"></el-option>
            <el-option :label="lang[lang.lang].en130" :value="'4'"></el-option>
          </el-select>
        </b>
        <b>
          <span>{{lang[lang.lang].en9}}：</span>
          <el-date-picker style="width: 135px;" v-model="search.startDate" type="date" @change="init"></el-date-picker>
          <span style="margin: 0 5px;">{{lang[lang.lang].en49}}</span>
          <el-date-picker style="width: 135px;" v-model="search.endDate" type="date" @change="init"></el-date-picker>
        </b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 10px 10px 0;">
        <el-table-column prop="orderNumber" :label="lang[lang.lang].en6" align="center"></el-table-column>
        <el-table-column prop="uid" :label="lang[lang.lang].en62" align="center"></el-table-column>
        <el-table-column prop="money" :label="lang[lang.lang].en90" align="center"></el-table-column>
        <el-table-column prop="createTime" :label="lang[lang.lang].en9" align="center" width="100"></el-table-column>
        <el-table-column prop="trace" :label="lang[lang.lang].en2" align="center">
          <template slot-scope="scope">
            {{scope.row.trace==0?lang[lang.lang].en3:(scope.row.trace==1?lang[lang.lang].en127:(scope.row.trace==2?lang[lang.lang].en128:(scope.row.trace==3?lang[lang.lang].en129:lang[lang.lang].en130)))}}
          </template>
        </el-table-column>

        <el-table-column :label="lang[lang.lang].en15" align="center">
          <template slot-scope="scope">
            <a v-if="scope.row.trace==2" @click="showTheWinup(scope.row.orderNumber)" href="javascript:void(0);" style="color:#4CAF50;font-size:12px;text-decoration: initial;margin: 0 5px;">{{lang[lang.lang].en131}}</a>
            <a v-else @click="showTheWinup(scope.row.orderNumber)" href="javascript:void(0);" style="color:#73b2ff;font-size:12px;text-decoration: initial;margin: 0 5px;">{{lang[lang.lang].en17}}</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :class="lang.lang" class="white" style="margin-top: 20px;text-align: center;"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page="search.no"
                   :page-sizes="[10, 20, 30, 40]" :page-size="search.size"
                   :small="true"
                   :layout="collapseAttr.paginationLayout"
                   :total="record">
      </el-pagination>
    </div>
    <div class="winup" v-if="winup.isShow">
      <div style="max-height: 100%;overflow: auto;">
        <p><span>{{lang[lang.lang].en141}}</span><b @click="winupClose()">×</b></p>
        <ul>
          <li>
            <ol style="margin-top: -30px;">
              <li><p><span>{{lang[lang.lang].en6}}</span><b>{{winup.data.data.orderNumber}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en9}}</span><b>{{winup.data.data.createTime}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en90}}</span><b>{{winup.data.data.money}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en2}}</span><b>{{winup.data.data.trace==0?lang[lang.lang].en3:(winup.data.data.trace==1?lang[lang.lang].en127:(winup.data.data.trace==2?lang[lang.lang].en128:(winup.data.data.trace==3?lang[lang.lang].en129:lang[lang.lang].en130)))}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en92}}</span><b>{{winup.data.data.remark}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en132}}</span><b>{{winup.data.data.payTime}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en133}}</span><b>{{winup.data.data.deliveryTime}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en134}}</span><b>{{winup.data.data.overdueTime}}</b></p></li>
              <li>
                <p>
                  <span>{{lang[lang.lang].en135}}</span>
                  <b v-if="winup.data.data.trace==2"><el-input v-model="winup.data.data.logistics"></el-input></b>
                  <b v-else>{{winup.data.data.logistics}}</b>
                </p>
              </li>
              <li><p><span>{{lang[lang.lang].en62}}</span><b>{{winup.data.data.uid}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en136}}</span><b>{{winup.data.data.address}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en20}}</span><b>{{winup.data.data.mobile}}</b></p></li>
              <li><p><span>{{lang[lang.lang].en137}}</span><b>{{winup.data.data.contact}}</b></p></li>
              <li style="width: 100%;" v-if="winup.data.detail.length">
                <el-table :class="lang.lang=='en'?'langIsEn':''" :data="winup.data.detail" border style="width: calc(100% - 20px);margin: 10px 10px 0;">
                  <!-- <el-table-column prop="name" :label="lang[lang.lang].en6" align="center"></el-table-column> -->
                  <el-table-column prop="name" :label="lang[lang.lang].en138" align="center"></el-table-column>
                  <el-table-column prop="pic" :label="lang[lang.lang].en121" align="center">
                    <template slot-scope="scope"><img width="50" height="50" :src="scope.row.pic"></template>
                  </el-table-column>
                  <el-table-column prop="amount" :label="lang[lang.lang].en139" align="center"></el-table-column>
                  <el-table-column prop="money" :label="lang[lang.lang].en140" align="center"></el-table-column>
                </el-table>
              </li>
            </ol>
          </li>
          <li style="text-align: center;">
            <div>
              <a v-if="winup.data.data.trace==2" href="javascript:void(0);" @click="winupClose(winup.data.data.orderNumber,winup.data.data.logistics)">{{lang[lang.lang].en131}}</a>
              <a v-else href="javascript:void(0);" @click="winupClose()">{{lang[lang.lang].en44}}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "withhdrawalsRetrive",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.wallet,
        nationalitysWin = global.nationalitysWin,
        nationalitys = global.nationalitys,
        userInfo = global.userInfo;
      langJson.lang = lang;
      let mDate = new Date(),mYear,mMonth,mDay;
      mDate.setDate(0);
      mDate.setMonth(mDate.getMonth()+1);
      mYear = mDate.getFullYear();
      mMonth = mDate.getMonth()+1;
      mMonth = mMonth<10?`0${mMonth}`:mMonth;
      mDay = mDate.getDate();
      return {
        lang: langJson,
        collapseAttr,
        nationalitysWin,
        nationalitys,
        userInfo,
        genre:[],
        search:{
          trace: "2",
          orderNumber: "",
          uid: "",
          startDate:`${mYear}-${mMonth}-01`,
          endDate:`${mYear}-${mMonth}-${mDay}`,
          no: 1, 
          size: 10
        },
        record:1,
        tableData:[],
        winup:{
          isShow:false,
          data:{}
        },
        remark:""
      };
    },
    methods: {
      handleSizeChange: function (val) {
        this.search.size = val;
        this.init();
      },
      handleCurrentChange: function (val) {
        this.search.no = val;
        this.init();
      },
      init(){
        this.api(this, '/manager/commodity/order/retrive', this.search, res => {
          console.log(res);
          this.tableData = res.items;
          this.record = res.record;
        });
      },
      winupClose(orderNumber,logistics){
        this.winup.isShow=false;
        if(orderNumber){
          console.log(orderNumber,logistics);
          this.$confirm(this.lang[this.lang.lang].en142).then(_ => {
            this.api(this, '/manager/commodity/order/delivery', {orderNumber,logistics}, res => {
              console.log(res);
              this.$message.success(this.lang[this.lang.lang].en143);
            });
          });
        }
      },
      showTheWinup(orderNumber){
        this.api(this, '/manager/commodity/order/msg', {orderNumber}, res => {
          console.log(res);
          this.winup.data = res;
          this.winup.isShow = true;
        },"",1);
      }
    },
    mounted(){
      this.init();
    },
    created(){
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
      })
    }
  }
</script>

<style scoped>
  .winup>div ul{max-height: 500px;overflow: auto;padding: 0 20px;}
  .winup>div ul>li{width: 100%;}
  .winup>div>ul>li:first-child ol{text-align:center;padding:30px 0;line-height:40px;flex-wrap: wrap;display: flex;}
  .winup>div>ul>li:first-child ol li{display: flex;width:50%;}
  .winup>div>ul>li:first-child ol li p{display: flex;}
  .winup>div>ul>li:first-child ol li p span{margin-right: 30px;color: #999;width: 180px;text-align: right;}
  .winup>div>ul>li:first-child ol li p b{font-size: 16px;}
  .winup>div>ul>li:nth-child(2){margin-top:-30px;font-size:12px;color:#999;cursor: pointer;}
  .winup>div ul li a{width: 100px;display: inline-block;margin: 0 20px 20px;}
</style>
