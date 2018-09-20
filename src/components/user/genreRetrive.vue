<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en114"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b style="line-height: 34px;">{{lang[lang.lang].en114}}：</b>
        <b><el-button @click="showTheWinup()">{{lang[lang.lang].en98}}</el-button></b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 10px 10px 0;">
        <el-table-column prop="name" :label="lang[lang.lang].en100" align="center"></el-table-column>
        <el-table-column :label="lang[lang.lang].en15" align="center">
          <template slot-scope="scope">
            <a href="javascript:void(0);" @click="showTheWinup(scope.row)" style="color:#4CAF50;font-size:12px;text-decoration: initial;margin: 0 5px;">{{lang[lang.lang].en103}}</a>
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
        <p><span>{{lang[lang.lang].en115}}</span><b @click="winupClose()">×</b></p>
        <ul>
          <li>
            <ol style="margin-top: -30px;">
              <li style="width: 100%;"><p><span>{{lang[lang.lang].en100}}</span><b><el-input v-model="winup.data.name"></el-input></b></p></li>
            </ol>
          </li>
          <li style="text-align: center;">
            <div>
              <a href="javascript:void(0);" @click="winupClose(1)">{{lang[lang.lang].en107}}</a>
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
          size:10
        },
        record:1,
        tableData:[
          // {
          //   id:1,
          //   cuid: "创建者编号", 
          //   name: "名称",
          //   file:"文件名",
          //   url: "文件链接", 
          //   createTime:"2016-08-29 14:48:55"
          // }
        ],
        winup:{
          isShow:false,
          data:{id:"",name:"",file:"",filedata:""}
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
        this.api(this, '/manager/genre/retrive', this.search, res => {
          console.log(res);
          this.tableData = res.items;
          this.record = res.record;
        });
      },
      winupClose(isSubmit){
        let id = this.winup.data.id;
        let name = this.winup.data.name;
        if(isSubmit){
          this.$confirm(id?this.lang[this.lang.lang].en117:this.lang[this.lang.lang].en116).then(_ => {
            this.api(this, id?'/manager/genre/modify':'/manager/genre/add', id?{id,name}:{name}, res => {
              console.log(res);
              this.init();
              // this.list = res.items;
              // this.record = res.record;
              this.winup.isShow=false;
            });
          });
        }else
          this.winup.isShow=false;
        
      },
      showTheWinup(data){
        this.winup.isShow = true;
        if(data)
          this.winup.data = {id:data.id,name:data.name};
        else
          this.winup.data = {id:"",name:""};
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
