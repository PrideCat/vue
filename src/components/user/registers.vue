<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en6"></div>
    <el-table :data="tableData" border style="width: 100%;" @row-click="clickTable">
      <el-table-column prop="createTime" :label="lang[lang.lang].createTime"
                       align="center" width="180"></el-table-column>
      <el-table-column prop="compellation" :label="lang[lang.lang].compellation"
                       align="center" width="120"></el-table-column>
      <el-table-column prop="EnglishName" :label="lang[lang.lang].EnglishName"
                       align="center" width="120"></el-table-column>
      <el-table-column prop="email" align="center" :label="lang[lang.lang].email" width="180"></el-table-column>
      <el-table-column prop="phone" align="center" :label="lang[lang.lang].phone" width="180"></el-table-column>
      <el-table-column prop="uid" align="center" :label="lang[lang.lang].uid" width="180"></el-table-column>
    </el-table>
    <el-pagination :class="lang.lang" style="margin-top: 20px;text-align: center;"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page="no"
                   :page-sizes="[10, 20, 30, 40]" :page-size="size"
                   :small="true"
                   :layout="collapseAttr.paginationLayout"
                   :total="record">
    </el-pagination>
    <div class="winup" v-if="winup.data&&winup.isShow">
      <div>
        <p><span>{{lang[lang.lang].en2}}</span><b @click="winupClose">×</b></p>
        <ul>
          <li>
            <table>
              <tbody>
                <tr>
                  <td>{{lang[lang.lang].uid}}</td>
                  <td>{{winup.data.uid}}</td>
                </tr>
                <!-- <tr>
                  <td>{{lang[lang.lang].en3}}:</td>
                  <td>{{nationalitysWin[winup.data.country][lang.lang]}}</td>
                </tr>
                <tr>
                  <td>{{lang[lang.lang].en4}}:</td>
                  <td>{{nationalitys[winup.data.nationality][lang.lang]}}</td>
                </tr> -->
                <tr>
                  <td>{{lang[lang.lang].en7}}:</td>
                  <td>{{winup.data.ruid}}</td>
                </tr>
                <tr>
                  <td>{{lang[lang.lang].en8}}:</td>
                  <td>{{winup.data.suid}}</td>
                </tr>
                <tr>
                  <td>{{lang[lang.lang].en9}}:</td>
                  <td>{{winup.data.track=="0"?"A":"B"}}</td>
                </tr>
              </tbody>
            </table>
          </li>
          <li><a href="javascript:void(0);" @click="winupClose">{{lang[lang.lang].en5}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "registers",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.registers,
        nationalitysWin = global.nationalitysWin,
        nationalitys = global.nationalitys;
      langJson.lang = lang;
      return {
        collapseAttr,
        lang: langJson,
        nationalitysWin,
        nationalitys,
        no: 1,
        size: 10,
        record: 0,
        tableData: [],
        winup:{
          isShow:false,
          data:""
        }
      };
    },
    methods: {
      handleSizeChange(val) {
        this.size = val;
        this.api(this, '/user/registerRetrive', {type:1, no: this.no, size: this.size}, res => {
          this.tableData = res.items;
          setTimeout(function () {
            document.documentElement.scrollTop = 0;
          }, 50);
        });
      },
      handleCurrentChange(val) {
        this.no = val;
        this.api(this, '/user/registerRetrive', {type:1, no: this.no, size: this.size}, res => {
          this.tableData = res.items;
          document.documentElement.scrollTop = 0;
        });
      },
      clickTable(row, event, column){
        this.winup.data = row;
        this.winup.isShow = true;
      },
      winupClose(){
        this.winup.isShow = false;
        this.winup.data = "";
      }
    },
    mounted() {
      this.api(this, '/user/registerRetrive', {type:1, no: this.no, size: this.size}, res => {
        this.tableData = res.items;
        this.no = res.no;
        this.record = res.record;
        console.log(res);
      });
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
