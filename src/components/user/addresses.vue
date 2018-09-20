<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en1"></div>
    <div class="fromBox">
      <!-- <p class="form-title searchBox">
        <span>交易日期：</span>
        <el-input></el-input>
        <span style="margin: 0 5px;">到</span>
        <el-input></el-input>
        <el-input style="margin-left: 40px;margin-right: 8px;width: 377px;"></el-input>
        <el-button>搜索</el-button>
      </p> -->
      <p class="head">
        <a href="javascript:void(0);" @click="record==5?'':winup.isShow=true;">{{lang[lang.lang].addAddress}}</a>
        <span>{{lang[lang.lang].en2}}<b>{{record}}</b>{{lang[lang.lang].en3}}<b>5</b>{{lang[lang.lang].en4}}</span>
      </p>
      <ul class="items">
        <li v-for="item in list">
          <div>
            <p @click="remove(item)">×</p>
            <p v-if="item.setting==1"><span>{{lang[lang.lang].en5}}</span></p>
            <ol>
              <li><b>{{lang[lang.lang].contact}}：</b>{{item.contact}}</li>
              <li><b>{{lang[lang.lang].seat}}：</b>{{item.seat}}</li>
              <li><b>{{lang[lang.lang].address}}：</b>{{item.address}}</li>
              <li><b>{{lang[lang.lang].mobile}}：</b>{{item.mobile}}</li>
              <li><b>{{lang[lang.lang].postal}}：</b>{{item.postal}}</li>
            </ol>
            <p><a href="javascript:void(0);" v-if="item.setting==0" @click="setting(item.id)">{{lang[lang.lang].en6}}</a><a href="javascript:void(0);" @click="modify(item)">{{lang[lang.lang].en7}}</a></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="winup" v-if="winup.isShow">
      <div>
        <p><span>{{lang[lang.lang].addAddress}}</span><b @click="winupClose">×</b></p>
        <ul>
          <li>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
              <div class="fromBox">
                <div :style="collapseAttr.formBoxStyle">
                  <el-form-item :label="lang[lang.lang].contact" prop="contact">
                    <el-input v-model="form.contact" :placeholder="lang[lang.lang].editcontact"></el-input>
                  </el-form-item>
                  <el-form-item :label="lang[lang.lang].seat" prop="seat">
                    <el-select v-model="form.seat" :placeholder="lang[lang.lang].editseat">
                      <el-option v-for="item in area" :label="item[lang.lang]" :value="item.val"></el-option>
                    </el-select>
                    <p style="position: absolute;line-height: 1;display: none;">{{lang[lang.lang].en8}}</p>
                  </el-form-item>
                  <el-form-item :label="lang[lang.lang].address" prop="address">
                    <el-input type="textarea" v-model="form.address" :placeholder="lang[lang.lang].editaddress"></el-input>
                  </el-form-item>
                  <el-form-item :label="lang[lang.lang].mobile" prop="mobile">
                    <el-input v-model="form.mobile" :placeholder="lang[lang.lang].editmobile"></el-input>
                  </el-form-item>
                  <el-form-item :label="lang[lang.lang].postal" prop="postal">
                    <el-input v-model="form.postal" :placeholder="lang[lang.lang].editpostal"></el-input>
                  </el-form-item>
                  
                </div>
              </div>
              <div class="fromBox" style="padding: 0;">
                <div :style="collapseAttr.formBoxStyle">
                 <el-form-item style="margin:10px 0;margin-left: -70px;">
                    <el-button style="width:200px;" type="primary" @click="onSubmit">{{lang[lang.lang].en9}}</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addresses",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.addresses,
        userInfo = global.userInfo,
        area = global.area;
      langJson.lang = lang;
      return {
        collapseAttr,
        lang: langJson,
        area,
        no: 1,
        size: -1,
        record:0,
        list: [],
        form: {
          contact:"",
          seat: "",
          address:"",
          mobile:"",
          postal:""
        },
        rules: {
          contact:[
            {required: true, message: langJson[lang].editcontact, trigger: 'blur'}
          ],
          seat:[
            {required: true, message: langJson[lang].editseat, trigger: 'blur'}
          ],
          address:[
            {required: true, message: langJson[lang].editaddress, trigger: 'blur'}
          ]
        },
        winup:{
          isShow:false
        }
      };
    },
    methods: {
      winupClose(){
        this.winup.isShow = false;
      },
      onSubmit: function () {
        var t = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            this.api(this, this.form.id?"/address/modify":"/address/add", {
              id:t.form.id,
              contact:t.form.contact,
              seat:t.form.seat,
              address:t.form.address,
              mobile:t.form.mobile,
              postal:t.form.postal
            }, res => {
              this.winupClose();
              this.init();
              // console.log(res);
              // t.$message.success(t.lang[t.lang.lang].submitTxt);
              t.$refs.form.resetFields();
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      modify(item){
        this.winup.isShow=true;
        this.form = item;
      },
      remove(item){
        this.$confirm(this.lang[this.lang.lang].en10).then(_ => {
          this.api(this, "/address/remove", {id:item.id}, res => {
            // this.list.splice(this.list.indexOf(item),1);
            this.init();
          });
        });
      },
      setting(id){
        this.api(this, "/address/setting", {id}, _ => {
          this.init();
        });
      },
      init(callback){
        this.api(this, '/address/list', {no: this.no, size: this.size}, res => {
          this.list = res.items;
          // this.tableData = res.items;
          this.record = res.record;
          if(this.record==1&&this.list[0].setting==0)this.setting(this.list[0].id);
        });
      }
    },
    mounted(){
      this.init();
    },
    created(){
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
      })
    }
  }
</script>

<style scoped>
  .fromBox{padding: 20px;font-size: 14px;}
  .head a{padding: 0 20px;line-height: 38px;display: inline-block;text-align: center;background: #494232;color: #fff;text-decoration: initial;margin-right: 7px;}
  .head span{font-size: 12px;color: #999;}
  .head span b{color: #ffbf25;margin: 0 5px;}
  .items>li{border:1px solid #ccc;padding: 0 10px 10px;margin: 20px 0;}
  .items>li div p:first-child{float: right;cursor: pointer;font-size: 24px;margin-top: -5px;color: #999;}
  .items>li div p:nth-child(2) span{background: #494232;color: #fff;display: block;width: 125px;line-height: 28px;text-align: center;margin:15px 0 25px;}
  .items>li div ol li{margin: 20px 0;}
  .items>li div ol li b{width: 125px;display: inline-block;text-align: right;color: #999;}
  .items>li div p:last-child{float: right;margin-top: -15px;}
  .items>li div p:last-child a{color: #73b2ff;margin-left: 20px;text-decoration: initial;}

  .winup>div ul li:first-child{width:90%;line-height: 41px;}
  .winup>div ul li:first-child table{width: 100%;}
  .winup>div ul li:first-child table td{border:1px solid #ccc;padding:0 10px;}
  .winup>div ul li:first-child table tr td:first-child{width:40%;text-align: right;}
  .winup>div ul li:first-child table tr:nth-child(2n){background: #f9f9f9;}
</style>
