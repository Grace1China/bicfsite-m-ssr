<template>
  <div 
    class="container-fluid" 
    style="background-color:#fff;">
    <template v-for="ii in 2">
      <div 
        :key="ii" 
        class="row ">
        <div 
          v-for="jj in 3" 
          :key="jj">
          <div 
            v-if="sermonsCompu.length>(ii-1)*3+(jj-1)" 
            class="info col-lg-4 ">
            <div 
              :style="{ backgroundImage: 'url(' + 'http://'+getImageUrl((ii-1)*3+(jj-1)) + ')' }" 
              class="sm-info content" 
              style="background-size:cover;background-position: center;background-repeat: no-repeat;" 
              @mouseover="toggleIntro((ii-1)*3+(jj-1))" 
              @mouseout="toggleIntro((ii-1)*3+(jj-1))" >
                      
              <transition name="block-show" >
                <div 
                  v-if="isShowIntor((ii-1)*3+(jj-1))" 
                  class="sm-intro">
                  <div class="inner">
                    <div class="title">
                      <strong>
                        <a :href="'#/sermonplayer?id='+sermonsCompu[(ii-1)*3+(jj-1)].id+'&type=v'">{{ sermonsCompu[(ii-1)*3+(jj-1)].title }}</a>
                      </strong>
                      <hr style="margin:0 20px">
                    </div>
                    <div class="desc">{{ sermonsCompu[(ii-1)*3+(jj-1)].date }}</div>
                  </div>
                </div>  
              </transition>
            </div>
          </div>   
        </div>
      </div>
    </template>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import {APIHOST,HOST,mst_api} from '~/static/html/config.js'

export default {
        components: {
        },
        data() {
          return {
            showIntro:-1,
          }
        },
        computed: {
          ...mapState({
              sermonlist: state => state.pagedb.sermon.list,
              HOST: state => state.HOST,
          }),

          sermonsCompu(){
            return this.sermonlist;
          },
        },
        mounted(){
          this.$store.dispatch('getSermons',{ministry:'ims',teacher:undefined,series:undefined,page_size:10,start:1});
        },
        methods:{
           getImageUrl(index){
             var retV = ''
              if(index < this.sermonsCompu.length){
                console.log(`${this.sermonsCompu[index].cover}----${HOST.IP}`)
                retV = this.sermonsCompu[index].cover.replace("www.bicf.org/","")
                retV = `${HOST.IP}/${retV}`
              }
              console.log('getImageUrl'+retV)
              return retV
          } ,
          toggleIntro(index){
            this.showIntro = index;
          },
          isShowIntor(index){
            return index == this.showIntro;
          }
        }
  }


</script>



<style lang='less' scoped>
    
        .block-show-enter-active,  {
          transition: all .8s ease;
        }
        .block-show-leave-active{
          transition: all 0s ease;
        }
        .block-show-enter, .block-show-leave-to /* .fade-leave-active below version 2.1.8 */ {
          opacity: 0;
          transform: translateX(10px);
        }

        .container-fluid{
          .row{
            margin:0 0 3rem 0;
            padding: 0;
          }
          .row:last-of-type{
            margin:0;

          }
          padding: 0;
        }

        .info{
          padding: 0;
        }
        


        .sm-info{
          height: 34rem;
          position: relative;
          margin:0 6px;
          width:32vw;
          height:calc(32vw * 576 / 1024);
        }
        .sm-intro{
          height: 90%;
          width: 90%;
          border-radius: 2rem;
          background: gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 0.9) ),color-stop(0.5357,rgba(57, 151, 103, 0.9) ),color-stop(1,rgba(56, 138, 98, 0.9) ));
          background: -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 0.9) ),color-stop(0.5357,rgba(57, 151, 103, 0.9) ),color-stop(1,rgba(56, 138, 98, 0.9) ));
          background: -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 0.9) ),color-stop(0.5357,rgba(57, 151, 103, 0.9) ),color-stop(1,rgba(56, 138, 98, 0.9) ));
          background: -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 0.9) ),color-stop(0.5357,rgba(57, 151, 103, 0.9) ),color-stop(1,rgba(56, 138, 98, 0.9) ));

          left: 50%;
          transform: translate(-50%,-50%);
          //border: 2px solid #fff;

          top: 50%;
          position: absolute;
          color:#fff;
          .inner{
              margin:0rem;
              .title{
                  font-size:2rem;
                  overflow: hidden;
                  max-height: 106px;
                  margin-top: 10px;
                  color: #fff;
                  a{
                    color:#fff;
                    text-decoration: none;
                  }
              }
              .desc{
                  font-size:1.5rem;
                  line-height:3.73rem;
              }
          }

    }

   




</style>







    