<template>
  <div 
    id ="centerinfo" 
    ref="contdiv">
    <template v-if="link==''">{{ info }}</template>
    <template v-if="link!=''"><a :href="link">{{ info }}</a></template>
  </div>
</template>

<script>

export default {
        name:'Centerinfo',
        props: {
          info:{
            type:String,
            default:null
          },
          link: {
            type: String,
            required: false,
            default:"",
          },

        },
        data() {
          return {
           
          }
        },
        mounted() {


          /*window.addEventListener("load", function(event) {
    console.log("All resources finished loading!");
     var w = window.getComputedStyle(document.getElementById('centerinfo'),null).getPropertyValue("width");
          var h = window.getComputedStyle(document.getElementById('centerinfo'),null).getPropertyValue("height");
          console.log('(w:h)('+w+":"+h+')');
          document.getElementById('centerinfo').style.marginLeft=Number.parseFloat(w)/-2+'px';
  });*/
       
          
        },
        updated(){

          
        },
        methods: {
          
        }
      }
</script>

<style lang='less' scoped>

  div{
    position: absolute;
    left:0;
    width: 100%;
    text-align:center;
    top:50%;

  }

</style>











