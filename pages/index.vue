<template>
  <PageLayout>
    <template slot="pagecont1">
      <MenuMod
        :fixhover="false"
        :nobg="isMenuNoGg"/>
      <banner 
        :title="''"
        :subtitle="''"><!--The Beijing International Christian Fellowship--><!--WELCOME TO BICF-->
        <template slot="bgimg">
          <img 
            src="@/assets/homebanner_nowater.jpg" 
            style="width: 100%"
          >
        </template>
      </banner>
      <welc/>
      <churchfilter/>  
      <newsletter/>
      <contactusmail/>
      <bottompart/>

      <tool/>
    </template>
  </PageLayout>
</template>
<script>
const axios = require("axios");

import MenuMod from '~/components/menu/menu.vue'
import tool from '~/components/tool.vue'
import banner from '~/components/base/banner.vue'
import welc from '~/components/home/Welcome.vue'
import churchfilter from '~/components/home/ChurchFilter.vue'
import newsletter from '~/components/home/NewsLetter.vue'
import contactusmail from '~/components/home/ContactUsMail.vue'
import bottompart from '~/components/home/bicfAppSocialfoot.vue'

import { mapState } from "vuex";
import {APIHOST,HOST,mst_api} from '~/static/html/config.js'

export default {
  layout: 'default',
  components: {
    MenuMod,
    tool,
    banner,
    welc,
    churchfilter,
    newsletter,
    contactusmail,
    bottompart
  },
  data() {
    return {
      test: false,
      rowfullwidth: 0,
      error:undefined,
    }
  },
  head () {
    return {
      title: 'BICF',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: '', name: '', content: '' }
      ]
    }
  },
  async fetch ({ store, params }) {

    // var api  = `${store.state.APIHOST.DOMAIN}/churchs`
    // let rsp = await axios.get(api)
    // console.log(rsp)
    // store.commit('setChurches', rsp.data.data)

    var rsp  = await axios.get(`${mst_api}/mst/sublist`)
    console.log('-----index fetch----------')
    console.log(rsp)
    if(rsp.data.code == 0){
      store.commit('setSubList', rsp.data.data)
      this.error = undefined;
    }else{
      //store.commit('setError',data.msg)
      this.error = rsp.data.msg;
    }

    rsp  = await axios.get(`${APIHOST.DOMAIN}/churchs`)
    console.log('-----index fetch-----churchs-----')
    console.log(rsp)
    if(rsp.data.message == 'Success'){
      store.commit('setChurches', rsp.data.data)
      console.log(store.state.pagedb.churches)

    }
    // if(rsp.message == 0){
    //   store.commit('setSubList', data.data)
    //   this.error = undefined;
    // }else{
    //   //store.commit('setError',data.msg)
    //   this.error = data.msg;
    // }
  },

        

  computed:{
    menuItemC(){
      console.log(this.$store.state.HOMEMenuItem)
      return this.$store.state.HOMEMenuItem
    },
    isMenuNoGg() {
      console.log('isMenuNoGg');
      return false;
      // if(process.browser){
      //   var top = window.pageYOffset || document.documentElement.scrollTop,
      //   left = window.pageXOffset || document.documentElement.scrollLeft;
      //   //console.log(top);
      //   if (top > this.menufixpoint) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }
    }
  },
  watch: {
    $route(val, oldVal) {
      if (val.fullPath != oldVal.fullPath) {
        this.page = 0
      }
    }
  },
  
  mounted() {
    this.scrollToTop()
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0 })
    }
  }
}
</script>

<style lang='less' scoped>
.container-fluid {
  padding-left: 0;
  padding-right: 0;
}

.toolbar {
  position: fixed;
  bottom: 5px;
  left: 100%;
  margin-left: -40px;
}

svg {
  color: white;
  overflow: visible;
  width: 3rem;
  height: auto;
  padding: 0.75rem;
  background: grey;
  border-radius: 10px;
}
svg:hover {
  background: gradient(
    linear,
    0% 50%,
    100% 50%,
    color-stop(0, rgba(0, 167, 107, 1)),
    color-stop(0.5357, rgba(57, 151, 103, 1)),
    color-stop(1, rgba(56, 138, 98, 1))
  );
  background: -moz-gradient(
    linear,
    0% 50%,
    100% 50%,
    color-stop(0, rgba(0, 167, 107, 1)),
    color-stop(0.5357, rgba(57, 151, 103, 1)),
    color-stop(1, rgba(56, 138, 98, 1))
  );
  background: -webkit-gradient(
    linear,
    0% 50%,
    100% 50%,
    color-stop(0, rgba(0, 167, 107, 1)),
    color-stop(0.5357, rgba(57, 151, 103, 1)),
    color-stop(1, rgba(56, 138, 98, 1))
  );
  background: -o-gradient(
    linear,
    0% 50%,
    100% 50%,
    color-stop(0, rgba(0, 167, 107, 1)),
    color-stop(0.5357, rgba(57, 151, 103, 1)),
    color-stop(1, rgba(56, 138, 98, 1))
  );
}
</style>
