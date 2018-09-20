<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en1"></div>
    <div class="theCover" v-if="theCoverIsShow">
      <p class="form-title"><span>{{lang[lang.lang].edituserinfo}}</span></p>
      <ul>
        <li>
          <p>{{lang[lang.lang].en2}}：</p>
          <p>{{theCoverData.uid}}</p>
        </li>
        <li>
          <p>{{lang[lang.lang].compellation}}：</p>
          <p>{{theCoverData.compellation}}</p>
        </li>
        <li>
          <p>{{lang[lang.lang].EnglishName}}：</p>
          <p>{{theCoverData.EnglishName}}</p>
        </li>
        <li>
          <p>{{lang[lang.lang].email}}：</p>
          <p>{{theCoverData.email}}</p>
        </li>
        <li>
          <p>{{lang[lang.lang].phone}}：</p>
          <p>{{theCoverData.phone}}</p>
        </li>
        <li>
          <p>{{lang[lang.lang].mobile}}：</p>
          <p>{{theCoverData.mobile}}</p>
        </li>
        <!-- <li>
          <p>{{lang[lang.lang].country}}：</p>
          <p>{{nationalitysWin[0][lang.lang]}}</p>
        </li>
        <li>
          <p>{{lang[lang.lang].nationality}}：</p>
          <p>{{nationalitys[0][lang.lang]}}</p>
        </li> -->
        <li>
          <p>{{lang[lang.lang].en4}}：</p>
          <p>{{theCoverData.ruid}}</p>
        </li>
        <li>
          <el-button style="width:200px;" type="primary" @click="theCoverIsShow = false">{{lang[lang.lang].en5}}</el-button>
        </li>
      </ul>
    </div>
    <el-form v-else ref="form" :model="form" :rules="rules" label-width="121px" label-position="right">
      <div class="fromBox">
        <p class="form-title"><span>{{lang[lang.lang].edituserinfo}}</span></p>
        <div :style="collapseAttr.formBoxStyle">
          <el-form-item :label="lang[lang.lang].ruid" prop="ruid">
            <el-input v-model="form.ruid" @input="ruidChange"
                      :placeholder="lang[lang.lang].editruid"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].ruName" prop="ruName">
            <el-input v-model="form.ruName" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item :label="lang[lang.lang].country" prop="country">
            <el-select v-model="form.country" :placeholder="lang[lang.lang].editcountry">
              <el-option v-for="item in nationalitysWin" :label="item[lang.lang]"
                         :value="item.val"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].nationality" prop="nationality">
            <el-select v-model="form.nationality" :placeholder="lang[lang.lang].editnationality" @change="nationalityChange">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]"
                         :value="item.val"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="lang[lang.lang].identification" prop="identification">
            <!-- <el-select v-model="form.nationality1" :placeholder="lang[lang.lang].editnationality" style="width: 100px" @change="nationalityChange1">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]"
                         :value="item.val"></el-option>
            </el-select> -->
            <el-input v-model="form.identification"
                      :placeholder="lang[lang.lang].editidentification" _style="width: 155px;"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].compellation" prop="compellation">
            <el-input v-model="form.compellation"
                      :placeholder="lang[lang.lang].editcompellation"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].EnglishName" prop="EnglishName">
            <el-input v-model="form.EnglishName"
                      :placeholder="lang[lang.lang].editEnglishName"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].email" prop="email">
            <el-input v-model="form.email" :placeholder="lang[lang.lang].editemail"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].phone" prop="phone">
            <!-- <el-select v-model="form.nationality2" :placeholder="lang[lang.lang].editnationality" style="width: 100px" @change="nationalityChange2">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]"
                         :value="item.val"></el-option>
            </el-select> -->
            <el-input v-model="form.phone" :placeholder="lang[lang.lang].editphone" _style="width: 155px;"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].mobile" prop="mobile">
            <!-- <el-select v-model="form.nationality2" :placeholder="lang[lang.lang].editnationality" style="width: 100px" @change="nationalityChange2">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]"
                         :value="item.val"></el-option>
            </el-select> -->
            <el-input v-model="form.mobile" :placeholder="lang[lang.lang].editmobile" _style="width: 155px;"></el-input>
          </el-form-item>
          
          <el-form-item :label="lang[lang.lang].password" prop="password">
            <el-input type="password" v-model="form.password"
                      :placeholder="lang[lang.lang].editpassword"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].password2" prop="password2">
            <el-input type="password" v-model="form.password2"
                      :placeholder="lang[lang.lang].editpassword2"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].paymentPassword" prop="paymentPassword">
            <el-input v-model="form.paymentPassword" type="password" :placeholder="lang[lang.lang].editpaymentPassword"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].paymentPassword1" prop="paymentPassword1">
            <el-input v-model="form.paymentPassword1" type="password" :placeholder="lang[lang.lang].editpaymentPassword1"></el-input>
          </el-form-item>
          <!-- 
          <el-form-item :label="lang[lang.lang].receiveMode" prop="receiveMode">
            <el-radio-group v-model="form.receiveMode" @change="receiveModeChange">
              <el-radio label="1">{{lang[lang.lang].receiveModes1}}</el-radio>
              <el-radio label="0">{{lang[lang.lang].receiveModes2}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].suid" prop="suid">
            <el-input v-model="form.suid" @input="suidChange" :placeholder="lang[lang.lang].editsuid"
                      :disabled="form.receiveMode==0?true:false"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].suName" prop="suName">
            <el-input v-model="form.suName" disabled></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].track" prop="track">
            <el-radio-group v-model="form.track">
              <el-radio label="0">A</el-radio>
              <el-radio label="1">B</el-radio>
            </el-radio-group>
          </el-form-item> -->
        </div>
      </div>
      <div class="fromBox">
        <div :style="collapseAttr.formBoxStyle">
         <el-form-item style="margin:10px 0;margin-left: -70px;">
            <el-button style="width:200px;" type="primary" @click="onSubmit">{{lang[lang.lang].submit}}</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="winup" v-if="winup.isShow">
      <div>
        <p><span>{{lang[lang.lang].en8}}</span><b @click="winupClose">×</b></p>
        <ul>
          <li>
            <p style="color: #ff2a2a;">{{lang[lang.lang].en9}}</p>
            <ol>
              <li>
                <p><span>{{lang[lang.lang].compellation}}:</span><b>{{form.compellation}}</b></p>
                <p><span>{{lang[lang.lang].EnglishName}}:</span><b>{{form.EnglishName}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].phone}}:</span><b>{{form.phone}}</b></p>
                <p><span>{{lang[lang.lang].mobile}}:</span><b>{{form.mobile}}</b></p>
              </li>
              <li>
                <p><span>{{lang[lang.lang].email}}:</span><b>{{form.email}}</b></p>
                <p><span>{{lang[lang.lang].identification}}:</span><b>{{form.identification}}</b></p>
              </li>
              <li style="width: 50%;margin: 10px auto;">
                <p><span>{{lang[lang.lang].ruid}}:</span><b>{{form.ruid1}}</b></p>
              </li>
            </ol>
          </li>
          <li><span @click="winupClose">{{lang[lang.lang].en10}}</span></li>
          <li><a href="javascript:void(0);" @click="winupClose(1)">{{lang[lang.lang].en11}}</a></li>
        </ul>
      </div>
    </div>
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
  export default {
    name: "consumersRegister",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        nationalitysWin = global.nationalitysWin,
        nationalitys = global.nationalitys,
        langJson = global.langJson.consumersRegister;
      let userInfo = global.userInfo;
      langJson.lang = lang;
      this.api(this, '/user/msg', "", res => {
        // console.log('user/msg',res);
        userInfo = res;
      },"","","",1);
      return {
        lang: langJson,
        collapseAttr,
        nationalitysWin,
        nationalitys,
        nationality1:false,
        nationality2:false,
        form: {

          // country: "0",
          // nationality: "0",
          // compellation: "姓名",
          // email: "111@qq.com",
          // mobile: "137XXXXXXXX",
          // identification: "证件号码",
          // password: "abc",
          // password2: "abc",
          //
          // ruid: 'uuid',
          // ruName: '',
          // receiveMode: '1',
          // suid: 'uuid',
          // suName: '',
          // track: "0"
          nationality1:"0",
          nationality2:"0",

          country: "0",
          nationality: "0",
          compellation: "",
          email: "",
          phone:"",
          mobile: "",
          identification: "",
          password: "",
          password2: "",
          paymentPassword:"",
          paymentPassword1:"",

          ruid: userInfo.deaultPhone||userInfo.phone,
          ruid1: '',
          ruName: userInfo.deaultReferee,
          receiveMode: '1',
          suid: userInfo.deaultPhone||userInfo.phone,
          suid1: '',
          suName: userInfo.deaultReferee,
          track: userInfo.deaultTrack?userInfo.deaultTrack.toString():"0"



          // ,compellation: "中文名字",
          // EnglishName: "EnglishName",
          // email: "13456@qq.com",
          // phone: "88888889",
          // mobile: "13846578913",
          // identification: "P103265(1)",
          // password: "123",
          // password2: "123",
          // paymentPassword:"123",
          // paymentPassword1:"123",
          // ruid: '13812345678',
          // ruName: '',
          // receiveMode: '1',
          // suid: '13812345678',
          // suName: '',
          // track: "0"
        },
        rules: {
          country: [{required: true, message: langJson[lang].editcountry}],
          nationality: [{required: true, message: langJson[lang].editnationality}],
          compellation: [{required: true, message: langJson[lang].editcompellation, trigger: 'blur'}],
          EnglishName: [{required: true, message: langJson[lang].editEnglishName, trigger: 'blur'}],
          email: [{required: true, message: langJson[lang].editemail, trigger: 'blur'}, {
            type: 'email',
            message: langJson[lang].editemail1,
            trigger: ['blur', 'change']
          }],
          mobile: [{required: true, message: langJson[lang].editmobile, trigger: 'blur'}, {
            validator: (rule, value, callback, source, options)=> {
              var errors = [];
              if (!/^([6|9])\d{7}$/.test(this.form.mobile)) errors.push(new Error(langJson[lang].editmobile1));
              callback(errors);
            }
          }],
          phone: [{required: true, message: langJson[lang].editphone, trigger: 'blur'}, {
            validator: (rule, value, callback, source, options)=> {
              var errors = [];
              if (!/^\d{8}$/.test(this.form.phone)||this.form.phone.length!=8) errors.push(new Error(langJson[lang].editphone1));
              callback(errors);
            }
          }],
          identification: [{
            required: true,
           message: langJson[lang].editidentification},{
            validator: (rule, value, callback, source, options)=> {
              var errors = [];
              if(!IsHKID(this.form.identification))errors.push(new Error(langJson[lang].en7));
              callback(errors);
            }
          }],
          password: [{required: true, message: langJson[lang].editpassword, trigger: 'blur'}],
          password2: [
            {required: true, message: langJson[lang].editpassword2, trigger: 'blur'},
            {
              validator:  (rule, value, callback, source, options) =>{
                var errors = [];
                if (this.form.password && this.form.password !== this.form.password2) errors.push(new Error(langJson[lang].editpassword3));
                callback(errors);
              }
            }
          ],
          paymentPassword:[
            {required:true,message:langJson[lang].editpaymentPassword,trigger:"blur"}
          ],
          paymentPassword1:[
            {required:true,message:langJson[lang].editpaymentPassword1,trigger:"blur"},
            {
              validator: (rule, value, callback, source, options) =>{
                var errors = [];
                if (this.form.paymentPassword && this.form.paymentPassword !== this.form.paymentPassword1) errors.push(new Error(langJson[lang].editpaymentPassword3));
                callback(errors);
              }
            }
          ],
          ruid: [
            { message: langJson[lang].editruid, trigger: 'change'},
            {
              validator:  (rule, value, callback, source, options) =>{
                var errors = [];
                setTimeout(_=>{
                  if (!/^\d{8}$/.test(this.form.ruid)) errors.push(new Error(langJson[lang].editphone1));
                  if (!this.form.ruid1) errors.push(new Error(this.lang[this.lang.lang].en6));
                  callback(errors);
                },500);
              }
            }
          ],
          // ruName: [{required: true}],
          // receiveMode: [{required: true}],
          suid: [{required: true, message: langJson[lang].editsuid, trigger: 'change'}],
          // suName: [{required: true}],
          track: [{required: true, message: langJson[lang].track}]
        },
        theCoverIsShow:false,
        theCoverData:{},
        winup:{
          isShow:false
        }
      };
    },
    methods: {
      onSubmit: function () {
        var t = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(t.form);
            this.winup.isShow = true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      ruidChange: function () {
        var t = this;
        this.form.ruName = "";
        if (this.form.ruid.length == 8) {
          t.form.ruid1 = "";
          this.api(this, '/user/obtain', {
            phone: this.form.ruid
          }, res => {
            t.form.ruName = res.compellation;
            t.form.ruid1 = res.uid;
          });
        }else{
          t.form.ruid1 = "";
        }
      },
      suidChange: function () {
        var t = this;
        this.form.suName = "";
        if (this.form.suid.length == 8) {
          t.form.suid1 = "";
          this.api(this, '/user/obtain', {
            phone: this.form.suid
          }, res => {
            t.form.suName = res.compellation;
            t.form.suid1 = res.uid;
          });
        }
      },
      receiveModeChange: function () {
        if (this.form.ruid) {
          if (this.form.receiveMode === "0") {
            this.form.suid = this.form.ruid;
          } else {
            this.form.suid = "";
          }
          this.suidChange();
        } else {
          this.form.receiveMode = "1";
        }
      },
      nationalityChange(){
        if(!this.nationality1)this.form.nationality1=this.form.nationality;
        if(!this.nationality2)this.form.nationality2=this.form.nationality;
      },
      nationalityChange1(){
        this.nationality1=true;
      },
      nationalityChange2(){
        this.nationality2=true;
      },
      winupClose(isOk){
        let t = this;
        this.winup.isShow = false;
        if(isOk==1){
          this.api(this, "/user/register", {
            type:0,
            // country: t.form.country*1,
            // nationality: t.form.nationality*1,
            identification: t.form.identification,
            compellation: t.form.compellation,
            EnglishName: t.form.EnglishName,
            email: t.form.email,
            phone: t.form.phone,
            mobile: t.form.mobile,
            ruid: t.form.ruid1,
            suid: t.form.suid1,
            track: t.form.track*1,
            password: t.form.password,
            paymentPassword: t.form.paymentPassword
          }, res => {
            console.log(res);
            this.theCoverData = res;
            this.$message.success(t.lang[t.lang.lang].submitTxt);
            this.$refs.form.resetFields();
            this.theCoverIsShow = true;
          });
        }
      },
    },
    mounted(){
      this.ruidChange();
    },
    created(){
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
      })
    }
  }
</script>

<style scoped>
  .theCover{background:white;padding:10px;}
  .theCover ul{font-size:14px;}
  .theCover ul li:first-child{color:#bfa284;}
  .theCover ul li:first-child p:last-child{font-size:24px;font-weight:bolder;}
  .theCover ul li{display:flex;margin-bottom:30px;align-items:center;}
  .theCover ul li p:first-child{width:46%;margin-right:20px;text-align:right;}
  .theCover ul li:last-child button{display:block;margin:0 auto;background:#494232;border:0;}

  .winup>div>ul>li:first-child ol{text-align:center;padding:30px 0;line-height:40px;}
  .winup>div>ul>li:first-child ol li{display: flex;}
  .winup>div>ul>li:first-child ol li p{flex: 1;display: flex;}
  .winup>div>ul>li:first-child ol li p span{margin-right: 30px;color: #999;width: 180px;text-align: right;}
  .winup>div>ul>li:first-child ol li p b{font-size: 16px;}
  .winup>div>ul>li:nth-child(2){margin-top:-30px;font-size:12px;color:#999;cursor: pointer;}
</style>
