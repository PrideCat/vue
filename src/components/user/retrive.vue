<template>
  <div id="retrive">
    <div v-title :data-title="lang[lang.lang].en47"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b style="line-height: 34px;">
          <span>{{lang[lang.lang].en47}}：</span>
        </b>
        <b>
          <span>
            <span>{{lang[lang.lang].en48}}：</span>
            <el-date-picker v-model="search.startDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;"></el-date-picker>
            <span style="margin: 0 5px;">{{lang[lang.lang].en49}}</span>
            <el-date-picker v-model="search.endDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;"></el-date-picker>
          </span>
          <el-button style="margin-left: 20px;" @click="init">{{lang[lang.lang].en7}}</el-button>  
        </b>
      </p>
      <ul class="items">
        <li v-for="item in tableData">
          <div>
            <p style="color: #666;">
              <span>{{lang[lang.lang].en48}}：{{item.date}}</span>
              <span>{{lang[lang.lang].en50}}:<b style="color: #bfa284;">{{(item.rewards[0].money+item.rewards[1].money+item.rewards[2].money+item.rewards[3].money+item.rewards[4].money+item.rewards[5].money+item.rewards[6].money+item.rewards[7].money).toFixed(2)}}</b><a href="javascript:void(0);" style="color: #494232;font-size: 12px;margin-left: 20px;" @click="showTheWinup(item)">{{lang[lang.lang].en17}}</a></span>
            </p>
          </div>
          <div>
            <ol style="color: #999;">
              <li>{{lang[lang.lang].en51}}</li>
              <li>{{lang[lang.lang].en52}}</li>
              <li>{{lang[lang.lang].en53}}</li>
              <li>{{lang[lang.lang].en54}}</li>
              <li>{{lang[lang.lang].en167}}</li>
              <li>{{lang[lang.lang].en168}}</li>
              <li>{{lang[lang.lang].en169}}</li>
              <li>{{lang[lang.lang].en170}}</li>
              <li style="color: #666;">{{lang[lang.lang].en55}}</li>
            </ol>
          </div>
          <div>
            <ol style="color: #333;">
              <li>{{item.rewards[0].money}}</li>
              <li>{{item.rewards[1].money}}</li>
              <li>{{item.rewards[2].money}}</li>
              <li>{{item.rewards[3].money}}</li>
              <li>{{item.rewards[4].money}}</li>
              <li>{{item.rewards[5].money}}</li>
              <li>{{item.rewards[6].money}}</li>
              <li>{{item.rewards[7].money}}</li>
              <li style="color: #bfa284;">{{(item.rewards[0].money+item.rewards[1].money+item.rewards[2].money+item.rewards[3].money+item.rewards[4].money+item.rewards[5].money+item.rewards[6].money+item.rewards[7].money).toFixed(2)}}</li>
            </ol>
          </div>
        </li>
      </ul>
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
        <p><span>{{lang[lang.lang].en56}}</span><b @click="winupClose">×</b></p>
        <ul>
          <li style="max-height: 50vh;overflow: auto;">
            <table>
              <tbody>
                <tr><td>{{lang[lang.lang].en57}}</td><td>{{userInfo.uid}}</td></tr>
                <tr><td>{{lang[lang.lang].en58}}</td><td>{{userInfo.compellation}}</td></tr>
                <tr><td>{{lang[lang.lang].en48}}</td><td>{{winup.data.date}}</td></tr>
                <tr><td>1.{{lang[lang.lang].en51}}</td><td>{{winup.data.rewards[0].money}}</td></tr>
                <tr><td>2.{{lang[lang.lang].en52}}</td><td>{{winup.data.rewards[1].money}}</td></tr>
                <tr><td>3.{{lang[lang.lang].en53}}</td><td>{{winup.data.rewards[2].money}}</td></tr>
                <tr><td>4.{{lang[lang.lang].en54}}</td><td>{{winup.data.rewards[3].money}}</td></tr>
                <tr><td>5.{{lang[lang.lang].en167}}</td><td>{{winup.data.rewards[4].money}}</td></tr>
                <tr><td>6.{{lang[lang.lang].en168}}</td><td>{{winup.data.rewards[5].money}}</td></tr>
                <tr><td>7.{{lang[lang.lang].en169}}</td><td>{{winup.data.rewards[6].money}}</td></tr>
                <tr><td>8.{{lang[lang.lang].en170}}</td><td>{{winup.data.rewards[7].money}}</td></tr>
                <tr><td>{{lang[lang.lang].en59}}</td><td>{{(winup.data.rewards[0].money+winup.data.rewards[1].money+winup.data.rewards[2].money+winup.data.rewards[3].money+winup.data.rewards[4].money+winup.data.rewards[5].money+winup.data.rewards[6].money+winup.data.rewards[7].money).toFixed(2)}}</td></tr>
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
  const getNumber = function(number){
    return number<10?"0"+number:number;
  };
  export default {
    name: "retrive",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.wallet,
        userInfo = global.userInfo;
      langJson.lang = lang;
      // let mDate = new Date(),mYear,mMonth,mDay;
      // mDate.setDate(0);
      // mDate.setMonth(mDate.getMonth()+1);
      // mYear = mDate.getFullYear();
      // mMonth = mDate.getMonth()+1;
      // mMonth = mMonth<10?`0${mMonth}`:mMonth;
      // mDay = mDate.getDate();
      let searchDate = new Date();
      searchDate.setDate(1);
      let searchEndDate = searchDate.getFullYear()+"-"+getNumber(searchDate.getMonth()+1)+"-"+getNumber(searchDate.getDate());
      searchDate.setDate(searchDate.getDate()-30);
      let searchStartDate = searchDate.getFullYear()+"-"+getNumber(searchDate.getMonth()+1)+"-"+getNumber(searchDate.getDate());
      return {
        lang: langJson,
        collapseAttr,
        userInfo,
        search:{
          no:1,
          size:10,
          // startDate:`${mYear}-${mMonth}-01`,
          // endDate:`${mYear}-${mMonth}-${mDay}`
          startDate:searchStartDate,
          endDate:searchEndDate
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
        this.api(this, '/reward/retrive', this.search, res => {
          console.log(res);
          res.items.forEach(v=>{
            for(let i =0;i<8;i++){
              if(!v.rewards[i]){
                v.rewards.push({date:v.date,money:0,type:i});
              }
            }
          });
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
  .items>li{border: 1px solid #cfcfcf;background: #f1f1f1;font-size: 14px;margin: 20px 10px;}
  .items>li div:first-child p{display: flex;justify-content: space-between;align-items: center;height: 38px;padding: 0 20px;}
  .items>li div:nth-child(2) ol{background: #fff;}
  .items>li div ol{display: flex;height: 50px;align-items: center;text-align: center;}
  .items>li div ol li{flex:1;}
  .winup>div ul li:first-child{width:90%;line-height: 41px;}
  .winup>div ul li:first-child table{width: 100%;}
  .winup>div ul li:first-child table td{border:1px solid #ccc;padding:0 10px;}
  .winup>div ul li:first-child table tr td:first-child{width:40%;text-align: right;}
  .winup>div ul li:first-child table tr:nth-child(2n){background: #f9f9f9;}
</style>
