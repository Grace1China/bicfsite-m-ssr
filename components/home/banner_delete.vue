
<template>
  <div 
    class="row banner" 
    style="position:relative;">
    <banner 
      :title="''"
      :subtitle="''"><!--The Beijing International Christian Fellowship--><!--WELCOME TO BICF-->
      <template slot="bgimg">
        <img 
          src="@/assets/homebanner_nowater.jpg" 
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
      showkeyinput: false,
      keyword: "",
      openstr: "",
      showMenu: false,
      resbasedir: "./static/images/"
    };
  },

  computed: {
    ...mapState({
      menuItem: state => state.HOMEMenuItem,
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
    },
    isCurpage(url) {
      if (url == this.$route.fullPath) {
        return true;
      } else {
        return false;
      }
    },
    goTo(name) {
      this.$router.push({ path: name });
    },
    onSearch() {
      // console.log('will search ~~~~')
      if (this.keyword) {
        this.$router.push({
          name: "search",
          params: { keyword: this.keyword }
        });
      } else {
        this.$store.commit("setSearch", {
          word: ""
        });
        this.$router.push({ name: "home" });
      }
      // console.log(e, this.keyword)
    },
    showSearchBox() {
      this.showkeyinput = !this.showkeyinput;
    }
  }
};
</script>

<style lang='less' scoped>
@import "~@/assets/style/var";
.row {
  margin: 0;
}
a {
  text-decoration: none;
}
.linkspan {
  padding: 1em 1em;
}
</style>

  