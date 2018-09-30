<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en80"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b>
          <span>{{lang[lang.lang].en21}}</span>
          <el-select v-model="search.type">
            <el-option :label="lang[lang.lang].Recharge" :value="'1'"></el-option>
            <el-option :label="lang[lang.lang].en81" :value="'2'"></el-option>
            <el-option :label="lang[lang.lang].en82" :value="'3'"></el-option>
            <el-option :label="lang[lang.lang].en83" :value="'4'"></el-option>
            <el-option :label="lang[lang.lang].en84" :value="'5'"></el-option>
          </el-select>  
        </b>
        <b>
          <span>{{lang[lang.lang].en85}}</span>
          <el-select v-model="search.account">
            <el-option :label="lang[lang.lang].en76" :value="'0'"></el-option>
            <el-option :label="lang[lang.lang].en86" :value="'1'"></el-option>
            <el-option :label="lang[lang.lang].en87" :value="'2'"></el-option>
          </el-select>
        </b>
        <b>
          <span>{{lang[lang.lang].en88}}</span>
          <el-date-picker v-model="search.startDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;"></el-date-picker>
          <span style="margin: 0 5px;">{{lang[lang.lang].en49}}</span>
          <el-date-picker v-model="search.endDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;"></el-date-picker>
        </b>
        <b>
          <el-button @click="init">{{lang[lang.lang].en7}}</el-button>  
        </b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 0 10px;">
        <el-table-column prop="uid" :label="lang[lang.lang].en62" align="center" width="180"></el-table-column>
        <el-table-column prop="createTime" :label="lang[lang.lang].en48" align="center" width="180"></el-table-column>
        <el-table-column prop="type" :label="lang[lang.lang].en89" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.type==1?lang[lang.lang].Recharge:(scope.row.type==2?lang[lang.lang].en81:(scope.row.type==3?lang[lang.lang].en82:(scope.row.type==4?lang[lang.lang].en83:(scope.row.type==5?lang[lang.lang].en84:'')))) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" :label="lang[lang.lang].en90" align="center" width="180"></el-table-column>
        <el-table-column prop="balance" :label="lang[lang.lang].en91" align="center" width="180"></el-table-column>
        <el-table-column prop="remark" :label="lang[lang.lang].en92" align="center" width="180"></el-table-column>
        <el-table-column :label="lang[lang.lang].en15" align="center" width="180">
          <template slot-scope="scope">
            <a href="javascript:void(0);" @click="showTheWinup(scope.row)" style="color: #494232;font-size: 12px;">{{lang[lang.lang].en17}}</a>
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
      <div>
        <p><span>{{lang[lang.lang].en93}}</span><b @click="winupClose">×</b></p>
        <ul>
          <li>
            <table>
              <tbody>
                <tr><td>{{lang[lang.lang].en62}}</td><td>{{winup.data.uid}}</td></tr>
                <tr><td>{{lang[lang.lang].en48}}</td><td>{{winup.data.createTime}}</td></tr>
                <tr><td>{{lang[lang.lang].en89}}</td><td>{{winup.data.type==0?lang[lang.lang].Recharge:(winup.data.type==1?lang[lang.lang].en81:lang[lang.lang].en82)}}</td></tr>
                <tr><td>{{lang[lang.lang].en90}}</td><td>{{winup.data.money}}</td></tr>
                <tr><td>{{lang[lang.lang].en91}}</td><td>{{winup.data.balance}}</td></tr>
                <tr><td>{{lang[lang.lang].en92}}</td><td>{{winup.data.remark}}</td></tr>
              </tbody>
            </table>
          </li>
          <li><a href="javascript:void(0);" @click="winupClose">{{lang[lang.lang].en60}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "wallet",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.wallet,
        userInfo = global.userInfo;
      langJson.lang = lang;
      let mDate = new Date(),mYear,mMonth,mDay;
      mDate.setMonth(mDate.getMonth()+1);
      mDate.setDate(0);
      mYear = mDate.getFullYear();
      mMonth = mDate.getMonth()+1;
      mMonth = mMonth<10?`0${mMonth}`:mMonth;
      mDay = mDate.getDate();
      mDay = mDay>10?mDay:`0${mDay}`;
      return {
        lang: langJson,
        collapseAttr,
        userInfo,
        search:{
          no:1,
          size:10,
          account:'0',
          type:'1',
          startDate:`${mYear}-${mMonth}-01`,
          endDate:`${mYear}-${mMonth}-${mDay}`
        },
        record:0,
        tableData:[],
        winup:{
          isShow:false,
          data:""
        }
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
        this.api(this, '/money/retrive', this.search, res => {
          console.log(res);
          this.tableData = res.items;
          this.record = res.record;
        });
      },
      winupClose(){
        this.winup.isShow = false;
        this.winup.data = "";
      },
      showTheWinup(data){
        this.winup.isShow = true;
        this.winup.data = data;
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
  .winup>div ul li:first-child{width:90%;line-height: 41px;}
  .winup>div ul li:first-child table{width: 100%;}
  .winup>div ul li:first-child table td{border:1px solid #ccc;padding:0 10px;}
  .winup>div ul li:first-child table tr td:first-child{width:40%;text-align: right;}
  .winup>div ul li:first-child table tr:nth-child(2n){background: #f9f9f9;}
</style>
