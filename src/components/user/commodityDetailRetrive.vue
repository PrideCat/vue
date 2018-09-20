<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en124"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b style="line-height: 34px;">
          <span>{{lang[lang.lang].en124}}：</span>
        </b>
        <b><el-button @click="showTheWinup()">{{lang[lang.lang].en98}}</el-button></b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 10px 10px 0;">
        <el-table-column prop="pic" :label="lang[lang.lang].en125" align="center">
          <template slot-scope="scope"><img width="50" height="50" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column :label="lang[lang.lang].en15" align="center">
          <template slot-scope="scope">
            <a href="javascript:void(0);" @click="showTheWinup(scope.row)" style="color:#4CAF50;font-size:12px;text-decoration: initial;margin: 0 5px;">{{lang[lang.lang].en103}}</a>
            <a href="javascript:void(0);" @click="remove(scope.row)" style="color:#F44336;font-size:12px;text-decoration: initial;margin: 0 5px;">{{lang[lang.lang].en104}}</a>
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
        <p><span>{{lang[lang.lang].en122}}</span><b @click="winupClose()">×</b></p>
        <ul>
          <li>
            <ol style="margin-top: -30px;">
              <li style="width: 100%;">
                <p>
                  <span>{{lang[lang.lang].en125}}</span>
                  <b>
                    <label><input id="file" type="file" @change="upload" style="display: none;"><i style="font-size: 12px;cursor: pointer;color: #73b2ff;">{{lang[lang.lang].en109}}</i></label>
                    <span style="font-size: 12px;margin-left: 10px;"><img v-if="winup.data.file" width="50" height="50" :src="winup.data.file"></span>
                  </b>
                </p>
              </li>
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
        userInfo = global.userInfo,
        cid = this.$route.query.id;
      langJson.lang = lang;
      return {
        lang: langJson,
        collapseAttr,
        nationalitysWin,
        nationalitys,
        userInfo,
        search:{
          cid,
          no:1,
          size:10
        },
        record:1,
        tableData:[],
        winup:{
          isShow:false,
          data:{id:"",file:"",filedata:""}
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
        this.api(this, '/manager/commodity/detail/retrive', this.search, res => {
          console.log(res);
          this.tableData = res.items;
          this.record = res.record;
        });
      },
      winupClose(isSubmit){
        document.getElementById("file").value="";
        let cid = this.search.cid;
        let id = this.winup.data.id;
        let formData = new FormData();
        formData.append("cid",cid);
        if(this.winup.data.filedata)formData.append("filedata",this.winup.data.filedata);
        if(id)formData.append("id",id);
        if(isSubmit){
          this.api(this, id?'/manager/commodity/detail/modify':'/manager/commodity/detail/add', formData, res => {
            console.log(res);
            this.init();
            // this.list = res.items;
            // this.record = res.record;
          },"","",1);
        }
        this.winup.isShow=false;
      },
      showTheWinup(data){
        this.winup.isShow = true;
        if(data)
          this.winup.data = {id:data.id,file:data.pic,filedata:""};
        else
          this.winup.data = {id:"",file:"",filedata:""};
      },
      remove(item){
        this.$confirm(this.lang[this.lang.lang].en126).then(_ => {
          this.api(this, "/manager/commodity/detail/remove", {id:item.id}, res => {
            // this.list.splice(this.list.indexOf(item),1);
            this.init();
          });
        });
      },
      upload(e){
        const reader = new FileReader();
        const file = e.path[0].files[0];
        console.log(file);
        // this.winup.data.file = file.name;
        // this.winup.data.filedata = file;
        reader.readAsDataURL(file);
        reader.onloadend = _=> {
          console.log(reader);
          switch(file.name.split(".").reverse()[0]){
            case "jpg":
            case "png":
              if(file.size>4096000){
                this.$message.error(this.lang[this.lang.lang].en162);
                // 上傳文件不可大於2048kb
              }else{
                this.winup.data.file = reader.result;
                this.winup.data.filedata = file;
              }
              break;
            default:
              this.$message(this.lang[this.lang.lang].en163);
              break;
          }
        };
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
