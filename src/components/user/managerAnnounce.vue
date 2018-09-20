<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en97"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b style="line-height: 34px;">{{lang[lang.lang].en97}}</b>
        <b><el-button @click="showTheWinup()">{{lang[lang.lang].en98}}</el-button></b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 10px 10px 0;">
        <el-table-column prop="id" :label="'id'" align="center" width="50"></el-table-column>
        <el-table-column prop="cuid" :label="lang[lang.lang].en99" align="center" width="140"></el-table-column>
        <el-table-column prop="name" :label="lang[lang.lang].en100" align="center" width="180"></el-table-column>
        <el-table-column prop="file" :label="lang[lang.lang].en101" align="center" width="180">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.url" style="color: #73b2ff;">{{scope.row.file}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="lang[lang.lang].en102" align="center" width="180"></el-table-column>
        <el-table-column :label="lang[lang.lang].en15" align="center" width="140">
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
    <div class="winup listInfo" v-if="winup.isShow">
      <div style="max-height: 100%;overflow: auto;">
        <p><span>{{lang[lang.lang].en105}}</span><b @click="winupClose()">×</b></p>
        <ul>
          <li>
            <ol style="margin-top: -30px;">
              <li style="width: 100%;"><p><span>{{lang[lang.lang].en100}}</span><b><el-input v-model="winup.data.name"></el-input></b></p></li>
              <li style="width: 100%;">
                <p>
                  <span>{{lang[lang.lang].en106}}</span>
                  <b>
                    <label><input id="file" type="file" @change="upload" style="display: none;"><i style="font-size: 12px;cursor: pointer;color: #73b2ff;">{{lang[lang.lang].en109}}</i></label>
                    <span style="font-size: 12px;margin-left: 10px;">{{winup.data.file}}</span>
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
        this.api(this, '/announce/retrive', this.search, res => {
          console.log(res);
          this.tableData = res.items;
          this.record = res.record;
        });
      },
      winupClose(isSubmit){
        document.getElementById("file").value="";
        let id = this.winup.data.id;
        let formData = new FormData();
        formData.append("name",this.winup.data.name);
        if(this.winup.data.filedata)formData.append("filedata",this.winup.data.filedata);
        if(id)formData.append("id",id);
        if(isSubmit){
          this.api(this, id?'/manager/announce/modify':'/manager/announce/add', formData, res => {
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
          this.winup.data = {id:data.id,name:data.name,file:data.file,filedata:data.filedata};
        else
          this.winup.data = {id:"",name:"",file:"",filedata:""};
      },
      remove(item){
        this.$confirm(this.lang[this.lang.lang].en108).then(_ => {
          this.api(this, "/manager/announce/remove", {id:item.id}, res => {
            // this.list.splice(this.list.indexOf(item),1);
            this.init();
          });
        });
      },
      upload(e){
        // const reader = new FileReader();
        const file = e.path[0].files[0];
        console.log(file);
        console.log();
        switch(file.name.split(".").reverse()[0]){
          case "jpg":
          case "pdf":
          case "doc":
          case "docx":
          case "xls":
          case "xlsx":
            this.winup.data.file = file.name;
            this.winup.data.filedata = file;
            break;
          default:
            this.$message(this.lang[this.lang.lang].en163);
            break;
        }
        // reader.readAsDataURL(file);
        // reader.onloadend = _=> {
        //   console.log(reader);
        //   // this.imgurl = reader.result;
        //   // this.form.filedata = file;  
        // };
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
  .winup>div>ul>li:first-child ol li p>span{margin-right: 30px;color: #999;width: 180px;text-align: right;}
  .winup>div>ul>li:first-child ol li p b{font-size: 16px;}
  .winup>div>ul>li:nth-child(2){margin-top:-30px;font-size:12px;color:#999;cursor: pointer;}
  .winup>div ul li a{width: 100px;display: inline-block;margin: 0 20px 20px;}
</style>
