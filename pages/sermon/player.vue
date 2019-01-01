<template>
  <PageLayout>
    <template slot="pagecont1">
      <MenuMod 
        :fixhover="true" 
        :nobg="true"/>
      <div 
        class="frame container" 
        style="margin-top:50px">
        <div class="itemline headline">
          <div class=" title">
            {{ sermonInfo.title }}
          </div>
          <div class="divider"/>
          <div class="playway">
            <ButtonLayout 
              v-if=" sermonInfo.mp4 != '' " 
              style="margin-top:20px">
              <template slot="btncont">
                <a 
                  href="javascript:void(0)" 
                  target="_blank"
                  @click="playC(4)">MP4</a>
              </template>
            </ButtonLayout>
            <ButtonLayout 
              v-if=" sermonInfo.mp3 != '' " 
              style="margin-top:20px">
              <template slot="btncont">
                <a 
                  href="javascript:void(0)" 
                  target="_blank"
                  @click="playC(3)">MP3</a>
              </template>
            </ButtonLayout>
          </div>
          
        </div>
        <div 
          v-video-player:myVideoPlayer="playerOptions"
          :playsinline="playsinline"
          class="itemline player"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @ready="playerReadied"
          @statechanged="playerStateChanged($event)"/>

        <div class="itemline info m-content">
          <div class="cont ">
            <template v-if="(sermonInfo.series||{}).length>0"><span>{{ $t(`player.series`) }}:<strong>{{ (sermonInfo.series||{}).name }}</strong></span><br></template>
            <template v-if="(sermonInfo.scripture||{}).length>0"><span><strong><a :href="linkScript(sermonInfo.scripture)">{{ trimit(sermonInfo.scripture) }}</a></strong></span><br></template>
            <template v-if="(sermonInfo.teacher||{}).length>0"><span>{{ $t(`player.teacher`) }}:<strong>{{ sermonInfo.teacher }}</strong></span></template>
          </div>
          <div class="divider"/>
          <div class="meta">
            <span><strong>{{ $t(`player.date`) }}:</strong>{{ sermonInfo.date }}</span><br>
            <span><strong>{{ $t(`player.duration`) }}:</strong>{{ sermonInfo.duration }}</span><br>
            <span><strong>{{ $t(`player.hits`) }}:</strong>{{ sermonInfo.hits }}</span>
          </div>
        
        </div>
        <div class="itemline reso">
          
          <ButtonLayout 
            v-if="sermonInfo.pdf != ''" 
            style="margin-top:20px">
            <template slot="btncont">
              <a 
                :href="sermonInfo.pdf" 
                target="_blank">PPT,PDF</a>
            </template>
          </ButtonLayout>
          <!-- <span>{{sermonInfo.mp4}}</span>
          <span>{{sermonInfo.mp3}}</span>
          <span>{{sermonInfo.pdf}}</span> -->
        </div>
      </div>

      <pagefooter  
        :title="footer.title"
        :content="footer.content"/>

    </template>
  </PageLayout>
</template>
<script>
const axios = require("axios");
import { mapState } from 'vuex'
import {APIHOST,HOST,mst_api} from '~/static/html/config.js'

// import pagefooter from '../footer.vue'
export default {
        name:"Player",
        watchQuery: ['lang'],
        props:{
          // mp4:"",
        },
        data() {      
           return {
            sermonInfo:{
              title:"",
              teacher:[],
              date:()=>{return Date.now();},
              mp4:"",
              mp:"",
              pdf:"",
              hits:0,
              cover:"",
              scripture:"",
              duration:"",
            },

            playsinline: true,
        
            // videojs options
            playerOptions: {
              // muted: true,
              // language: 'en',
              // playbackRates: [0.7, 1.0, 1.5, 2.0],
              // sources: [{
              //   type: "video/mp4",
              //   src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              // }],
              // poster: "/static/images/author.jpg",
            }
          }
        },
        computed:{
          ...mapState({
               Menu: state => state['HOMEMenuItem'],
               footer: state => state.footer,
               HOST:state => state.HOST,
          }),
          sid(){
            return this.$route.query.id;
          },
        },
        watch: {
          '$route' (to, from) {
            console.log('----------watch-------'+to)
          }
        },
        created(){
          this.$i18n.locale = this.$route.query.lang
          console.log('----------created--------'+this.$i18n.locale)
        },
        mounted(){
          console.log('this.$route.query.id-----------'+this.$route.query.id)
          this.getSermonInfo(this.$route.query.id);
        },
        
        methods:{
          
          linkScript(s){
            //s = s.replace("^\[ \"","")
            //s = s.replace("^\" \]","")
            var link = `http://www.biblegateway.com/passage/?search=${s}&version=NIV`
            return link;
          },
          trimit(s){
            // s = s.replace("^\[ \"","")
            // s = s.replace("^\" \]","")
            return `${s}`
          },
          playC(t){
            console.log(`----------${t}------------`)
            this.playerOptions= {
              muted: false,
              language: ( this.$route.query.lang || '' ) == '' ? 'en' : this.$route.query.lang,
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: t==4?"video/mp4":"audio/mpeg",//https://blog.csdn.net/zuosixiaonengshou/article/details/71378709  //https://www.cnblogs.com/barrywxx/p/7016927.html
                src: t==4? this.sermonInfo.mp4:this.sermonInfo.mp3
              }],
              poster:this.sermonInfo.cover,
            }
            console.log('this.playerOptions-------------'+JSON.stringify(this.playerOptions))
          },
          getFirstTeacher(t){
            if(t!=undefined && t.length >=1){
              return t[0];
            }else{
              return "";
            }
          },
          onPlayerPlay(player) {
          // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        console.log('example 01: the player is readied', player)
      },

  //     async fetch ({ store, params }) {
  //   let { data } = await axios.get(`${store.state.mst_api}/mst/sublist`)
  //   console.log(data)
  //   if(data.code == 0){
  //     store.commit('setSubList', data.data)
  //     this.error = undefined;
  //   }else{
  //     //store.commit('setError',data.msg)
  //     this.error = data.msg;
  //   }
  // },
      async getSermonInfo(id){
        var api  = `${APIHOST.DOMAIN}/study/${id}`;
        let { data } = await axios.get(api);
        console.log(data);
        if(data!=undefined && data.message=="Success"){
          var sermd = data.data
          this.sermonInfo = {
            title:sermd.title,
            teacher:this.getFirstTeacher( sermd.teacher ),
            date:sermd.date,
            mp4:( sermd.mp4 || "" ) == "" ? "" : `http://`+sermd.mp4.replace('www.bicf.org',HOST.IP),
            mp3:( sermd.mp3 || "" ) == "" ? "" : `http://`+sermd.mp3.replace('www.bicf.org',HOST.IP),
            pdf:( sermd.pdf || "" ) == "" ? "" : `http://`+sermd.pdf.replace('www.bicf.org',HOST.IP),
            hits:sermd.hits,
            cover:`http://`+sermd.cover,
            series:{id:(sermd.series||{}).id,name:(sermd.series||{}).series_name},
            scripture:sermd.scripture,
            duration:`${sermd.dur_hrs}:${sermd.dur_mins}:${sermd.dur_secs}`
          }
          console.log(this.sermonInfo)

          if(this.$route.query.type == "v" && this.sermonInfo.mp4 != ""){
            this.playC(4)
          }else{
            this.playC(3)
          }
          
         
          console.log(this.playerOptions);
        }
      }
    }
}
</script>
<style lang="less" scoped>
.frame{
  padding:0;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  
  align-items:center;
  
  
  .itemline{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
    //margin-top:10px;
    //width:100%;
  }
  .player{
    width:50%;
    min-height: 300px;
    display:flex;
    justify-content: center;
  }
  .title{
    font-size:3rem;
    color:#3C8C63;
  }
  
}

</style>

