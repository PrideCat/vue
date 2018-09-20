<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en61"></div>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b>
          <span>{{lang[lang.lang].en21}}</span>
          <el-select v-model="search.type" @change="init">
            <el-option :label="lang[lang.lang].en22" :value="'0'"></el-option>
            <el-option :label="lang[lang.lang].en23" :value="'1'"></el-option>
          </el-select>
        </b>
        <b>
          <span>{{lang[lang.lang].en24}}</span>
          <el-select v-model="search.activate" @change="init">
            <el-option :label="lang[lang.lang].en25" :value="'0'"></el-option>
            <el-option :label="lang[lang.lang].en26" :value="'1'"></el-option>
            <el-option :label="lang[lang.lang].en27" :value="'2'"></el-option>
          </el-select>  
        </b>
        <b>
          <span>{{lang[lang.lang].en62}}</span>
          <el-input v-model="search.uid"></el-input>
        </b>
        <b>
          <el-button @click="init">{{lang[lang.lang].en7}}</el-button>  
        </b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 0 10px;">
        <el-table-column prop="uid" :label="lang[lang.lang].en19" align="center" width="120"></el-table-column>
        <el-table-column prop="compellation" :label="lang[lang.lang].en63" align="center" width="120"></el-table-column>
        <el-table-column prop="EnglishName" :label="lang[lang.lang].en164" align="center" width="120"></el-table-column>
        <el-table-column prop="mobile" :label="lang[lang.lang].en20" align="center" width="180"></el-table-column>
        <el-table-column prop="phone" :label="lang[lang.lang].en165" align="center" width="180"></el-table-column>
        <el-table-column prop="email" :label="lang[lang.lang].en64" align="center" width="180"></el-table-column>
        <el-table-column prop="type" :label="lang[lang.lang].en21" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.type==0?lang[lang.lang].en22:lang[lang.lang].en23 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="activate" :label="lang[lang.lang].en24" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.activate==0?lang[lang.lang].en25:(scope.row.activate==1?lang[lang.lang].en26:lang[lang.lang].en27) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="lang[lang.lang].en15" align="center" width="120">
          <template slot-scope="scope">
            <b style="margin-right: 10px;" v-if="userInfo.authority==2&&scope.row.activate==2">
              <a href="javascript:void(0);" v-if="scope.row.authority==0" @click="authorize(scope.row.uid,1)" style="color:#4CAF50;font-size:12px;">{{lang[lang.lang].en157}}</a>
              <a href="javascript:void(0);" v-if="scope.row.authority==1" @click="authorize(scope.row.uid,0)" style="color:#F44336;font-size:12px;">{{lang[lang.lang].en158}}</a>
            </b>
            <a href="javascript:void(0);" v-if="scope.row.type==1&&scope.row.activate==1" @click="showTheWinup(scope.row)" style="color:#494232;font-size:12px;">{{lang[lang.lang].en65}}</a>
            <a href="javascript:void(0);" v-else @click="showTheWinup(scope.row)" style="color:#494232;font-size:12px;">{{lang[lang.lang].en17}}</a>
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
      <div>
        <p><span>{{lang[lang.lang].en66}}</span><b @click="winupClose()">×</b></p>
        <ul>
          <li>
            <ol style="margin-top: -30px;">
              <li><!-- 編號 -->
                <p><span>{{lang[lang.lang].en19}}</span><b>{{winup.data.uid}}</b></p>
              </li>
              <li v-if="winup.data.type!=1||winup.data.activate!=1"><!-- 會員 -->
                <p><span>{{lang[lang.lang].en21}}</span><b>{{winup.data.type==0?lang[lang.lang].en22:lang[lang.lang].en23}}</b></p>
              </li>
              <li><!-- 中文姓名 -->
                <p><span>{{lang[lang.lang].en63}}</span><b>{{winup.data.compellation}}</b></p>
              </li>
              <li><!-- 英文姓名 -->
                <p><span>{{lang[lang.lang].en164}}</span><b>{{winup.data.EnglishName}}</b></p>
              </li>

              <li><!-- 電話號碼 -->
                <p><span>{{lang[lang.lang].en165}}</span><b>{{winup.data.phone}}</b></p>
              </li>
              <li><!-- 手機號 -->
                <p><span>{{lang[lang.lang].en20}}</span><b>{{winup.data.mobile}}</b></p>
              </li>

              <li>
                <p><span>{{lang[lang.lang].en69}}</span><b>{{winup.data.nickname}}</b></p>
              </li>
              <li v-if="winup.data.type!=1||winup.data.activate!=1"><!-- 激活狀態 -->
                <p><span>{{lang[lang.lang].en24}}</span><b>{{winup.data.activate==0?lang[lang.lang].en25:(winup.data.activate==1?lang[lang.lang].en26:lang[lang.lang].en27)}}</b></p>
              </li>

              <!-- <li>
                <p><span>{{lang[lang.lang].en28}}</span><b>{{nationalitysWin[winup.data.country]?nationalitysWin[winup.data.country][lang.lang]:nationalitysWin[winup.data.country]}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en29}}</span><b>{{nationalitys[winup.data.nationality]?nationalitys[winup.data.nationality][lang.lang]:nationalitys[winup.data.nationality]}}</b></p>
              </li> -->

              <li>
                <p><span>{{lang[lang.lang].en67}}</span><b>{{winup.data.ruid}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en68}}</span><b>{{winup.data.suid}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en64}}</span><b>{{winup.data.email}}</b></p>
              </li>
              
              <li>
                <p><span>{{lang[lang.lang].en70}}</span><b>{{winup.data.birthday}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en71}}</span><b>{{winup.data.sex==0?lang[lang.lang].en72:(winup.data.sex==1?lang[lang.lang].en73:lang[lang.lang].en74)}}</b></p>
              </li>
              <li><!-- 微信號 -->
                <p><span>{{lang[lang.lang].en166}}</span><b>{{winup.data.wechatNumber}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en33}}</span><b>{{winup.data.identification}}</b></p>
              </li>
              <li style="width: 100%;">
                <p><span>{{lang[lang.lang].en34}}</span><b><img style="width: 400px;" :src="winup.data.identificationPic"></b></p>
              </li>
              <!-- <li>
                <p><span>{{lang[lang.lang].en75}}</span><b>{{winup.data.property==0?lang[lang.lang].en76:lang[lang.lang].en77}}</b></p>
              </li> -->
              <li>
                <p><span>{{lang[lang.lang].en35}}</span><b>{{winup.data.seat}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en36}}</span><b>{{winup.data.address}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].en37}}</span><b>{{winup.data.postal}}</b></p>
              </li>
              <li v-if="winup.data.type!=1||winup.data.activate!=1">
                <p><span>{{lang[lang.lang].en38}}</span><b>{{winup.data.bankName}}</b></p>
              </li>
              <li v-if="winup.data.type!=1||winup.data.activate!=1">
                <p><span>{{lang[lang.lang].en39}}</span><b>{{winup.data.bankAccount}}</b></p>
              </li>
              <li v-if="winup.data.type!=1||winup.data.activate!=1">
                <p><span>{{lang[lang.lang].en40}}</span><b>{{winup.data.bankUser}}</b></p>
              </li>
              <li v-if="winup.data.type!=1||winup.data.activate!=1" style="width: 100%;">
                <p><span>{{lang[lang.lang].en41}}</span><b><img style="width: 400px;" :src="winup.data.bankPic"></b></p>
              </li>
            </ol>
          </li>
          <li style="text-align: center;">
            <div v-if="winup.data.type==1&&winup.data.activate==1">
              <a href="javascript:void(0);" @click="winupClose(winup.data.uid)">{{lang[lang.lang].en42}}</a>
              <a href="javascript:void(0);" @click="winupClose(winup.data.uid,1)" style="background: #868175;">{{lang[lang.lang].en43}}</a>
            </div>
            <div v-else>
              <a href="javascript:void(0);" @click="winupClose()" style="background: #868175;">{{lang[lang.lang].en44}}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userRetrive",
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
          size:10,
          activate:'1',
          type:'1',
          uid:""
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
        this.api(this, '/manager/user/retrive', this.search, res => {
          console.log(res);
          this.tableData = res.items;
          this.record = res.record;
        });
      },
      winupClose(uid,isNo){
        if(uid){
          this.winup.isShow = false;
          this.$confirm(isNo?this.lang[this.lang.lang].en112:this.lang[this.lang.lang].en113).then(_ => {
            this.api(this, '/manager/user/audit', {uid,activate:isNo?0:2}, res => {
              console.log(res);
              this.init();
              this.$message.success(isNo?this.lang[this.lang.lang].en78:this.lang[this.lang.lang].en79);
            });  
          })
        }else{
          this.winup.isShow = false;
        }
      },
      showTheWinup(data){
        this.winup.isShow = true;
        this.winup.data = data;
      },
      authorize(uid,authority){
        this.$confirm(authority==1?this.lang[this.lang.lang].en159:this.lang[this.lang.lang].en160).then(_ => {
          this.api(this, '/manager/user/authority', {uid,authority}, res => {
            console.log(res);
            this.init();
          }); 
        });
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
