
<template>
  <PageLayout>
    <template slot="pagecont1">
      <MenuMod 
        :fixhover="true"
        :nobg="true"/>
      <!-- <ContLay :mlist='ministry4timeLine' /> -->
      <banner 
        :title="''"
        :pagehint="''" 
        style="margin-top: 48px;">
        <template slot="bgimg">
          <div 
            :style="{ backgroundImage: 'url(/html/images/shepherd.jpg)' }" 
            class="" 
            style="height:50vh;background-position: center;background-repeat: no-repeat;background-size: cover;" />
            <!-- <img src="http://www.bicf.org/images/slider/slide-1.jpg" style="width: 100%" /> -->
        </template>
      </banner>
      <ModLayout style="background-color: #28343b;">
        <template slot="modcont1">
          <div class="drow header">
            <p 
              class="title" 
              style="color:#fff;"><span class="cn">事工</span>|<span class="en">MINISTRY</span></p>
            <p 
              class="content" 
              style="color:#fff;">凡耶稣基督所吩咐我们的，都教训他们遵守”。 
              我们的异象是“在基督里建立一个充满活力、不断倍增的社群，</p>
          </div>
        
          <TimeLine 
            :list="ministry4timeLine" 
            :image-base-url="'ministryBaseUrl'"
            :pagepath="'article?id='" 
            style="margin-top:40px"/>
        </template>
      </ModLayout>

      <vpage 
        :setting="pageSet" 
        class="paging" 
        style="text-align: center;" 
        @page-change="pageChange"/>
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

export default {
        name:"Ministry",

        components: {
        },
        data() {
          return {
           
          }
        },
        
        computed: {
            ...mapState({
                IMSMenuItem: state => state.IMSMenuItem,
                ministries: state => state.pagedb.ministries.list,
                totalPage: state => state.pagedb.ministries.total_pages,
                footer: state => state.footer,
            }),
            pageSet() {
              return{
                totalRow: 0,//required option
                language: 'en',//default: 'cn'
                pageSizeMenu: [20,100],//default: [10, 20, 50, 100]
                backColor:'dark',
                totalPage: this.totalPage,
              }
            },
            ministry4timeLine:function(){
                var vm = this
                this.ministries.forEach(function(e){
                    e.image = e.images.image_intro
                    e.tltitle = e.title;
                    e.tlintro = e.introtext;
                    e.tlintro = e.introtext.replace(/<[^>]+>/g,"")
                    e.tlintro = vm.sword(e.tlintro, 120)
                });
               return this.ministries;
            },
            getMenu:function(){
              return this.$store.getters.getMenu(this.$route.fullPath);
            },
        },
        async fetch ({ store, params }) {
            var api  = `${APIHOST.DOMAIN}/churchs`
            let rsp = await axios.get(api)
            console.log(rsp)
            store.commit('setChurches', rsp.data.data)
        },

        mounted(){
            var cn = this.$store.getters.getChurchByKey(this.$route.query.church)
            console.log(this.$route.query.church)
            console.log(cn);
            this.$store.dispatch('getMinistry',{ church:(cn||{}).ministrypath});
        },
        methods:{
          pageChange(pInfo){
            let that = this;
            console.log(pInfo);//{pageNumber: 1, pageSize: 10}
          },
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
          }
        }
      }
</script>
<style lang='less' scoped>
@import "~@/assets/style/var";
.paging{
  background: @footerbg;

}

.title {
  font-size: 3rem;
  text-align: center;
  color: #3b8c63;
}
.title .cn {
  //margin-right: 3rem;
  letter-spacing: 1.5rem;
}
.title .en {
  font-family: MyriadPro-Bold;
  margin-left: 2rem;
  font-size: 2rem;
  letter-spacing: 1px;
}
</style>