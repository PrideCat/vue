<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
    <div v-title :data-title="lang[lang.lang].en2"></div>
    <div class="fromBox">
      <p class="form-title"><span>{{lang[lang.lang].en2}}</span></p>
      <div style="width: 400px;position: relative;left: 31px;">
        <el-form-item :label="lang[lang.lang].en3" prop="oldPassword">
          <el-input v-model="form.address"
                    :placeholder="lang[lang.lang].en5"></el-input>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].en4" prop="newPassword">
          <el-input v-model="form.mobile"
                    :placeholder="lang[lang.lang].en6"></el-input>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].en7" style="position: relative;top: 30px;"></el-form-item>
      </div>
      <quill-editor class="theEditor" style="margin: 50px 10px 30px;" v-model="form.content"></quill-editor>
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
    name: "password",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.password,
        userInfo = global.userInfo;
      langJson.lang = lang;
      return {
        collapseAttr,
        lang: langJson,
        form: {
          content:"",
          address:"",
          mobile:""
        },
        rules: {
          // oldPassword: [
          //   {required: true, message: langJson[lang].editoldPassword, trigger: 'blur'}
          // ],
          // newPassword: [
          //   {required: true, message: langJson[lang].editnewPassword, trigger: 'blur'}
          // ]
        }
      };
    },
    methods: {
      onSubmit: function () {
        var t = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            let formData = new FormData();
            formData.append("content",this.form.content);
            formData.append("address",this.form.address);
            formData.append("mobile",this.form.mobile);
            this.api(this, "/manager/company/modify", formData, res => {
              console.log(res);
              this.$message.success(t.lang[t.lang.lang].submitTxt);
              // t.$refs.form.resetFields();
            },"","",1);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted(){
      this.api(this, "/manager/company/msg", '', res => {
        console.log(res);
        this.form = res;
        // this.$message.success(t.lang[t.lang.lang].submitTxt);
        // t.$refs.form.resetFields();
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
  
</style>
