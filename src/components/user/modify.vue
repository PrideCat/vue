<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="140px" label-position="right">
    <div v-title :data-title="lang[lang.lang].en1"></div>
    <div class="fromBox">
      <p class="form-title"><span>{{lang[lang.lang].basicInfo}}</span></p>
      <div :style="collapseAttr.formBoxStyle">
        <div class="halfLine">
          <div>
            <el-form-item :label="lang[lang.lang].userid">
              <label>{{userInfo.uid}}</label>
            </el-form-item>
          </div>
          <div>
            <el-form-item :label="lang[lang.lang].personPur">
              <label>{{userInfo.Integral||0}}BV</label>
            </el-form-item>
          </div>
        </div>
        <div class="halfLine">
          <div>
            <el-form-item :label="lang[lang.lang].runame">
              <label>{{userInfo.referee}}</label>
            </el-form-item>
          </div>
          <div>
            <el-form-item :label="lang[lang.lang].ruid">
              <label>{{userInfo.rmobile}}</label>
            </el-form-item>
          </div>
        </div>
        <!-- <div class="halfLine">
          <div>
            <el-form-item :label="lang[lang.lang].personRes">
              <label>{{userInfo.accumulation||0}}BV</label>
            </el-form-item>
          </div>
          <div>
            <el-form-item :label="lang[lang.lang].seat">
              <label>{{userInfo.seat}}</label>
            </el-form-item>
          </div>
        </div> -->
        
        <!--<el-form-item :label="lang[lang.lang].personRet">-->
        <!--<label>0BV</label>-->
        <!--</el-form-item>-->
      </div>
    </div>
    <div class="fromBox">
      <div :style="collapseAttr.formBoxStyle">
        <!-- <el-form-item :label="lang[lang.lang].Nationality">
          <label>香港(HK)</label>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].countryWin">
          <label>香港窗口</label>
        </el-form-item> -->
        <el-form-item :label="lang[lang.lang].compellation">
          <label>{{userInfo.compellation}}</label>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].EnglishName">
          <label>{{userInfo.EnglishName}}</label>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].identification">
          <label>{{userInfo.identification}}</label>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].nickname">
          <el-input v-model="form.nickname" :placeholder="lang[lang.lang].editnickname"></el-input>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].birthday">
          <el-date-picker v-model="form.birthday" type="date" :placeholder="lang[lang.lang].editbirthday"></el-date-picker>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="0">{{lang[lang.lang].sex1}}</el-radio>
            <el-radio label="1">{{lang[lang.lang].sex2}}</el-radio>
            <!-- <el-radio label="2">{{lang[lang.lang].sex3}}</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].wechatNumber">
          <el-input v-model="form.wechatNumber"></el-input>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].phone" prop="phone">
          <el-input v-model="form.phone" :placeholder="lang[lang.lang].editphone"></el-input>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].mobile" prop="mobile">
          <el-input v-model="form.mobile" :placeholder="lang[lang.lang].editmobile"></el-input>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].email" prop="email">
          <el-input v-model="form.email" :placeholder="lang[lang.lang].editemail"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="lang[lang.lang].seat">
          <el-input v-model="form.seat" :placeholder="lang[lang.lang].editseat"></el-input>
        </el-form-item> -->
        <el-form-item :label="lang[lang.lang].postal">
          <el-input v-model="form.postal" :placeholder="lang[lang.lang].editpostal"></el-input>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].address">
          <el-input type="textarea" v-model="form.address" :placeholder="lang[lang.lang].editaddress"></el-input>
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
</template>

<script>
  export default {
    name: "modify",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.modify,
        userInfo = global.userInfo,
        area = global.area;
      langJson.lang = lang;
      return {
        collapseAttr,
        lang: langJson,
        userInfo,
        area,
        form: {
          nickname: userInfo.nickname,
          birthday: userInfo.birthday,
          sex: userInfo.sex.toString(),
          wechatNumber: userInfo.wechatNumber,
          phone: userInfo.phone,
          mobile: userInfo.mobile,
          email: userInfo.email,
          seat: userInfo.seat,
          address: userInfo.address,
          postal: userInfo.postal
        },
        rules: {
          phone: [{
            validator: (rule, value, callback, source, options)=> {
              var errors = [];
              if (this.form.phone && !/^\d{8}$/.test(this.form.phone)||this.form.phone.length!=8) errors.push(new Error(langJson[lang].editphone1));
              callback(errors);
            }
          }],
          mobile: [{
            validator: (rule, value, callback, source, options)=> {
              var errors = [];
              if (this.form.mobile && !/^([6|9])\d{7}$/.test(this.form.mobile)) errors.push(new Error(langJson[lang].editmobile1));
              callback(errors);
            }
          }],
          email: [
            {required: true, message: langJson[lang].editemail, trigger: 'blur'}, {
              type: 'email',
              message: langJson[lang].editemail1,
              trigger: ['blur', 'change']
            }
          ]
        }
      };
    },
    methods: {
      onSubmit: function () {
        var t = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            this.api(this, "/user/modify", {
              nickname: t.form.nickname,
              birthday: t.form.birthday,
              sex: t.form.sex*1,
              phone: t.form.phone,
              mobile: t.form.mobile,
              email: t.form.email,
              seat: t.form.seat,
              postal: t.form.postal,
              wechatNumber: t.form.wechatNumber,
              address: t.form.address
            }, res => {
              this.$message.success(this.lang[this.lang.lang].submitTxt);
              this.api(this, '/user/msg', '', res => {
                this.global.userInfo = res;
                this.global.updateUserInfo(this.global.userInfo);
                // sessionStorage.setItem("userInfoStorage", JSON.stringify(res));
                // this.$router.go(0);
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
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
