<template>
  <div class="tableBox">
    <div v-title :data-title="lang[lang.lang].en1"></div>
    <el-row class="flex1 searchBox" :gutter="10">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <el-button v-if="locations.length>1" style="float: right;" @click="locations.pop();search(locations[locations.length-1],1);">{{lang[lang.lang].en3}}</el-button>
      </el-col>
      <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
        <el-input style="width:100%;" v-model="uid" :placeholder="lang[lang.lang].editsearch"></el-input>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="text-align: center;">
        <el-button @click="search()">{{lang[lang.lang].search}}</el-button>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"></el-col>
    </el-row>
    <p style="margin:10px 0;">{{lang[lang.lang].uid}}：{{thisUid}}</p>
    <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: 100%;">
      <el-table-column prop="title" label="" align="center" width="240"></el-table-column>
      <el-table-column prop="partA" :label="lang.lang=='cn'?'A區':'Area A'" align="center"></el-table-column>
      <el-table-column prop="partB" :label="lang.lang=='cn'?'B區':'Area B'" align="center"></el-table-column>
    </el-table>
    <div class="tree" v-if="treeDataIsShow">
      <ol>
        <li v-for="(item,index) in treeData" :key="index">
          <div :class="item?'has':''">
            <b :style="item?'cursor:pointer;':'cursor:default;'" @click="item&&index?place(item.uid):''">
              <p>{{item?item.uid:""}}</p>
              <p>{{item?item.compellation:lang[lang.lang].en2}}</p>
            </b>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  const today = new Date();
  const returnWeek = str =>{
    str?str = str.split("_"):"";
    let year = str[0],week = str[1],date = new Date(),start,end,startTime,endTime;
    date.setMonth(0,1);
    date.setDate(date.getDate()-date.getDay());
    date.setDate(date.getDate()+week*7);
    start = date.toLocaleDateString();
    startTime = date.getTime();
    date.setDate(date.getDate()+6);
    end = date.toLocaleDateString();
    endTime = date.getTime();
    return {string:start+"~"+end,times:[startTime,endTime]};
  };

  const date = new Date();
  date.setDate(date.getDate() - date.getDay() - 1);
  const weeks = [];
  const getWeek = function () {
    const endDate = date.toLocaleDateString();
    let startDate = "";
    date.setDate(date.getDate() - 6);
    startDate = date.toLocaleDateString();
    weeks.push(startDate + "~" + endDate);
    date.setDate(date.getDate() - 1);
  };
  for (let i = 0; i < 4; i++) {
    getWeek();
  }

  export default {
    name: "sendees",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.sendees,
        userInfo = global.userInfo;
      langJson.lang = lang;

      return {
        lang: langJson,
        collapseAttr,
        uid: "",
        userInfo,
        thisUid:userInfo.uid,
        locations:[],
        rowConfig: {
          members: 0,
          integral: 1,
          balance: 2,
          week4: 3,
          week3: 4,
          week2: 5,
          week1: 6,
          week: 7,
          unliquidated: 8
        },
        tableData: [
          {title:langJson[lang].Membership,partA: "", partB: ""},
          {title:langJson[lang].accumulation + "（BV）",partA: "", partB: ""},
          {title:langJson[lang].Balance + "（BV）",partA: "", partB: ""},
          // {title: weeks[3] ,partA: "", partB: ""},
          // {title: weeks[2] ,partA: "", partB: ""},
          // {title: weeks[1] ,partA: "", partB: ""},
          // {title: weeks[0] ,partA: "", partB: ""},
          // {title:langJson[lang].ThisWeek + "（BV）",partA: "", partB: ""},
          // {title:langJson[lang].Unsettlement + "（BV）",partA: "", partB: ""}
        ],
        treeData:[,,,,,,,],
        treeDataIsShow:false
      };
    } ,
    methods: {
      search: function (uid,isprev) {
        var t = this;
        uid = uid ? uid : this.uid;
        if (!uid) {
          this.$message({message: this.lang[this.lang.lang].editsearch, type: "warning"});
          return;
        }
        this.api(this,'/user/receiveRetrive', {uid},res=>{
          console.log(res);
          if(!isprev)this.locations.push(uid);
          this.thisUid = res.data.uid;
          t.tableData[0].partA = res.data.subordinateA;
          t.tableData[1].partA = res.data.integralA;
          t.tableData[2].partA = res.data.integralA - res.data.accumulation;
          // t.tableData[8].partA = res.data.unliquidatedA;
          t.tableData[0].partB = res.data.subordinateB;
          t.tableData[1].partB = res.data.integralB;
          t.tableData[2].partB = res.data.integralB - res.data.accumulation;
          // t.tableData[8].partB = res.data.unliquidatedB;
        
          let weekIntegral = [],weekIntegralItem,weekJson,hasToWeek;
          t.tableData.splice(3);
          if(res.weekIntegralA.length>0||res.weekIntegralB.length>0){
            res.weekIntegralA.forEach((v,i)=>{
              weekIntegral.push({title:v.week,partA:v.integral,partB:0});
            });
            res.weekIntegralB.forEach((v,i)=>{
              weekIntegralItem = weekIntegral.filter(val=>val.title==v.week);
              if(weekIntegralItem.length)
                weekIntegralItem[0].partB = v.integral;
              else
                weekIntegral.push({title:v.week,partA:0,partB:v.integral});
            });
          }
          weekIntegral.sort((a,b)=>a.title.replace("_","")>b.title.replace("_",""));
          weekIntegral.forEach(v=>{
            weekJson = returnWeek(v.title);
            t.tableData.push(v);
            if(weekJson.times[0]<today.getTime()&&weekJson.times[1]>today.getTime()){
              v.title = t.lang[t.lang.lang].ThisWeek + "（BV）";
              hasToWeek = 1;
            }else{
              v.title = weekJson.string;
            }
          });
          if(!hasToWeek)t.tableData.push({title:t.lang[t.lang.lang].ThisWeek + "（BV）",partA:0,partB:0});  


          this.treeData = [,,,,,,,];
          this.treeData[0] = res.data;
          res.downline.forEach(v=>{
            if(v.suid==this.treeData[0].uid)this.treeData[v.track+1]=v;
          });
          res.downline.forEach(v=>{
            if(this.treeData[1]&&v.suid==this.treeData[1].uid)this.treeData[v.track+3]=v;
            if(this.treeData[2]&&v.suid==this.treeData[2].uid)this.treeData[v.track+5]=v;
          });
          this.treeDataIsShow=true;
          // console.log(this.treeData);
          // res.data.forEach(function (v) {
          //   for (var k in v) {
          //     if (k !== "track" && t.tableData[t.rowConfig[k]]) {
          //       t.tableData[t.rowConfig[k]][v.track === 0 ? "partA" : "partB"] = v[k];
          //     }
          //   }
          // });
        },'',1);
      },
      place(uid){
        this.search(uid);
        (document.documentElement||document.body).scrollTop=0;
      }
    },
    mounted(){
      this.uid = this.global.userInfo.uid;
      this.search(this.global.userInfo.uid);
    },
    created(){
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
        this.tableData[0].title=this.lang[res].Membership;
        this.tableData[1].title=this.lang[res].accumulation + "（BV）";
        this.tableData[2].title=this.lang[res].Balance + "（BV）";
        // this.tableData[3].title= weeks[3];
        // this.tableData[4].title= weeks[2];
        // this.tableData[5].title= weeks[1];
        // this.tableData[6].title= weeks[0];
        // this.tableData[7].title=this.lang[res].ThisWeek + "（BV）";
        // this.tableData[8].title=this.lang[res].Unsettlement + "（BV）";
        this.search();
      })
    }
  }
</script>

<style scoped>

  .tree ol{display: flex;padding: 0;line-height: inherit;flex-wrap: wrap;text-align: center;width: 85%;margin: 0 auto;}
  .tree ol li{display: flex;justify-content: center;margin: 20px 0;}
  .tree ol li:nth-child(1){width: 100%;}
  .tree ol li:nth-child(2),.tree ol li:nth-child(3){width: 50%;}

  .tree ol li:nth-child(4),.tree ol li:nth-child(5),.tree ol li:nth-child(6),.tree ol li:nth-child(7){width: 25%;}
  .tree ol li div{background: url(../../../static/img/treeicon2.png);width:80px;height:80px;background-size:100%;background-repeat:no-repeat;padding-bottom: 5px;box-sizing: border-box;}
  .tree ol li div.has{background-image: url(../../../static/img/treeicon1.png);}
  .tree ol li div b{height:100%;display: flex;flex-direction: column;justify-content: flex-end;cursor: pointer;}
  .tree ol li div.has b{cursor: default;}
  .tree ol li div p{flex: none;overflow: hidden;text-overflow: ellipsis;margin:2px 8px;display: block;}
  .tree ol li div.has p{color: #fff !important;}
  .tree ol li div p:nth-child(1){font-size: 12px;color:#666;}
  .tree ol li div p:nth-child(2){font-size: 14px;color:#494232;}
  .tree ol li:nth-child(2) div,.tree ol li:nth-child(3) div{position: relative;}
  .tree ol li:nth-child(2) div:after,.tree ol li:nth-child(3) div:after{content:'';background: url(../../../static/img/treeicon3.png);width:8px;height:32px;position:absolute;background-size:100%;background-repeat:no-repeat;left:0;right:0;bottom:-36px;margin:auto;}
  .tree ol li:nth-child(2) div:before,.tree ol li:nth-child(3) div:before{content:'';position:absolute;width:4px;height:4px;left:0;right:0;margin:auto;top:-12px;border:2px solid #333333;border-radius:50%;background:#fff;}
  .tree ol{position: relative;}
  .tree ol:after{content:"";position:absolute;width:calc(50% - 8px);background:#333;height:2px;left:0;right:0;margin:auto;top:36.4%;}
  .tree ol li:nth-child(1) div{position: relative;}
  .tree ol li:nth-child(1) div:before{content:"";position:absolute;width:4px;height:4px;background:white;border:2px solid #333;margin:auto;left:0;right:0;border-radius:50%;bottom:-10px;}
  .tree ol li:nth-child(1) div:after{content:"";position:absolute;width:2px;height:22px;background:#333;left:0;right:0;margin:auto;bottom:-32px;}

</style>
