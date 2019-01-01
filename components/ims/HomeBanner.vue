
<template>

  <div 
    class="row banner" 
    style="position:relative;">
       
        
    <banner 
      :title="''"
      :subtitle="''" >
      <template slot="bgimg">
        <img 
          src="@/assets/ims-banner.png" 
          style="width: 100%" >
      </template>
    </banner>


               
 
    <MenuMod
      :menu-item="menuItem"
      :fixhover="false"
      :nobg="isMenuNoGg"/>


    
  </div>
 
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      openstr: "",
      showMenu: false,
      resbasedir: "./static/images/"
    };
  },
  computed: {
    ...mapState({
      menuItem: state => state.IMSMenuItem,
      menufixpoint: state => state.pagedb.menufixpoint
    }),

    isMenuNoGg() {
      var top = window.pageYOffset || document.documentElement.scrollTop,
        left = window.pageXOffset || document.documentElement.scrollLeft;
      //console.log(top);
      if (top > this.menufixpoint) {
        return true;
      } else {
        return false;
      }
    }
  },

  mounted() {},

  methods: {
    getimg(pType) {
      if (pType == "banner") {
        return this.resbasedir + "th.jpg";
      }
      if (pType == "brand") {
        return this.resbasedir + "brand.png";
      }
    },
    toggleMenu(pOpen) {
      if (pOpen == true) {
        this.showMenu = true;
      }
      if (pOpen == false) {
        this.showMenu = false;
      }

      /*如果，我是让他两秒消失，没有out事件。点击消失*/
    }
  }
};
</script>

<style scoped>
.row {
  margin: 0;
}

.title {
  font-family: MyriadPro-Bold;
  font-weight: bold;
  font-style: normal;
  font-size: 10.743rem;
  letter-spacing: 0.75rem;
  color: #fff;
}
.subtitle {
  font-family: MyriadPro-Regular;
  font-size: 4.21rem;

  border-radius: 10px;
  padding: 0 15px;

  font-variant: small-caps;
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
  color: #ffffff;
}
</style>

  