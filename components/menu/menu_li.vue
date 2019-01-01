<template>
  <div
    :class="getTypeClass(menuIteCompute)"
    @mouseover="toggleMenu(true)"
    @mouseout="toggleMenu(false)"
  >
    <!-- <template v-for="(value,key1) in menuIteCompute"> -->
    <div 
      v-if="(menuIteCompute||{}).b != undefined" 
      class="brand">
      <a href="/">
        <!-- <span class="sitelogo" v-if="nobgCompute">BICF</span> -->
        <img 
          :src.sync="nobgCB"
          class="sitelogo fixTop" 
          alt="Brand">
      </a>
    </div>
    <div 
      v-if="(menuIteCompute||{}).s != undefined" 
      :style="{visibility:menuIteCompute.show?'visible':'hidden'}"
      :class="{fixTop:nobgCompute}"
      class="search mitem" >
      <i
        id="cancelBtn"
        :style="{color:(nobgCompute)?'#231815 !important':'#fff !important', fontSize:nobgCompute?'1.4rem':'',lineHeight:nobgCompute?'1.5':'1',top:nobgCompute?'1px':'3px'}"
        class="iconfont icon-cancel1"
        @click="DealSearch(false)"
      />
      <i
        :style="{color:(nobgCompute||showkeyinput)?'#231815 !important':'#fff !important', fontSize:nobgCompute?'1.4rem':'',lineHeight:nobgCompute?'1.5':'1',top:nobgCompute?'1px':'3px'}"
        class="iconfont icon-search2 aliicon aliicon-search"
        @click="DealSearch(true)"/>

      <transition name="showsearchbox">
        <input
          v-if="showkeyinput"
          :style="{ fontSize:nobgCompute?'1.4rem':'',top:nobgCompute?'-2px':'-7px',height: nobgCompute?'2.5rem':'3rem',borderColor:nobgCompute?'#ccc':'#000'}"
          v-model.trim="keyword"
          class
          type="text"
          placeholder="eg.Ministry,Sermon..."
          @keyup.enter="onSearch"
        >
      </transition>
    </div>

    <a
      v-if="(menuIteCompute||{}).m != undefined" 
      :href="menuite.url"
      :style="{color:nobgCompute?'#231815':'#fff', fontSize:nobgCompute?'1.4rem':'',borderBottomColor:nobgCompute?'#231815':'#fff' ,borderBottom:isCurpage(menuite.url)?'2px solid':'none' }"
      style="background-color: transparent !important;"
      class="mitem m"
    >{{ menuIteCompute.m }}</a>

    <template v-if="(menuIteCompute||{}).m1 != undefined">
      <a
        :style="{color:nobgCompute?'#231815':'#fff', fontSize:nobgCompute?'1.4rem':'',borderBottomColor:nobgCompute?'#231815':'#fff',borderBottom:isCurpage(menuite.url)?'2px solid':'none'}"
        tabindex="-1"
        href="javascript:void(0);"
        style="background-color: transparent !important;"
        class="mitem m1"
      >{{ menuIteCompute.m1 }}</a>

      <div 
        style=" margin:0;position: relative; height:  1rem;opacity: 0;"/>
      <transition 
        name="showit">
        <amenumodsub 
          v-if="showMenu"
          :submenus="menuIteCompute.submenu" 
        />
      </transition>
    </template>

    <div 
      v-if="(menuIteCompute||{}).lang != undefined" 
      class="mitem lang">
      <a
        :style="{color: theLang=='en' ? '':'#888', cursor:theLang == 'en' ? 'default': 'pointer'}"
        :href="toLangEN()"
        class="linkspan"
      >{{ menuIteCompute.lang.en }}</a>
      <a
        :style="{color: theLang == 'zh' ? '':'#888', cursor: theLang == 'zh' ? 'default': 'pointer'}"
        :href="toLangZH()"
        class="linkspan"
      >{{ menuIteCompute.lang.zh }}</a>
    </div>
    <!-- </template> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuModSub from './menu_li_submenu.vue'
export default {
  components: {
    amenumodsub: MenuModSub
  },
  props: {
    menuite: {
      type:Object,
      default:null
    },
    nobg:{
      type:Boolean,
      default:false
    } 
  },
  data() {
    return {
      showMenu: false,
      showkeyinput: false,
      keyword: ''
    }
  },
  computed: {
    nobgCB() {
      var retV = ''
      if(this.nobg){
        retV = "/html/images/logo_black.png"
      } else{
        retV = "/html/images/brand.png"
      }
      console.log('nobgCB--'+retV)
      return retV;
    },
    nobgCompute() {
      console.log(this.nobg)
      return this.nobg
    },
    menuIteCompute() {
      console.log('-------menuIteCompute----------')
      console.log(this.menuite)
      return this.menuite
    }
  },

  mounted() {
    this.$store.commit('log', 'menu_li nobg=' + this.nobg)
  },
  methods: {
    // isLang(pLang) {
    //   if (this.$route.query == undefined) {
    //     return 'en' == pLang
    //   }
    //   return this.$route.query.lang == pLang
    // },
    theLang(){
      return this.$route.query.lang || 'en'
    },
    toLangEN(){
      //console.log(this.$route.fullPath)
      var fq = this.$route.fullPath
      console.log(fq)
      if(fq.indexOf('lang=')>=0){
        fq = fq.replace(/lang=(en|zh)/,`lang=en`)
      }else{
        if(fq.indexOf('?')>=0){
          fq = fq + `&lang=en`
        }else{
          fq = fq + `?lang=en`
        }
      }
      console.log(fq)
      return fq;
    },
    toLangZH(){
      //console.log(this.$route.fullPath)
      var fq = this.$route.fullPath
      console.log(fq)
      if(fq.indexOf('lang=')>=0){
        fq = fq.replace(/lang=(en|zh)/,`lang=zh`)
      }else{
        if(fq.indexOf('?')>=0){
          fq = fq + `&lang=zh`
        }else{
          fq = fq + `?lang=zh`
        }
      }
      console.log(fq)
      return fq;
    },
    toggleMenu(pOpen) {
      // console.log("toggleMenu"+pOpen)
      if (pOpen == true) {
        this.showMenu = true
      }
      if (pOpen == false) {
        this.showMenu = false
      }

      /*如果，我是让他两秒消失，没有out事件。点击消失*/
    },
    isCurpage(url) {
      if (url.toUpperCase() == '#' + this.$route.fullPath.toUpperCase()) {
        return true
      } else {
        return false
      }
    },
    showSearchBox() {
      this.showkeyinput = !this.showkeyinput
    },
    DealSearch(bSearchInput) {
      var cancelBtn = document.getElementById('cancelBtn')

      if (bSearchInput) {
        if (this.showkeyinput) {
          //search event dispanch
        }
        this.showkeyinput = true
        cancelBtn.style.visibility = 'visible'
      } else {
        this.showkeyinput = false
        cancelBtn.style.visibility = 'hidden'
      }
    },
    getTypeClass(mitem) {
      return Object.keys(mitem)[0]
    }
  }
}
</script>

<style lang='less' scoped>
@import '~@/assets/style/var';

.lang.mitem {
  margin: 0;
}

.fixTopClass {
  background-color: transparent !important;
  color: #fff;
  font-size: 1.4rem !important;
}

.onpage {
  box-shadow: inset 0 -2px RGBA(34, 24, 20, 1);
}
a:focus {
  outline: none;
}
a:hover {
  text-decoration: none;
}

img.sitelogo {
  position: relative;
  top: 2px;
  margin: 5px 0 0 0;
  height: 3rem;
}

.mitem {
  font-family: MyriadPro-light;
  font-size: 1.4rem;
  letter-spacing: 0.2vw;
  background-color: #ffffff00;
  margin: 10px 40px;
  padding: 0;
  font-weight: 400;
  font-style: normal;
  line-height: 50px;
  position: relative;
  top: 2px;
}

@media screen and (max-width: 1680px) {
  .mitem {
    margin: 10px 0;
  }
}

a:hover {
  color: #3c8c63 !important;
}

/* Large devices (desktops, less than 1200px)*/
@media (max-width: 1199.98px) {
  li {
    margin: 0 1.5em;
  }
}
@media (min-width: 1199.98px) {
  li {
    margin: 0 1.5em;
  }
}

@media screen and (min-width: 1460px) {
  .m,
  .m1 {
    margin: 0 20px;
  }
}

@media screen and (max-width: 1460px) {
  .m,
  .m1 {
    margin: 0 10px;
  }
}

.showsearchbox-enter-active {
  transition: all 0.8s ease;
}
.showsearchbox-leave-active {
  transition: all 0s ease;
}
.showsearchbox-enter, .showsearchbox-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}

.fixTop.input {
  position: relative;
  top: -3px;
}

.search.mitem {
  float: right;
  color: rgb(255, 255, 255);
  line-height: 1;
  margin-right: 0px;
  width: 100%;
}
.search.mitem.fixTop {
  position: relative;
  margin-top: 4px !important;
}
.search {
  position: relative;
  margin-top: 6px;
  padding: 0 20px;
  input {
    border-radius: 10px;
    width: 100%;
    position: relative;
    border: 1px solid;
    border-color: #000;
    padding: 0 0 0 10px;
    display: inline-block;
    vertical-align: top;
    color: @ContFontColor;
  }
}

i {
  position: relative;
  top: 0;
  display: inline-block;
  z-index: 200;
}
.icon-search2:before,
.icon-cancel1:before {
  font-size: 1.5rem;
  font-weight: 200;
}

i.icon-cancel1 {
  visibility: hidden;
  position: absolute;
  right: -10px;
}
i.icon-search2 {
  position: absolute;
  right: 20px;
}
@media screen and (max-width: 1680px) {
  /*.input{
           input{
            left:-10%;
            padding-left: 32px;
           }
          }*/
}

span.sitelogo {
  font-size: 3rem;
}

.b {
  min-width: 120px;
}
img.sitelogo.fixTop {
  height: 2rem;
  top: 7px;
}
</style>











