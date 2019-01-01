
<template>
  <div 
    id="cont-church" 
    :style="'background-image: url('+bg(churches1.length>0)+');'" 
    class=" col-lg-7 col-sm-12 text-center right" >
    <div 
      :style="{height: bShowMap ? '100%':'0'}" 
      class="mapdiv" >
      <div 
        :style="{visibility: bShowMap ? 'visible':'hidden'}" 
        class="greengracdient">
        <img 
          :style="{visibility: bShowMap ? 'visible':'hidden'}" 
          :src="'/html/images/arrow.png'" 
          class="arrowleft" 
          @click="delMap">
          <!-- <span class="glyphicon glyphicon-arrow-left" @click="delMap" :style="{visibility: bShowMap ? 'visible':'hidden'}" style="float:left;font-size: 3rem;"></span> -->
          <!--<span class="glyphicon glyphicon-zoom-in" @click="delMap" :style="{visibility: bShowMap ? 'visible':'hidden'}" style="float:right;font-size: 3rem;margin-right: 10px;"></span>
              <span class="glyphicon glyphicon-zoom-out" @click="delMap" :style="{visibility: bShowMap ? 'visible':'hidden'}" style="float:right;font-size: 3rem;"></span>-->
      </div>
      <iframe 
        id="mapframe" 
        :src="'/html/map.html?lang='+$route.query.lang" 
        height="100%" 
        width="100%" 
        style="border:none;"/> <!--?campus='+showMaptoCampus-->
    </div>

    <div 
      v-if="!bShowMap" 
      id="churchstime" 
      :style="{height: bShowMap ? '0':'100%'}" 
      class="container-fluid"> 
      <div 
        v-for="n in 100" 
        v-if="churchComputed.length>=n" 
        :key="n"> <!-- any valid media query works -->
        <div class="row ">
          <div 
            v-for="jj in 3" 
            v-if="churchComputed.length>n*3-3+(jj-1)" 
            :key="jj"
            class="info col-lg-4 ">
            <churchitem 
              :church="churchComputed[n*3-3+(jj-1)]" 
              @showMapto="showMapto" />
          </div>   
        </div>
      </div>
          
          
      <div 
        v-if="churchComputed.length>1" 
        style="width: 100%; height: 100%;"/>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import churchitem from './ChurchListItem.vue';

export default {
        components:{
          'churchitem':churchitem,
        },
        props: {
          churches1:{
            type:Array,
            default:()=>{return [];} ,
          }
        },
        data() {
            return {
                showloc:false,
                bShowMap:false,
                showMaptoCampus:"",
            }
        },
        computed:{
          churchComputed(){
            return this.churches1;
          }
        },
        created(){
          this.$on('showMapto', function(oChurch){
             console.log('in list showmap from'+oChurch)
          });
        },

        mounted() {
            
        },

        methods: {
          toggleCCLoc(pValue){
            this.showloc = pValue;
          },
          showMapto(oChuch){
            this.bShowMap = true;
            
            var childFrameObj = document.getElementById('mapframe');

            childFrameObj.contentWindow.paramFromParent = oChuch;

            childFrameObj.contentWindow.setLocation(oChuch)

            console.log(oChuch.Campus);

            this.showMaptoCampus = oChuch.Campus;
          },
          delMap(){
            this.bShowMap = false;         
          },
          bg(bHasCh){

             if(bHasCh){
              return "/html/images/churchlistbg.jpg";
            } else {
              return "/html/images/churchlistbg-light.jpg";
            }

          },
          getPath(){
            return this.$router.currentRoute.path;
          }
        }
    }

</script>

<style lang='less' scoped>
@import "~@/assets/style/var";

.greengracdient{
    height: 3rem;
    display: inline-block;
    width: 100%;
    visibility: visible;
    position: relative;
    text-align: left;
    padding-left: 10px;
}

.arrowleft{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2.4rem;

}

.glyphicon-arrow-left{
  padding-left:15px;
  line-height: 4rem;
  top:0px;
}

#cont-church{
  /*padding:9.5rem 0;
  background-image: url("../assets/churchlistbg.jpg");*/
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 !important;

}
.mapdiv{
  height: 100%;
  width: 100%;
  position: relative;
  line-height: 0;
  overflow: hidden;
}

.glyphicon-remove{
  
  color:red;
}

@media (min-width: 0px) and (max-width: 768px) {
  #churchstime{
    display: inline-block;
  }
}


@media (min-width: 768px) and (max-width: 9999px) {
   #churchstime{
    display: block;
  }
}

#churchstime {
  height: 100%;
  width: 100%;
  padding:10% 1%;
  overflow-y: scroll;
}
  .showit-enter-active, .showit-leave-active {
    transition: opacity .5s;
  }
  .showit-enter, .showit-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .row{
    margin: 0;
  }
  
  
  
</style>








  