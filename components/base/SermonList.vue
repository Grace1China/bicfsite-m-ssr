<template>
  <div class="sermon-item">

    <div class="cover">
      <a 
        :href="'/sermon/player?id='+getId+'&type=v'" 
        target="_blank" 
        @click.stop.capture=""> <img 
          :src="'http://'+imgUrlC" 
          :alt="title"></a>
    </div>
    <div class="baseinfo">
      <a 
        :href="'/sermon/player?id='+getId+'&type=v'" 
        target="_blank" 
        @click.stop.capture=""> <h1 v-show="title">{{ title }}</h1>
      </a>
      <!-- <hr style="margin: 0.5rem;width: 44rem;height: 0.12rem;"/> -->
      <div 
        v-show="verse!=undefined && verse != null && verse.length>0" 
        class="verse">
        <span>经文出处:</span>
        <template v-for="(item,key) in verse" >
          <a 
            :key="key"
            :href="locationLink || 'javascript:'" 
            target="_blank" 
            @click.stop.capture="false">{{ item }}</a>
        </template>
      </div>
      <div 
        v-show="teacher!=undefined && teacher != null && teacher.length>0" 
        class="teacher">
        <span>讲员:</span>
        <template v-for="(item) in teacher">
          {{ item }}
        </template>
      </div>
      <div 
        v-show="date" 
        class="date">
        {{ date }}
      </div>
    </div>
    <div class="palyInfo">
      <div 
        v-show="hits" 
        class="hits">
        {{ hits }}
      </div>
      <div class="playbtn">
        <div 
          v-show="mp4C" 
          class="btn">
          <a 
            :href="'/sermon/player?id='+getId+'&type=v'" 
            target="_blank" 
            @click.stop.capture=""> <ButtonLayout :btn-style="{fontSize:'18px',fontWeight:'100'}"> <template slot="btncont">视频</template></ButtonLayout></a>
        </div>
        <div 
          v-show="mp3C" 
          class="btn">
          <a 
            :href="'/sermon/player?id='+getId+'&type=a'" 
            target="_blank" 
            @click.stop.capture=""> <ButtonLayout > <template slot="btncont">音频</template></ButtonLayout></a>
        </div>
        <div 
          v-show="pdfC" 
          class="btn">
          <a 
            :href="'http://'+pdfC" 
            target="_blank" 
            @click.stop.capture=""><ButtonLayout > <template slot="btncont">下载</template></ButtonLayout></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {APIHOST,HOST,mst_api} from '~/static/html/config.js'

export default {
  props: {
    title: {
      type:String,
      default:""
    },
    link: {
      type: String,
      default: '/'
    },
    id:{
      type:Number,
      default:-1,
    },
    imgUrl: {
      type:String,
      default:""
    },
    forceDesc:{
      type:Boolean,
      default:false
    },
    metaAlign: {
      type:Boolean,
      default:false
    },
    description: {
      type:String,
      default:""
    },
    location: {
      type:String,
      default:""
    },
    locationLink:{
      type:String,
      default:""
    } ,
    time: {
      type:String,
      default:""
    },
    // spread: {
    //   type:[String, Number],
    //   default:() => { return [] }
    // },
    tags: {
      type: Array,
      default: () => []
    },
    mp4:{
      type:String,
      default:""
    },
    mp3:{
      type:String,
      default:""
    },
    verse:{
      type:Array,
      default:() => []
    },
    teacher:{
      type:Array,
      default:() => []
    },
    date:{
      type:String,
      default:""
    },
    hits:{
      type:Number,
      default:0
    },
    pdf:{
      type:String,
      default:""
    },
    item:{
      type:Object,
      default: () => { return {} }
    }
  },
  computed: {
    ...mapState({
      HOST: state => state.HOST,
    }),
    
    mp4C(){
      return this.mp4.replace('www.bicf.org',HOST.IP)
    },
    mp3C(){
      return this.mp3.replace('www.bicf.org',HOST.IP)
    },
    pdfC(){
      return this.pdf.replace('www.bicf.org',HOST.IP)
    },
    imgUrlC(){
      if(/www.bicf.org/.test(this.imgUrl)){
        return this.imgUrl.replace('www.bicf.org',HOST.IP)
      }else{
        return `${HOST.IP}/${this.imgUrl}`;
      }
    },
    desc() {
      if(this.description && this.description.length > 70) {
        return this.description.substr(0, 70) + '...'
      }
      return this.description
    },
    getId(){
      if(this.item != undefined){
        return this.item.id;
      }
    }
  },
}
</script>

<style lang="less" scoped>
.sermon-item {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  justify-content: space-between;
  .cover{
    width: 20vw;
    height: calc(20vw * 576 / 1024);
    img{
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .baseinfo{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    flex-grow: 1;
    font-size: 18px;
    padding: 0 15px;
    a{
      text-decoration: none;
      font-size: 24px;
    }
    h1{
      margin-top: 0;
      font-size: 24px;

    }

    .verse{
      span{
        font-weight: 100;
      }
      a {
        font-size: 18px;
      }

    }
    
  }
  .palyInfo{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: right;
    .playbtn{
      display: flex;
      justify-content: space-between;
      display: inline-block;
      .btn{
        font-size: 2rem;
        padding-right: 0;
      }
    }

  }
  
}

</style>
