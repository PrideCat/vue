<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
      <div v-title :data-title="lang[lang.lang].en1"></div>
      <div class="fromBox">
        <p class="form-title"><span>{{lang[lang.lang].en1}}</span></p>
        <div :style="collapseAttr.formBoxStyle">
          <el-form-item :label="lang[lang.lang].en2">
            <label>{{form.type==0?userInfo.reward:userInfo.money}}</label>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].en3">
            <el-select v-model="form.type">
              <el-option :label="lang[lang.lang].en4" value="0"></el-option>
              <el-option :label="lang[lang.lang].en5" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].en6" prop="suid" v-if="form.type==1">
            <el-input v-model="form.suid" :placeholder="lang[lang.lang].editsuid"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].en7" prop="money">
            <el-input v-model="form.money" type="number" :placeholder="lang[lang.lang].editmoney"></el-input>
          </el-form-item>
          <el-form-item :label="lang[lang.lang].en8" prop="password">
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
          <span>{{lang[lang.lang].en9}}</span>
          <el-date-picker v-model="search.startDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;"></el-date-picker>
          <span style="margin: 0 5px;">{{lang[lang.lang].en10}}</span>
          <el-date-picker v-model="search.endDate" type="date" value-format="yyyy-MM-dd" style="width: 135px;"></el-date-picker>
        </b>
        <b>
          <el-button @click="init">{{lang[lang.lang].en11}}</el-button>  
        </b>
      </p>
      <el-table :class="lang.lang=='en'?'langIsEn':''" :data="tableData" border style="width: calc(100% - 20px);margin: 0 10px;">
        <el-table-column prop="orderNumber" :label="lang[lang.lang].en12" align="center" width="240"></el-table-column>
        <el-table-column prop="createTime" :label="lang[lang.lang].en13" align="center" width="160"></el-table-column>
        <el-table-column prop="type" :label="lang[lang.lang].en14" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.type==0?lang[lang.lang].en4:lang[lang.lang].en5 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" :label="lang[lang.lang].en7" align="center"></el-table-column>
        <el-table-column prop="uid" :label="lang[lang.lang].en15" align="center" width="200"></el-table-column>
        <el-table-column prop="suid" :label="lang[lang.lang].en16" align="center" width="200"></el-table-column>
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
    name: "transfers",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.transfers,
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
          type:'0',
          suid:"",
          money:"",
          password:""
        },
        rules: {
          suid:[
            {required: true, message: langJson[lang].editsuid, trigger: 'blur'}
          ],
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
            this.$confirm(this.lang.lang=='cn'?'請確認進行轉賬':'Please confirm the transfer').then(_ => {
              this.api(this, '/user/transfers', this.form, res => {
                console.log(res);
                this.$message.success(this.lang[this.lang.lang].en17);
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
            this.$message.error(this.lang[this.lang.lang].en18);
            console.log('error submit!!');
            return false;
          }
        });
      },
      init(){
        this.api(this, '/user/transfersRetrive', this.search, res => {
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
