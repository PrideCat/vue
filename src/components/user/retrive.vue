<template>
  <div id="retrive">
    <div v-title :data-title="lang[lang.lang].en47"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b style="line-height: 34px;">
          <span>{{lang[lang.lang].en47}}：</span>
        </b>
        <b>
          <span>{{lang.lang=='cn'?"類型":"Type"}}：</span>
          <el-select v-model="search.type" @change="init">
            <el-option :label="lang.lang=='cn'?'全部':'All'" :value="'-1'"></el-option>
            <el-option :label="lang.lang=='cn'?'直推獎':'Direct Award'" :value="'0'"></el-option>
            <el-option :label="lang.lang=='cn'?'團隊獎':'Team Award'" :value="'2'"></el-option>
            <el-option :label="lang.lang=='cn'?'輔導獎':'Counseling Award'" :value="'1'"></el-option>
            <el-option :label="lang.lang=='cn'?'創業獎':'Business Award'" :value="'3'"></el-option>
            <el-option :label="lang.lang=='cn'?'晉升獎':'Promotion Award'" :value="'4'"></el-option>
            <!-- <el-option :label="lang.lang=='cn'?'領導獎':'Leadership Award'" :value="'5'"></el-option>
            <el-option :label="lang.lang=='cn'?'本地分紅':'Local Dividend'" :value="'6'"></el-option>
            <el-option :label="lang.lang=='cn'?'環球分紅':'Global Dividend'" :value="'7'"></el-option> -->
          </el-select>
        </b>
        <b>
          <span>
            <span>{{lang[lang.lang].en48}}：</span>
            <el-date-picker v-model="search.startDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;" @change="init"></el-date-picker>
            <span style="margin: 0 5px;">{{lang[lang.lang].en49}}</span>
            <el-date-picker v-model="search.endDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;" @change="init"></el-date-picker>
          </span>
          <el-button style="margin-left: 20px;" @click="daochu">{{lang.lang=='cn'?"導出":'Export'}}</el-button>
        </b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 0 10px;">
        <el-table-column prop="type" :label="lang.lang=='cn'?'類型':'Type'" align="center">
          <template slot-scope="scope">
            <span>
              {{
                scope.row.type=="0"?(lang.lang=='cn'?"直推獎":"Direct Award"):
                (scope.row.type=="1"?(lang.lang=='cn'?"輔導獎":"Counseling Award"):
                (scope.row.type=="2"?(lang.lang=='cn'?"團隊獎":"Team Award"):
                (scope.row.type=="3"?(lang.lang=='cn'?"創業獎":"Business Award"):
                (scope.row.type=="4"?(lang.lang=='cn'?"晉升獎":"Promotion Award"):
                (scope.row.type=="5"?(lang.lang=='cn'?"領導獎":"Leadership Award"):
                (scope.row.type=="6"?(lang.lang=='cn'?"本地分紅":"Local Dividend"):
                (scope.row.type=="7"?(lang.lang=='cn'?"環球分紅":"Global Dividend"):"")))))))
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="money" :label="lang.lang=='cn'?'獎金':'Bonus'" align="center" width="120"></el-table-column>
        <el-table-column prop="createTime" :label="lang.lang=='cn'?'獎勵時間':'Reward Time'" align="center" width="200"></el-table-column>
        <el-table-column prop="trace" :label="lang.lang=='cn'?'狀態':'Status'" align="center" width="120">
          <template slot-scope="scope">
            <span>
              {{
                scope.row.trace=="0"?(lang.lang=='cn'?"未結算":"Unsettlement"):
                (scope.row.trace=="1"?(lang.lang=='cn'?"已結算":"Settled"):"")
              }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :class="lang.lang" class="white" style="margin-top: 20px;text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.no" :page-sizes="[10, 20, 30, 40]" :page-size="search.size" :small="true" :layout="collapseAttr.paginationLayout" :total="record">
      </el-pagination>
    </div>
    <!-- <div class="winup" v-if="winup.isShow">
      <div>
        <p><span>{{lang[lang.lang].en56}}</span><b @click="winupClose">×</b></p>
        <ul>
          <li style="max-height: 50vh;overflow: auto;">
            <table>
              <tbody>
                <tr>
                  <td>{{lang[lang.lang].en57}}</td>
                  <td>{{userInfo.uid}}</td>
                </tr>
                <tr>
                  <td>{{lang[lang.lang].en58}}</td>
                  <td>{{userInfo.compellation}}</td>
                </tr>
                <tr>
                  <td>{{lang[lang.lang].en48}}</td>
                  <td>{{winup.data.date}}</td>
                </tr>
                <tr>
                  <td>1.{{lang[lang.lang].en51}}</td>
                  <td>{{winup.data.rewards[0].money}}</td>
                </tr>
                <tr>
                  <td>2.{{lang[lang.lang].en52}}</td>
                  <td>{{winup.data.rewards[1].money}}</td>
                </tr>
                <tr>
                  <td>3.{{lang[lang.lang].en53}}</td>
                  <td>{{winup.data.rewards[2].money}}</td>
                </tr>
                <tr>
                  <td>4.{{lang[lang.lang].en54}}</td>
                  <td>{{winup.data.rewards[3].money}}</td>
                </tr>
                <tr>
                  <td>5.{{lang[lang.lang].en167}}</td>
                  <td>{{winup.data.rewards[4].money}}</td>
                </tr>
                <tr>
                  <td>6.{{lang[lang.lang].en168}}</td>
                  <td>{{winup.data.rewards[5].money}}</td>
                </tr>
                <tr>
                  <td>7.{{lang[lang.lang].en169}}</td>
                  <td>{{winup.data.rewards[6].money}}</td>
                </tr>
                <tr>
                  <td>8.{{lang[lang.lang].en170}}</td>
                  <td>{{winup.data.rewards[7].money}}</td>
                </tr>
                <tr>
                  <td>{{lang[lang.lang].en59}}</td>
                  <td>{{(winup.data.rewards[0].money+winup.data.rewards[1].money+winup.data.rewards[2].money+winup.data.rewards[3].money+winup.data.rewards[4].money+winup.data.rewards[5].money+winup.data.rewards[6].money+winup.data.rewards[7].money).toFixed(2)}}</td>
                </tr>
              </tbody>
            </table>
          </li>
          <li><a href="javascript:void(0);" @click="winupClose">{{lang[lang.lang].en60}}</a></li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
const getNumber = function(number) {
  return number < 10 ? "0" + number : number;
};
var idTmr;
function  getExplorer() {
    var explorer = window.navigator.userAgent ;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if(explorer.indexOf("Chrome") >= 0){
        return 'Chrome';
    }
    //Opera
    else if(explorer.indexOf("Opera") >= 0){
        return 'Opera';
    }
    //Safari
    else if(explorer.indexOf("Safari") >= 0){
        return 'Safari';
    }
}
function method5(tableid) {
    if(getExplorer()=='ie')
    {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;

        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("Cleanup();", 1);
        }

    }
    else
    {
        tableToExcel(tableid)
    }
}
function Cleanup() {
    window.clearInterval(idTmr);
    CollectGarbage();
}
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
            base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g,
                        function(m, p) { return c[p]; }) }
    return function(table, name) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
      // window.location.href = uri + base64(format(template, ctx))
      var downloadUrl = uri + base64(format(template, ctx))
      var anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = "我的奖金.xls";
      anchor.click();
    }
})();
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
    let searchStartDate =searchDate.getFullYear() +"-" +getNumber(searchDate.getMonth() + 1) +"-" +getNumber(searchDate.getDate());
    searchDate.setDate(searchDate.getDate() +1);
    let searchEndDate =searchDate.getFullYear() +"-" +getNumber(searchDate.getMonth() + 1) +"-" +getNumber(searchDate.getDate());
    return {
      lang: langJson,
      collapseAttr,
      userInfo,
      search: {
        no: 1,
        size: 10,
        type:"-1",
        // startDate:`${mYear}-${mMonth}-01`,
        // endDate:`${mYear}-${mMonth}-${mDay}`
        startDate: searchStartDate,
        endDate: searchEndDate
      },
      record: 0,
      tableData: [],
      winup: {
        isShow: false,
        data: ""
      }
    };
  },
  methods: {
    handleSizeChange: function(val) {
      this.search.size = val;
      this.init();
    },
    handleCurrentChange: function(val) {
      this.search.no = val;
      this.init();
    },
    init() {
      let search = JSON.parse(JSON.stringify(this.search));
      if(search.type==="-1")delete search.type;
      this.api(this, "/reward/retrive", search, res => {
        console.log(res);
        // res.items.forEach(v => {
        //   for (let i = 0; i < 8; i++) {
        //     if (!v.rewards[i]) {
        //       v.rewards.push({ date: v.date, money: 0, type: i });
        //     }
        //   }
        // });
        this.tableData = res.items;
        this.record = res.record;
      });
    },
    winupClose() {
      this.winup.isShow = false;
      this.winup.data = "";
    },
    showTheWinup(data) {
      this.winup.isShow = true;
      this.winup.data = data;
    },
    daochu(){
      // vue, apiName, params, callback, errorCallback, allData, isForm, isAsync, arePop
      // let form = new FormData();
      // for(let k in this.search){
      //   if(k=="startDate"||k=="endDate")
      //     form.append(k,new Date(this.search[k].split("-")[0],this.search[k].split("-")[1],this.search[k].split("-")[2],0,0,0,0));
      //   else
      //     form.append(k,this.search[k]);
      //   console.log(k,this.search[k]);
      // }
      // console.log(form);
      // this.api(this, "/reward/export", form, res => {
      //   // console.log(res);
      // },'',1,1);
      // return;
      const tableDom = window.document.getElementsByClassName("el-table__body")[0];
      tableDom.id="daochuTable";
      method5("daochuTable");
    }
  },
  mounted() {
    this.init();
  },
  created() {
    this.$root.$on("selectLang", res => {
      this.lang.lang = res;
    });
    // window.document.getElementsByClassName("el-table__body")[0].id="el-table";
    // method5("el-table");
  }
};
</script>

<style scoped>
.items > li {
  border: 1px solid #cfcfcf;
  background: #f1f1f1;
  font-size: 14px;
  margin: 20px 10px;
}
.items > li div:first-child p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  padding: 0 20px;
}
.items > li div:nth-child(2) ol {
  background: #fff;
}
.items > li div ol {
  display: flex;
  height: 50px;
  align-items: center;
  text-align: center;
}
.items > li div ol li {
  flex: 1;
}
.winup > div ul li:first-child {
  width: 90%;
  line-height: 41px;
}
.winup > div ul li:first-child table {
  width: 100%;
}
.winup > div ul li:first-child table td {
  border: 1px solid #ccc;
  padding: 0 10px;
}
.winup > div ul li:first-child table tr td:first-child {
  width: 40%;
  text-align: right;
}
.winup > div ul li:first-child table tr:nth-child(2n) {
  background: #f9f9f9;
}
</style>
