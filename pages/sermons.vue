<template>
  <PageLayout>
    <template slot="pagecont1">
      <MenuMod 
        :fixhover="true" 
        :nobg="true"/>
      <banner 
        :title="''"
        :subtitle="''" >
        <template slot="bgimg">
          <div 
            class="" 
            style="height:50vh;background-position: center;background-repeat: no-repeat;background-size: cover;backgroundImage: url(/html/images/shepherd.jpg)" />
        </template>
      </banner>

      <ModLayout 
        style="" >
        <template slot="modcont1">
          <div class="container">
            <div class="row header">
              <!-- <p 
                class="title" 
                style="color:#000;background-color: #fff;text-align: center;">
                <span class="cn">最新</span>
                <span class="cn">系列</span>
                <span class="cn">讲员</span>
              </p> -->
              <el-tabs 
                v-model="activeName" 
                class="title"
                @tab-click="handleClick">
                
                <el-tab-pane 
                  :label="tabSet.latest" 
                  class="cn"
                  name="latest">
                  <el-tag
                    v-show="(curSeries.id||-1)>0"
                    :key="curSeries.id"
                    :disable-transitions="false"
                    style="margin:0px 0 20px;"
                    closable
                    @close="handleClose(curSeries.id)">
                    {{ curSeries.series_name }}
                  </el-tag>
                  <el-tag
                    v-show="(curTeacher.id||-1)>0"
                    :key="curTeacher.id"
                    :disable-transitions="false"
                    style="margin:0px 0 20px;"
                    closable
                    @close="handleClose(curTeacher.id)">
                    {{ `${curTeacher.lastname} ${curTeacher.teacher_name}` }}
                  </el-tag>
                  <SermonList 
                    v-for="(item,key1) in getSermons"
                    :key="key1"
                    :img-url="item.cover"
                    :title="item.title"
                    :teacher="item.teacher"
                    :date="item.date"
                    :mp4="item.mp4"
                    :mp3="item.mp3"
                    :verse="item.scripture"
                    :hits="item.hits"
                    :pdf="item.pdf"
                    :id="item.id"
                    :item="item"/>
                </el-tab-pane>
                <el-tab-pane 
                  :label="tabSet.series" 
                  class="cn"
                  name="series">
                  <el-row>
                    <el-col 
                      v-for="(ite, index) in seriesC" 
                      :span="4" 
                      :key="'seriesC'+index">
                      <el-card 
                        :body-style="{ padding: '0px' }">
                        <!-- <div 
                          :style="{ backgroundImage: 'url(' + getSeriesImg(ite) + ')' }"
                          class="series_image_div" 
                          style="background-position: center;background-repeat: no-repeat;background-size: cover;"/>
                        -->
                       
                        <div 
                          class="list_title" 
                          style="padding: 14px;">
                          <a 
                            :title="ite.series_name"
                            href="javascript:void(0);"
                            @click="series2Sermon(ite)">{{ ite.series_name }}</a>
                          <div>
                            {{ ite.start | toDate }}~{{ ite.end | toDate }} 
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane 
                  :label="tabSet.teacher" 
                  class="cn"
                  name="teacher">
                  <el-row>
                    <el-col 
                      v-for="(ite, index) in teachersC" 
                      :span="4" 
                      :key="'teachersC'+index">
                      <el-card 
                        :body-style="{ padding: '0px' }">
                        <!-- <div 
                          :style="{ backgroundImage: 'url(' + getTeacherImg(ite) + ')' }"
                          class="series_image_div" 
                          style="background-position: center;background-repeat: no-repeat;background-size: cover;"/> -->
        
                        <!-- <img 
                          :src="getSeriesImg(ite)" 
                          class="series_image"> -->
                        <div 
                          style="padding: 14px;">
                          <a 
                            class="list_title" 
                            href="javascript:void(0);"
                            @click="teacher2Sermon(ite)">{{ ite.lastname }}{{ ite.teacher_name }}</a>
                            <!-- <div class="bottom clearfix">
                              <time class="time">{{ currentDate }}</time>
                              <el-button type="text" class="button">操作按钮</el-button>
                            </div> -->
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </div>
            
            
          
            <vpage 
              v-show="activeName == 'latest'"
              :setting="pageSetD" 
              style="text-align: center;" 
              @page-change="pageChange"/>

          </div>
        </template>
      </ModLayout>
      <pagefooter  
        :title="footer.title"
        :content="footer.content"/>
    </template>
  </PageLayout>
</template>

<script>


import { mapState } from 'vuex'
import {APIHOST,HOST,mst_api} from '~/static/html/config.js'

// import ContLay from "~/components/sermons/ContLay.vue"
export default {
        name:"Sermon",
        components: {
          // "ContLay":ContLay,
        },
        data() {      
           return {
            activeName:'latest',
            pageSetD:{
              totalRow: 0,//required option
              language: 'en',//default: 'cn'
              pageSizeMenu: [10,20,50,100],
              totalPage: 0,
            },
            curSeries:{},
            curTeacher:{},
            tabSet:{
              latest:"最新",
              series:"系列",
              teacher:"讲员"
            }
            
          }
        },
        
        async fetch ({ store, params }) {

          
        },
        computed: {
            ...mapState({
               IMSMenuItem: state => state.IMSMenuItem,
               sermon: state => state.pagedb.sermon,
               series: state => state.pagedb.series,
               footer: state => state.footer,
               teachers: state => state.pagedb.teachers
            }),
            getMenu:function(){
              console.log('-------------------')
              console.log(this.$store.getters.getMenu(this.$route.fullPath))
              return this.$store.getters.getMenu(this.$route.fullPath);
            },
            getSermons(){
              if (this.sermon == null || this.sermon == undefined || this.sermon.list == undefined || this.sermon.list == null) {
                return [];
              }
              return this.sermon.list;
            },
            seriesC(){
              var retV =  (this.series || {}).list || []
              console.log(retV)
              return retV
            },
            teachersC(){
              var retV =  (this.teachers || {}).list || []
              console.log(retV)
              return retV
            },
            pageSet() { 
              return this.pageSetD
            }
        },
        watch: {
          sermon(val, oldVal) {
            this.handleClick()
            console.log(val) ;
          }
        },
        created(){
         
        },
        beforeMount(){
          this.load()
        },
        mounted() {
          this.handleClick()
        },
        methods:{
          async load() {
            await Promise.all([
              this.$store.dispatch('getSermons',this.getParams({ministry:this.$route.query.church,teacher:this.curTeacher.id,series:this.curSeries.id||-1,page_size:10,start:1})),
              this.$store.dispatch('getSeries',this.getParams({church:this.$route.query.church||"-1",page_size:40,start:1})),
              this.$store.dispatch('getTeacher',this.getParams({church:this.$route.query.church||"-1",page_size:40,start:1}))

            ]).then(() => {
              // this.loaderror = true;
              this.handleClick()
            });
            // this.loading = false;
          },
          handleClose(sid){
            console.log(sid)
            this.curSeries={}
            this.curTeacher={}
            this.tabSet.latest="最新"
            this.$store.dispatch('getSermons',this.getParams({ministry:this.$route.query.church,teacher:undefined,series:this.curSeries.id||-1,page_size:10,start:1}))
          },
        
          getParams(pars){
            var arr = this.$route.fullPath.split('/')
            if(arr.length>3){
              pars.ministry = arr[1]
            }
            return pars;
          },
          //receive page info change callback
          pageChange(pInfo){
            let that = this;
            console.log('--------pageChange----------')
            console.log(pInfo);//{pageNumber: 1, pageSize: 10}
            this.$store.dispatch('getSermons',this.getParams({ministry:this.$route.query.church,teacher:(this.curTeacher||{}).id,series:this.curSeries.id||-1,page_size:pInfo.pageSize
              ,start:(pInfo.pageNumber-1)*pInfo.pageSize+1}));
          },
          getSeriesImg(ite){
            // console.log('---------it----------'+JSON.stringify(ite))
            var retV = ite.image_folderlrg_folder==''? '/html/images/churchlistbg-light.jpg' : `http://${HOST.IP}/${ite.image_folderlrg_folder}/${ite.series_image_lrg}`
            // console.log(retV)
            return retV
          },
           getTeacherImg(ite){
            // console.log('---------it----------'+JSON.stringify(ite))
            var retV = ite.image_folderlrg_folder==''? '/html/images/churchlistbg-light.jpg' : `http://${HOST.IP}/${ite.image_folderlrg_folder}/${ite.teacher_image_lrg}`
            // console.log(retV)
            return retV
          },
          series2Sermon(item){
            console.log('---------series2Sermon-------------')
            console.log(item)
            this.activeName = "latest"
            this.tabSet.latest = "匹配讲道"
            this.curSeries = item
            this.curTeacher = {}
            this.$store.dispatch('getSermons',this.getParams({ministry:this.$route.query.church,teacher:(this.curTeacher||{}).id,series:this.curSeries.id||-1,page_size:10,start:1}))
          },
          teacher2Sermon(item){
            console.log('---------teacher2Sermon-------------')
            console.log(item)
            this.activeName = "latest"
            this.tabSet.latest = "匹配讲道"
            this.curTeacher = item
            this.curSeries = {}
            this.$store.dispatch('getSermons',this.getParams({ministry:this.$route.query.church,teacher:(this.curTeacher||{}).id,series:this.curSeries.id||-1,page_size:10,start:1}))
          },
          handleClick(){
            // console.log(apg)
            // this.activeName = (apg || 'latest')
            console.log('------handleClick---------')
            if(this.activeName ==  'latest'){
              this.pageSetD = {
                totalRow: 0,//required option
                language: 'en',//default: 'cn'
                pageSizeMenu: [10,20,50,100],
                totalPage: this.sermon.total_pages,
              }
            } else if(this.activeName ==  'series'){
              this.pageSetD = {
                totalRow: 0,//required option
                language: 'en',//default: 'cn'
                pageSizeMenu: [10,20,50,100],
                totalPage: this.series.total_pages,
              }
            } else if (this.activeName ==  'teacher'){
              this.pageSetD = {
                totalRow: 0,//required option
                language: 'en',//default: 'cn'
                pageSizeMenu: [10,20,50,100],
                totalPage: this.teachersC.total_pages,
              }
            }

            console.log(this.pageSetD)
            
          }
        }

       
      }
</script>
<style lang="less" scoped>

.header {
  font-size: 2.48rem;
  text-align: center;
  .title {
    line-height: 1;
    margin: 0;
    margin-bottom: 20px;
    padding-bottom: 10px;
    // border-bottom: 1px solid #e7e7e7;
    color:#000;
    background-color: #fff;
    text-align: center;
  }
  cn {
    padding: 0 3.63em;
  }

  .title /deep/ .el-tabs__nav{   //二种写法
    float:none;
  }

  .title /deep/ .el-tabs__item{   //二种写法
    font-size:2.48rem;
    padding: 0 3.63em;
  }
  .title /deep/ .el-tabs__nav-wrap{
    display: flex;
    justify-content: center;
  }
  /deep/ .modrow{
    padding-top:0px;
  }
  .series_image_div{
    width:100%;
    height: 0; // 设置高为0，让padding撑起高
    padding-bottom: 100%; /* 让div的高等于宽 */
  }
  .list_title{
    font-size: 1rem;
    &:hover{
      text-decoration: none;
    }
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
}
</style>
