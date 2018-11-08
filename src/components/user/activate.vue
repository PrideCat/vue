<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en9"></div>
    <div v-if="userInfo.activate==1" style="padding: 10px;margin-bottom: 10px;text-align: center;background: #f56c6c;color: #fff;">{{lang[lang.lang].en1}}</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
      <div class="fromBox">
        <p class="tab">
          <a :class="form.property==0?'active':''" href="javascript:void(0);" @click="hasActivate?'':form.property=0">{{lang[lang.lang].en2}}</a>
          <a :class="form.property==1?'active':''" href="javascript:void(0);"  @click="hasActivate?'':form.property=1">{{lang[lang.lang].en3}}</a>
        </p>
        <div :style="collapseAttr.formBoxStyle">
          <!-- <el-form-item :label="lang[lang.lang].country" prop="country">{{nationalitysWin[0][lang.lang]}}</el-form-item>
          <el-form-item :label="lang[lang.lang].nationality" prop="nationality">{{nationalitys[0][lang.lang]}}</el-form-item> -->
          <div v-if="form.property==1">
            <el-form-item :label="lang[lang.lang].company" prop="company">
              <el-input v-model="form.company" :placeholder="lang[lang.lang].editcompany"></el-input>
            </el-form-item>
            <el-form-item :label="lang[lang.lang].EnglishCompany" prop="EnglishCompany">
              <el-input v-model="form.EnglishCompany" :placeholder="lang[lang.lang].editEnglishCompany"></el-input>
            </el-form-item>
            <!-- <el-form-item :label="lang[lang.lang].legalPerson" prop="legalPerson">
              <el-input v-model="form.legalPerson" :placeholder="lang[lang.lang].editlegalPerson"></el-input>
            </el-form-item> -->
            <el-form-item :label="lang[lang.lang].businessLicense" prop="businessLicense">
              <el-input v-model="form.businessLicense" :placeholder="lang[lang.lang].editbusinessLicense"></el-input>
            </el-form-item>
          </div>
          <el-form-item :label="lang[lang.lang].compellation" prop="compellation">
            <el-input v-model="form.compellation" :placeholder="lang[lang.lang].editcompellation"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].EnglishName" prop="EnglishName">
            <el-input v-model="form.EnglishName" :placeholder="lang[lang.lang].editEnglishName"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].phone" prop="phone">
            <!-- <el-select v-model="nationality22" :placeholder="lang[lang.lang].editnationality" @change="nationalityChange1" style="width: 100px;">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select> -->
            <el-input v-model="form.phone" :placeholder="lang[lang.lang].editphone" _style="width: 155px;"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].mobile" prop="mobile">
            <!-- <el-select v-model="nationality22" :placeholder="lang[lang.lang].editnationality" @change="nationalityChange1" style="width: 100px;">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select> -->
            <el-input v-model="form.mobile" :placeholder="lang[lang.lang].editmobile" _style="width: 155px;"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].identification" prop="identification">
            <!-- <el-select v-model="nationality11" :placeholder="lang[lang.lang].editnationality" @change="nationalityChange1" style="width: 100px;">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select> -->
            <el-input v-model="form.identification" :placeholder="lang[lang.lang].editidentification" _style="width: 155px;"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].en4" prop="filedata">
            <el-upload action="http://148.66.63.170:7070/dsTest/user/activate" :http-request="request" list-type="picture" name="filedata" :file-list="file" ref="upload">
              <el-button style="position: relative;margin-left: 0px;top: 22px;" size="small" type="primary">{{lang[lang.lang].en5}}</el-button>
              <div slot="tip" style="position: relative;top: 5px;" class="el-upload__tip">{{lang[lang.lang].en6}}</div>
            </el-upload>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].nickname">
            <el-input v-model="form.nickname" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].birthday">
            <el-date-picker v-model="form.birthday" type="date"
                            :placeholder="lang[lang.lang].editbirthday"></el-date-picker>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].sex">
            <el-radio-group v-model="form.sex">
              <el-radio label="0">{{lang[lang.lang].sex1}}</el-radio>
              <el-radio label="1">{{lang[lang.lang].sex2}}</el-radio>
              <!-- <el-radio label="2">{{lang[lang.lang].sex3}}</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].wechatNumber">
            <el-input v-model="form.wechatNumber" :placeholder="lang[lang.lang].editwechatNumber"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].email" prop="email">
            <el-input v-model="form.email" :placeholder="lang[lang.lang].editemail"></el-input><b v-if="hasEmail" style="border:1px solid #ccc;font-size:12px;padding:1px 5px;background:#f1f1f1;color:#606266;cursor:pointer;position: relative;right: 72px;" @click="getCode" ref="email">{{lang.lang=='cn'?"獲取驗證碼":'get verification code'}}</b>
          </el-form-item>
          <el-form-item :label="lang.lang=='cn'?'驗證碼':'Verification Code'" prop="code" v-if="hasCode">
            <el-input v-model="form.code" :placeholder="lang.lang=='cn'?'請輸入驗證碼':'please enter verification code'"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="'訂閱廣告郵箱'" prop="email">
            <el-radio-group v-model="form.property">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item :label="lang[lang.lang].seat" prop="seat">
            <el-select v-model="form.seat" :placeholder="lang[lang.lang].editseat">
              <el-option v-for="item in area" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].address" prop="address">
            <el-input type="textarea" v-model="form.address" :placeholder="lang[lang.lang].editaddress"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].postal" prop="postal">
            <el-input v-model="form.postal" :placeholder="lang[lang.lang].editpostal"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].password" prop="password">
            <el-input v-model="form.password" type="password" :placeholder="lang[lang.lang].editpassword"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].password1" prop="password1">
            <el-input v-model="form.password1" type="password" :placeholder="lang[lang.lang].editpassword1"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].paymentPassword" prop="paymentPassword">
            <el-input v-model="form.paymentPassword" type="password" :placeholder="lang[lang.lang].editpaymentPassword"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].paymentPassword1" prop="paymentPassword1">
            <el-input v-model="form.paymentPassword1" type="password" :placeholder="lang[lang.lang].editpaymentPassword1"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="fromBox">
        <div :style="collapseAttr.formBoxStyle">
         <el-form-item style="margin:10px 0;margin-left: -70px;">
            <el-button :disabled="userInfo.activate==1?true:false" style="width:200px;" type="primary" @click="onSubmit">{{lang[lang.lang].submit}}</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  function IsHKID(str) {
   var strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
   // basic check length
   if (str.length < 8)
   return false;
   // handling bracket
   if (str.charAt(str.length-3) == '(' && str.charAt(str.length-1) == ')')
   str = str.substring(0, str.length - 3) + str.charAt(str.length -2);
   // convert to upper case
   str = str.toUpperCase();
   // regular expression to check pattern and split
   var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
   var matchArray = str.match(hkidPat);
   // not match, return false
   if (matchArray == null)
   return false;
   // the character part, numeric part and check digit part
   var charPart = matchArray[1];
   var numPart = matchArray[2];
   var checkDigit = matchArray[3];
   // calculate the checksum for character part
   var checkSum = 0;
   if (charPart.length == 2) {
   checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
   checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
   } else {
   checkSum += 9 * 36;
   checkSum += 8 * (10 + strValidChars.indexOf(charPart));
   }
   // calculate the checksum for numeric part
   for (var i = 0, j = 7; i < numPart.length; i++, j--)
   checkSum += j * numPart.charAt(i);
   // verify the check digit
   var remaining = checkSum % 11;
   var verify = remaining == 0 ? 0 : 11 - remaining;
   return verify == checkDigit || (verify == 10 && checkDigit == 'A');
  }
  import $ from 'jquery';
  export default {
    name: "activate",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.activate,
        nationalitysWin = global.nationalitysWin,
        nationalitys = global.nationalitys,
        area = global.area;
      let userInfo = global.userInfo;
      langJson.lang = lang;
      this.api(this, '/user/msg', "", res => {
        userInfo = res;
      },"","","",1);
      let date,time;
      if(userInfo.birthday){
        date = userInfo.birthday.split(" ");
        time = date[1].split(":");
        date = date[0].split("-");
      }
      return {
        lang: langJson,
        collapseAttr,
        userInfo,
        nationalitysWin,
        nationalitys,
        area,
        file:[],
        showImgs:[],
        nationality1:false,
        nationality2:false,
        nationality11:"1",
        nationality22:"1",
        hasEmail:false,
        hasCode:false,
        hasActivate:false,
        form:{
          property:userInfo.property||0,
          company: userInfo.company,
          EnglishCompany: userInfo.EnglishCompany,
          legalPerson: userInfo.legalPerson,
          businessLicense: userInfo.businessLicense,
          compellation:userInfo.compellation,
          EnglishName:userInfo.EnglishName,
          identification:"",
          filedata:userInfo.identificationPic,
          nickname:userInfo.nickname,
          wechatNumber:userInfo.wechatNumber,
          birthday:userInfo.birthday?new Date(date[0],date[1]-1,date[2],time[0],time[1]):new Date(),
          sex:userInfo.sex?userInfo.sex.toString():"0",
          phone:userInfo.phone,
          mobile:"",
          email:userInfo.email,
          code:"",
          seat:userInfo.seat,
          address:userInfo.address,
          postal:userInfo.postal,
          password:"",
          password1:"",
          paymentPassword:"",
          paymentPassword1:""
        },
        rules:{
          company: [
            {required:true,message:langJson[lang].editcompany,trigger:"change"}
          ],
          EnglishCompany: [
            {required:true,message:langJson[lang].editEnglishCompany,trigger:"change"}
          ],
          legalPerson: [
            {required:true,message:langJson[lang].editlegalPerson,trigger:"change"}
          ],
          businessLicense: [
            {required:true,message:langJson[lang].editbusinessLicense,trigger:"change"}
          ],
          compellation:[
            {required:true,message:langJson[lang].editcompellation,trigger:"change"}
          ],
          EnglishName:[
            {required:true,message:langJson[lang].editEnglishName,trigger:"change"}
          ],
          identification:[
            {required:true,message:langJson[lang].editidentification,trigger:"change"},{
              validator: (rule, value, callback, source, options)=> {
                var errors = [];
                // if(this.form.identification.length==18)this.nationality11="1";
                // if(this.form.identification.length==10)this.nationality11="0";
                // if(this.nationality11==0?(!IsHKID(this.form.identification)):(!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.form.identification)))errors.push(new Error(langJson[lang].en10));
                if(!IsHKID(this.form.identification))errors.push(new Error(langJson[lang].en10));
                callback(errors);
              }
            }
          ],
          filedata:[
            {required:true,message:langJson[lang].editfiledata,trigger:"change"},{
              validator: (rule, value, callback, source, options)=> {
                var errors = [];
                if (!this.form.filedata) errors.push(new Error(langJson[lang].editfiledata));
                callback(errors);
              }
            }
          ],
          mobile:[
            {required:true,message:langJson[lang].editmobile,trigger:"change"},{
              validator: (rule, value, callback, source, options)=> {
                var errors = [];
                // if(this.form.mobile.length==11)this.nationality22="1";
                // if(this.form.mobile.length==8)this.nationality22="0";
                // if (this.nationality22==0?(!/\d{8}/i.test(this.form.mobile)||this.form.mobile.length!=8):(!/^1[3|4|5|8][0-9]\d{8}$/.test(this.form.mobile))) errors.push(new Error(langJson[lang].editmobile1));
                if (!/^([6|9])\d{7}$/.test(this.form.mobile)) errors.push(new Error(langJson[lang].editmobile1));
                callback(errors);
              }
            }
          ],
          phone:[
            {required:true,message:langJson[lang].editmobile,trigger:"change"},{
              validator: (rule, value, callback, source, options)=> {
                var errors = [];
                if (!/\d{8}/.test(this.form.phone)||this.form.phone.length!=8) errors.push(new Error(langJson[lang].editphone1));
                callback(errors);
              }
            }
          ],
          email:[
            {required:true,message:langJson[lang].editemail,trigger:"change"},{
              validator:(rule, value, callback, source, options)=>{
                var errors=[];
                if(!new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(this.form.email)){
                  errors.push(new Error(langJson[lang].editemail1));
                  this.hasEmail=false;
                } else
                  this.hasEmail=true;
                callback(errors);
              }
            }
          ],
          code: [{required: true, message: lang=='cn'?'請輸入驗證碼':'please enter verification code', trigger: 'blur'}],
          property:[
            {required:true,message:langJson[lang].editproperty,trigger:"change"}
          ],
          seat:[
            {required:true,message:langJson[lang].editseat,trigger:"change"}
          ],
          address:[
            {required:true,message:langJson[lang].editaddress,trigger:"change"}
          ],
          postal:[
            {required:true,message:langJson[lang].editpostal,trigger:"change"}
          ],
          password:[
            {required:true,message:langJson[lang].editpassword,trigger:"change"}
          ],
          password1:[
            {required:true,message:langJson[lang].editpassword1,trigger:"change"},
            {
              validator: (rule, value, callback, source, options) =>{
                var errors = [];
                if (this.form.password && this.form.password !== this.form.password1) errors.push(new Error(langJson[lang].editpassword3));
                callback(errors);
              }
            }
          ],
          paymentPassword:[
            {required:true,message:langJson[lang].editpaymentPassword,trigger:"change"}
          ],
          paymentPassword1:[
            {required:true,message:langJson[lang].editpaymentPassword1,trigger:"change"},
            {
              validator: (rule, value, callback, source, options) =>{
                var errors = [];
                if (this.form.paymentPassword && this.form.paymentPassword !== this.form.paymentPassword1) errors.push(new Error(langJson[lang].editpaymentPassword3));
                callback(errors);
              }
            }
          ],
        }
      };
    },
    methods: {
      onSubmit: function () {
        var t = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            let formData = new FormData();
            if(!this.form.code||!this.hasCode)delete this.form.code;
            for(let k in this.form){
              formData.append(k, this.form[k]);
            }
            this.api(this, '/user/activate', formData, res => {
              console.log(res);
              this.$message.success(this.lang[this.lang.lang].submitTxt);
              (document.documentElement||document.body).scrollTop=0;
              this.userInfo.activate = 1;
              this.global.updateUserInfo(this.userInfo);
              this.$router.push('index');
            },'','',1);
          } else {
            this.$message.error(this.lang[this.lang.lang].en7);
            console.log('error submit!!');
            return false;
          }
        });
      },
      request(res){
        if(!(res.file.name.split(".").reverse()[0]=="jpg"||res.file.name.split(".").reverse()[0]=="png")){
          this.$message(this.lang[this.lang.lang].en11);
          this.file=[];
          return;
        }
        if(res.file.size>4096000){
          this.$message.error(this.lang[this.lang.lang].en8);
          this.file=[];
          return;
        }
        if(this.$refs.upload.uploadFiles.length>1)this.$refs.upload.uploadFiles.shift()
        this.form.filedata = res.file;
      },
      nationalityChange(){
        if(!this.nationality1)this.nationality11=this.form.nationality;
        if(!this.nationality2)this.nationality22=this.form.nationality;
      },
      nationalityChange1(){
        this.nationality1=true;
      },
      nationalityChange2(){
        this.nationality2=true;
      },
      getCode(){
        let emailDom = this.$refs.email;
        let text = emailDom.innerText;
        let num = 180;
        let timer=null;
        let error =_=>{
          clearInterval(timer);
          emailDom.innerText = text;
          emailDom.style.right = "72px";
        };
        let run = _=>{
          num--;
          emailDom.innerText = num;
          if(!num)error();
        };
        if(!isNaN(text))return;
        this.hasCode=true;
        timer = setInterval(run,1000);
        run();
        emailDom.style.right = "36px";
        this.api(this, "/user/email", {email:this.form.email}, res => {
          
        },res=>{
          if(res=='failure')this.$message.error("發送郵箱失敗，請檢查郵箱號是否正確");
        });
      }
    },
    mounted(){
      this.form.identification = this.userInfo.identification;
      this.form.mobile = this.userInfo.mobile;
      this.file = this.userInfo.identificationPic?[{name:this.lang[this.lang.lang].en4,url:this.userInfo.identificationPic}]:[]
    },
    created(){
      const theFn = _=>{
        this.api(this, '/user/msg', "", res => {
          this.userInfo = res;
          this.$parent.$parent.$parent.$parent.userInfo = res;
          sessionStorage.userInfoStorage = JSON.stringify(res);
          this.global.userInfo = res;
          if(res.activate==2){
            clearInterval(settimeout);
            this.$router.push('/user/index');
          }else if(res.activate==1){
            this.hasActivate=userInfo.property=='0'||userInfo.property=='1'?true:false;
          }
        });
      };
      const userInfo = this.userInfo;
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
        // console.log(res);
      })
      if(userInfo.activate=='1'||userInfo.activate=="2"){
        let settimeout = setInterval(theFn,5000);
        theFn();
      }
    }
  }
</script>

<style scoped>
  .tab{padding: 10px;margin-bottom: 40px;}
  .tab a{font-size: 16px;color: #666;text-decoration: initial;margin-right: 35px;padding-bottom: 8px;}
  .tab a.active{color: #978168;border-bottom: 2px solid #978168;}
</style>
