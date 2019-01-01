<template>
 
  <p :style="{ color : colorexpr!='' ? colorexpr : '#3C8C63' }">

    {{ item }}
  </p>

</template>

<script>

export default {

        props: {
          item:{
            type:String,
            default:""
          },
          colorexpr:{
            type:String,
            default:''
          }

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
          font-family: MyriadPro-Bold;
          font-size : 6.56rem;
          color : #3C8C63;
}
       
</style>











