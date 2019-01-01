
<template>
  <div 
    :style="btnStyle" 
    class="button" >
    <slot 
      v-if="link==''" 
      name="btncont"/>
  </div>


</template>



<script>

export default {

        props: {
          isinline:{
            type:Boolean,
            default:false
          },

          link:{
            type:String,
            default:"",
          },
          btnStyle:{
            type:Object,
            default:()=>{return {fontSize:'1.5rem'};}
          }
          

        },
        data() {
          return {
          
          }
        },
        mounted() {
         
        }
      }
</script>

<style lang='less' scoped>
        
div.button{
  display: inline-block;
  
  background : gradient(linear,0% 20% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 0.8) ),color-stop(0.5357,rgba(77, 151, 103, 0.8) ),color-stop(1,rgba(76, 138, 98, 0.8) ));
  background : -moz-gradient(linear,0% 20% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 0.8) ),color-stop(0.5357,rgba(77, 151, 103, 0.8) ),color-stop(1,rgba(76, 138, 98, 0.8) ));
  background : -webkit-gradient(linear,0% 20% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 0.8) ),color-stop(0.5357,rgba(77, 151, 103, 0.8) ),color-stop(1,rgba(76, 138, 98, 0.8) ));
  background : -o-gradient(linear,0% 20% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 0.8) ),color-stop(0.5357,rgba(77, 151, 103, 0.8) ),color-stop(1,rgba(76, 138, 98, 0.8) )); 
  
  
  border-radius : 10px;
  padding: 0.5em 1em 0;
  font-family : MyriadPro-light;
  font-variant : titling-caps;
  color : #FFFFFF;
  font-size: 1.86rem;
  height: 1.8em;
  line-height: 1;
  a{
      color:#fff;
      cursor: pointer;
  }
  cursor: pointer;
}
div.button:hover{
  background : gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
  background : -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
  background : -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
  background : -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) )); 
      
}


</style>








    