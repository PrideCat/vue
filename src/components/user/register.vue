<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en1"></div>
    <div class="winup1" v-if="winup1IsShow">
      <p><i class="el-icon-success"></i></p>
      <p>{{lang[lang.lang].en2}}</p>
      <p>{{lang[lang.lang].en3}}</p>
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
        <li>
          <p><span>{{lang[lang.lang].ruid}}:</span><b>{{form.ruid1}}</b></p>
          <p><span>{{lang[lang.lang].suid}}:</span><b>{{form.suid1}}</b></p>
        </li>
        <li style="width: 50%;margin: 45px 0 0 290px;">
          <p><span>{{lang[lang.lang].track}}:</span><b>{{form.track==0?"A":"B"}}</b></p>
        </li>
      </ol>
      <!-- <p><span>{{lang[lang.lang].ruid}}:</span><b>{{form.ruid1}}</b></p> -->
      <p style="font-weight: bold;"><span>{{lang[lang.lang].en4}}:</span><b>{{newUid}}</b></p>
      <p style="position: relative;top: -20px;font-weight: bold;"><span>{{lang[lang.lang].en5}}:</span><b>{{form.password}}</b></p>
      <router-link tag="a" to="index">{{lang[lang.lang].en6}}</router-link>
    </div>
    <el-form v-else ref="form" :model="form" :rules="rules" label-width="121px" label-position="right">
      <div class="fromBox">
        <p class="form-title"><span>{{lang[lang.lang].edituserinfo}}</span></p>
        <div :style="collapseAttr.formBoxStyle">
          <!-- <el-form-item :label="lang[lang.lang].country" prop="country">
            <el-select v-model="form.country" :placeholder="lang[lang.lang].editcountry">
              <el-option v-for="item in nationalitysWin" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].nationality" prop="nationality">
            <el-select v-model="form.nationality" :placeholder="lang[lang.lang].editnationality" @change="nationalityChange">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="lang[lang.lang].compellation" prop="compellation">
            <el-input v-model="form.compellation" :placeholder="lang[lang.lang].editcompellation"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].EnglishName" prop="EnglishName">
            <el-input v-model="form.EnglishName" :placeholder="lang[lang.lang].editEnglishName"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].email" prop="email">
            <el-input v-model="form.email" :placeholder="lang[lang.lang].editemail"></el-input><b v-if="hasEmail" style="border:1px solid #ccc;font-size:12px;padding:1px 5px;background:#f1f1f1;color:#606266;cursor:pointer;position: relative;right: 72px;" @click="getCode" ref="email">{{lang.lang=='cn'?"獲取驗證碼":'get verification code'}}</b>
          </el-form-item>
          <el-form-item :label="lang.lang=='cn'?'驗證碼':'Verification Code'" prop="code" v-if="hasCode">
            <el-input v-model="form.code" :placeholder="lang.lang=='cn'?'請輸入驗證碼':'please enter verification code'"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].phone" prop="phone">
            <!-- <el-select v-model="form.nationality1" :placeholder="lang[lang.lang].editnationality" @change="nationalityChange1" style="width: 100px;">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select> -->
            <el-input v-model="form.phone" :placeholder="lang[lang.lang].editphone" _style="width: 155px;"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].mobile" prop="mobile">
            <!-- <el-select v-model="form.nationality1" :placeholder="lang[lang.lang].editnationality" @change="nationalityChange1" style="width: 100px;">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select> -->
            <el-input v-model="form.mobile" :placeholder="lang[lang.lang].editmobile" _style="width: 155px;"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].identification" prop="identification">
            <!-- <el-select v-model="form.nationality2" :placeholder="lang[lang.lang].editnationality" @change="nationalityChange2" style="width: 100px;">
              <el-option v-for="item in nationalitys" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select> -->
            <el-input v-model="form.identification" :placeholder="lang[lang.lang].editidentification" _style="width: 155px;"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].password" prop="password">
            <el-input type="password" v-model="form.password" :placeholder="lang[lang.lang].editpassword"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].password2" prop="password2">
            <el-input type="password" v-model="form.password2" :placeholder="lang[lang.lang].editpassword2"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="fromBox">
        <p class="form-title"><span>{{lang[lang.lang].edituserinfo2}}</span></p>
        <div :style="collapseAttr.formBoxStyle">
          <el-form-item :label="lang[lang.lang].ruid" prop="ruid">
            <el-autocomplete v-model="form.ruid" :fetch-suggestions="querySearch" :trigger-on-focus="false" :placeholder="lang[lang.lang].editruid" @select="ruidChange"></el-autocomplete>
          </el-form-item>
          <!-- <el-form-item :label="lang[lang.lang].ruName" prop="ruName">
            <el-input v-model="form.ruName" disabled></el-input>
          </el-form-item> -->
          <el-form-item :label="lang[lang.lang].receiveMode" prop="receiveMode">
            <el-radio-group v-model="form.receiveMode" @change="receiveModeChange">
              <el-radio label="1">{{lang[lang.lang].receiveModes1}}</el-radio>
              <el-radio label="0">{{lang[lang.lang].receiveModes2}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].suid" prop="suid" v-if="form.receiveMode==1">
            <el-autocomplete v-model="form.suid" :fetch-suggestions="querySearch" :trigger-on-focus="false" :placeholder="lang[lang.lang].editsuid" @select="suidChange"></el-autocomplete><b style="border:1px solid #ccc;font-size:12px;padding:1px 5px;background:#f1f1f1;color:#606266;cursor:pointer;position: relative;right: 36px;" @click="place()">{{lang[lang.lang].en7}}</b>
            <!-- <el-input v-model="form.suid" @input="suidChange" :placeholder="lang[lang.lang].editsuid" :disabled="form.receiveMode==0?true:false"></el-input> -->
          </el-form-item>
          <!-- <el-form-item :label="lang[lang.lang].suName" prop="suName" v-if="form.receiveMode==1">
            <el-input v-model="form.suName" disabled></el-input>
          </el-form-item> -->
          <el-form-item :label="lang[lang.lang].track" prop="track">
            <el-radio-group v-model="form.track">
              <el-radio label="0">A</el-radio>
              <el-radio label="1">B</el-radio>
            </el-radio-group>
          </el-form-item>
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
              <li>
                <p><span>{{lang[lang.lang].ruid}}:</span><b>{{form.ruid1}}</b></p>
                <p><span>{{lang[lang.lang].suid}}:</span><b>{{form.suid1}}</b></p>
              </li>
              <li style="width: 50%;margin: 10px auto;">
                <p><span>{{lang[lang.lang].track}}:</span><b>{{form.track==0?"A":"B"}}</b></p>
              </li>
            </ol>
          </li>
          <li><span @click="winupClose">{{lang[lang.lang].en10}}</span></li>
          <li><a href="javascript:void(0);" @click="winupClose(1)">{{lang[lang.lang].en11}}</a></li>
        </ul>
      </div>
    </div>
    <div class="winup winup2 placingPop" v-if="winup2.isShow">
      <div>
        <p><span>{{lang[lang.lang].en12}}</span><b @click="winup2.isShow=false;suidArr=[];">×</b></p>
        <ul>
          <li>
            <p style="width: 800px;padding-left: 20px;box-sizing: border-box;height: 23px;"><button v-if="suidArr.length>1" style="float: left;background: #494232;color: #fff;padding: 2px 10px;border:1px solid transparent;cursor: pointer;" @click="toPlace1('',1)">{{lang.lang=="cn"?"返回":"return"}}</button><a style="clear: both;"></a></p>
            <p style="color: #ff2a2a;"><span style="color:#999;">{{lang[lang.lang].en13}}：</span>{{lang[lang.lang].en14}}</p>
            <ol>
              <li v-for="(item,index) in winup2.data">
                <div :class="item?'has':''">
                  <b @click="!item&&winup2.data[theLv(index)]?toPlace(index):(item?toPlace1(item):'')" :style="winup2.data[theLv(index)]?'':'cursor:default;'">
                    <p>{{item?item.mobile:""}}</p>
                    <p>{{item?item.compellation:(winup2.data[theLv(index)]?lang[lang.lang].en15:lang[lang.lang].en16)}}</p>
                  </b>
                </div>
              </li>
            </ol>
          </li>
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
    name: "register",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.register,
        nationalitysWin = global.nationalitysWin,
        nationalitys = global.nationalitys;
      let userInfo = global.userInfo;
      langJson.lang = lang;
      this.api(this, '/user/msg', "", res => {
        // console.log('user/msg',res);
        userInfo = res;
      },"","","",1);
      return {
        lang: langJson,
        collapseAttr,
        userInfo,
        nationalitysWin,
        nationalitys,
        nationality1:false,
        nationality2:false,
        suidArr:[],
        hasEmail:false,
        hasCode:false,
        form: {

          nationality1:"0",
          nationality2:"0",

          country: "0",
          nationality: "0",
          compellation: "",
          EnglishName: "",
          email: "",
          code: "",
          phone: "",
          mobile: "",
          identification: "",
          password: "",
          password2: "",

          // ruid: userInfo.deaultPhone||userInfo.phone,
          ruid: "",
          ruid1: '',
          ruName: userInfo.deaultReferee,
          receiveMode: '1',
          // suid: userInfo.deaultPhone||userInfo.phone,
          suid: "",
          suid1: '',
          suName: userInfo.deaultReferee,
          track: userInfo.deaultTrack?userInfo.deaultTrack.toString():"0"


          // ,compellation: "中文名字",
          // EnglishName: "EnglishName",
          // email: "13456@qq.com",
          // phone: "88888888",
          // mobile: "13846578912",
          // identification: "P103265(1)",
          // password: "123",
          // password2: "123",
          
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
            validator:(rule, value, callback, source, options)=>{
              var errors=[];
              if(!new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(this.form.email)){
                errors.push(new Error(langJson[lang].editemail1));
                this.hasEmail=false;
              } else
                this.hasEmail=true;
              callback(errors);
            }
          }],
          code: [{required: true, message: lang=='cn'?'請輸入驗證碼':'please enter verification code', trigger: 'blur'}],
          phone: [{required: true, message: langJson[lang].editphone, trigger: 'blur'}, {
            validator: (rule, value, callback, source, options)=> {
              var errors = [];
              if (!/^\d{8}$/.test(this.form.phone)||this.form.phone.length!=8) errors.push(new Error(langJson[lang].editphone1));
              callback(errors);
            }
          }],
          mobile: [{required: true, message: langJson[lang].editmobile, trigger: 'blur'}, {
            validator: (rule, value, callback, source, options)=> {
              var errors = [];
              if (!/^([6|9])\d{7}$/.test(this.form.mobile)) errors.push(new Error(langJson[lang].editmobile1));
              callback(errors);
            }
          }],
          identification: [{required: true, message: langJson[lang].editidentification, trigger: 'blur'},{
            validator: (rule, value, callback, source, options)=> {
              var errors = [];
              // if(this.form.nationality2==0?(!IsHKID(this.form.identification)):(!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.form.identification)))errors.push(new Error(langJson[lang].en19));
              if(!IsHKID(this.form.identification))errors.push(new Error(langJson[lang].en19));
              callback(errors);
            }
          }],
          password: [{required: true, message: langJson[lang].editpassword, trigger: 'blur'}],
          password2: [
            {required: true, message: langJson[lang].editpassword2, trigger: 'blur'},
            {
              validator: (rule, value, callback, source, options) =>{
                var errors = [];
                // console.log(data);
                // console.log("rule=>", rule, "\nvalue=>", value, "\ncallback=>", callback, "\nsource=>", source, "\noptions=>", options);
                if (this.form.password && this.form.password !== this.form.password2) errors.push(new Error(langJson[lang].editpassword3));
                callback(errors);
              }
            }
          ],

          ruid: [
            {required: true, message: langJson[lang].editruid, trigger: 'change'},
            // {
            //   validator:  (rule, value, callback, source, options) =>{
            //     var errors = [];
            //     setTimeout(_=>{
            //       if (!/^\d{8}$/.test(this.form.ruid)) errors.push(new Error(langJson[lang].editphone1));
            //       if (!this.form.ruid1) errors.push(new Error(this.lang[this.lang.lang].en17));
            //       callback(errors);
            //     },500);
            //   }
            // }
          ],
          // ruName: [{required: true}],
          // receiveMode: [{required: true}],
          suid: [
            {required: true, message: langJson[lang].editsuid, trigger: 'change'},
            // {
            //   validator:  (rule, value, callback, source, options) =>{
            //     var errors = [];
            //     setTimeout(_=>{
            //       if (!/^\d{8}$/.test(this.form.suid)) errors.push(new Error(langJson[lang].editphone1));
            //       if (!this.form.suid1) errors.push(new Error(this.lang[this.lang.lang].en17));
            //       callback(errors);
            //     },500);
            //   }
            // }
          ],
          // suName: [{required: true}],
          track: [{required: true, message: langJson[lang].track}]
        },
        winup:{
          isShow:false
        },
        winup1IsShow: false,
        winup2:{
         isShow:false,
         data:[,,,,,,,] 
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
      querySearch(queryString, cb) {
        this.api(this, '/user/obtain', {
          compellation: queryString
        }, res => {
          let item = [];
          res.forEach(v=>{
            item.push({value:v.compellation+"，"+v.mobile,uid:v.uid});
          });
          console.log(res,item);
          cb(item);
          // t.form.ruName = res.compellation;
          // t.form.ruid1 = res.uid;
        });
      },
      ruidChange: function (item) {
        this.form.ruid1 = item.uid;
          // t.form.ruName = res.compellation;
        // var t = this;
        // this.form.ruName = "";
        // // if (this.form.ruid.length == 8) {
        // if (this.form.ruid.length) {
        //   this.api(this, '/user/obtain', {
        //     compellation: this.form.ruid
        //   }, res => {
        //     t.form.ruName = res.compellation;
        //     t.form.ruid1 = res.uid;
        //   });
        // }else{
        //   t.form.ruid1 = "";
        // }
      },
      suidChange: function (item) {
        this.form.suid1 = item.uid;
        // var t = this;
        // this.form.suName = "";
        // if (this.form.suid.length) {
        //   this.api(this, '/user/obtain', {
        //     compellation: this.form.suid
        //   }, res => {
        //     // console.log(this.form.suid,res.compellation,res.uid);
        //     t.form.suName = res.compellation;
        //     t.form.suid1 = res.uid;
        //   });
        // }else{
        //   t.form.suid1 = "";
        // }
      },
      receiveModeChange: function () {
        if (this.form.ruid) {
          if (this.form.receiveMode === "0") {
            this.form.suid = this.form.ruid;
          } else {
            this.form.suid = "";
          }
          // this.suidChange();
        } else {
          this.form.receiveMode = "1";
        }
      },
      winupClose(isOk){
        let t = this;
        let json = {
          type:1,
          // country: t.form.country*1,
          // nationality: t.form.nationality*1,
          compellation: t.form.compellation,
          EnglishName: t.form.EnglishName,
          email: t.form.email,
          phone: t.form.phone,
          mobile: t.form.mobile,
          ruid: t.form.ruid1,
          suid: t.form.suid1,
          track: t.form.track*1,
          mode: t.form.receiveMode==1?0:1,
          password: t.form.password,
          identification: t.form.identification
        };
        this.winup.isShow = false;
        if(isOk==1){
          if(this.hasCode)json.code=t.form.code;
          this.api(this, "/user/register", json, res => {
            this.$message.success(t.lang[t.lang.lang].submitTxt);
            // t.$refs.form.resetFields();
            this.winup1IsShow = true;
            this.newUid=res.uid;
          });
        }
      },
      place(suid1,suid2,callback){
        if(suid2){
          suid1 = suid2;
        }else{
          suid1 = suid1 ? suid1 : this.form.suid1;
          if(!suid1||this.form.receiveMode==0)return;
        }
        this.suidArr.push(suid1);
        this.api(this, "/user/downline", {uid:suid1}, res => {
          console.log(res);
          this.winup2.data = [,,,,,,,];
          let dataArr = this.winup2.data;
          dataArr[0]=res.data;
          res.downline.forEach(v=>{
            if(v.suid==dataArr[0].uid)dataArr[v.track+1]=v;
          });
          res.downline.forEach(v=>{
            if(dataArr[1]&&v.suid==dataArr[1].uid)dataArr[v.track+3]=v;
            if(dataArr[2]&&v.suid==dataArr[2].uid)dataArr[v.track+5]=v;
          });
          console.log(this.winup2.data);
          this.winup2.isShow=true;
          if(callback)callback();
        },"",1);
      },
      toPlace(index){
        const dataArr = this.winup2.data;
        const i = Math.ceil(index/2)-1;
        const track = (index+1)%2;
        this.form.suid = dataArr[i].compellation+"，"+dataArr[i].mobile;
        this.form.suid1 = dataArr[i].uid;
        // this.suidChange();
        this.form.track = track.toString();
        this.winup2.isShow=false;
        this.suidArr=[];
      },
      toPlace1(item,isRemove){
        if(isRemove)this.suidArr.pop();
        this.place("",isRemove?this.suidArr[this.suidArr.length-1]:item.uid,_=>{
          if(isRemove)this.suidArr.pop();
        });
        //this.form.suid = dataArr[i].mobile;
        //this.suidChange();
      },
      theLv(i){
        return Math.ceil(i/2)-1;
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
      // this.ruidChange();
      // this.suidChange();
    },
    created(){
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
      })
    }
  }
</script>

<style scoped>
  .winup>div>ul>li:first-child ol{text-align:center;padding:30px 0;line-height:40px;}
  .winup>div>ul>li:first-child ol li{display: flex;}
  .winup>div>ul>li:first-child ol li p{flex: 1;display: flex;}
  .winup>div>ul>li:first-child ol li p span{margin-right: 30px;color: #999;width: 180px;text-align: right;}
  .winup>div>ul>li:first-child ol li p b{font-size: 16px;}
  .winup>div>ul>li:nth-child(2){margin-top:-30px;font-size:12px;color:#999;cursor: pointer;}

  .winup1{background: #fff;text-align: center;padding: 40px 0;}
  .winup1>p>i{font-size: 94px;color: #494232;margin-bottom: 15px;}
  .winup1>p:nth-child(2){font-size: 26px;color: #978168;margin-bottom: 10px;}
  .winup1>p:nth-child(3){font-size: 14px;color: #ff2a2a;}
  .winup1>ol>li{display: flex;margin-top: 45px;}
  .winup1>ol>li p{flex: 1;display: flex;}
  .winup1>ol>li p span{width: 180px;text-align: right;margin-right: 30px;font-size: 14px;color: #999;}
  .winup1>ol>li p b,.winup1>p:nth-child(5) b{font-size: 16px;}
  .winup1>p:nth-child(5),.winup1>p:nth-child(6){margin: 45px 0;}
  .winup1>p:nth-child(5) span,.winup1>p:nth-child(6) span{margin-right: 30px;font-size: 14px;color: #999;}
  .winup1>p:nth-child(5) b,.winup1>p:nth-child(6) b{color: #bfa284;min-width: 4em;display: inline-block;}
  .winup1>a{display: inline-block;width: 166px;line-height: 46px;background: #494232;color: #fff;text-decoration: initial;border-radius: 5px;}

  .winup2.winup>div ul>li>p{text-align: center;}
  .winup2.winup>div ul>li ol{display: flex;padding: 0;line-height: inherit;flex-wrap: wrap;}
  .winup2.winup>div ul>li ol li{display: flex;justify-content: center;margin: 20px 0;}
  .winup2.winup>div ul>li ol li:nth-child(1){width: 100%;}
  .winup2.winup>div ul>li ol li:nth-child(2),.winup2.winup>div ul>li ol li:nth-child(3){width: 50%;}

  .winup2.winup>div ul>li ol li:nth-child(4),.winup2.winup>div ul>li ol li:nth-child(5),.winup2.winup>div ul>li ol li:nth-child(6),.winup2.winup>div ul>li ol li:nth-child(7){width: 25%;}
  .winup2.winup>div ul>li ol li div{background: url(../../../static/img/treeicon2.png);width:80px;height:80px;background-size:100%;background-repeat:no-repeat;padding-bottom: 5px;box-sizing: border-box;}
  .winup2.winup>div ul>li ol li div.has{background-image: url(../../../static/img/treeicon1.png);}
  .winup2.winup>div ul>li ol li div b{height:100%;display: flex;flex-direction: column;justify-content: flex-end;cursor: pointer;}
  .winup2.winup>div ul>li ol li div.has b{cursor: default;}
  .winup2.winup>div ul>li ol li div p{flex: none;overflow: hidden;text-overflow: ellipsis;margin:2px 8px;display: block;}
  .winup2.winup>div ul>li ol li div.has p{color: #fff !important;}
  .winup2.winup>div ul>li ol li div p:nth-child(1){font-size: 12px;color:#666;}
  .winup2.winup>div ul>li ol li div p:nth-child(2){font-size: 14px;color:#494232;}
  .winup2.winup>div ul>li ol li:nth-child(2) div,.winup2.winup>div ul>li ol li:nth-child(3) div{position: relative;}
  .winup2.winup>div ul>li ol li:nth-child(2) div:after,.winup2.winup>div ul>li ol li:nth-child(3) div:after{content:'';background: url(../../../static/img/treeicon3.png);width:8px;height:32px;position:absolute;background-size:100%;background-repeat:no-repeat;left:0;right:0;bottom:-36px;margin:auto;}
  .winup2.winup>div ul>li ol li:nth-child(2) div:before,.winup2.winup>div ul>li ol li:nth-child(3) div:before{content:'';position:absolute;width:4px;height:4px;left:0;right:0;margin:auto;top:-12px;border:2px solid #333333;border-radius:50%;background:#fff;}
  .winup2.winup>div ul>li ol{position: relative;}
  .winup2.winup>div ul>li ol:after{content:"";position:absolute;width:calc(50% - 8px);background:#333;height:2px;left:0;right:0;margin:auto;top:36.4%;}
  .winup2.winup>div ul>li ol li:nth-child(1) div{position: relative;}
  .winup2.winup>div ul>li ol li:nth-child(1) div:before{content:"";position:absolute;width:4px;height:4px;background:white;border:2px solid #333;margin:auto;left:0;right:0;border-radius:50%;bottom:-10px;}
  .winup2.winup>div ul>li ol li:nth-child(1) div:after{content:"";position:absolute;width:2px;height:22px;background:#333;left:0;right:0;margin:auto;bottom:-32px;}

</style>
