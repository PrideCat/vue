<template>
  <div class="content theLogin" style="">
    <div v-title :data-title="lang[lang.lang].logIn"></div>
    <div>
      <!-- <div class="c_img">
      </div> -->
      <div class="c_body">
        <div>
          <p>Welcome To <span>Headwind</span></p>  
          <p>Please login to access your account</p>  
        </div>
        <div>
          <ul>
            <li style="color: #666;"><span style="font-size: 22px;color: #333;">ID</span> {{lang[lang.lang].cn1}}：</li>
            <li>
              <input type="" v-model="uid" />
              <!-- <el-input :placeholder="lang[lang.lang].contactNo" v-model="uid"></el-input> -->
              <!-- <i>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="20" height="20">
                  <path
                    d="M903.111111 938.296889a391.651556 391.651556 0 0 0-233.102222-346.510222 296.448 296.448 0 0 0 139.264-251.875556C809.244444 175.644444 676.266667 42.666667 512 42.666667S214.755556 175.644444 214.755556 339.911111c0 106.382222 55.523556 199.480889 140.003555 251.875556-134.513778 59.448889-229.176889 191.630222-233.870222 346.510222v3.925333c0 21.902222 17.208889 39.111111 39.111111 39.111111S199.111111 964.124444 199.111111 942.222222c3.896889-168.96 142.364444-305.066667 312.888889-305.066666s308.963556 136.106667 312.888889 305.066666c0 21.902222 17.208889 39.111111 39.111111 39.111111s39.111111-17.208889 39.111111-39.111111v-3.925333zM512 558.933333a218.652444 218.652444 0 0 1-219.022222-219.022222c0-121.258667 97.792-219.022222 219.022222-219.022222s218.993778 97.792 218.993778 219.022222c0 121.230222-97.735111 219.022222-218.993778 219.022222z"
                    fill="#dcdfe6"></path>
                </svg>
              </i> -->
            </li>
            <li style="margin-top: 45px;color: #666;"><span style="font-size: 22px;color: #333;">Password</span> {{lang[lang.lang].cn2}}：</li>
            <li>
              <input type="" type="password" v-model="password">
              <!-- <el-input type="password" :placeholder="lang[lang.lang].password" v-model="password"></el-input> -->
              <!-- <i>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="28" height="28">
                  <path
                    d="M486.4 609.28h51.2v138.24h-51.2zM371.2 453.12h-51.2v-102.4c0-102.4 81.92-184.32 184.32-184.32s184.32 81.92 184.32 184.32v61.44h-51.2v-61.44c0-74.24-58.88-133.12-133.12-133.12-74.24 0-133.12 58.88-133.12 133.12v102.4z"
                    fill="#dcdfe6"></path>
                  <path d="M512 593.92m-48.64 0a48.64 48.64 0 1 0 97.28 0 48.64 48.64 0 1 0-97.28 0Z"
                        fill="#dcdfe6"></path>
                  <path
                    d="M724.48 893.44H299.52c-33.28 0-58.88-25.6-58.88-58.88v-332.8c0-33.28 25.6-58.88 58.88-58.88h422.4c33.28 0 58.88 25.6 58.88 58.88v332.8c2.56 33.28-25.6 58.88-56.32 58.88zM299.52 491.52c-5.12 0-7.68 2.56-7.68 7.68v332.8c0 5.12 2.56 7.68 7.68 7.68h422.4c5.12 0 7.68-2.56 7.68-7.68v-332.8c0-5.12-2.56-7.68-7.68-7.68H299.52z"
                    fill="#dcdfe6"></path>
                </svg>
              </i> -->
            </li>
            <li style="margin-top: 45px;">
              <el-checkbox v-model="rememberMe">{{lang[lang.lang].rememberMe}}</el-checkbox>
              <span style="font-size: 14px;float: right;cursor: pointer;color: #999;" @click="forgetPassword">{{lang[lang.lang].cn3}}？</span>
            </li>
            <li>
              <el-button :class="islogin?'disabled':''" type="primary" @click="login"><b class="el-icon-loading"></b>{{lang[lang.lang].logIn}}
              </el-button>
            </li>
          </ul>  
        </div>
      </div>
      <div class="winup" v-if="winup.isShow">
        <div>
          <div><b>{{lang[lang.lang].cn4}}</b></div>
          <ol>
            <li><span>{{lang[lang.lang].cn5}} ID:</span><input type="text" :placeholder="lang[lang.lang].cn8" v-model="winup.uid"/></li>
            <li><span>{{lang[lang.lang].cn6}}:</span><input type="text" :placeholder="lang[lang.lang].cn9" v-model="winup.email"/></li>
            <li style="position: relative;"><span>{{lang[lang.lang].cn7}}:</span><input :type="passwordIsShow?'text':'password'" :placeholder="lang[lang.lang].cn10" v-model="winup.password"/><i :class="passwordIsShow?'show':'show no'" @click="passwordIsShow=!passwordIsShow" style="position: absolute;right: -5px;"></i></li>
            <li><a href="javascript:void(0);" @click="winupSubmit">{{lang[lang.lang].cn11}}</a></li>
          </ol>
          <i @click="winup.isShow=false;">×</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      const global = this.global,
        rememberMe = global.rememberMe,
        uid = rememberMe.uid,
        password = rememberMe.password,
        lang = global.lang,
        langJson = global.langJson.login;
      langJson.lang = lang;

      

      return {
        lang: langJson,
        uid,
        password,
        rememberMe: uid ? true : false,
        islogin: false,
        passwordIsShow:false,
        winup:{
          isShow:false,
          uid:"",
          email:"",
          password:""
        }
      };
    },
    methods: {
      login: function () {
        const uid = this.uid,
          password = this.password,
          langJson = this.lang[this.lang.lang];
        if(this.islogin)return;
        if (!uid) {
          this.$message(langJson.editContactNo);
          return;
        }
        if (!password) {
          this.$message(langJson.editPassword);
          return;
        }
        this.islogin = true;
        this.api(this, '/user/login', {uid, password}, res => {
          console.log(res);
          // res.agreement=0;
          // res.type=1;
          // res.activate=0;
          // if(res.type==0){
          //   this.$message.error(this.lang[this.lang.lang].consumer);
          //   this.islogin = false;
          //   return;
          // }
          if (this.rememberMe)
            localStorage.setItem("rememberMe", JSON.stringify({uid, password}));
          else
            localStorage.removeItem("rememberMe");
          // this.api(this, '/user/msg', '', res => {
            this.global.userInfo = res;
            // this.$message.success(langJson.success);
            this.islogin = false;
            sessionStorage.setItem("userInfoStorage", JSON.stringify(res));
            sessionStorage.setItem("userStorage", JSON.stringify({uid, password}));
            if(sessionStorage.getItem("inMellToLogin")=="1"){
              delete sessionStorage.inMellToLogin;
              window.location.href="../mall/index.html";
            }
            if(sessionStorage.getItem("goOrder")=="1"){
              this.$router.push('/user/order');
              delete sessionStorage.goOrder;
            }else if(sessionStorage.getItem("toMember")=="1"){
              this.$router.push('/user/index');
              delete sessionStorage.toMember;
            }
            if(this.global.userInfo.agreement==0&&!(this.global.userInfo.type==0&&(this.global.userInfo.rank==1||this.global.userInfo.rank==2))){
              this.$router.push('/user/agreement');
            }else if((this.global.userInfo.activate==0||this.global.userInfo.activate==1)&&!(this.global.userInfo.type==0&&(this.global.userInfo.rank==1||this.global.userInfo.rank==2))){
              this.$router.push('/user/activate');
            }else{
              this.$router.push('/user/index');
            }
          // }, _ => {
            // this.islogin = false;
          // });
        }, _ => {
          this.islogin = false;
        });
      },
      forgetPassword(){
        this.winup.isShow = true;
      },
      winupSubmit(){
        this.api(this, '/user/password/forget', {
          uid:this.winup.uid,
          email:this.winup.email,
          password:this.winup.password
        }, res => {
          console.log(res);
          this.$message.success(this.lang[this.lang.lang].cn12);
          this.winup.isShow = false;
        });
      }
    },
    mounted(){
      
    },
    created(){
      
    }
  }
</script>

<style scoped>
  .show{display: inline-block;width: 20px;height: 15px;background: url(../../../static/img/blink.png) no-repeat;cursor: pointer;margin-right: 8px;position: relative;right: 20px;top: 6px;}
  .show.no{background-image: url(../../../static/img/closeEyes.png);top: 4px;}
  .winup{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .winup>div{
    background: #fff;
    width: 627px;
    /*height: 283px;*/
    padding: 30px 40px;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 14px;
    position: relative;
  }
  .winup>div>i{
    position: absolute;
    background: #392b7e;
    color: #fff;
    width: 33px;
    line-height: 33px;
    text-align: center;
    border-radius: 50%;
    right: -10px;
    top: -10px;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 2px 2px 10px 0 rgba(57, 43, 126, .5);
  }
  .winup>div>div{
    border-bottom: 1px solid #f1f1f1;
  }
  .winup>div>div>b{
    background: #fff;
    position: relative;
    top: 1px;
    padding-right: 1em;
    font-size: 16px;
    color: #202a3e;
  }
  .winup>div>ol{
    padding: 15px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .winup>div>ol li{
    margin: 15px 0;
  }
  .winup>div>ol li span{
    display: inline-block;
    text-align: right;
    width: 5em;
    margin-right: 10px;
  }
  .winup>div>ol li input{
    width: 200px;
    border: 0;
    border-bottom: 1px solid #ccc;
    height: 30px;
    padding: 0 0.75em;
    box-sizing: border-box;
    outline: none;
  }
  .winup>div>ol li input:focus{
    border-color:#24428e;
  }
  .winup>div>ol li:last-child{
    margin-bottom: 0;
  }
  .winup>div>ol li a{
    background: #392b7e;
    width: 112px;
    border-radius: 18px;
    color: #fff;
    display: block;
    text-align: center;
    line-height: 36px;
    text-decoration: initial;
    box-shadow: 2px 2px 10px 0 rgba(57, 43, 126, .5);
  }

  .theLogin{
    background: url(../../../static/img/loginBg.jpg) 50% no-repeat;
    height: 100%;
    width: 100%;
    min-width: 1200px;
    max-width: 1920px;
    max-height: 1080px;
    margin: 0 auto;
    position: fixed;
  }
  .theLogin>div:last-child{
    width: 1200px;
    height: inherit;
    margin: 0 auto;
    position: relative;
  }
  .content .c_body{
    display: flex;
    justify-content: space-between;
  }
  .content .c_body>div:first-child{
    margin-left: 50px;
    margin-top: 170px;
  }
  .content .c_body>div:first-child p{
    color: #fff;
    font-size: 24px;
  }
  .content .c_body>div:first-child p:first-child{
    font-size: 50px;
    margin-bottom: 20px;
  }
  .content .c_body>div:first-child p:first-child span{
    font-weight: bold;
  }
  .content .c_body>div:last-child{
    padding: 50px;
    box-sizing: border-box;
    background: #fff;
    width: 474px;
    /*height: 440px;*/
    margin-top: 48px;
    margin-right: 43px;
    border-radius: 10px;
    box-shadow: 0 0 40px 0 rgba(0, 0, 0, .25);
  }
  .content .c_body>div:last-child ul li{
    margin: 20px 0;
  }
  .content .c_body>div:last-child ul li:last-child{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content .c_body>div:last-child input{
    border: 0;
    border-bottom: 1px solid #ccc;
    font-size: 20px;
    width: 100%;
    height: 40px;
    outline: none;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .content .c_body>div:last-child input:focus{
    border-color:#24428e;
  }
  
  /*.content .c_img {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    background: url(../../../static/img/loginBg.jpg);
    background-size: cover;
    color: #fff;
  }*/

  /*.content .c_body p {
    font-size: 22px;
    color: #fff;
    text-align: center;
  }*/


  
  /*.content .c_body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    -o-transform: translateX(-50%) translateY(-50%);
  }*/

  /*.content .c_body ul {
    width: 300px;
    margin: 50px auto;
    padding: 30px;
    background: #f9f9f9;
    position: relative;
    border-radius: 5px;
  }*/

  /*.content .c_body ul li {
    position: relative;
    margin-bottom: 15px;
  }

  .content .c_body ul li i {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    width: 30px;
    height: 30px;
  }*/

  .content .c_body ul li button {
    /*width: 300px;*/
        position: relative;
    top: 15px;
        background: #392b7e;
    height: 50px;
    border: 0;
    border-radius: 25px;
    width: 180px;
    margin: 0 auto;
    display: block;
    box-shadow: 2px 2px 10px 0 rgba(57, 43, 126, .5);
  }

  .content .c_foot {
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    background: #e7e4e7;
    width: 100%;
    line-height: 35px;
    font-size: 12px;
  }

  .el-button--primary {
    height: 40px;
  }

  .el-button--primary.disabled {
    background: #66b1ff;
    border-color: #66b1ff;
    color: transparent;
  }

  .el-button--primary.disabled .el-icon-loading {
    display: block;
    position: relative;
    top: 5px;
    font-size: 18px;
  }

  .el-button--primary.disabled .el-icon-loading:before {
    color: #fff;
  }

  .el-button--primary .el-icon-loading {
    display: none;
  }
</style>
