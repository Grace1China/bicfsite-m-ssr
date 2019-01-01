<template>
  <div 
    :class="{'reverseColor':isReverse}" 
    class="row " >
    <div class="col-lg-10 col-lg-offset-1">
      <div 
        :class="{'reverseColor':isReverse}" 
        class="title" >
        <span 
          :class="{'reverseColor':isReverse}" 
          class="cn" >{{ footer.title }}</span>
        |
        <span 
          :class="{'reverseColor':isReverse}" 
          class="en" >{{ footer.titlecn }}</span>
      </div>
      <div 
        ref="contdiv" 
        :class="{'reverseColor':isReverse}" 
        class="content" 
        v-html="footer.contet"/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Pagefooter",

  props: {
    title: {
      type:String,
      default:""
    },
    content: {
      type:String,
      default:""
    },
    isReverse: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      test: false,
      rowfullwidth: 0
    };
  },
  computed: {
    ...mapState({
      footer: state => state.footer
    })
  },
  mounted() {
    this.$refs.contdiv.innerHTML = this.content;
  }
};
</script>

<style lang='less' scoped>
@import "~@/assets/style/var";
.clearfix {
  clear: both;
  float: none;
}
a:focus {
  outline: none;
}

.row {
  margin: 0;
  padding: 0;
  background-color: @footerbg;
  margin-top: 0;
}
.reverseColor {
  background-color: #fff !important;
  color: @footerbg !important;
}

.container {
  margin: 0 auto; //为了抵消1170使他固定在左边的作用
  padding: 0;
}

.title {
  text-align: center;
  color: #fff;
  margin-top: 1.36em;
  font-size: 3rem;
}
.title .cn {
  color: #fff;
  /*margin-right: 3rem;*/
  letter-spacing: 1.5rem;
  font-size: 3rem;
}
.title .en {
  color: #fff;
  font-family: MyriadPro-Bold;
  margin-left: 2rem;
  letter-spacing: 1px;
  font-size: 2rem;
}

.content {
  //font-family: Songti SC;
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
  line-height: 2.73rem;
  margin-top: 1.52em;
  margin-bottom: 4.06em;
  font-weight: 200;
}
</style>








    