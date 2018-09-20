<template>
  <div id="main" :class="(userInfo.agreement==0&&!(userInfo.type==0&&(userInfo.rank==1||userInfo.rank==2)))||forgetPassword?'agree':''">
    <div id="theTop">
      <div style="user-select: none;">
        {{lang[lang.lang].en46}}，{{userInfo.nickname}}
        <!-- <a href="javascript:void(0);"> -->
        <!-- <a href="javascript:void(0);" @click="selectLang"> -->
          <el-select style="margin-left: 10px;" v-model="lang.lang" size="mini" @change="selectLang(lang.lang)">
            <el-option :label="lang[lang.lang].en47" value="cn"></el-option>
            <el-option :label="lang[lang.lang].en48" value="en"></el-option>
          </el-select>
        <!-- </a> -->
        <a href="javascript:void(0);" @click="exit">{{lang[lang.lang].en49}}</a>
      </div>
    </div>
    <el-container>
      <el-aside style="width: auto;min-height: 100vh;background:#fff;">
        <h3 class="logo" style="background: #12afe3;font-size:20px;font-weight: bold;">
          <!--<router-link style="color: #fff;text-decoration: unset;" to="index">-->
            <img src="../../../static/img/logo.png" height="55" width="138"/>
          <!--</router-link>-->
        </h3>
        <el-menu text-color="#303133" active-text-color="#303133" :unique-opened="true" :default-active="activeIndex" @select="menuSelect" @open="menuOpen" ref="menu" v-if="pageI==0">
          <!--<el-menu text-color="#303133" active-text-color="#303133" :collapse="isCollapse" :default-active="activeIndex" @select="menuSelect">-->
          <div v-for="item in menuData" v-if="(userInfo.authority!=0||!item.ishide)&&!item.isHide">
            <el-submenu v-if="item.children" :index="item.index">
              <template slot="title">
                <div :class="item.icon?'menuIconBox':''">
                  <i v-html="item.icon"></i><b>{{item[lang.lang]}}</b>
                </div>
              </template>
              <div v-for="item in item.children" v-if="!item.isHide">
                <el-menu-item :index="item.index">
                  <router-link tag="div" :class="item.icon?'menuIconBox':''" :to="{name:item.url.split('.html')[0]}">
                    <i v-html="item.icon"></i><b>{{item[lang.lang]}}</b>
                  </router-link>
                </el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item v-else :index="item.index">
              <router-link tag="div" :class="item.icon?'menuIconBox':''" :to="{name:item.url.split('.html')[0]}">
                <i v-html="item.icon"></i><b>{{item[lang.lang]}}</b>
              </router-link>
            </el-menu-item>
          </div>
        </el-menu>
        <el-menu text-color="#303133" active-text-color="#303133" :unique-opened="true" :default-active="'0'" @select="menuSelect" v-else>
          <div v-for="item in menuArray1">
            <el-menu-item :index="item.index">
              <router-link tag="div" :class="item.icon?'menuIconBox':''" :to="{name:item.url.split('.html')[0]}">
                <i v-html="item.icon"></i><b>{{item[lang.lang]}}</b>
              </router-link>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="flex flexAlignCenter"
                   :style="'background:'+collapseAttr.bgColor+';color:#fff;height: 75px;'">
          <!--<user-header-info :lang="lang.lang" @selected="selectLang"></user-header-info>-->
          <ul id="info">
            <li>
              <router-link tag="div" to="modify">
                <p><img src="../../../static/img/user.png" height="30" width="24"/></p>
                <p>{{lang[lang.lang].en50}}</p>
              </router-link>
            </li>
            <li>
              <router-link tag="div" to="announce">
                <p><img src="../../../static/img/notic.png" height="28" width="25"/></p>
                <p>{{lang[lang.lang].en51}}</p>
              </router-link>
            </li>
            <li>
              <div @click="prompt">
                <p><img src="../../../static/img/shopping.png" height="28" width="28"/></p>
                <p>{{lang[lang.lang].en52}}</p>
              </div>
            </li>
          </ul>
        </el-header>
        <el-main>
          <div style="margin: -20px -20px 0;padding: 12px 10px 12px 20px;" v-if="userInfo.activate!=0&&userInfo.activate!=1&&pageI!=1">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>
                <router-link style="color:#303133;text-decoration: unset;" to="index">
                  {{lang[lang.lang].home}}
                </router-link>
                </el-breadcrumb-item>
              <el-breadcrumb-item v-if="activeIndex.split('-').length>1&&!isIndex">
                {{menuArray[menuArrayIndexs.indexOf(activeIndex.split("-")[0])][lang.lang]}}
              </el-breadcrumb-item>
              <el-breadcrumb-item v-if="!isIndex">{{menuArray[menuArrayIndexs.indexOf(activeIndex)][lang.lang]}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div id="mobileHead">
            <p>
              <i @click="mobileMenuIsShow = true;">
                <svg viewBox="0 0 1214 1024" width="20"><path d="M890.88 93.090909h-837.818182a46.545455 46.545455 0 0 1 0-93.090909h837.818182a46.545455 46.545455 0 1 1 0 93.090909zM1168.290909 558.545455h-1117.090909a46.545455 46.545455 0 1 1 0-93.09091h1117.090909a46.545455 46.545455 0 0 1 0 93.09091zM584.610909 1024H46.545455a46.545455 46.545455 0 0 1 0-93.090909h538.065454a46.545455 46.545455 0 0 1 0 93.090909z"/></svg>
              </i>
              <router-link tag="i" :to="{name:'modify'}">
                <svg viewBox="0 0 1024 1024" width="26"><path d="M760.858624 628.78208c-4.440064-4.46464-10.805248-7.030784-17.440768-7.030784-6.63552 0-13.000704 2.56512-17.465344 7.030784-9.595904 9.595904-9.595904 25.261056 0.049152 34.906112 51.95264 51.977216 107.876352 147.124224 107.876352 233.242624 0 13.617152 11.076608 24.669184 24.69376 24.669184 13.617152 0 24.669184-11.052032 24.669184-24.669184C883.239936 796.183552 821.789696 689.664 760.858624 628.78208z"/><path d="M512 102.4c-130.399232 0-236.474368 106.07616-236.474368 236.474368 0 85.797888 46.1056 164.269056 120.753152 206.181376-49.682432 17.293312-95.616 46.154752-133.161984 83.725312C202.20928 689.664 140.760064 796.209152 140.760064 896.930816c0 13.617152 11.052032 24.669184 24.669184 24.669184 13.617152 0 24.669184-11.052032 24.669184-24.669184 0-86.1184 55.948288-181.266432 107.900928-233.242624 54.838272-54.888448 127.710208-86.316032 205.145088-88.536064 2.811904 0.12288 5.846016 0.197632 8.856576 0.197632 130.374656 0 236.449792-106.07616 236.449792-236.474368S642.374656 102.4 512 102.4zM512 151.786496c103.164928 0 187.112448 83.922944 187.112448 187.087872 0 101.46304-82.294784 185.41056-183.461888 187.137024-0.887808-0.197632-2.269184-0.345088-3.700736-0.345088-2.935808 0-5.896192 0.049152-8.634368 0.14848-100.056064-4.588544-178.428928-86.685696-178.428928-186.939392C324.887552 235.710464 408.835072 151.786496 512 151.786496zM371.708928 525.790208c9.595904 6.882304 19.6608 13.222912 30.441472 18.624512-0.320512 0.098304-0.616448 0.246784-0.93696 0.345088C390.777856 539.160576 381.008896 532.74624 371.708928 525.790208z"/></svg>
              </router-link>
              <b><img src="../../../static/img/logo.png" height="55" width="138"/></b>
              <router-link tag="i" to="announce">
                <svg viewBox="0 0 1024 1024" width="25"><path d="M838.4 771.9H207.1c-19.5 0-36.1-11.9-42.2-30.4-6.2-18.5-0.1-38 15.5-49.7 55.6-41.7 88.7-108 88.7-177.5V383c0-37.7 8.5-73.9 25.3-107.7 15.9-32.1 39.3-60.8 67.5-83.2 58.7-46.5 134.7-63.1 208.6-45.7 53.1 12.5 100.8 44.1 134.5 89 32.8 43.8 50.9 98.3 50.9 153.5v125.4c0 38 9.9 75.6 28.5 108.8 6.8 12 2.5 27.3-9.5 34-12 6.8-27.3 2.5-34-9.5C718.1 607 706 560.9 706 514.3V389c0-92.2-61.8-173.7-146.8-193.8-58.9-13.9-119.4-0.7-166.1 36.2-46.9 37.1-73.8 92.4-73.8 151.6v131.3c0 42-9.9 84-28.7 121.6-16.4 32.8-39.6 62.3-67.6 86h615.6c13.8 0 25 11.2 25 25s-11.4 25-25.2 25zM512.5 962.3c-67.3 0-122-54.7-122-122 0-13.8 11.2-25 25-25s25 11.2 25 25c0 39.7 32.3 72 72 72s72-32.3 72-72c0-13.8 11.2-25 25-25s25 11.2 25 25c0 67.3-54.7 122-122 122z"/><path d="M512.5 116.2m-52.2 0a52.2 52.2 0 1 0 104.4 0 52.2 52.2 0 1 0-104.4 0Z"/></svg>
              </router-link>
              <i @click="prompt">
                <svg viewBox="0 0 1024 1024" width="23"><path d="M955.68152 227.327472c0-20.390399-16.58984-36.919864-37.050848-36.919864L296.064484 190.407608c-4.54041 0-8.887414 0.816598-12.906961 2.304486L249.814114 89.716324c-5.824659-17.46272-23.482831-27.691689-41.148166-24.790616-0.51063-0.021489-1.022283-0.038886-1.537006-0.038886L103.365694 64.886823c-20.466124 0-37.058011 16.530488-37.058011 36.919864 0 20.387329 16.591887 36.916794 37.058011 36.916794l84.443227 0 148.250462 457.939757L227.71377 730.032782c-12.879332 15.84999-10.423397 39.09439 5.487991 51.92051 10.015098 8.075933 22.969131 10.090822 34.406624 6.52767l628.78175 0c20.470217 0 37.061081-16.531512 37.061081-36.920888 0-20.386306-16.590863-36.916794-37.061081-36.916794l-560.833195 0 59.982116-73.832566 404.50373 0c20.218484 0 36.643572-16.135492 37.038568-36.182061 0.037862-0.110517 0.081864-0.218988 0.118704-0.329505L953.602162 253.804497c2.060939-6.202259 2.371-12.559037 1.213641-18.547425C955.376575 232.700853 955.68152 230.05049 955.68152 227.327472zM771.533476 566.972009 404.319024 566.972009l-98.003058-302.727743 565.756321 0L771.533476 566.972009zM518.407432 493.136374c20.466124 0 37.056987-16.530488 37.056987-36.918841l0-95.986121c0-20.389376-16.590863-36.917818-37.056987-36.917818-20.465101 0-37.054941 16.528442-37.054941 36.917818l0 95.986121C481.352491 476.605885 497.942331 493.136374 518.407432 493.136374zM681.461041 493.136374c20.466124 0 37.054941-16.530488 37.054941-36.918841l0-95.986121c0-20.389376-16.588817-36.917818-37.054941-36.917818s-37.055964 16.528442-37.055964 36.917818l0 95.986121C644.405077 476.605885 660.994917 493.136374 681.461041 493.136374zM347.945085 840.165088c-32.748868 0-59.295478 26.446325-59.295478 59.07035 0 32.620955 26.546609 59.069327 59.295478 59.069327 32.745798 0 59.291384-26.448372 59.291384-59.069327C407.235446 866.61039 380.690884 840.165088 347.945085 840.165088zM807.457664 840.165088c-32.749892 0-59.294454 26.446325-59.294454 59.07035 0 32.620955 26.544563 59.069327 59.294454 59.069327 32.744775 0 59.290361-26.448372 59.290361-59.069327C866.749048 866.61039 840.202439 840.165088 807.457664 840.165088z"/></svg>
              </i>
            </p>
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <router-view name="agree"/>
    <router-view name="forgetPassword"/>
    <div class="foot">
      <p>{{lang[lang.lang].en53}} | {{lang[lang.lang].en54}} | {{lang[lang.lang].en55}} | {{lang[lang.lang].en56}} | {{lang[lang.lang].en57}}</p>
      <p>© 2018. Headwind International. All Rights Reserved.</p>
    </div>
    <div class="winup" id="DailyReminder" v-if="winup.isShow">
      <div>
        <p><span>{{lang[lang.lang].en58}}</span><b @click="winupClose">×</b></p>
        <ul>
          <li>{{lang.lang=="cn"?"今日为翊豐國際"+winup.year+"财政年度第"+(Math.floor(winup.weeks/4)+1)+"期第"+(winup.weeks%4+1)+"周第"+winup.week+"天":"Today is the "+winup.week+"th day of the "+(winup.weeks%4+1)+"nd week of the "+(Math.floor(winup.weeks/4)+1)+"rd phase of the "+winup.year+" fiscal year"}}</li>
          <li>{{lang.lang=="cn"?"本周时间："+winup.returnWeeks.split('~')[0]+" —— "+winup.returnWeeks.split('~')[1]+"(香港时间)":"This week: "+winup.returnWeeks.split('~')[0].replace(/(\d{4})年(\d{1,2})月(\d{1,2})日/,"$1/$2/$3")+" - "+winup.returnWeeks.split('~')[1].replace(/(\d{4})年(\d{1,2})月(\d{1,2})日/,"$1/$2/$3")+" (Hong Kong time)"}}</li>
          <li>{{lang[lang.lang].en59}}{{lang.lang=="cn"?winup.weekEndDate:winup.weekEndDate.replace(/(\d{4})年(\d{1,2})月(\d{1,2})日/,"$1/$2/$3")}}{{lang[lang.lang].en60}}</li>
          <!-- <li>如您有任何建议或意见请及时联系此邮箱:</li> -->
          <!-- <li>xxxxx@qq.com</li> -->
          <li><a href="javascript:void(0);" @click="winupClose">{{lang[lang.lang].en61}}</a></li>
          <li :class="winup.hasRemind?'':'active'" @click="winup.hasRemind=!winup.hasRemind"><i></i><span>{{lang[lang.lang].en62}}</span></li>
        </ul>
      </div>
    </div>
    <div id="mobileMenu" :class="mobileMenuIsShow?'show':''" @click="mobileMenuIsShow = false;">
      <ul class="m_content" @click.stop="">
        <li><p><i @click="mobileMenuIsShow = false;">×</i></p></li>
        <li>
          <ol>
            <li><img src="../../../static/img/avatar.png" alt=""></li>
            <li>{{userInfo.nickname}}</li>
            <li>{{userInfo.level==1?"無":(userInfo.level==2?"IBO":(userInfo.level==3?"Associate":(userInfo.level==4?"Partner":(userInfo.level==5?"Senior Partner":(userInfo.level==6?"Silver":(userInfo.level==7?"Gold":(userInfo.level==8?"Platinum":(userInfo.level==9?"Ruby":(userInfo.level==10?"Sapphire":(userInfo.level==11?"Emerald":(userInfo.level==12?"Jade":(userInfo.level==13?"Diamond":(userInfo.level==14?"Pink Diamond":(userInfo.level==15?"Black Diamond":(userInfo.level==16?"Royal Diamond":(userInfo.level==17?"Crown Diamond":""))))))))))))))))}}</li>
          </ol>
        <li>
          <el-menu text-color="#303133" active-text-color="#303133" :unique-opened="true" :default-active="activeIndex" @select="menuSelect" @open="menuOpen" ref="menu" v-if="pageI==0">
            <!--<el-menu text-color="#303133" active-text-color="#303133" :collapse="isCollapse" :default-active="activeIndex" @select="menuSelect">-->
            <div v-for="item in menuData" v-if="(userInfo.authority!=0||!item.ishide)&&!item.isHide">
              <el-submenu v-if="item.children" :index="item.index">
                <template slot="title">
                  <div :class="item.icon?'menuIconBox':''">
                    <i v-html="item.icon"></i><b>{{item[lang.lang]}}</b>
                  </div>
                </template>
                <div v-for="item in item.children" v-if="!item.isHide">
                  <el-menu-item :index="item.index">
                    <router-link tag="div" :class="item.icon?'menuIconBox':''" :to="{name:item.url.split('.html')[0]}">
                      <i v-html="item.icon"></i><b>{{item[lang.lang]}}</b>
                    </router-link>
                  </el-menu-item>
                </div>
              </el-submenu>
              <el-menu-item v-else :index="item.index">
                <router-link tag="div" :class="item.icon?'menuIconBox':''" :to="{name:item.url.split('.html')[0]}">
                  <i v-html="item.icon"></i><b>{{item[lang.lang]}}</b>
                </router-link>
              </el-menu-item>
            </div>
          </el-menu>
          <el-menu text-color="#303133" active-text-color="#303133" :unique-opened="true" :default-active="'0'" @select="menuSelect" v-else>
            <div v-for="item in menuArray1">
              <el-menu-item :index="item.index">
                <router-link tag="div" :class="item.icon?'menuIconBox':''" :to="{name:item.url.split('.html')[0]}">
                  <i v-html="item.icon"></i><b>{{item[lang.lang]}}</b>
                </router-link>
              </el-menu-item>
            </div>
          </el-menu>
        </li>
        <li><p><a @click="selectLang(lang.lang=='cn'?'en':'cn')">{{lang[lang.lang].en76}}</a><a @click="exit">{{lang[lang.lang].en49}}</a></p></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  let date = new Date();
  function getWeekOfYear(){
    let today = new Date();
    let firstDay = new Date(today.getFullYear(),0, 1);
    let dayOfWeek = firstDay.getDay(); 
    let spendDay= 1;
    if (dayOfWeek !=0) {
      spendDay=7-dayOfWeek+1;
    }
    firstDay = new Date(today.getFullYear(),0, 1+spendDay);
    let d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
    let result =Math.ceil(d/7);
    return result;
  };
  const returnWeek = (str,isTimes) =>{
    str?str = str.split("_"):"";
    let year = str[0],week = str[1],date = new Date(),start,end;
    date.setMonth(0,1);
    date.setDate(date.getDate()-date.getDay());
    date.setDate(date.getDate()+week*7);
    start = date.toLocaleDateString();
    date.setDate(date.getDate()+6);
    end = date.toLocaleDateString();
    if(isTimes)return date.getTime();
    start = start.replace(/\//,"年");
    start = start.replace(/\//,"月");
    start = start + "日";
    end = end.replace(/\//,"年");
    end = end.replace(/\//,"月");
    end = end + "日";
    return start+"~"+end;
  };
  export default {
    name: "index",
    data() {
      console.log(this.global);
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.index,
        menuData = global.menuData,
        menuArray = global.menuArray,
        menuArray1 = global.menuArray1,
        menuArrayIndexs = global.menuArrayIndexs,
        userInfo = global.userInfo,
        activeIndex = "0",
        date = new Date(),
        isActivate=global.activate==0||global.activate==1?1:0,
        pageI=0;
      langJson.lang = lang;
      date.setHours(0,0,0,0);
      let weekEndDate = returnWeek(date.getFullYear()+"_"+getWeekOfYear()).split("~")[1].replace(/日/,"").replace(/年|月/g,"-").split("-");
      weekEndDate = new Date(weekEndDate[0],weekEndDate[1]-1,weekEndDate[2],0,0,0);
      weekEndDate.setDate(weekEndDate.getDate()-1);
      weekEndDate = `${weekEndDate.getFullYear()}年${weekEndDate.getMonth()+1}月${weekEndDate.getDate()}日`;
      return {
        isActivate,
        collapseAttr,
        menuData,
        menuArray,
        menuArray1,
        menuArrayIndexs,
        userInfo,
        lang: langJson,
        activeIndex,
        isIndex: this.$route.name === "index",
        mobileMenuIsShow: false,
        pageI,
        winup:{
          isShow:localStorage.getItem("winupHasRemind") == date.getTime()?false:true,
          hasRemind:true,
          year:date.getFullYear(),
          weeks:getWeekOfYear(),
          week:date.getDay()+1,
          returnWeeks:returnWeek(date.getFullYear()+"_"+getWeekOfYear()),
          weekEndDate
        },
        theOpenMenuI:"",
        forgetPassword:0
      };
    },
    methods: {
      selectLang(lang) {
        this.lang.lang = lang;
        // this.lang.lang = this.lang.lang=="cn"?"en":"cn";
        this.global.lang = this.lang.lang;
        localStorage.setItem("lang", this.lang.lang);
        // this.$router.go(0);
        this.$root.$emit("selectLang",this.lang.lang);
      },
      exit() {
        this.api(this, "/auth/out", "", _ => {
          this.$router.push("/");
        });
      },
      toIndex(){
        this.$router.push("/");
      },
      winupClose(){
        this.winup.isShow = false;
        const date = new Date();
        date.setHours(0,0,0,0);
        if(!this.winup.hasRemind)localStorage.setItem("winupHasRemind",date.getTime());
      },
      getNowIndex(){
        this.global.menuArray.forEach(v=>{
          if(v.url&&this.$route.name==v.url.replace(".html","")){
            this.activeIndex = v.index;
          }
        });
      },
      menuSelect(i){
        if(i&&this.theOpenMenuI&&i.split("-").length==1){
          this.$refs.menu.close(this.theOpenMenuI);
          this.theOpenMenuI="";
        }
      },
      menuOpen(i){
        this.theOpenMenuI = i;
      },
      init(){
        const userInfo = this.userInfo;
        (document.documentElement||document.body).scrollTop=0;
        this.getNowIndex();
        if(userInfo.agreement==0&&!(userInfo.type==0&&(userInfo.rank==1||userInfo.rank==2)))
          this.$router.push("agreement");
        else if((userInfo.activate==0||userInfo.activate==1)&&!(userInfo.type==0&&(userInfo.rank==1||userInfo.rank==2)))
          this.$router.push("activate");
        this.pageI=this.$route.name=="announce"?1:0;
      },
      prompt(){
        this.$message.warning(this.lang[this.lang.lang].en63);
      }
    },
    watch: {
      $route: {
        handler() {
          console.log(this.$route.name);
          this.isIndex = this.$route.name === "index";
          if(this.global.forgetPassword)this.$router.push("forgetPassword");
          this.init();
          this.mobileMenuIsShow = false;
        },
        deep: true
      }
    },
    mounted() {
      if(this.$route.name === "forgetPassword")this.forgetPassword=1;
      this.init();
      setInterval(_=>{
        if(!this.global.isNewUserInfo){
          this.userInfo = this.global.userInfo;
          this.global.isNewUserInfo=true;
        }
      },1000);
      if(this.global.isNewUserInfo)
      if(this.activeIndex.split("-").length>1)this.theOpenMenuI = this.activeIndex.split("-")[0];
      document.onscroll = _ => {
        let scrollTop = (document.documentElement||document.body).scrollTop -125;
        $(".el-aside > .el-menu").css("top",scrollTop>0?scrollTop:0);
      };
      console.log(this.userInfo.authority);
      if(this.userInfo.authority!=2){
        this.menuData[5].children[4].isHide = true;
      }
    },
    created(){
      if(this.userInfo.type==0&&(this.userInfo.rank==1||this.userInfo.rank==2)){
        this.menuData[1].isHide = true;
        this.menuData[4].isHide = true;
        this.menuData[2].children[1].isHide = true;
        this.menuData[2].children[5].isHide = true;
        this.menuData[2].children[6].isHide = true;
      }else{
        this.menuData[1].isHide = false;
        this.menuData[4].isHide = false;
        this.menuData[2].children[1].isHide = false;
        this.menuData[2].children[5].isHide = false;
        this.menuData[2].children[6].isHide = false;
      }
    }
  }
</script>

<style src="static/css/userCommon.css"></style>
<style scoped>
  
  #mobileMenu{
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .25);
    display: none;
    transition: all .25s;
  }
  #mobileMenu.show{
    left: 0;
  }

  #mobileMenu .m_content{
    background: #fff;
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  #mobileMenu .m_content > li:nth-child(1){
    width: 100%;
    text-align: right;
  }
  #mobileMenu .m_content > li:nth-child(1) p i{
    font-size: 30px;
    display: inline-block;
    margin: 8px 16px;
  }
  #mobileMenu .m_content > li:nth-child(2){
    text-align: center;
  }
  #mobileMenu .m_content > li:nth-child(2) ol li:nth-child(1) img{
    width: 80px;
    margin-top: -15px;
  }
  #mobileMenu .m_content > li:nth-child(2) ol li:nth-child(2){
    font-size: 18px;
    font-weight: bold;
    margin: 15px;
  }
  #mobileMenu .m_content > li:nth-child(2) ol li:nth-child(3){
    background: #e4a751;
    color: #fff;
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
  }
  #mobileMenu .m_content > li:nth-child(3){
    flex: 1;
    margin-top: 30px;
    width: 100%;
    max-height: calc(100vh - 265px);
    background: #eaeaea;
    overflow: auto;
  }
  #mobileMenu .m_content > li:nth-child(3) ul{
    width: 100%;
  }
  #mobileMenu .m_content > li:nth-child(4){
    height: 50px;
    line-height: 50px;
    width: 100%;
    padding: 0 7.5%;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    background: #eaeaea;
  }
  #mobileMenu .m_content > li:nth-child(4) p{
    display: flex;
    justify-content: space-between;
  }
  #mobileMenu .m_content > li:nth-child(4) p a:last-child:before{
    background: url(../../../static/img/exit.png);content: '';display: inline-block;width: 13px;height: 13px;background-size: 100%;background-repeat: no-repeat;position: relative;top: 2px;right: 2px;
  }
  


  #mobileHead{
    background: #494232;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
  #mobileHead p{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 15px;
  }
  #mobileHead p i{
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #mobileHead p i path{
    fill: #b99d80;
  }
  #mobileHead p b{
    width: 50%;
    text-align: center;
  }
  #mobileHead p b img{
    width: 80px;
    height: auto;
  }

  .el-carousel__item .el-carousel-item-title {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 25px;
    text-align: center;
    color: #fff;
  }

  .title {
    /*font-size: 20px;
    /*margin-top: 50px;*/
    /*margin-left: 20px;
    margin-bottom: 25px;*/
  }

  .userInfo {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    /*margin: 50px auto;*/
  }

  .userInfo > li {
    border: 1px solid #9E9E9E;
    border-radius: 5px;
    padding: 20px 20px 50px;
    margin: 0 15px;
    box-shadow: 0 0 5px 0px rgba(0, 0, 0, .2);
  }

  .userInfo > *:first-child {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  /*.userInfo li:last-child {*/
  /*flex: 1.5;*/
  /*}*/

  .userInfo li h3 {
    margin-bottom: 30px;
  }

  .userInfo li p {
    line-height: 25px;
  }

  /*.userInfo li img {*/
  /*width: 100px;*/
  /*height: 100px;*/
  /*border-radius: 50px;*/
  /*margin: 10px auto 20px;*/
  /*display: block;*/
  /*border: 1px solid #9E9E9E;*/
  /*box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, .5);*/
  /*}*/

  .contentInfo {
    border-radius: 5px;
    line-height: 35px;
    color: #999;
    overflow: hidden;
  }

  .contentInfo > li {
    /*padding: 25px 0;*/
    float: left;
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    display: -ms-flex;
    display: -moz-flex;
    display: -o-flex;
    display: -webkit-flex;
    -ms-justify-content: space-evenly;
    -moz-justify-content: space-evenly;
    -o-justify-content: space-evenly;
    /*-webkit-justify-content: space-evenly;*/
    -ms-align-items: center;
    -moz-align-items: center;
    -o-align-items: center;
    -webkit-align-items: center;
    /*flex*/
  }

  .contentInfo > li:nth-child(n+2) {

  }

  .contentInfo > li > p {
    float: left;
    font-size: 100px;
    height: 130px;
    line-height: 130px;
    width: 100px;
    text-align: center;
  }

  .contentInfo > li > div {
    /*float: right;*/
    /*height: 130px;*/
    /*margin-right: 30px;*/
  }

  .contentInfo > li > div > p {
    margin-bottom: 8px;
    font-size: 16px;
  }

  .el-carousel__indicators {
    left: 0;
    right: 0;
    transform: none;
    text-align: center;
  }

  .el-carousel__item {
    background: #ddd;
  }

  .el-carousel__indicators--outside button {
    background: #545c64;
  }

  .el-carousel {
    width: 90%;
    margin: 0 auto;
    max-width: 1450px
  }

  .infos:after {
    content: "";
    display: block;
    clear: both;
  }

  .infos {
    max-width: 1450px;
    margin: 30px auto;
    padding: 25px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: -ms-flex;
    display: -moz-flex;
    -display: webkit-flex;
    display: -o-flex;
    -ms-justify-content: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    -o-justify-content: center;
    -ms-align-items: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    -o-align-items: center;
    /*background: #fff;*/
    /*border: 1px solid #ddd;*/
    /*box-shadow: 0 2px 1px -1px #c3c2c2;*/
  }

  .infos > div {
    padding: 0;
    background: #fff;
    box-shadow: rgba(158, 158, 157, 0.25) 0px 0px 30px;
    box-sizing: border-box;
    padding-bottom: 25px;
  }

  .infos > div:first-child {
    width: 25%;
    margin-right: 5%;
  }

  .infos > div:first-child div {
    /*background: #fff;
    color: #555;
    line-height: 35px;
    padding: 25px 25px;
    height: 130px;*/
  }

  .infos > div:first-child div p {
    /*margin-bottom: 8px;
    float: left;*/
  }

  .infos > div:last-child {
    float: right;
    width: 70%;
  }

  @media screen and (max-width: 1250px) {
    .contentInfo > li > p {
      width: 100%;
    }

    .contentInfo > li > div {
      width: 50%;
      /*margin: 0 auto;
      margin-right: 0;*/
    }

    .infos {
      flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      -moz-flex-wrap: wrap;
      -o-flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
    }

    .infos > div {
      width: 100% !important;
    }

    .infos > div:first-child {
      margin-right: 0;
      margin-bottom: 25px;
    }
  }

  @media screen and (max-width: 900px) {
    .contentInfo > li {
      width: 100%;
    }

    .el-carousel__container {
      height: 140px !important;
    }
  }

  /*@media screen and (max-width: 1024px) and(min-width: 901px){*/
  /*.el-carousel__container{height: 175px!important;}*/
  /*.el-carousel__item{width:350px;}*/
  /*}*/
  /*@media screen and (max-width: 1280px) and(min-width: 1025px){*/
  /*.el-carousel__container{height: 230px!important;}*/
  /*.el-carousel__item{width:460px;}*/
  /*}*/
  /*@media screen and (max-width: 1336px)and(min-width: 1281px) {*/
  /*.el-carousel__container{height: 250px!important;}*/
  /*.el-carousel__item{width:500px;}*/
  /*}*/
  /*@media screen and (max-width: 1440px) and(min-width: 1337px){*/
  /*.el-carousel__container{height: 265px!important;}*/
  /*.el-carousel__item{width:530px;}*/
  /*}*/
  /*@media screen and (max-width: 1920px) and(min-width: 1441px){*/
  /*.el-carousel__container{height: 375px!important;}*/
  /*.el-carousel__item{width:750px;}*/
  /*}*/

  .el-table__body tr:nth-child(2n) {
    background-color: inherit;
  }

  .el-table__body tr:hover > td, .el-table__body tr.hover-row > td {
    background: #ecf5ff;
  }

  .el-table td {
    padding: 5px 0;
  }

  .el-table th {
    padding: 7px 0;
  }

  .headImg {
    width: 100px;
    height: 100px;
    display: block;
    margin: 0 auto 20px;
    overflow: hidden;
    border-radius: 50%;
  }

  /*.infos > div:first-child div p:nth-child(2){
      text-align: center;
      width: 100%;
  };
  .infos > div:first-child div p:nth-child(3){
      float: left;
  };*/
  .userCard-Name {
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: #999;
    padding-bottom: 25px;
  }

  .userCard-Info {
    overflow: hidden;
    line-height: 35px;
  }

  .userCard-Info p {
    float: left;
    width: 50%;
    text-align: center;
    color: #999;
  }

  .infos > div:first-child h3, .title {
    background: #12afe3;
    padding: 17px 0;
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
    font-size: 18px;
  }

  .el-carousel {
    box-shadow: rgba(158, 158, 157, 0.25) 0px 0px 30px;
  }

  .el-table .cell {
    color: #999;
  }

  .winup>div ul li:nth-child(4),.winup>div ul li:nth-child(5){position: relative;}
  .winup>div ul li:nth-child(4){top:7px;width:100%;}
  .winup>div ul li:nth-child(4) a{margin:0 auto;}
  .winup>div ul li:nth-child(5){bottom:7px;}
 
  .winup>div ul li:last-child{cursor: pointer;user-select: none;}
  .winup>div ul li span{font-size: 12px;color: #4583ce;}
  .winup>div ul li i{width:10px;height:10px;border:1px solid #4583ce;border-radius:50%;display:inline-flex;vertical-align:middle;margin-right:5px;align-items: center;justify-content: center;}
  .winup>div ul li.active i:before{content:'';width: 6px;height: 6px;background: #4583ce;border-radius: 50%;}

  .foot{background: #e8e8e8;color: #999;font-size: 14px;text-align: center;padding: 15px 0;min-width: 1200px;}
  .foot p{margin: 20px 0;}

  #main.agree .el-aside > .el-menu{
    height: 0;
    margin: 0;
    min-height: 0px;
  }
  #main.agree .el-main{display: none;}

</style>
