<template>
  <div class="tableBox">
    <div v-title :data-title="lang[lang.lang].en1"></div>
    <el-row class="flex1 searchBox" :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">&nbsp;</el-col>
      <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
        <el-input style="width:100%;" v-model="uid" :placeholder="lang[lang.lang].editsearch"></el-input>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="text-align: center;">
        <el-button @click="search()">{{lang[lang.lang].search}}</el-button>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"></el-col>
    </el-row>
    <p style="margin:10px 0;">{{lang[lang.lang].RootAlgebra}}</p>
    <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: 100%;">
      <el-table-column prop="uid" :label="lang[lang.lang].uid" align="center" width="180"></el-table-column>
      <el-table-column prop="mobile" :label="lang[lang.lang].mobile" align="center" width="180"></el-table-column>
      <el-table-column prop="compellation" :label="lang[lang.lang].compellation" align="center" width="180"></el-table-column>
      <el-table-column prop="EnglishName" :label="lang[lang.lang].EnglishName" align="center" width="180"></el-table-column>
      <el-table-column prop="createTime" :label="lang[lang.lang].create_time" align="center"
                        width="180"></el-table-column>
      <el-table-column prop="rank" :label="lang[lang.lang].rank" align="center">
        <template slot-scope="scope">
          {{scope.row.rank==1?lang[lang.lang].en2:(scope.row.rank==2?lang[lang.lang].en3:(scope.row.rank==3?lang[lang.lang].en4:(scope.row.rank==4?lang[lang.lang].en14:(scope.row.rank==5?lang[lang.lang].en15:(scope.row.rank==6?lang[lang.lang].en16:"")))))}}
        </template>
      </el-table-column>
      <el-table-column prop="level" :label="lang[lang.lang].level" align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.level==1?lang[lang.lang].en5:(scope.row.level==2?lang[lang.lang].en6:(scope.row.level==3?lang[lang.lang].en7:(scope.row.level==4?lang[lang.lang].en8:(scope.row.level==5?lang[lang.lang].en9:(scope.row.level==6?lang[lang.lang].en10:(scope.row.level==7?lang[lang.lang].en11:(scope.row.level==8?lang[lang.lang].en12:(scope.row.level==9?lang[lang.lang].en13:""))))))))}}
        </template> -->
        <template slot-scope="scope">
          {{scope.row.level==1?"無":(scope.row.level==2?"IBO":(scope.row.level==3?"Associate":(scope.row.level==4?"Partner":(scope.row.level==5?"Senior Partner":(scope.row.level==6?"Silver":(scope.row.level==7?"Gold":(scope.row.level==8?"Platinum":(scope.row.level==9?"Ruby":(scope.row.level==10?"Sapphire":(scope.row.level==11?"Emerald":(scope.row.level==12?"Jade":(scope.row.level==13?"Diamond":(scope.row.level==14?"Pink Diamond":(scope.row.level==15?"Black Diamond":(scope.row.level==16?"Royal Diamond":(scope.row.level==17?"Crown Diamond":""))))))))))))))))}}
        </template>
      </el-table-column>
      <el-table-column prop="subordinate" :label="lang[lang.lang].subordinate" align="center" width="180"></el-table-column>
      <el-table-column prop="ruid" :label="lang[lang.lang].rmobile"
                       align="center" width="180"></el-table-column>
      <el-table-column prop="referee" :label="lang[lang.lang].referee"
                       align="center" width="180"></el-table-column>
    </el-table>
    <p style="margin:10px 0;">{{lang[lang.lang].Algebra1}}</p>
    <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData1" border style="width: 100%;">
      <el-table-column prop="uid" :label="lang[lang.lang].uid" align="center" width="180"></el-table-column>
      <el-table-column prop="mobile" :label="lang[lang.lang].mobile" align="center" width="180"></el-table-column>
      <el-table-column prop="compellation" :label="lang[lang.lang].compellation" align="center" width="180"></el-table-column>
      <el-table-column prop="EnglishName" :label="lang[lang.lang].EnglishName" align="center" width="180"></el-table-column>
      <el-table-column prop="create_time" :label="lang[lang.lang].create_time" align="center"
                        width="180"></el-table-column>
      <el-table-column prop="rank" :label="lang[lang.lang].rank" align="center" width="180"></el-table-column>
      <el-table-column prop="level" :label="lang[lang.lang].level"
                       align="center" width="180"></el-table-column>
      <el-table-column prop="subordinate" :label="lang[lang.lang].subordinate" align="center" width="180"></el-table-column>
      <el-table-column prop="ruid" :label="lang[lang.lang].rmobile"
                       align="center" width="180"></el-table-column>
      <el-table-column prop="referee" :label="lang[lang.lang].referee"
                       align="center" width="180"></el-table-column>
    </el-table>
    <el-pagination :class="lang.lang" class="white" style="margin-top: 20px;text-align: center;"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page="no"
                   :page-sizes="[10, 20, 30, 40]" :page-size="size"
                   :small="true"
                   :layout="collapseAttr.paginationLayout"
                   :total="record">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "referees",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.referees,
        userInfo = global.userInfo;
      langJson.lang = lang;
      return {
        collapseAttr,
        uid: "",
        lang: langJson,
        userInfo,
        no: 1,
        size: 10,
        record: 0,
        tableData: [],
        tableData1: []
      };
    },
    methods: {
      search: function (uid) {
        var t = this;
        uid = uid ? uid : this.uid;
        if (!uid) {
          this.$message({message: this.lang[this.lang.lang].editsearch, type: "warning"});
          return;
        }
        this.api(this, '/user/refereeRetrive', {uid: uid, no: this.no, size: this.size}, res => {
          this.tableData = [res.root];
          res.items.forEach(v => {
            v.ruid = res.root.uid;
            v.referee = res.root.compellation;
          });
          this.tableData1 = res.items;
          this.record = res.record;
          document.documentElement.scrollTop = 0;
        });
      },
      handleSizeChange: function (val) {
        var t = this;
        this.size = val;
        this.api(this, '/user/refereeRetrive', {
          uid: this.uid?this.uid:this.global.userInfo.uid,
          no: this.no,
          size: this.size
        }, res => {
          console.log(res);
          res.items.forEach(function (v) {
            v.ruid = res.root.uid;
            v.referee = res.root.compellation;
          });
          this.tableData1 = res.items;
          setTimeout(function () {
            document.documentElement.scrollTop = 0;
          }, 50);
        });
      },
      handleCurrentChange: function (val) {
        var t = this;
        this.no = val;
        this.api(this, '/user/refereeRetrive', {
          uid: this.uid?this.uid:this.global.userInfo.uid,
          no: this.no,
          size: this.size
        }, res => {
          console.log(res);
          res.items.forEach(function (v) {
            v.ruid = res.root.uid;
            v.referee = res.root.compellation;
          });
          this.tableData1 = res.items;
          document.documentElement.scrollTop = 0;
        });
      }
    },
    mounted() {
      this.search(this.global.userInfo.uid);
    },
    created(){
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
      })
    }
  }
</script>

<style scoped>

</style>
