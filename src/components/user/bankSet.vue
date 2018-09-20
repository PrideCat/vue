<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en1"></div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
      <div class="fromBox" style="position: relative;">
        <p class="form-title">
          <span style="font-size: 16px;color: #333;">
            {{lang[lang.lang].en2}}<!-- <b style="font-size: 14px;">（剩餘修改次數:<i style="color: #ff4242;">2</i>）</b> -->
          </span>
        </p>
        <div class="bankSet" style="margin-left: 400px;margin-bottom: 50px;width: 400px;position: relative;left: 31px;">
          <el-form-item :label="lang[lang.lang].bankUser" prop="bankUser">
            <el-input v-model="form.bankUser" :placeholder="lang[lang.lang].editbankUser"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].bankName" prop="bankName">
            <el-select v-model="form.bankName" :placeholder="lang[lang.lang].editbankName">
              <el-option v-for="item in banks" :label="item[lang.lang]" :value="item.val"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].bankAccount" prop="bankAccount">
            <el-input v-model="form.bankAccount" :type="bankAccountIsShow?'text':'password'" :placeholder="lang[lang.lang].editbankAccount"></el-input><i :class="bankAccountIsShow?'show':'show no'" @click="bankAccountIsShow=!bankAccountIsShow"></i>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].paymentPassword" prop="paymentPassword">
            <el-input v-model="form.paymentPassword" :type="paymentPasswordIsShow?'text':'password'" :placeholder="lang[lang.lang].editpaymentPassword"></el-input><i :class="paymentPasswordIsShow?'show':'show no'" @click="paymentPasswordIsShow=!paymentPasswordIsShow"></i>
            <p style="line-height: 1;position: absolute;margin-top: 10px;left: 0;right: -5em;width: 350px;white-space: pre-wrap;">{{lang[lang.lang].en3}}</p>
          </el-form-item>
        </div>
        <div style="position: absolute;top: 115px;left: 40px;">
          <p style="width: 342px;height: 210px;border-radius: 13px;overflow: hidden;">
            <img width="100%" height="100%" :src="imgurl?imgurl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVYAAADSCAYAAAAR+ej5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0YzQ0MGNhNy04ZDVmLTg1NDAtOTI4YS1iODllYTA5NjcyYTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NENCMzQzQjE2OTc0MTFFOEI4OUZDRDY5MzIwNzE1MjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NENCMzQzQjA2OTc0MTFFOEI4OUZDRDY5MzIwNzE1MjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTAwZDc5MzctMGQxNS01ZDQ0LTgzNjgtNWViMDdmODczYmE4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjRiNzY1NmItNjBiOS0xMWU4LTlkYjUt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odgHBWNZaRfUFWIFACBireu3M9EE0F4QK3AgUkc12w7aUMXFWtYdTMOsXn0xljWf7S77WNYGBwPbhIQBahixcpAgR9YNyrT/GjSucm4jY1kRAMcCEStU+KBgLCvtgrpCrAB95dZbb40ee+yxtsoff/zxBeW33XZbtHv37kWXp/meeOKJBeUbN25sWv7kk09mLg/ZtGlT9NRTT3Vdfvvtt0d79uzJVKfPPPNMdNNNN2Uuf/bZZ1PLn3vuuWj9+vVErHX6diaaqAYXL16MLl261Fa5ppALFy6kloftpdX/py2v2ecutrxO/79Z+fnz5zMtz7bxyy+/zKX8xIkT+R+7+/fvnxkdHe34A2ZmZnKZp9vPyLqMTtYl7X/y2KZut6vddeh2O/Jal27mLdL6LlauyHPLli3RF198kfx+8803R1999VVygIflp0+fTsq3bt3atPzzzz9Pym+55ZakfHJyckGkmjafxHHPPfc0LT927FhSPj4+Hp06dSopv/feexeU79u3b942K/JMm+/48ePRtm3b2i4/evToXL2p/J133llQt08//XR08uTJud/XrFkT7d27N4lUs5a//PLLSQQblr/00ku5tCnth8qItZfr0kuxdiOAOoo1ry/RXoo1/NuOHTuiG264IXr77bfnzROW2/+o/MYbb4zeeuuteeU7d+5Myt98882Wy33ooYeS+d544415f7Py119/fUH56tWro9dee21e+a5duxaUp23zww8/nMz36quvzit/5JFHMpXbZz766KNJ+SuvvNJyeUoZbN++PTpw4EB06NCheeUTExMtyw8ePDiv/L777ovef//9eeXdBkISa19SAYxlhbqiSGjp0qXRp59+mggzS/nY2Fj0ySefNC2XYJuxdu3aZL6PP/44EaYv1/JULmGG83/00UeZykPWrVuXzPfhhx8mwsyjXIJtxebNm5PoWbL03HnnndF7772Xufyuu+6K3n333USuedNAZFDV/d7rNpPl89VdPnLkSNLNldgkyMXKDx8+nJRLNFau6Erln3322bzytGhO0ZrNJ0H6/9cytTwrv+OOO5L5Ve7nb1YeovkU7emzNZ8EafJrp1zyU7mW6cvTtk85WqVHVEcPPPBA5nLViZVrvVWutIfKH3zwwWLlWMuWZ+10PQaVZ80rt5zXNnTSLc57mb3uxuexf/JKOfUj/dHP/VHmVFjhUgFAZFm03gc9IOqil3WFWGkUAJAztRMrY1mB9g2IFTgQqSPqB7Gyg2mY1FcR78taxhsK5Xlf1n5uS4ODgW0C4Au5xhErIgOiQCjD/mvQuKrbjaLuqQP2x2CQWC9TDZDHQVW2sazA/ujRMTAlsZ7M84YiwAFEXUBtI9VGkgT4hX5+WDexMpYVaN/QC0ZGRvTygcT64+npaWqEAxGoI+qnS2bvu/ITifWH165dm2YHs97UV/XXsYztrExjWVesWCGXvtiIV+xw/ObfY7myU9kmoD1Vert7uZxYqnr5YbyMQzbc6rtXr149V4aUACKDorUZ2iQoBbBq1apz8ds/0++N2YbxWfzynStXrsx0eiKL8ZSsF9tIHdSxXoeHh3Vjbonz2/FnHZkT6+yHvxi//PHU1NQ0J7OAA5z9ShvIFqlu2LBBUv2TuE5+YOUS64yrrH+IX56PI9ez/ci5QvXEyA2voS7HkHKqcaSq7v8L8e9/5//eSPmHvfHLjqtXr754+fLl6fg1UgRbtbGujGUFvjyhnfpcsmRJEqGuXLlSj+6eXrVqlSLUX4v/9q8L5p+cnNSI1nAvJL/HMr0tfvlWPP16PG2LJz3ha4RqBoCacSWefhFPH8TTf8XTi7FQ7ZnZC6LO/xdgAFtRtlywJ84bAAAAAElFTkSuQmCC'">
          </p>
          <p style="text-align: center;margin-top: 10px;">
            <label style="font-size: 14px;color: #3896ff;cursor: pointer;text-decoration: underline;">{{lang[lang.lang].en4}}<input style="display: none;" type="file" @change="upload"/></label>
          </p>
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
    name: "bankSet",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.bankSet,
        userInfo = global.userInfo,
        banks = global.banks;
      langJson.lang = lang;
      return {
        lang: langJson,
        collapseAttr,
        userInfo,
        banks,
        form: {
          bankUser:userInfo.bankUser,
          bankName:userInfo.bankName,
          bankAccount:userInfo.bankAccount,
          paymentPassword:"",
          filedata: userInfo.bankPic
        },
        rules: {
          bankUser:[
            {required: true, message: langJson[lang].editbankUser,trigger:"blur"}
          ],
          bankName:[
            {required: true, message: langJson[lang].editbankName,trigger:"blur"}
          ],
          bankAccount:[
            {required: true, message: langJson[lang].editbankAccount,trigger:"blur"}
          ],
          paymentPassword:[
            {required: true, message: langJson[lang].editpaymentPassword,trigger:"blur"}
          ]
        },
        imgurl:userInfo.bankPic,
        bankAccountIsShow:false,
        paymentPasswordIsShow:false
      };
    },
    methods: {
      onSubmit: function () {
        var t = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(t.form);
            const formData = new FormData();
            for(let k in t.form){
              formData.append(k,t.form[k]);
              // console.log(k,t.form[k]);
            }
            this.api(this, "/user/bankSet", formData, res => {
              console.log(res);
              this.userInfo.bankUser=this.form.bankUser;
              this.userInfo.bankName=this.form.bankName;
              this.userInfo.bankAccount=this.form.bankAccount;
              this.userInfo.bankPic=this.imgurl;
              this.$message.success(t.lang[t.lang.lang].submitTxt);
              this.global.updateUserInfo(this.userInfo);
            },'','',1);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      upload(e){
        const reader = new FileReader();
        const file = e.path[0].files[0];
        reader.readAsDataURL(file);
        reader.onloadend = _=> {
          switch(file.name.split(".").reverse()[0]){
            case "jpg":
            case "png":
              if(file.size>4096000){
                this.$message.error(this.lang[this.lang.lang].en5);
              }else{
                this.imgurl = reader.result;
                this.form.filedata = file;  
              }
              break;
            default:
              this.$message(this.lang[this.lang.lang].en6);
              break;
          }
        };
      }
    },
    mounted(){
      
    },
    created(){
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
      })
    }
  }
</script>

<style scoped>
  .el-form-item__label{color: #999;}
  .show{display: inline-block;width: 20px;height: 15px;background: url(../../../static/img/blink.png) no-repeat;cursor: pointer;margin-right: 8px;position: relative;right: 20px;top: 6px;}
  .show.no{background-image: url(../../../static/img/closeEyes.png);top: 4px;}
</style>
