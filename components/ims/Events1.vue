<template>
  <agile 
    v-if="event6.length>0" 
    :show="event6.length>0" 
    :infinite="true" >
    <template v-for="(item , key) in event6">
      <div 
        :key="key"
        :class="[key==0 ? 'slide--'+getKeyAdd1(key) +' agile__slide--active' : 'slide--'+getKeyAdd1(key) , '']" 
        class=" slide agile__slide  " >
        <div 
          :style="{ background: 'center / cover no-repeat url(' +eventBaseUrl + item.image+')  ' }" 
          class="bgblur"/>

        <a :href="'#/event/'+(Number.parseInt(item.id))"><img 
          :src="eventBaseUrl + item.image" 
          class="inImg"></a>

          <!-- <centerinfo style=" font-size: 3.73rem;line-height: 1;color:#fff; " :info='item.title' :link="'#/event/'+(Number.parseInt(key)+1)"/> -->
      </div>
    </template>
  </agile>
</template>
<script>
import { mapState } from 'vuex'
import agile from '../base/Agile.vue'
// import centerinfo from '@/common/pages/centerinfo.vue'


export default {

        components: {
           'agile':agile,
        },
        props:{
            isActive:{
                type:Boolean,
                default:true, 
            },
            church:{
                type:String,
                default:""
            }           
        },
        data() {
          return {
           
          }
        },

        computed:{
             ...mapState({
                eventBaseUrl : state => state.pagedb.eventBaseUrl,
                events: state  => state.pagedb.events.list,
            }),
            
            event6:function () {
                console.log('-------event6--------')
                console.log(this.events)
                return this.events;
            },
            eventBaseUrlCompu(){
                return this.eventBaseUrl
            },
        },

        mounted(){
             this.loadDate();
        },

        methods: {
            getKeyAdd1(key){
                return key+1;
            },
             loadDate(){
                this.$store.dispatch('getEvents', {
                  church: this.church,
                  page_size:6,
                  start:1
                });
              // console.log({'eventsapi':eventsapi});
            }
        },
        
      }
</script>


<style lang='less' scoped>

.bgblur  {
            width: 100%;
            height: 100%;
            filter: blur(10px);
        }

        .inImg{
              height: 100%;
              position:absolute;
              top:0px;
              transform: translateX(-50%);
        }




.agile{
    position: relative;
    text-align: center;
}


.agile {

        .slide {
            
            background-position: center;
            background-size: cover;
            
            height: 500px;

            &:before {
                background-color: rgba(256,256,256, 0.2);
                content: '';
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
            }

            &--1 {
                background-image: url("~assets/apple-light.png");
            }
            &--2 {
                background-image: url("~assets/amazon-light.png");
            }
            &--3 {
                background-image: url("~assets/brand.png");
            }
            &--4 {
                background-image: url("~assets/facebook-light.png");
            }
            &--5 {
                background-image: url("~assets/google-light.jpg");
            }
            &--6 {
                background-image: url("~assets/th.jpg");
            }
        }

        .title{
            font-size:3.73rem;
            font-family: SourceHanSansSC-ExtraLight;
            line-height: 1;
            margin:auto;
        }
}


</style>








    