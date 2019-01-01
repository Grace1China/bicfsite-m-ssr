
<template>
  

  <div 
    :style="{border:showloc?'1px solid #fff1':''}" 
    class="cc-info content" 
    @mouseover="toggleCCLoc(true)" 
    @mouseout="toggleCCLoc(false)">
    <transition name="showitinfo">
      <div 
        v-if="!showloc" 
        class="cc-info-base">

        <div class="cc-name  ">
          <pButn style="color:#fff;font-family: MyriadPro-regular"> <template slot="pcont1"><strong style="font-size: 1.5rem; white-space:pre-line; ">{{ church.Name }}</strong></template></pButn>
        </div>
        <p>
          <!--<strong>Campus:</strong>{{ churches1[n*3-3+(jj-1)].Campus }}<br>-->
          <span class="cc-lang " >
            <pButn style="color:#fff;"> 
              <template slot="pcont1"><strong>Language:</strong> {{ church.Language }}
              </template>
            </pButn>
          </span>
          <span class="cc-time " >
            <pButn style="color:#fff;"> 
              <template slot="pcont1"><strong>Time:</strong> {{ church.Time }}
              </template>
            </pButn>
          </span>
        </p>
        <!--<strong>TimeSpan:</strong>    {{ churches1[n*3-3+(jj-1)].TimeSpan }}<br>-->
      </div>
    </transition>

    <transition name="showitloc">
      <div 
        v-if="showloc" 
        class="cc-info-loc " 
        @click="showMap">
        <p class="cc-loc" >

          <pButn style="color:#fff;"> 
            <template slot="pcont1">  <a 
              style="color:#fff" 
              href="javascript:void(0);" ><strong>Location:</strong>    {{ church.Location }}</a>
            </template>
          </pButn>
        </p>
      </div>
    </transition>


                                             
  </div>

</template>
<script>
// import $ from 'jquery';
export default {
  props: {
    church:{
      type:Object,
      default: () => { return {} } 
    }
  },
  data() {
      return {
          showloc:false,
      }
  },

  mounted() {
      
  },

  methods: {
    toggleCCLoc(pValue){
      this.showloc = pValue;
    },
    showMap: function() {
      console.log('in item emit')
      //this.church.langver=this.$router.currentRoute.path
      this.$emit('showMapto', this.church)
    }
  }
}
</script>
<style scoped>

@media (min-width: 0px) and (max-width: 768px) {
  .cc-info-loc .cc-info-base{
    position:static;
  }
}


@media (min-width: 768px) and (max-width: 9999px) {
   .cc-info-loc .cc-info-base{
    position:absolute;
  }
}

  .showitloc-enter-active, .showitloc-leave-active {
    transition: opacity .5s;
  }
  .showitloc-enter, .showitloc-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .showitinfo-enter-active, .showitinfo-leave-active {
    transition: opacity .5s;
  }
  .showitinfo-enter, .showitinfo-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 1;
  }

  .row{
    margin: 0;
    
  }
.info{
    margin: 0 !important;
    padding: 0 !important;
    font-size: 15.6rem;
    
  }
  .cc-info{
    height: 17.8rem;
    /*width: 25rem;*/
    overflow: hidden;
    border: 1px solid #fff;
    margin: 0rem 0 5rem 0;
    border-radius: 4%;
    padding: 10% 0;
    position: relative;
    text-align: left

  }
  
  .cc-info-base{
    visibility: visible;
    //position: absolute;
    left : 0;
    top :0 ;
    height: 100%;
    width: 100%;
    padding: 0.5em 1em;
    
  }

  .cc-name{
      margin-bottom: 1em;
    }

  .cc-info-loc{
    position: absolute;
    left: 0;
    top: 0;
    background : gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
    background : -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
    background : -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
    background : -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) )); 
    height: 100%;
    width: 100%;
    padding: 20% 5%;
    color:#ff0000;
    background-origin: border-box;
    
  }

      a {
        color: #fff !important;
        text-decoration: none !important;
      }
      a:hover{
        text-decoration: none !important;
      }
  
  
</style>
  