<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en18"></div>
    <el-form ref="form" :model="form" :rules="rules" label-width="121px" label-position="right">
      <div class="fromBox">
        <p class="form-title"><span>{{lang[lang.lang].en18}}</span></p>
        <div :style="collapseAttr.formBoxStyle">
          <el-form-item :label="lang[lang.lang].ruid" prop="ruid">
            <el-input v-model="form.ruid" @input="ruidChange" :placeholder="lang[lang.lang].editruid"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].ruName" prop="ruName">
            <el-input v-model="form.ruName" disabled></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].receiveMode" prop="receiveMode">
            {{lang[lang.lang].receiveModes2}}
          </el-form-item>
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
  </div>
</template>

<script>
  export default {
    name: "registerSet",
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
        form: {

          // country: "0",
          // nationality: "0",
          // compellation: "姓名",
          // email: "111@qq.com",
          // mobile: "13788888888",
          // identification: "证件号码",
          // password: "abc",
          // password2: "abc",
          
          // ruid: '13812345678',
          // ruName: '',
          // receiveMode: '1',
          // suid: '13812345678',
          // suName: '',
          // track: "0"

          country: "0",
          nationality: "0",
          compellation: "",
          email: "",
          mobile: "",
          identification: "",
          password: "",
          password2: "",

          // ruid: userInfo.deaultPhone||userInfo.phone,
          ruid: userInfo.deaultPhone,
          ruid1: '',
          ruName: userInfo.deaultReferee,
          receiveMode: '1',
          // suid: userInfo.deaultPhone||userInfo.phone,
          suid: userInfo.deaultPhone,
          suid1: '',
          suName: userInfo.deaultReferee,
          track: userInfo.deaultTrack?userInfo.deaultTrack.toString():"0"
        },
        rules: {
          ruid: [
            {required: true, message: langJson[lang].editruid, trigger: 'change'},
            {
              validator:  (rule, value, callback, source, options) =>{
                var errors = [];
                setTimeout(_=>{
                  if (!/^\d{8}$/.test(this.form.ruid)) errors.push(new Error(this.lang.lang=="cn"?"請輸入正確的電話號碼":"Please enter the correct phone number"));
                  if (!this.form.ruid1) errors.push(new Error(this.lang[this.lang.lang].en17));
                  callback(errors);
                },500);
              }
            }
          ],
          // ruName: [{required: true}],
          // receiveMode: [{required: true}],
          track: [{required: true, message: langJson[lang].track}]
        }
      };
    },
    methods: {
      onSubmit: function () {
        var t = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(t.form);
            this.api(this, "/user/registerSet", {
              ruid:t.form.ruid1,
              track:t.form.track
            }, res => {
              this.$message.success(t.lang[t.lang.lang].submitTxt);
            });
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
          this.api(this, '/user/obtain', {
            phone: this.form.ruid
          }, res => {
            t.form.ruName = res.compellation;
            t.form.ruid1 = res.uid;
          });
        }else{
          t.form.ruid1 = "";
        }
      }
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
  
</style>
