<template>
  <div 
    class="row banner" 
    style="position:relative;">
    <div class="banner-bg">
      <slot name="bgimg"/>
    </div>
    <div 
      class=" welcome" 
      style="position: absolute;top:50%;text-align: center;width: 100%;">
      <p 
        v-if="titleC!=''" 
        class="title">{{ titleC }}</p>
      <p v-if="subtitle!=''">  
        <span class="subtitle">{{ subtitle }}
        </span>
      </p>
      <p 
        v-if="pagehint!=''" 
        class="pagehint">{{ pagehint }}</p>
    </div>
  </div>
</template>
<script>
 export default {
        name:"Banner",
        props: {
          title:{
            type:String,
            default:"",
          },
          subtitle:{
            type:String,
            default:"",
          },
          image:{
            type:String,
            default:"",
          },
          pagehint:{
            type:String,
            default:"",
          }
        },
        data() {
            return {
                                     
            }
        },
        computed :{
          titleC() {
            console.log('------in banner:titleC----'+this.title)
            return this.title;
          },

        },
        mounted() {
        },
        methods: {
        }
    }
</script>
<style scoped>
        .row{
          margin: 0;
        }
        
    
        .title{
          font-family: MyriadPro-Bold;
          font-weight: bold;
          font-style: normal;
          font-size : 6vw;
          letter-spacing: 0.0025em;
          color : #fff;
          display: none;
        }
        .subtitle{
          font-family: MyriadPro-Light;
          font-size: 2.4vw;

          border-radius: 10px;
          padding: 0 15px;
         
          font-variant: small-caps;
          background : gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
          background : -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
          background : -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
          background : -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) )); 
          color: #FFFFFF;
        }
        .pagehint{
          font-size: 3.73rem;
          color: RGBA(208, 204, 206, 1);
        }
        .banner-bg{
          text-align: center;
        }
  
</style>

  