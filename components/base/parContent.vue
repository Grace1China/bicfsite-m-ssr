<template>

  <p>
    <slot name="pcont1"/>
  </p>
</template>

<script>

export default {
        name:"ParContent",

        item:{
          type:String,
          default:""
        },
        colorexpr:{
          type:String,
          default:''
        },
        data() {
          return {
           
          }
        },
        mounted() {
          
        },
        methods: {
          
        }
      }
</script>

<style lang='less' scoped>
p{
          font-family: MyriadPro-light;
          font-size : 1.5rem;
          color :  #231815;
          margin:0;
          padding:0;
}
       
</style>











