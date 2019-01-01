<template>
  <PageLayout >
    <template slot="pagecont1">
      <banner 
        :title="''"
        :subtitle="''" >
        <template slot="bgimg">
          <img 
            src="~assets/ims-banner.png" 
            style="width: 100%" >
        </template>/>
      </banner>
      <MenuMod
        :fixhover="false"
        :nobg="false"/>


      <welcome/>
      <ModLayout style="background-color: #28343b;">
        <template slot="modcont1">
          <div class="container-fluid" >
            <div class="row header ">
              <p 
                class="title" 
                style="color:#fff;"><span class="cn">最新消息</span>|<span class="en">LATEST NEWS</span></p>
              <p 
                class="content" 
                style="color:#fff;">凡耶稣基督所吩咐我们的，都教训他们遵守”。 
                我们的异象是“在基督里建立一个充满活力、不断倍增的社群，</p>
            </div>
            <event1 
              :church="$route.path.replace(/\//g,'')"
              style="padding-top:40px "/>
            <div 
              class="row footer" 
              style="margin-top:88px ">
              <ButtonLayout >
                <template slot="btncont">
                  <router-link :to="'/events?church=ims'">See All</router-link>
                </template>
              </ButtonLayout>
            </div>
          </div>
        </template>
      </ModLayout>

      <ModLayout>
        <template slot="modcont1">
          <div 
            class="container-fluid" 
            style="background-color: #fff;">
            <div class="row header">
              <p 
                class="title" 
                style="color:#3b8c63;"><span class="cn"> 讲道</span>|<span class="en">SERMONS</span></p>
              <p 
                class="content" 
                style="color:#000;">凡耶稣基督所吩咐我们的，都教训他们遵守”。 
                我们的异象是“在基督里建立一个充满活力、不断倍增的社群，</p>
            </div>
        
            <MRSermonCont style="padding-top: 40px;"/>
        
            <div class="row footer" >
              <ButtonLayout >
                <template slot="btncont">
                  <router-link :to="'/sermons?church=ims'">See All</router-link>
                </template>
              </ButtonLayout>
            </div>
          </div>
        </template>
      </ModLayout>

      <ModLayout style="background-color: #28343b;">
        <template slot="modcont1">
          <div class="container-fluid" >
            <div class="row header" >
              <p 
                class="title" 
                style="color:#fff;"><span class="cn">事工</span>|<span class="en">MINISTRY</span></p>
              <p 
                class="content" 
                style="color:#fff;">凡耶稣基督所吩咐我们的，都教训他们遵守”。 
                我们的异象是“在基督里建立一个充满活力、不断倍增的社群，</p>
            </div>
        
            <!--<ModuleMinistryCont/>-->
            <TimeLine 
              :list="ministry4timeLine" 
              :image-base-url="'ministryBaseUrl'"
              :pagepath="'ministry'"
              style="margin-top:40px"/>
        
            <div class="row footer" >
              <ButtonLayout >
                <template slot="btncont">
                  <router-link :to="'/ministries?church=ims'">See All</router-link>
                </template>
              </ButtonLayout>
            </div>
          </div>
        </template>
      </ModLayout>
      <pagefooter 
        :title="footer.title"
        :content="footer.content"
        :is-reverse="true"
      />
    </template>
  </PageLayout>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";

import tool from '~/components/tool.vue'
import welcome from "~/components/ims/Welcome.vue";
import event1 from "~/components/ims/Events1.vue";
import MRSermonCont from "~/components/ims/MRSermonCont.vue";
import {APIHOST,HOST,mst_api} from '~/static/html/config.js'





export default {
   components: {
    welcome: welcome,
    event1: event1,
    MRSermonCont: MRSermonCont
  },
  data() {
    return {
      isEventLoad: false
    };
  },
  async fetch ({ store, params }) {
    console.log(store)
    var api  = `${APIHOST.DOMAIN}/churchs`
    var rsp =  await axios.get(api)
    console.log('--------ims------fetch----------- ')
    console.log(rsp)
    store.commit('setChurches', rsp.data.data)
  },
  computed: {
    ...mapState({
      ministries: state => state.pagedb.ministries,
      events: state => state.pagedb.events.list,
      sermons: state => state.pagedb.sermon.list,
      footer: state => state.footer,
      churches: state => state.pagedb.churches
    }),
    // menuItemC(){
    //   return this.$store.state.IMSMenuItem
    // },
    
    ministry4timeLine: function() {
      var vm = this
      console.log(this.ministries.list)
      this.ministries.list.forEach(function(e) {
        e.image = e.images.image_intro
        e.tltitle = e.title;
        e.tlintro = e.introtext;
        e.tlintro = e.introtext.replace(/<[^>]+>/g,"")
        e.tlintro = vm.sword(e.tlintro, 120)
      });
      console.log(this.ministries)
      return this.ministries.list.slice(0, 4);
    },
    isEventLoadCompu() {
      return this.isEventLoad;
    }
  },
  beforeMount(){
  //  let vt = this.load()
  },
  mounted() {
    console.log('ims mounted:')
    var mp=""
    var pkey=""
    var church = this.$route.path.replace(/\//g,'');
    (this.churches||[]).forEach(function(e){
      if(e.key == church){
        mp = e.ministrypath
        pkey = e.key
      } 
    })
    this.$store.dispatch('getMinistry',{ church:mp });
    this.$store.dispatch('getEvents', { church: pkey,page_size:6,start:1 });
  },
  methods: {
    sword(text,len) {
      //如果要截取文本的长度小于或者等于要截取的长度，则不进行截取，直接返回文本
      if(text.length < len) {
          return text;
      } else {
          text = text.substr(0,len);
          //       以空格切分字符串
          var textArr = text.split(" ");
          //           最后一个字符长度
          var lastLen = textArr.pop().length;
          if(lastLen > 3) {
              return text.substr(0,text.length-lastLen-1)+' ...';
          } else if(lastLen === 3 ){
              return text;
          }else{
              var lastTwoLen =  textArr[textArr.length - 1].length;
              return text.substr(0,text.length-lastLen-lastTwoLen-2)+' ...';
          }
      }
    },
    goto(link) {
      this.$router.push({ name: link });
    },
    isMenuNoGg() {
      return false;
    }
  }
};
</script>


<style scoped>
.container-fluid {
  margin: 0;
  padding: 0;
}

.clearfix {
  clear: both;
  float: none;
}
a:focus {
  outline: none;
}

.container-fluid {
  background-color: RGBA(0, 0, 0, 0);

  margin: 0 auto; //为了抵消1170使他固定在左边的作用
  padding: 0;
}
.row {
  margin: 0;
  padding: 0;
}
.header {
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.title {
  font-size: 3rem;
  text-align: center;
  color: #3b8c63;
  margin: 0;
}

.title .cn {
  margin-right: 1rem;
}
.title .en {
  font-family: MyriadPro-Bold;
  margin-left: 1rem;
  letter-spacing: 1px;
  font-size: 2rem;
}
.subtitle {
  font-family: MyriadPro-Light;
  font-size: 2.5rem;
  color: #3c8c63;
}
.content {
  font-size: 1.5rem;
  color: #28343b;
  text-align: center;
  line-height: 3.73rem;
  margin: 10px 0 0;
  font-weight: 200;
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

.footer {
  margin: 40px 0 0 0;
}
</style>







