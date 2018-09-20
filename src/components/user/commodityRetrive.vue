<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en118"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b>
          <span>{{lang[lang.lang].en119}}：</span>
          <el-select v-model="search.genre" @change="init">
            <el-option :label="item.name" :value="item.id" v-for="item in genre"></el-option>
          </el-select>
          <span style="margin-left: 30px;">{{lang[lang.lang].en100}}：</span>
          <el-input v-model="search.name" @input="init"></el-input>
        </b>
        <b><el-button @click="showTheWinup()">{{lang[lang.lang].en98}}</el-button></b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 10px 10px 0;">
        <el-table-column prop="name" :label="lang[lang.lang].en100" align="center"></el-table-column>
        <el-table-column prop="genre" :label="lang[lang.lang].en119" align="center">
          <template slot-scope="scope"><b v-if="item.id==scope.row.genre" v-for="item in genre">{{item.name}}</b></template>
        </el-table-column>
        <el-table-column prop="money" :label="lang[lang.lang].en90" align="center"></el-table-column>
        <el-table-column prop="pic" :label="lang[lang.lang].en121" align="center">
          <template slot-scope="scope"><img width="50" height="50" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column :label="lang[lang.lang].en15" align="center" width="135">
          <template slot-scope="scope">
            <a href="javascript:void(0);" @click="toDetails(scope.row.id)" style="color:#73b2ff;font-size:12px;text-decoration: initial;margin: 0 5px;">{{lang[lang.lang].en120}}</a>
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
                  <span>{{lang[lang.lang].en119}}</span>
                  <b>
                    <el-select v-model="winup.data.genre" @change="init">
                      <el-option :label="item.name" :value="item.id" v-for="item in genre"></el-option>
                    </el-select>
                  </b>
                </p>
              </li>
              <li style="width: 100%;"><p><span>{{lang[lang.lang].en100}}</span><b><el-input v-model="winup.data.name"></el-input></b></p></li>
              <li style="width: 100%;">
                <p>
                  <span>{{lang[lang.lang].en121}}</span>
                  <b>
                    <label><input id="file" type="file" @change="upload" style="display: none;"><i style="font-size: 12px;cursor: pointer;color: #73b2ff;">{{lang[lang.lang].en109}}</i></label>
                    <span style="font-size: 12px;margin-left: 10px;"><img v-if="winup.data.file" width="50" height="50" :src="winup.data.file"></span>
                  </b>
                </p>
              </li>
              <li style="width: 100%;"><p><span>{{lang[lang.lang].en90}}</span><b><el-input type="number" v-model="winup.data.money"></el-input></b></p></li>
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
        genre:[],
        search:{
          genre:"",
          name:"", 
          no:1,
          size:10
        },
        record:1,
        tableData:[],
        winup:{
          isShow:false,
          data:{id:"",name:"",file:"",filedata:"",genre:"",money:""}
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
        this.api(this, '/manager/commodity/retrive', this.search, res => {
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
        formData.append("genre",this.winup.data.genre);
        formData.append("money",this.winup.data.money);
        if(this.winup.data.filedata)formData.append("filedata",this.winup.data.filedata);
        if(id)formData.append("id",id);
        if(isSubmit){
          this.api(this, id?'/manager/commodity/modify':'/manager/commodity/add', formData, res => {
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
          this.winup.data = {id:data.id,name:data.name,file:data.pic,filedata:"",genre:data.genre,money:data.money};
        else
          this.winup.data = {id:"",name:"",file:"",filedata:"",genre:"",money:""};
      },
      remove(item){
        this.$confirm(this.lang[this.lang.lang].en123).then(_ => {
          this.api(this, "/manager/commodity/remove", {id:item.id}, res => {
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
          console.log(reader);
        };
      },
      toDetails(id){
        console.log(id)
        this.$router.push({name:'commodityDetailRetrive',query:{id:id}});
      }
    },
    mounted(){
      this.api(this, '/manager/genre/retrive', {no:1,size:10}, res => {
        console.log(res);
        this.genre = res.items;
        this.search.genre = res.items[0].id;
        this.init();
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
