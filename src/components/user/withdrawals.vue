<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
      <div v-title :data-title="lang[lang.lang].en1"></div>
      <div class="fromBox">
        <p class="form-title"><span>{{lang[lang.lang].en1}}</span></p>
        <div :style="collapseAttr.formBoxStyle">
          <el-form-item :label="lang[lang.lang].bankName">
            <label>{{userInfo.bankName}}</label>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].bankAccount">
            <label>{{userInfo.bankAccount}}</label>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].en2">
            <label>{{userInfo.identification}}</label>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].en3">
            <label>{{userInfo.money}}</label>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].money" prop="money">
            <el-input v-model="form.money" type="number" :placeholder="lang[lang.lang].editmoney"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].password" prop="password">
            <el-input v-model="form.password" type="password" :placeholder="lang[lang.lang].editpassword"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="fromBox" style="position: relative;top: -10px;">
        <div :style="collapseAttr.formBoxStyle">
         <el-form-item style="margin:10px 0;margin-left: -70px;">
            <el-button style="width:200px;" type="primary" @click="onSubmit">{{lang[lang.lang].submit}}</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="fromBox">
      <p class="form-title searchBox">
        <b>
          <span>{{lang[lang.lang].en4}}</span>
          <el-date-picker v-model="search.startDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;"></el-date-picker>
          <span style="margin: 0 5px;">{{lang[lang.lang].en5}}</span>
          <el-date-picker v-model="search.endDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;"></el-date-picker>
        </b>
        <b>
          <el-button @click="init">{{lang[lang.lang].en6}}</el-button>  
        </b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 0 10px;">
        <el-table-column prop="orderNumber" :label="lang[lang.lang].en7" align="center" width="240"></el-table-column>
        <el-table-column prop="money" :label="lang[lang.lang].money" align="center"></el-table-column>
        <el-table-column prop="balance" :label="lang[lang.lang].en8" align="center"></el-table-column>
        <el-table-column prop="createTime" :label="lang[lang.lang].en9" align="center" width="160"></el-table-column>
        <el-table-column prop="trace" :label="lang[lang.lang].en10" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.trace==0?lang[lang.lang].en11:(scope.row.trace==1?lang[lang.lang].en12:lang[lang.lang].en13) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="lang[lang.lang].en14" align="center"></el-table-column>
      </el-table>
      <el-pagination :class="lang.lang" class="white" style="margin-top: 20px;text-align: center;"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page="search.no"
                   :page-sizes="[10, 20, 30, 40]" :page-size="search.size"
                   :small="true"
                   :layout="collapseAttr.paginationLayout"
                   :total="record">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  const getNumber = function(number){
    return number<10?"0"+number:number;
  };
  export default {
    name: "withdrawals",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.withdrawals,
        userInfo = global.userInfo,
        banks = global.banks;
      langJson.lang = lang;
      let searchDate = new Date();
      searchDate.setDate(1);
      let searchEndDate = searchDate.getFullYear()+"-"+getNumber(searchDate.getMonth()+1)+"-"+getNumber(searchDate.getDate());
      searchDate.setDate(searchDate.getDate()-30);
      let searchStartDate = searchDate.getFullYear()+"-"+getNumber(searchDate.getMonth()+1)+"-"+getNumber(searchDate.getDate());
      return {
        collapseAttr,
        lang: langJson,
        userInfo,
        banks,
        form: {
          money:"",
          password:""
        },
        rules: {
          money:[
            {required: true, message: langJson[lang].editmoney, trigger: 'blur'}, {
              validator: (rule, value, callback, source, options)=> {
                var errors = [];
                if (this.form.money<=0) errors.push(new Error(langJson[lang].editmoney));
                callback(errors);
              }
            }
          ],
          password:[
            {required: true, message: langJson[lang].editpassword, trigger: 'blur'}
          ]
        },
        search:{
          no:1,
          size:10,
          startDate:searchStartDate,
          endDate:searchEndDate
        },
        tableData:[],
        record:0
      };
    },
    methods: {
      onSubmit: function () {
        var t = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$confirm(this.lang.lang=='cn'?'請確認進行提現':'Please confirm the withdrawal').then(_ => {
              this.api(this, '/user/withdrawals', this.form, res => {
                console.log(res);
                this.$message.success(this.lang[this.lang.lang].en15);
                this.$refs.form.resetFields();
                // (document.documentElement||document.body).scrollTop=0;
                // this.userInfo.activate = 1;
                // this.global.updateUserInfo(this.userInfo);
                // this.$router.push('index');
                this.init();
                this.updata();
              });
            }).catch(_=>{});
          } else {
            this.$message.error(this.lang[this.lang.lang].en16);
            console.log('error submit!!');
            return false;
          }
        });
      },
      init(){
        this.api(this, '/user/withdrawalsRetrive', this.search, res => {
          console.log(res);
          this.tableData = res.items;
          this.record = res.record;
        });
      },
      handleSizeChange: function (val) {
        this.search.size = val;
        this.init();
      },
      handleCurrentChange: function (val) {
        this.search.no = val;
        this.init();
      },
      updata(){
        this.api(this, '/user/msg', "", res => {
          // console.log('user/msg',res);
          this.userInfo = res;
        });
      }
    },
    mounted(){
      this.init();
      this.updata();
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
