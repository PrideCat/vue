<template>
  <div>
    <div v-title :data-title="lang[lang.lang].home"></div>
    <div>
      <marquee direction="left" scrollamount="3" scrolldelay="0" style="height:32px;line-height:32px;background:#332c1d;color:#bfa284;font-size:14px;">
        <router-link tag="span" v-for="(item,index) in announceRetrive" :key="index" :style="index?'cursor:pointer;margin-left: 10em;':'cursor:pointer;'" :to="{name:'announce'}">({{item.createTime}}) {{item.name}}</router-link>
      </marquee>
      <ul class="nowTime">
        <li>
          <div><img src="../../../static/img/time.png" alt=""></div>
          <div>
            <p>{{lang[lang.lang].en2}}</p>
            <p>{{nowTime}}</p>
          </div>
        </li>
        <li>
          <div><img src="../../../static/img/tim2.png" alt=""></div>
          <div>
            <p>{{lang[lang.lang].en3}}（GMT+8:00）</p>
            <p>{{clearingCountdown}}</p>
          </div>
        </li>
      </ul>
      <div class="amountDetails">
        <div>
          <p style="padding:20px 20px 0 0;text-align:right;">
            <router-link tag="a" style="color: #555;font-size: 14px;" :to="{name:'retrive'}">
              {{lang.lang=="cn"?"獎金管理":"Bonus Management"}}
            </router-link>
          </p>
          <ul>
            <li>
              <ol>
                <li>
                  <p>{{lang[lang.lang].en4}}</p>
                  <p>{{moneyIsShow?statistics.data.reward:statistics.data.reward.toString().replace(/\d/g,"*")}}</p>
                </li>
                <li>
                  <p>{{lang[lang.lang].en5}}</p>
                  <p>{{moneyIsShow?statistics.data.money:statistics.data.money.toString().replace(/\d/g,"*")}}</p>
                </li>
                <!-- <li>
                  <p>{{lang[lang.lang].en6}}</p>
                  <p>{{moneyIsShow?statistics.data.bonus:statistics.data.bonus.toString().replace(/\d/g,"*")}}</p>
                </li> -->
              </ol>
            </li>
            <li>
              <p><i :class="moneyIsShow?'':'no'" @click="moneyIsShow=!moneyIsShow"></i></p>
            </li>
            <li>
              <ol>
                <li>
                  <p>{{lang[lang.lang].en7}}</p>
                  <p>$ {{statistics.weekReward[0].money||0}}</p>
                </li>
                <li>
                  <p>{{lang[lang.lang].en9}}</p>
                  <p>$ {{statistics.weekReward[2].money||0}}</p>
                </li>
                <li>
                  <p>{{lang[lang.lang].en8}}</p>
                  <p>$ {{statistics.weekReward[1].money||0}}</p>
                </li>
                <li>
                  <p>{{lang[lang.lang].en10}}</p>
                  <p>$ {{statistics.weekReward[3].money||0}}</p>
                </li>
              </ol>
              <ol style="margin-top: 20px;">
                <li>
                  <p>{{lang[lang.lang].en67}}</p>
                  <p>$ {{statistics.weekReward[4].money||0}}</p>
                </li>
                <li style="opacity: 0;">
                  <p>{{lang[lang.lang].en70}}</p>
                  <p>$ {{statistics.weekReward[5].money||0}}</p>
                </li>
                <li style="opacity: 0;">
                  <p>{{lang[lang.lang].en68}}</p>
                  <p>$ {{statistics.weekReward[6].money||0}}</p>
                </li>
                <li style="opacity: 0;">
                  <p>{{lang[lang.lang].en69}}</p>
                  <p>$ {{statistics.weekReward[7].money||0}}</p>
                </li>
              </ol>
            </li>
            <li>
              <p>
                {{lang[lang.lang].en11}}（USD）:
                <span ref="money" v-if="moneyIsShow">{{statistics.data.income}}</span>
                <span v-else>{{statistics.data.income.toString().replace(/\d/g,"*")}}</span>
              </p>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li><img src="../../../static/img/avatar.png" alt=""></li>
            <li>{{userInfo.nickname}}</li>
            <li>{{statistics.data.level==1?"無":(statistics.data.level==2?"IBO":(statistics.data.level==3?"Associate":(statistics.data.level==4?"Partner":(statistics.data.level==5?"Senior Partner":(statistics.data.level==6?"Silver":(statistics.data.level==7?"Gold":(statistics.data.level==8?"Platinum":(statistics.data.level==9?"Ruby":(statistics.data.level==10?"Sapphire":(statistics.data.level==11?"Emerald":(statistics.data.level==12?"Jade":(statistics.data.level==13?"Diamond":(statistics.data.level==14?"Pink Diamond":(statistics.data.level==15?"Black Diamond":(statistics.data.level==16?"Royal Diamond":(statistics.data.level==17?"Crown Diamond":""))))))))))))))))}}</li>
            <!-- <li>{{lang[lang.lang].en12}}：{{statistics.level.integral-statistics.data.accumulation}}BV,</li>
            <li>{{statistics.level.subordinate-statistics.data.subordinate}}{{lang[lang.lang].en13}}</li> -->
          </ul>
        </div>
      </div>
      <div class="bonus">
        <p><span><img src="../../../static/img/wall.png">{{lang[lang.lang].en14}}：</span></p>
        <vue-chart v-if="chartData.datasets[0].data.length" type="line" :data="chartData"></vue-chart>
        <div v-else style="text-align: center;font-size: 14px;color: #909399;padding: 15px 0 10px;">{{lang[lang.lang].en15}}</div>
      </div>
      <div class="teamInfo">
        <p><span><img src="../../../static/img/team.png">{{lang[lang.lang].en16}}</span><!-- <b>本周活跃率：0.52%</b> --></p>
        <div>
          <ul>
            <li style="width: 100%;margin-bottom: 20px;">
              <p>{{lang[lang.lang].en17}}：</p>
              <div>
                <ol>
                  <li style="flex: 1;">
                    <p>{{lang[lang.lang].en18}}</p>
                    <p><span>{{lang[lang.lang].en20}}：</span><b>{{statistics.data.weekSubordinateA||0}}</b><i :style="'background: #ff7b7b;width: '+(isNaN((statistics.data.weekSubordinateA/statistics.data.subordinateA*100))?0:(statistics.data.weekSubordinateA/statistics.data.subordinateA*100))+'%;'"></i></p>
                    <p><span>{{lang[lang.lang].en21}}：</span><b>{{statistics.data.stageSubordinateA||0}}</b><i :style="'background: #8dd8ff;width: '+(isNaN((statistics.data.stageSubordinateA/statistics.data.subordinateA*100))?0:(statistics.data.stageSubordinateA/statistics.data.subordinateA*100))+'%;'"></i></p>
                    <p><span>{{lang[lang.lang].en22}}：</span><b>{{statistics.data.subordinateA||0}}</b><i :style="'background: #f7c883;width: '+(statistics.data.subordinateA?100:0)+'%;'"></i></p>
                  </li>
                  <li style="flex: 1;">
                    <p>{{lang[lang.lang].en19}}</p>
                    <p><span>{{lang[lang.lang].en20}}：</span><b>{{statistics.data.weekSubordinateB||0}}</b><i :style="'background: #ff7b7b;width: '+(isNaN((statistics.data.weekSubordinateB/statistics.data.subordinateB*100))?0:(statistics.data.weekSubordinateB/statistics.data.subordinateB*100))+'%;'"></i></p>
                    <p><span>{{lang[lang.lang].en21}}：</span><b>{{statistics.data.stageSubordinateB||0}}</b><i :style="'background: #8dd8ff;width: '+(isNaN((statistics.data.stageSubordinateB/statistics.data.subordinateB*100))?0:(statistics.data.stageSubordinateB/statistics.data.subordinateB*100))+'%;'"></i></p>
                    <p><span>{{lang[lang.lang].en22}}：</span><b>{{statistics.data.subordinateB||0}}</b><i :style="'background: #f7c883;width: '+(statistics.data.subordinateB?100:0)+'%;'"></i></p>
                  </li>
                </ol>
              </div>
            </li>
            <li>
              <p>{{lang[lang.lang].en23}}：</p>
              <p><span>（{{lang[lang.lang].en24}}）</span></p>
              <div>
                <ul>
                  <li>
                    <ol>
                      <li></li>
                      <li>{{lang[lang.lang].en25}}</li>
                      <li>{{lang[lang.lang].en26}}</li>
                      <li>{{lang[lang.lang].en27}}</li>
                      <li>{{lang[lang.lang].en28}}</li>
                    </ol>
                  </li>
                  <!-- <li>
                    <ol>
                      <li>{{lang[lang.lang].en29}}</li>
                      <li>{{statistics.weekIncreaseMember[0].count}}</li>
                      <li>{{statistics.stageIncreaseMember[0].count}}</li>
                      <li>{{statistics.weekIncreaseMember[0].percentage}}%</li>
                      <li>{{statistics.stageIncreaseMember[0].percentage}}%</li>
                    </ol>
                  </li> -->
                  <li>
                    <ol>
                      <li>{{lang[lang.lang].en71}}</li>
                      <li>{{statistics.weekIncreaseMember[1].count}}</li>
                      <li>{{statistics.stageIncreaseMember[1].count}}</li>
                      <li>{{statistics.weekIncreaseMember[1].percentage}}%</li>
                      <li>{{statistics.stageIncreaseMember[1].percentage}}%</li>
                    </ol>
                  </li>
                  <li>
                    <ol>
                      <li>{{lang[lang.lang].en72}}</li>
                      <li>{{statistics.weekIncreaseMember[2].count}}</li>
                      <li>{{statistics.stageIncreaseMember[2].count}}</li>
                      <li>{{statistics.weekIncreaseMember[2].percentage}}%</li>
                      <li>{{statistics.stageIncreaseMember[2].percentage}}%</li>
                    </ol>
                  </li>
                  <li>
                    <ol>
                      <li>{{lang[lang.lang].en73}}</li>
                      <li>{{statistics.weekIncreaseMember[3].count}}</li>
                      <li>{{statistics.stageIncreaseMember[3].count}}</li>
                      <li>{{statistics.weekIncreaseMember[3].percentage}}%</li>
                      <li>{{statistics.stageIncreaseMember[3].percentage}}%</li>
                    </ol>
                  </li>
                  <li>
                    <ol>
                      <li>{{lang[lang.lang].en74}}</li>
                      <li>{{statistics.weekIncreaseMember[4].count}}</li>
                      <li>{{statistics.stageIncreaseMember[4].count}}</li>
                      <li>{{statistics.weekIncreaseMember[4].percentage}}%</li>
                      <li>{{statistics.stageIncreaseMember[4].percentage}}%</li>
                    </ol>
                  </li>
                  <li>
                    <ol>
                      <li>{{lang[lang.lang].en75}}</li>
                      <li>{{statistics.weekIncreaseMember[5].count}}</li>
                      <li>{{statistics.stageIncreaseMember[5].count}}</li>
                      <li>{{statistics.weekIncreaseMember[5].percentage}}%</li>
                      <li>{{statistics.stageIncreaseMember[5].percentage}}%</li>
                    </ol>
                  </li>
                </ul>
              </div>
            </li>
            <!-- <li>
              <p>{{lang[lang.lang].en31}}：<span>（{{lang[lang.lang].en32}}）</span></p>
              <div>
                <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" style="width: 100%;">
                  <el-table-column prop="originalSupport" :label="lang[lang.lang].en33" align="center"></el-table-column>
                  <el-table-column prop="newMatching" :label="lang[lang.lang].en34" align="center"></el-table-column>
                  <el-table-column prop="count" :label="lang[lang.lang].en35" align="center"></el-table-column>
                </el-table>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="market">
        <p><span><img src="../../../static/img/market.png">{{lang[lang.lang].en36}}</span><!-- <b>本周活跃率：0.52%</b> --></p>
        <div>
          <ul>
            <li>
              <p>{{lang[lang.lang].en37}}：</p>
              <div>
                <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData1" style="width: 100%;">
                  <el-table-column prop="week" :label="lang[lang.lang].en38" align="center"></el-table-column>
                  <el-table-column prop="shop" :label="lang[lang.lang].en39" align="center" width="171"></el-table-column>
                  <!-- <el-table-column prop="repurchase" :label="lang[lang.lang].en40" align="center"></el-table-column> -->
                  <!-- <el-table-column prop="shop" :label="'消費者購貨業績'" align="center"></el-table-column> -->
                  <!-- <el-table-column prop="allShop" :label="lang[lang.lang].en41" align="center"></el-table-column> -->
                </el-table>
              </div>
            </li>
            <li>
              <p>{{lang[lang.lang].en42}}：</p>
              <div>
                <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData2" style="width: 100%;">
                  <el-table-column prop="week" :label="lang[lang.lang].en38" align="center" width="180"></el-table-column>
                  <el-table-column prop="pathA" :label="lang[lang.lang].en18" align="center"></el-table-column>
                  <el-table-column prop="pathB" :label="lang[lang.lang].en19" align="center"></el-table-column>
                  <el-table-column prop="allShop" :label="lang[lang.lang].en41" align="center" width="180"></el-table-column>
                </el-table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueChart from 'vue-chart-js';
  const returnWeek = (str,isTimes) =>{
    str?str = str.split("_"):"";
    let year = str[0],week = str[1],date = new Date(),start,end;
    date.setMonth(0,1);
    date.setDate(date.getDate()-date.getDay());
    date.setDate(date.getDate()+week*7);
    start = date.toLocaleDateString();
    date.setDate(date.getDate()+6);
    end = date.toLocaleDateString();
    if(isTimes)return date.getTime();
    return start+"~"+end;
  };
  const cnWeek = [{cn:"星期天",en:"Sunday"},{cn:"星期一",en:"Monday"},{cn:"星期二",en:"Tuesday"},{cn:"星期三",en:"Wednesday"},{cn:"星期四",en:"Thursday"},{cn:"星期五",en:"Friday"},{cn:"星期六",en:"Saturday"}];

  //数字自增到某一值动画参数（目标元素,自定义配置）
  function numAutoPlusAnimation(targetEle, options) {

    /*可以自己改造下传入的参数，按照自己的需求和喜好封装该函数*/
    //不传配置就把它绑定在相应html元素的data-xxxx属性上吧
    options = options || {};

    var $this = targetEle,
      time = options.time || $this.data('time'), //总时间--毫秒为单位
      finalNum = options.num || $this.data('value'), //要显示的真实数值
      regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度

      step = finalNum / (time / regulator),/*每30ms增加的数值--*/
      count = 0, //计数器
      initial = 0;

    var timer = setInterval(function() {

      count = count + step;

      if(count >= finalNum) {
        clearInterval(timer);
        count = finalNum;
      }
      //t未发生改变的话就直接返回
      //避免调用text函数，提高DOM性能
      var t = Math.floor(count);
      if(t == initial) return;

      initial = t;

      $this.innerHTML = initial;
    }, 30);
  }

  export default {
    name: "index",
    data() {
      // console.log(this.global);
      const global = this.global,
        lang = global.lang,
        langJson = global.langJson.index,
        userInfo = global.userInfo,
        date = new Date();
      langJson.lang = lang;
      return {
        userInfo,
        // bannerHeight: "200",
        lang: langJson,
        tableData: [],
        tableData1: [],
        tableData2: [],
        // advertisementList: [],
        chartData: {
          datasets:[{data:[]}]
        },
        teamStatistics: [{members: 0, weekMembers: 0, monthMembers: 0}, {members: 0, weekMembers: 0, monthMembers: 0}],
        statistics:{
          data:{},
          level:{},
          quarterReward:[],
          stageIncreaseMember:[{count:0,percentage:0},{count:0,percentage:0},{count:0,percentage:0},{count:0,percentage:0},{count:0,percentage:0},{count:0,percentage:0}],
          weekIncreaseMember:[{count:0,percentage:0},{count:0,percentage:0},{count:0,percentage:0},{count:0,percentage:0},{count:0,percentage:0},{count:0,percentage:0}],
          weekIntegralA:[],
          weekIntegralB:[],
          weekRepurchase:[],
          weekReward:[{},{},{},{},{},{},{},{}],
          weekShop:[],
          weekUpgradeMember:[{},{},{}],
        },
        announceRetrive:[],
        moneyIsShow:true,
        nowTime:cnWeek[date.getDay()][lang]+" "+(lang=="en"?date.toLocaleString().replace(/下午/,"p.m ").replace(/上午/,"a.m "):date.toLocaleString()),
        clearingCountdown:"7 DAYS 00:00:00"
      };
    },
    components: {VueChart},
    mounted() {
      setInterval(_=>{
        let date = new Date();
        this.nowTime = cnWeek[date.getDay()][this.lang.lang]+" "+(this.lang.lang=="en"?date.toLocaleString().replace(/下午/,"p.m ").replace(/上午/,"a.m "):date.toLocaleString());
      },1000);
      setInterval(_=>{
        let date = new Date(),
          sunday = new Date(date.getFullYear(),date.getMonth(),date.getDate()-date.getDay()+5,0,0,0),
        	clearingCountdown = (sunday.getTime()-date.getTime()>0?sunday.getTime()-date.getTime():new Date(date.getFullYear(),date.getMonth(),date.getDate()-date.getDay()+12,0,0,0).getTime()-date.getTime()),
        	seconds = clearingCountdown/1000,
        	minutes = seconds/60,
        	hours = minutes/60,
        	day = hours/24;
        day = parseInt(day);
        hours = parseInt(hours%24);
        minutes = parseInt(minutes%60);
        seconds = parseInt(seconds%60);
        hours = hours<10?"0"+hours:hours;
        minutes = minutes<10?"0"+minutes:minutes;
        seconds = seconds<10?"0"+seconds:seconds;
        this.clearingCountdown = day+" DAYS "+hours+":"+minutes+":"+seconds;
      },1000);

      this.api(this, '/announce/retrive', {no:1, size:-1}, res => {
        console.log(res);
        this.announceRetrive = res.items;
      });

      this.api(this, '/user/statistics', "", res => {
        let labels = [],data = [],income=res.data.income,timer,stageIncreaseMemberTotal=0,weekIncreaseMemberTotal=0;

        // console.log("user/statistics",res);
        
        delete res.result;
        for(let k in res){
          for(let kk in res[k]){
            this.statistics[k][kk] = res[k][kk];
          }
        }
        // this.statistics = res;
        console.log(res)
        console.log(this.statistics)

        this.statistics.weekReward=[{},{},{},{},{},{},{},{}];
        res.weekReward.forEach(v=>{
          this.statistics.weekReward[v.type]=v;
        });

         // stageIncreaseMember:[{count:0},{count:0}],
         //  weekIncreaseMember:[{count:0},{count:0}],
        //  console.log("stageIncreaseMember",JSON.stringify(res.stageIncreaseMember));
        //  console.log("weekIncreaseMember",JSON.stringify(res.weekIncreaseMember));
        res.stageIncreaseMember.sort((a,b)=>a.rank>b.rank);
        res.weekIncreaseMember.sort((a,b)=>a.rank>b.rank);
        
        for (let i = 1; i < 6; i++) {
          stageIncreaseMemberTotal += res.stageIncreaseMember[i]?res.stageIncreaseMember[i].count:0;
          weekIncreaseMemberTotal += res.weekIncreaseMember[i]?res.weekIncreaseMember[i].count:0;
        }
        res.stageIncreaseMember.forEach(v=>{
          v.percentage = (v.count/stageIncreaseMemberTotal).toFixed(2);
        });
        res.weekIncreaseMember.forEach(v=>{
          v.percentage = (v.count/weekIncreaseMemberTotal).toFixed(2);
        });


        res.quarterReward.forEach(v=>{labels.push(v.date);data.push(v.money);});
        this.chartData={
          labels,
          datasets:[{
            label: "",
            data,
            borderColor:"#ffd563",
            backgroundColor: "#f9e9c7",
            borderWidth: 2
          }]
        };

        // res.weekUpgradeMember.forEach(v=>{
        //   let originalSupport,newMatching;
        //   switch(v.type){
        //     case 0:
        //       originalSupport = this.lang[this.lang.lang].en43;
        //       newMatching = this.lang[this.lang.lang].en44;
        //       break;
        //     case 1:
        //       originalSupport = this.lang[this.lang.lang].en44;
        //       newMatching = this.lang[this.lang.lang].en45;
        //       break;
        //     case 2:
        //       originalSupport = this.lang[this.lang.lang].en43;
        //       newMatching = this.lang[this.lang.lang].en45;
        //       break;
        //   }
        //   this.tableData.push({
        //     originalSupport,
        //     newMatching,
        //     count:v.count||0,
        //     bv:0
        //   });
        // });

        res.weekShop.forEach(v=>{
          this.tableData1.push({
            week:v.week,
            shop:v.integral,
            repurchase:0
          });
        });
        // res.weekRepurchase.forEach(v=>{
        //   let i;
        //   if(this.tableData1.some((val,index)=>{i=index;return v.week==val.week;}))
        //     this.tableData1[i].repurchase = v.integral;
        //   else
        //     this.tableData1.push({
        //       week:v.week,
        //       shop:0,
        //       repurchase:v.integral
        //     });
        // });
        this.tableData1.sort((a,b)=>{
          return returnWeek(a.week,1) > returnWeek(b.week,1);
        });
        this.tableData1.forEach(v=>{
          v.week = returnWeek(v.week);
          v.allShop = v.shop+v.repurchase;
        });

        res.weekIntegralA.forEach(v=>{
          this.tableData2.push({
            week:v.week,
            pathA:v.integral,
            pathB:0
          });
        });
        res.weekIntegralB.forEach(v=>{
          let i;
          if(this.tableData2.some((val,index)=>{i=index;return v.week==val.week;}))
            this.tableData2[i].pathB = v.integral;
          else
            this.tableData2.push({
              week:v.week,
              pathA:0,
              pathB:v.integral
            });
        });
        this.tableData2.sort((a,b)=>{
          return returnWeek(a.week,1) > returnWeek(b.week,1);
        });
        this.tableData2.forEach(v=>{
          v.week = returnWeek(v.week);
          v.allShop = v.pathA+v.pathB;
        });

        this.statistics.weekReward.sort((a,b)=>a.type>b.type);
        // this.statistics.data.income=0;
        // timer = setInterval(_=>{
        //   console.log(this.statistics.data.income);
        //   if(this.statistics.data.income<income-income/30){
        //     this.statistics.data.income+=parseInt(income/30)
        //   }else{
        //     this.statistics.data.income=income;
        //     clearInterval(timer);
        //   };
        // },200);

        if(income!=0)numAutoPlusAnimation(this.$refs.money, {
          time: 1000,
          num: income,
          regulator: income/10
        });
        
      },"",1);
    },
    methods: {
      selectLang: function (lang) {
        this.lang.lang = lang;
        // new Chart("myChart", {type: 'line', data: myChartData, options: chartOptions});
      }
    },
    created(){
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
      })
    }
  }

</script>

<style scoped>

  .el-carousel__item .el-carousel-item-title {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 25px;
    text-align: center;
    color: #fff;
  }

  .title {
    /*font-size: 20px;
    /*margin-top: 50px;*/
    /*margin-left: 20px;
    margin-bottom: 25px;*/
  }

  .userInfo {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    /*margin: 50px auto;*/
  }

  .userInfo > li {
    border: 1px solid #9E9E9E;
    border-radius: 5px;
    padding: 20px 20px 50px;
    margin: 0 15px;
    box-shadow: 0 0 5px 0px rgba(0, 0, 0, .2);
  }

  .userInfo > *:first-child {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  /*.userInfo li:last-child {*/
  /*flex: 1.5;*/
  /*}*/

  .userInfo li h3 {
    margin-bottom: 30px;
  }

  .userInfo li p {
    line-height: 25px;
  }

  /*.userInfo li img {*/
  /*width: 100px;*/
  /*height: 100px;*/
  /*border-radius: 50px;*/
  /*margin: 10px auto 20px;*/
  /*display: block;*/
  /*border: 1px solid #9E9E9E;*/
  /*box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, .5);*/
  /*}*/

  .contentInfo {
    border-radius: 5px;
    line-height: 35px;
    color: #999;
    overflow: hidden;
  }

  .contentInfo > li {
    /*padding: 25px 0;*/
    float: left;
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    display: -ms-flex;
    display: -moz-flex;
    display: -o-flex;
    display: -webkit-flex;
    -ms-justify-content: space-evenly;
    -moz-justify-content: space-evenly;
    -o-justify-content: space-evenly;
    /*-webkit-justify-content: space-evenly;*/
    -ms-align-items: center;
    -moz-align-items: center;
    -o-align-items: center;
    -webkit-align-items: center;
    /*flex*/
  }

  .contentInfo > li:nth-child(n+2) {

  }

  .contentInfo > li > p {
    float: left;
    font-size: 100px;
    height: 130px;
    line-height: 130px;
    width: 100px;
    text-align: center;
  }

  .contentInfo > li > div {
    /*float: right;*/
    /*height: 130px;*/
    /*margin-right: 30px;*/
  }

  .contentInfo > li > div > p {
    margin-bottom: 8px;
    font-size: 16px;
  }

  .el-carousel__indicators {
    left: 0;
    right: 0;
    transform: none;
    text-align: center;
  }

  .el-carousel__item {
    background: #ddd;
  }

  .el-carousel__indicators--outside button {
    background: #545c64;
  }

  .el-carousel {
    width: 90%;
    margin: 0 auto;
    max-width: 1450px
  }

  .infos:after {
    content: "";
    display: block;
    clear: both;
  }

  .infos {
    max-width: 1450px;
    margin: 30px auto;
    padding: 25px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: -ms-flex;
    display: -moz-flex;
    -display: webkit-flex;
    display: -o-flex;
    -ms-justify-content: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    -o-justify-content: center;
    -ms-align-items: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    -o-align-items: center;
    /*background: #fff;*/
    /*border: 1px solid #ddd;*/
    /*box-shadow: 0 2px 1px -1px #c3c2c2;*/
  }

  .infos > div {
    padding: 0;
    background: #fff;
    box-shadow: rgba(158, 158, 157, 0.25) 0px 0px 30px;
    box-sizing: border-box;
    padding-bottom: 25px;
  }

  .infos > div:first-child {
    width: 25%;
    margin-right: 5%;
  }

  .infos > div:first-child div {
    /*background: #fff;
    color: #555;
    line-height: 35px;
    padding: 25px 25px;
    height: 130px;*/
  }

  .infos > div:first-child div p {
    /*margin-bottom: 8px;
    float: left;*/
  }

  .infos > div:last-child {
    float: right;
    width: 70%;
  }

  @media screen and (max-width: 1250px) {
    .contentInfo > li > p {
      width: 100%;
    }

    .contentInfo > li > div {
      width: 50%;
      /*margin: 0 auto;
      margin-right: 0;*/
    }

    .infos {
      flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      -moz-flex-wrap: wrap;
      -o-flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
    }

    .infos > div {
      width: 100% !important;
    }

    .infos > div:first-child {
      margin-right: 0;
      margin-bottom: 25px;
    }
  }

  @media screen and (max-width: 900px) {
    .contentInfo > li {
      width: 100%;
    }

    .el-carousel__container {
      height: 140px !important;
    }
  }

  /*@media screen and (max-width: 1024px) and(min-width: 901px){*/
  /*.el-carousel__container{height: 175px!important;}*/
  /*.el-carousel__item{width:350px;}*/
  /*}*/
  /*@media screen and (max-width: 1280px) and(min-width: 1025px){*/
  /*.el-carousel__container{height: 230px!important;}*/
  /*.el-carousel__item{width:460px;}*/
  /*}*/
  /*@media screen and (max-width: 1336px)and(min-width: 1281px) {*/
  /*.el-carousel__container{height: 250px!important;}*/
  /*.el-carousel__item{width:500px;}*/
  /*}*/
  /*@media screen and (max-width: 1440px) and(min-width: 1337px){*/
  /*.el-carousel__container{height: 265px!important;}*/
  /*.el-carousel__item{width:530px;}*/
  /*}*/
  /*@media screen and (max-width: 1920px) and(min-width: 1441px){*/
  /*.el-carousel__container{height: 375px!important;}*/
  /*.el-carousel__item{width:750px;}*/
  /*}*/

  .el-table__body tr:nth-child(2n) {
    background-color: inherit;
  }

  .el-table__body tr:hover > td, .el-table__body tr.hover-row > td {
    background: #ecf5ff;
  }

  .el-table td {
    padding: 5px 0;
  }

  .el-table th {
    padding: 7px 0;
  }

  .headImg {
    width: 100px;
    height: 100px;
    display: block;
    margin: 0 auto 20px;
    overflow: hidden;
    border-radius: 50%;
  }

  /*.infos > div:first-child div p:nth-child(2){
      text-align: center;
      width: 100%;
  };
  .infos > div:first-child div p:nth-child(3){
      float: left;
  };*/
  .userCard-Name {
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: #999;
    padding-bottom: 25px;
  }

  .userCard-Info {
    overflow: hidden;
    line-height: 35px;
  }

  .userCard-Info p {
    float: left;
    width: 50%;
    text-align: center;
    color: #999;
  }

  .infos > div:first-child h3, .title {
    background: #12afe3;
    padding: 17px 0;
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
    font-size: 18px;
  }

  .el-carousel {
    box-shadow: rgba(158, 158, 157, 0.25) 0px 0px 30px;
  }

  .el-table .cell {
    color: #999;
  }
  .nowTime{display: flex;background: #fff;border:1px solid #fff;margin: 10px 0;height: 72px;}
  .nowTime li{flex:1;display: flex;align-items: center;justify-content: center;}
  .nowTime li:nth-child(2n){border-left: 1px solid #f1f1f1;}
  .nowTime li div img{width: 50px;margin-right: 20px;}
  .nowTime li div p{font-size: 14px;}
  .nowTime li div p:last-child{color: #999;margin-top:10px;}
  .amountDetails{display: flex;justify-content: space-between;}
  .amountDetails>div{background: #fff;width:251px;}
  .amountDetails>div:first-child{width:721px;margin-right: 10px;}
  .amountDetails>div:first-child>ul{padding: 10px 10px 10px 20px;}
  .amountDetails>div:first-child>ul>li{margin: 10px 0;}
  .amountDetails>div:first-child>ul>li:first-child{background: #f2f2f2;}
  .amountDetails>div:first-child>ul>li:first-child ol{display: flex;justify-content: center;padding: 20px 0;}
  .amountDetails>div:first-child>ul>li:first-child ol li{width:160px;height:160px;border:8px solid #ffad0e;color: #ffad0e;box-sizing:border-box;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;margin:0 30px;background: url(../../../static/img/money.png);background-repeat: no-repeat;background-position: center;}
  .amountDetails>div:first-child>ul>li:first-child ol li:nth-child(2){border-color: #69beff;color: #69beff;}
  .amountDetails>div:first-child>ul>li:first-child ol li:nth-child(3){border-color: #ff7b7b;color: #ff7b7b;}
  .amountDetails>div:first-child>ul>li:first-child ol li p{font-size: 14px;color: #666;margin-bottom: 15px;}
  .amountDetails>div:first-child>ul>li:first-child ol li p:last-child{font-size: 20px;font-weight: bold;color: inherit;}
  .amountDetails>div:first-child>ul>li:nth-child(2) p{text-align: right;}
  .amountDetails>div:first-child>ul>li:nth-child(2) p i{display: inline-block;width: 20px;height: 15px;background: url(../../../static/img/blink.png) no-repeat;cursor: pointer;margin-right: 8px;}
  .amountDetails>div:first-child>ul>li:nth-child(2) p i.no{background-image: url(../../../static/img/closeEyes.png);position: relative;
    top: -2px;}
  .amountDetails>div:first-child>ul>li:nth-child(3) ol{display: flex;justify-content: space-between;text-align: center;margin: 0 -10px;}
  .amountDetails>div:first-child>ul>li:nth-child(3) ol li{background: #f2f2f2;flex: 1;margin: 0 10px;height: 58px;display: flex;align-items: center;flex-direction: column;justify-content: center;}
  .amountDetails>div:first-child>ul>li:nth-child(3) ol li p{font-size: 14px;color: #666;}
  .amountDetails>div:first-child>ul>li:nth-child(3) ol li p:last-child{font-size: 18px;margin-top: 8px;font-weight: bold;color: #ed3432;}
  .amountDetails>div:first-child>ul>li:nth-child(4) p{font-size: 14px;text-align: right;color: #999;}
  .amountDetails>div:first-child>ul>li:nth-child(4) p span{font-size: 18px;color: #333;margin-left: 5px;}
  .amountDetails>div:last-child>ul{display: flex;flex-direction: column;align-items: center;height: 100%;justify-content: center;}
  .amountDetails>div:last-child>ul>li:nth-child(2){font-size: 18px;color: #333;margin-top: 15px;margin-bottom: 10px;}
  .amountDetails>div:last-child>ul>li:nth-child(3){font-size: 16px;color: #fff;height: 28px;padding: 0 10px;background: #ecc17c;text-align: center;line-height: 28px;border-radius: 4px;margin-bottom: 15px;}
  .amountDetails>div:last-child>ul>li:nth-child(n+4){font-size: 14px;color: #999;line-height: 25px;}
  .bonus,.teamInfo,.market{margin: 10px 0;background: #fff;padding: 15px 20px;}
  .bonus>p,.teamInfo>p,.market>p{font-size: 18px;color: #333;border-bottom: 1px solid #f1f1f1;padding-bottom: 15px;margin-bottom: 10px;display: flex;align-items: center;justify-content: space-between;}
  .bonus>p img,.teamInfo>p img,.market>p img{margin-right: 10px;position: relative;top: 3px;}
  .bonus>p b,.teamInfo>p b,.market>p b{font-size: 14px;color: #999;}

  .teamInfo>div>ul{display: flex;flex-wrap: wrap;}
  .teamInfo>div>ul>li>p{font-size: 14px;color: #333;margin-bottom: 10px;}
  .teamInfo>div>ul>li>p span{color: #999;}
  .teamInfo>div>ul>li:nth-child(1) div ol{display: flex;font-size: 14px;}
  .teamInfo>div>ul>li:nth-child(1) div ol li{box-shadow: 0 0 5px 0 #ddd;margin-right: 12px;padding: 20px;width: 215px;}
  .teamInfo>div>ul>li:nth-child(1) div ol li p:nth-child(1){text-align: center;color: #666;}
  .teamInfo>div>ul>li:nth-child(1) div ol li p:nth-child(n+2){margin-top: 15px;color: #333;}
  .teamInfo>div>ul>li:nth-child(1) div ol li p:nth-child(n+2) b{color: #ff7b7b;}
  .teamInfo>div>ul>li:nth-child(1) div ol li p:nth-child(n+2) i{display: block;height: 14px;margin-top: 7px;}
  .teamInfo>div>ul>li:nth-child(2){flex:1;display: flex;flex-direction: column;width:100%;}
  .teamInfo>div>ul>li:nth-child(2)>div{flex:1;text-align: center;font-size: 14px;overflow: auto;}
  .teamInfo>div>ul>li:nth-child(2) ul{display: flex;height: 100%;box-sizing: border-box;}
  .teamInfo>div>ul>li:nth-child(2) ul>li{flex:1;color: #333;}
  .teamInfo>div>ul>li:nth-child(2) ul>li:first-child{color:#999;}
  .teamInfo>div>ul>li:nth-child(2) ul>li:nth-child(n+2){border-left: 1px solid #ccc;}
  .teamInfo>div>ul>li:nth-child(2) ul>li ol{display: flex;flex-direction: column;}
  .teamInfo>div>ul>li:nth-child(2) ul>li ol li{flex:1;height: 41px;line-height:1.25;display: flex;align-items: center;justify-content: center;white-space: nowrap;padding: 0 10px;}
  .teamInfo>div>ul>li:nth-child(2) ul>li ol li:first-child{height:40px;line-height: 40px;}
  .teamInfo>div>ul>li:nth-child(2) ul>li ol li:nth-child(2n+1){background: #f2f2f2;}
  .teamInfo>div>ul>li:nth-child(2) ul>li:nth-child(n+2) ol li:first-child{font-weight: bold;}
  .teamInfo>div>ul>li:nth-child(2) ul>li:nth-child(n+2) ol li:nth-child(n+2){font-size: 16px;}

  .teamInfo>div>ul>li:nth-child(3){margin-top: 20px;width: 100%;}
  .market>div>ul>li>p{margin: 10px 0;}
  .market>div>ul>li:first-child>div{margin-bottom: 20px;}
</style>
