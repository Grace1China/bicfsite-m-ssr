<template>
  <PageLayout>
    <template slot="pagecont1">
      <MenuMod 
        :fixhover="true" 
        :nobg="true" />
      <banner 
        slot="banner" 
        :title="article.title" 
        :pagehint="''" 
        style="margin-top: 48px;">
        <template slot="bgimg">
          <div 
            :style="{ backgroundImage: bgimg }" 
            class="bgblur" 
            style ="height:50vh;background-position: center;background-repeat: no-repeat;background-size: cover;"/>
          <a>
            <img  
              :src="img" 
              class="inImg">
          </a>
        </template>
      </banner>
      <div 
        class="container" 
        style="margin:50px 0 50px" >
        <div 
          class="content-body" 
          v-html="articleCompu"/>
      </div>
      <pagefooter 
        slot="footer" 
        :title="footer.title" 
        :content="footer.content" />
    </template>   
  </PageLayout>
</template>

<script>
const axios = require("axios");
import {APIHOST,HOST,mst_api} from '~/static/html/config.js'

import { mapState } from "vuex";
export default {
  name: "Event",
  components: {
  },
  data() {
    return {
      page: 0
    };
  },
  computed: {
    ...mapState({
      HOMEMenuItem: state => state.HOMEMenuItem,
      IMSMenuItem: state => state.IMSMenuItem,
      article: state => state.pagedb.article,
      footer: state => state.footer
    }),
    bgimg(){
      if(this.$route.query.q==this.$store.state.HOMEMenuItem.GIVING.q){
        return 'url(/html/images/givingonline.jpg)'  
      } else if(this.$route.query.q==this.$store.state.HOMEMenuItem.RESOURCES.submenu.ThreeSelfChurches.q){
        return 'url(/html/images/building.jpg)'
      } else if(this.$route.query.q==this.$store.state.HOMEMenuItem.RESOURCES.submenu.Downloads.q || this.$route.query.q==this.$store.state.HOMEMenuItem.RESOURCES.submenu.fellowships.q ){
        return 'url(/html/images/bookres.jpg)'
      } else {
        if((this.article||{}).image_fulltext != "" ){
          return `url(http://${HOST.IP}/${this.article.image_fulltext})`;
        } else if ((this.article||{}).image_intro != "" ) {
          return `url(http://${HOST.IP}/${this.article.image_intro})`;
        } else {
          return 'url(/html/images/bookres.jpg)'
        }
      }
    },
    img(){
      if(this.$route.query.q==this.$store.state.HOMEMenuItem.GIVING.q){
        return '/html/images/givingonline.jpg'  
      } else if(this.$route.query.q==this.$store.state.HOMEMenuItem.RESOURCES.submenu.ThreeSelfChurches.q){
        return '/html/images/building.jpg'
      } else if(this.$route.query.q==this.$store.state.HOMEMenuItem.RESOURCES.submenu.Downloads.q || this.$route.query.q==this.$store.state.HOMEMenuItem.RESOURCES.submenu.fellowships.q ){
        return '/html/images/bookres.jpg'
      } else if( this.$route.query.q==this.$store.state.IMSMenuItem.about.q ){
        return '/html/images/bookres.jpg'
      } else {
         if((this.article||{}).image_fulltext != "" ){
           return `http://${HOST.IP}/${this.article.image_fulltext}`;
         } else if ((this.article||{}).image_intro != "" ) {
           return `http://${HOST.IP}/${this.article.image_intro}`;
         } else {
           return '/html/images/bookres.jpg'
         }
      }
    },
    articleCompu: function() {
      console.log('--------articleCompu---------')
      console.log(this.article)
      var tArticle = this.article.fulltext || this.article.introtext || "" ;
      tArticle = tArticle.replace(
        /<img[^>]+src="([^"]+)"/g,
        this.toFullImageSrc
      );
      tArticle = tArticle.replace(/<a[^>]+href="([^"]+)"/g, this.toFullUrl);
      return tArticle;
    },
    menuC() {
      if (this.$route.query.mn == "ims") {
        return this.IMSMenuItem;
      } else {
        return this.HOMEMenuItem;
      }
    }
  },
  watch: {
    $route(val, oldVal) {
      if (val.fullPath != oldVal.fullPath) {
        this.page = this.page + 1;
      }
    },
    article(val,oVal){
      console.log('article change')
    }
  },
  mounted() {
    console.log('---------in articel mounted---------')
    console.log(/article\?q\=/.test(this.$route.fullPath))
    if (/\?q\=/.test(this.$route.fullPath)){
      this.$store.dispatch("getArticle", {q:this.$route.query.q,lang:this.$route.query.lang});
    } else {
      this.$store.dispatch("getArticle", {id:this.$route.query.id});
    }
    console.log(this.article)
  },
  methods: {
    async load(id) {},
    toFullUrl(match, p1, offset) {
      var retV = "";
      if(p1.indexOf('https://') >= 0 || p1.indexOf('http://')>=0){
        retV = '<a href="' + p1 + '"';
      }else{
        retV = '<a href="' + "https://bicf.org/" + p1 + '"';
      }
      console.log(retV)
      return retV
    },
    toFullImageSrc(match, p1, offset) {
      var retV = "";
      if(p1.indexOf('https://') >= 0 || p1.indexOf('http://') >= 0){
        retV = '<img src="' + p1 + '"';
      }else{
        retV = '<img src="' + "https://bicf.org/" + p1 + '"';
      }
      return retV
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  font-size: 4.44rem;
  text-align: center;
  color: #3b8c63;
  margin-top: 3.82em;
}
.title .cn {
  margin-right: 3rem;
}
.title .en {
  font-family: MyriadPro-Bold;
  margin-left: 3rem;
}

.subtitle {
  font-size: 2.07rem;
  color: rgba(0, 0, 0, 1);
  line-height: 3.73rem;
}

.date {
  font-size: 1.97rem;
  line-height: 1.8em;
  float: left;
  color: #28343b;
  margin-top: 3.55em;
}
.image {
  width: 100%;
  margin-top: 2rem;
}
.content {
  font-size: 1.97rem;
  color: #28343b;
  text-align: center;
  line-height: 3.73rem;
  margin-top: 1.52em;
}
.container {
  .content-body {
    font-size: 14px;
    // text-align: center;
  }
}
.bgblur {
    width: 100%; 
    height: 100%; 
    -webkit-filter: blur(10px);
    filter: blur(10px);
}
.inImg{
  height: 100%;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
}
    
</style>






