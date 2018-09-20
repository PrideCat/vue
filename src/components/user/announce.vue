<template>
  <div>
    <div v-title :data-title="lang[lang.lang].en1"></div>
    <div>
      <ul class="items">
        <li v-for="item in list">
          <p><span>{{item.name}}</span><span>{{item.createTime}}</span></p>
          <div>
            <p>{{item.name}}</p>
            <p>{{lang[lang.lang].en2}}：<a target="_blank" :href="item.url">{{item.file}}</a></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "announce",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.announce,
        userInfo = global.userInfo;
      langJson.lang = lang;
      return {
        collapseAttr,
        lang: langJson,
        search:{
          // startDate:"2018-08-29",
          // endDate:"2018-08-29",
          no:1, 
          size:-1
        },
        list:[
          // {
          //   id:1,
          //   cuid: "创建者编号", 
          //   name: "名称",
          //   file:"文件名",
          //   url: "https://www.baidu.com", 
          //   createTime:"2016-08-29 14:48:55"
          // }
        ],
        record:0
      };
    },
    methods: {
     init(){
      this.api(this, '/announce/retrive', this.search, res => {
        console.log(res);
        this.list = res.items;
        this.record = res.record;
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
  .items li{background: #fff;padding: 20px;margin-bottom: 10px;}
  .items li>p{display: flex;justify-content: space-between;align-items: center;margin-bottom: 12px;border-bottom: 1px solid #f1f1f1;padding-bottom: 20px;color: #333;}
  .items li>p span:last-child{color: #999;font-size: 14px;}
  .items li>div{font-size: 14px;}
  .items li>div p{color: #666;}
  .items li>div p:last-child{margin-top: 30px;color: #999;}
  .items li>div p:last-child a{color: #5397e3;margin-right: 20px;}
</style>
