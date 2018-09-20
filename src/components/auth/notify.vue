<template>
  <div id="main" class="agree">
    <div v-title :data-title="lang[lang.lang].en64"></div>
    <div id="theTop">
      <div style="user-select: none;">
        <!-- <a href="javascript:void(0);"> -->
        <!-- <a href="javascript:void(0);" @click="selectLang"> -->
          <el-select style="margin-left: 10px;" v-model="lang.lang" size="mini" @change="selectLang(lang.lang)">
            <el-option :label="lang[lang.lang].en47" value="cn"></el-option>
            <el-option :label="lang[lang.lang].en48" value="en"></el-option>
          </el-select>
        <!-- </a> -->
        <!-- <a href="javascript:void(0);" @click="exit">{{lang[lang.lang].en49}}</a> -->
      </div>
    </div>
    <el-container>
      <el-aside style="width: auto;min-height: 100vh;background:#fff;width:210px;">
        <h3 class="logo" style="background: #12afe3;font-size:20px;font-weight: bold;">
          <!--<router-link style="color: #fff;text-decoration: unset;" to="index">-->
            <img src="../../../static/img/logo.png" height="55" width="138"/>
          <!--</router-link>-->
        </h3>
        
      </el-aside>
      <el-container>
        <el-header class="flex flexAlignCenter"
                   :style="'background:'+collapseAttr.bgColor+';color:#fff;height: 75px;'">
          <!--<user-header-info :lang="lang.lang" @selected="selectLang"></user-header-info>-->
        </el-header>
        <el-main>
        </el-main>
      </el-container>
    </el-container>
    <div style="width: 1200px;background: #fff;margin: 10px auto;padding: 30px;box-sizing: border-box;text-align: center;">
      <p>
        <i class="el-icon-success" v-if="isOk" style="font-size: 100px;color: #494232;"></i>
        <i class="el-icon-warning" v-else style="font-size: 100px;color: #494232;"></i>
      </p>
      <p style="font-size: 30px;margin: 50px;min-height: 30px;">{{isOk?lang[lang.lang].en65:errorTxtLang[lang.lang][errorTxt]}}</p>
      <p><a href="javascript:void(0);" style="background: #494232;color:#fff;line-height: 40px;display: inline-block;padding: 0 30px;border-radius: 5px;text-decoration: initial;" @click="exit">{{lang[lang.lang].en66}}</a></p>
    </div>
    <div class="foot">
      <p>{{lang[lang.lang].en53}} | {{lang[lang.lang].en54}} | {{lang[lang.lang].en55}} | {{lang[lang.lang].en56}} | {{lang[lang.lang].en57}}</p>
      <p>© 2018. Headwind International. All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notify',
    data() {
      const global = this.global,
        isCollapse = global.isCollapse,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.index;
      langJson.lang = lang;
      return {
        lang: langJson,
        collapseAttr,
        isOk:0,
        errorTxt:"",
        errorTxtLang:{cn:{},en:{}}
      };
    },
    methods: {
      exit() {
        this.$router.push("/");
      },
      selectLang(lang) {
        this.lang.lang = lang;
        // this.lang.lang = this.lang.lang=="cn"?"en":"cn";
        this.global.lang = this.lang.lang;
        localStorage.setItem("lang", this.lang.lang);
        // this.$router.go(0);
        this.$root.$emit("selectLang",this.lang.lang);
      },
    },
    mounted(){
      const query = this.$route.query;
      const id = query.id;
      const code = query.code;
      this.api(this, "/user/password/notify", {id,code}, res => {
        // console.log("成功",res);
        this.isOk=1;
        // 失败:{"result":"failure"}
        // 凭证不存在:{"result":"certificate"}
        // 凭证已过期:{"result":"overdue"}
        // 验证码错误:{"result":"code"}
        // 用户不存在:{"result":"user"}
        // 成功:{"result":"success"}
      },(res,errorTxtLang) => {
        this.errorTxtLang = errorTxtLang;
        this.errorTxt = res;
        // console.log("失敗",res);
      },"","","",1);
    }
  }
</script>
<style src="static/css/userCommon.css"></style>
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

  .winup>div ul li:nth-child(4),.winup>div ul li:nth-child(5){position: relative;}
  .winup>div ul li:nth-child(4){top:7px;}
  .winup>div ul li:nth-child(5){bottom:7px;}
 
  .winup>div ul li:last-child{cursor: pointer;user-select: none;}
  .winup>div ul li span{font-size: 12px;color: #4583ce;}
  .winup>div ul li i{width:10px;height:10px;border:1px solid #4583ce;border-radius:50%;display:inline-flex;vertical-align:middle;margin-right:5px;align-items: center;justify-content: center;}
  .winup>div ul li.active i:before{content:'';width: 6px;height: 6px;background: #4583ce;border-radius: 50%;}

  .foot{background: #e8e8e8;color: #999;font-size: 14px;text-align: center;padding: 15px 0;min-width: 1200px;}
  .foot p{margin: 20px 0;}

  #main.agree .el-aside > .el-menu{
    height: 0;
    margin: 0;
    min-height: 0px;
  }
  #main.agree .el-main{display: none;}
</style>
