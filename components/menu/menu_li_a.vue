<template>
  <a 
    :href="hasSub ? 'javascript:void(0)': itemUrlCompu" 
    tabindex="-1">{{ item }}</a>
</template>
<script>
export default {
  props: {
    item:{
      type:String,
      default:"",
    },
    itemurl:{
      type:String,
      default:"",
    },
    hasSub:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
    }
  },
  computed:{
    itemUrlCompu(){
      return this.itemurl;
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
a:focus{
    outline: none;
}
a{
  font-family: MyriadPro-light;
  font-size: 1.093rem;
  letter-spacing: 2;
  line-height: 2rem;
  text-align: center;
  width: 100%;
  display: block;
  padding:3px 20px;
  clear:both;
  white-space: nowrap;
  color:#fff;

}
a:hover{
  text-decoration: none;
  color:#fff;

  background : gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
  background : -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
  background : -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
  background : -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));         
}
       
</style>











