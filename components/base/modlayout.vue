<template>
  <div 
    ref="rowcontainer" 
    style="text-align: center;" 
    class="modrow">
    <slot name="modcont1"/>
  </div>
</template>

<script>

export default {

        props: {
          titlecn:{
            type:String,
            default:""
          },
          titleen:{
            type:String,
            default:""
          },
          content:{
            type:String,
            default:""
          },

        },
        data() {
          return {
           test:false,
           rowfullwidth:0,
          }
        },
        mounted() {
          this.$refs.container
          const { left } = this.$refs.rowcontainer && this.$refs.rowcontainer.getBoundingClientRect && this.$refs.rowcontainer.getBoundingClientRect()
          this.rowfullwidth = left
        }
      }
</script>

<style lang='less' scoped>

        .modrow{
            margin-left: 0;
            margin-right: 0;
            padding:  50px 0;

        }





</style>








    