<template>
  <div 
    class="container-fluid" 
    style="background-color:#fff;padding: 0;">
    <template v-for="ii in 4">
      <div 
        v-if="list.length>ii-1" 
        :key="ii"
        class="row ">
        <template v-for="jj in 4">
          <div 
            v-if="list.length>jj-1" 
            :key="jj"
            class="cover col-lg-3 ">
            <a :href="list[jj-1].url"> <img :src="list[jj-1].cover"></a>
            <div>{{ list[jj-1].name }}</div>
          </div>  
        </template>
      </div>
    </template>
  </div>
</template>
<script scoped>
// import buttonLay from '@/common/buttonlayout.vue'
// import $ from 'jquery';
export default {
        // components:{
        //   'buttonLay':buttonLay,
        // },
        props:{
          list:{
            type:Array,
            default:null,
          },

        },
        data() {
          return {
           test:false,
          }
        },

  
        computed: {
             
           
        },
        methods:{
          isOdd(ii){
            console.log(ii);
            return ii&1>0? true:false;
          }
          ,
          getlink(ii){
            return "#/ministry/"+ii;
          }
          ,
          getHtml(){

          }
        }

  }

   $(document).ready(function(){
     /* $('.sm-info').mouseenter(function(){
       $(this).children('.sm-intro').css('visibility','visible');
        
      });

      $('.sm-info').mouseleave(function(){
        //$(this).css('visibility','hidden');
        //$('.cc-info-base').css('visibility','hidden');
        //$(this).prev().css('visibility','visible');
         $(this).children('.sm-intro').css('visibility','hidden');
      });*/
    })
</script>

<style lang='less' scoped>
    .container,.row{
      margin: 0;
      padding:0;
    }
    .ms-info{
       
        height: 34rem;
        position: relative;
    }
    .cover{
      margin:0;
      padding: 0;
      text-align: center;
    }
    .ms-intro{
       position: relative;
       height: 34rem;
       width: 80rem;/*need calc*/
       .inner{
          margin: auto ;
          border-radius: 2rem;
          
          width: 60rem;/*need calc*/
          height: 20rem;/*need calc*/
          position: absolute;
          color:#000;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
            
        .title{
            font-size:3.11rem;
            overflow: hidden;
        }
        .desc{
            font-size:2.07rem;
            line-height:3.73rem;
            overflow: hidden;
        }
    

    }
    .left{
      float: left;
    }
    .right{
      float:right;
    }




</style>






    