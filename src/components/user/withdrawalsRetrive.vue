<template>
  <div id="withdrawalsRetrive">
    <div v-title :data-title="lang[lang.lang].en94"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b>
          <span>{{lang[lang.lang].en2}}：</span>
          <el-select v-model="search.trace" @change="init">
            <el-option :label="lang[lang.lang].en3" :value="'0'"></el-option>
            <el-option :label="lang[lang.lang].en4" :value="'1'"></el-option>
            <el-option :label="lang[lang.lang].en5" :value="'2'"></el-option>
          </el-select>
          <span style="margin-left: 30px;">{{lang[lang.lang].en6}}：</span>
          <el-input v-model="search.orderNumber"></el-input>
        </b>
        <b>
          <el-button @click="init">{{lang[lang.lang].en7}}</el-button>  
        </b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 0 10px;">
        <el-table-column prop="orderNumber" :label="lang[lang.lang].en6" align="center" width="240"></el-table-column>
        <el-table-column prop="money" :label="lang[lang.lang].en95" align="center" width="180"></el-table-column>
        <el-table-column prop="createTime" :label="lang[lang.lang].en9" align="center" width="180"></el-table-column>
        <el-table-column prop="remark" :label="lang[lang.lang].en92" align="center" width="180"></el-table-column>
        <el-table-column prop="trace" :label="lang[lang.lang].en14" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.trace==0?lang[lang.lang].en3:(scope.row.trace==1?lang[lang.lang].en4:lang[lang.lang].en5) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="lang[lang.lang].en15" align="center" width="180">
          <template slot-scope="scope">
            <a href="javascript:void(0);" v-if="scope.row.trace==1" @click="showTheWinup(scope.row)" style="color:#494232;font-size:12px;">{{lang[lang.lang].en16}}</a>
            <a href="javascript:void(0);" v-else @click="showTheWinup(scope.row)" style="color:#494232;font-size:12px;">{{lang[lang.lang].en17}}</a>
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
    <div class="winup listInfo" v-if="winup.isShow">
      <div style="max-height: 100%;overflow: auto;">
        <p><span>{{lang[lang.lang].en96}}</span><b @click="winupClose()">×</b></p>
        <ul>
          <li>
            <ol style="margin-top: -30px;">
              <li><!-- 編號 -->
                <p><span>{{lang[lang.lang].en19}}</span><b>{{winup.data.uid}}</b></p>
              </li>
              <li v-if="winup.data.type!=1||winup.data.activate!=1"><!-- 會員 -->
                <p><span>{{lang[lang.lang].en21}}</span><b>{{winup.data.type==0?lang[lang.lang].en22:lang[lang.lang].en23}}</b></p>
              </li>
              <li><!-- 中文姓名 -->
                <p><span>{{lang[lang.lang].en63}}</span><b>{{winup.data.compellation}}</b></p>
              </li>
              <li><!-- 英文姓名 -->
                <p><span>{{lang[lang.lang].en164}}</span><b>{{winup.data.EnglishName}}</b></p>
              </li>

              <li><!-- 電話號碼 -->
                <p><span>{{lang[lang.lang].en165}}</span><b>{{winup.data.phone}}</b></p>
              </li>
              <li><!-- 手機號 -->
                <p><span>{{lang[lang.lang].en20}}</span><b>{{winup.data.mobile}}</b></p>
              </li>

              <li>
                <p><span>{{lang[lang.lang].en69}}</span><b>{{winup.data.nickname}}</b></p>
              </li>
              <li v-if="winup.data.type!=1||winup.data.activate!=1"><!-- 激活狀態 -->
                <p><span>{{lang[lang.lang].en24}}</span><b>{{winup.data.activate==0?lang[lang.lang].en25:(winup.data.activate==1?lang[lang.lang].en26:lang[lang.lang].en27)}}</b></p>
              </li>
              <!-- <li>
                <p><span>{{lang[lang.lang].en28}}</span><b>{{nationalitysWin[winup.data.country]?nationalitysWin[winup.data.country][lang.lang]:nationalitysWin[winup.data.country]}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en29}}</span><b>{{nationalitys[winup.data.nationality]?nationalitys[winup.data.nationality][lang.lang]:nationalitys[winup.data.nationality]}}</b></p>
              </li> -->
              <li>
                <p><span>{{lang[lang.lang].en30}}</span><b>{{winup.data.money||0}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en31}}</span><b>{{winup.data.reward||0}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en32}}</span><b>{{winup.data.bonus||0}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en33}}</span><b>{{winup.data.identification}}</b></p>
              </li>
              <li style="width:100%;">
                <p style="width:100%;"><span>{{lang[lang.lang].en34}}</span><b><img style="width: 400px;" :src="winup.data.identificationPic"></b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en35}}</span><b>{{winup.data.seat}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en36}}</span><b>{{winup.data.address}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en37}}</span><b>{{winup.data.postal}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en38}}</span><b>{{winup.data.bankName}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en39}}</span><b>{{winup.data.bankAccount}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en40}}</span><b>{{winup.data.bankUser}}</b></p>
              </li>
              <li style="width:100%;">
                <p style="width:100%;"><span>{{lang[lang.lang].en41}}</span><b><img style="width:400px;" :src="winup.data.bankPic"></b></p>
              </li>
              <li style="width: 100%;"><p style=""><span style="">{{lang[lang.lang].en6}}</span><b>{{winup.data.orderNumber}}</b></p></li>
              <li style="width: 100%;"><p style=""><span style="">{{lang[lang.lang].en95}}</span><b>{{winup.data.money}}</b></p></li>
              <li style="width: 100%;"><p style=""><span style="">{{lang[lang.lang].en9}}</span><b>{{winup.data.createTime}}</b></p></li>
              <li style="width: 100%;"><p style=""><span style="">{{lang[lang.lang].en14}}</span><b>{{winup.data.trace==0?lang[lang.lang].en3:(winup.data.trace==1?lang[lang.lang].en4:lang[lang.lang].en5)}}</b></p></li>
              <li style="width: 100%;" v-if="winup.data.trace==1"><p style=""><span style="">{{lang[lang.lang].en92}}</span><b><el-input type="textarea" v-model="remark"></el-input></b></p></li>
              <li style="width: 100%;" v-else><p style=""><span style="">{{lang[lang.lang].en92}}</span><b>{{winup.data.remark}}</b></p></li>
            </ol>
          </li>
          <li style="text-align: center;">
            <div v-if="winup.data.trace==1">
              <a href="javascript:void(0);" @click="winupClose(winup.data.orderNumber,winup.data.uid)">{{lang[lang.lang].en42}}</a>
              <a href="javascript:void(0);" @click="winupClose(winup.data.orderNumber,winup.data.uid,1)" style="background: #868175;">{{lang[lang.lang].en43}}</a>
            </div>
            <div v-else>
              <a href="javascript:void(0);" @click="winupClose()" style="background: #868175;">{{lang[lang.lang].en44}}</a>
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
      return {
        lang: langJson,
        collapseAttr,
        nationalitysWin,
        nationalitys,
        userInfo,
        search:{
          no:1,
          size:10,
          trace:'1',
          orderNumber:""
        },
        record:0,
        tableData:[],
        winup:{
          isShow:false,
          data:""
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
        this.api(this, '/manager/withdrawals/retrive', this.search, res => {
          console.log(res);
          this.tableData = res.items;
          this.record = res.record;
        });
      },
      winupClose(orderNumber,uid,isNo){
        if(uid){
          this.winup.isShow = false;
          this.$confirm(isNo?this.lang[this.lang.lang].en110:this.lang[this.lang.lang].en111).then(_ => {
            this.api(this, '/manager/withdrawals/audit', {orderNumber,uid,trace:isNo?0:2,remark:this.remark}, res => {
              console.log(res);
              this.init();
              this.$message.success(isNo?this.lang[this.lang.lang].en45:this.lang[this.lang.lang].en46);
            });
          })
        }else{
          this.winup.isShow = false;
        }
      },
      showTheWinup(data){
        this.winup.isShow = true;
        this.winup.data = data;
        this.remark="";
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
