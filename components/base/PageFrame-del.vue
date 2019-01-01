
<template>
  <div 
    id="tophere1" 
    ref="rowcontainer" 
    class="container-fluid">
    <slot name="menu"/>
    <slot name="banner"/>
    <div class="pageCont">
      <slot/>
    </div>
    <slot name="footer"/>

    <div class="toolbar">
      <a 
        href="javascript:void(0)" 
        @click="scrollToTop">
        <svg 
          aria-hidden="true" 
          data-prefix="fas" 
          data-icon="chevron-up" 
          class="svg-inline--fa fa-chevron-up fa-w-14" 
          role="img" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 448 512">
          <path 
            fill="currentColor" 
            d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"/>
        </svg>
      </a>
    </div>
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
          }

        },
        data() {
          return {
           page:0,
           test:false,
           rowfullwidth:0,
          }
        },
        watch: {
          $route(val, oldVal) {
            if(val.fullPath != oldVal.fullPath) {
              this.page = this.page+1;
              this.$router.go(0);
            }
          }
        },
        mounted() {
          this.scrollToTop()
        },
        methods: {
          scrollToTop() {
            window.scrollTo({top: 0})
          }
        }
      }
</script>

<style lang='less' scoped>
        
.container-fluid{
  padding-left: 0;
  padding-right: 0;
}

.pageCont{
  //margin-top: 50px;
  display: flex;
  justify-content: space-around;
}
.toolbar{
  position: fixed;
    bottom: 5px;
    left: 100%;
    margin-left: -100px;
}
svg{
  color: white;
    overflow: visible;
    width: 3rem;
    height: auto;
    padding: 0.75rem;
    background: grey;
    border-radius:10px;
}
svg:hover{
  background: gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
    background: -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
    background: -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
    background: -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
}




</style>








    