<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
    <div v-title :data-title="lang[lang.lang].en1"></div>
    <div class="fromBox">
      <p class="form-title">
        <span>{{lang[lang.lang].en8}}</span>
      </p>
      <div :style="collapseAttr.formBoxStyle">
        <el-form-item :label="lang[lang.lang].oldPassword" prop="oldPassword">
          <el-input
            type="password"
            v-model="form.oldPassword"
            :placeholder="lang[lang.lang].editoldPassword"
          ></el-input>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].newPassword" prop="newPassword">
          <el-input
            type="password"
            v-model="form.newPassword"
            :placeholder="lang[lang.lang].editnewPassword1"
          ></el-input>
        </el-form-item>
        <el-form-item :label="lang[lang.lang].passwordConfirmation" prop="passwordConfirmation">
          <el-input
            type="password"
            v-model="form.passwordConfirmation"
            :placeholder="lang[lang.lang].editpasswordConfirmation"
          ></el-input>
        </el-form-item>
      </div>
    </div>
    <div class="fromBox">
      <div :style="collapseAttr.formBoxStyle">
        <el-form-item style="margin:10px 0;margin-left: -70px;">
          <el-button
            style="width:200px;"
            type="primary"
            @click="onSubmit"
          >{{lang[lang.lang].submit}}</el-button>
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
        oldPassword: "",
        newPassword: "",
        passwordConfirmation: ""
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: langJson[lang].editoldPassword,
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: langJson[lang].editnewPassword1,
            trigger: "blur"
          },
          {
            validator: (rule, value, callback, source, options) => {
              var errors = [];
              if (!/^(?=.*[a-zA-Z])[^]{6,8}$/.test(this.form.newPassword))
                errors.push(new Error(langJson[lang].editnewPassword1));
              callback(errors);
            }
          }
        ],
        passwordConfirmation: [
          {
            required: true,
            message: langJson[lang].editpasswordConfirmation,
            trigger: "blur"
          },
          {
            validator: (rule, value, callback, source, options) => {
              var errors = [];
              if (
                this.form.newPassword &&
                this.form.newPassword !== this.form.passwordConfirmation
              )
                errors.push(
                  new Error(langJson[lang].editpasswordConfirmation1)
                );
              callback(errors);
            }
          }
        ]
      }
    };
  },
  methods: {
    onSubmit: function() {
      var t = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.api(
            this,
            "/user/paymentPassword",
            {
              oldPassword: t.form.oldPassword,
              paymentPassword: t.form.newPassword
            },
            res => {
              if (localStorage.getItem("rememberMe")) {
                localStorage.setItem(
                  "rememberMe",
                  JSON.stringify({
                    uid: JSON.parse(localStorage.getItem("rememberMe")).uid,
                    password: t.form.newPassword
                  })
                );
              }
              this.$message.success(t.lang[t.lang.lang].submitTxt);
              t.$refs.form.resetFields();
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.$root.$on("selectLang", res => {
      this.lang.lang = res;
    });
  }
};
</script>

<style scoped>
</style>
