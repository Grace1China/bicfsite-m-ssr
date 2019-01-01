<template>
  <div class="container-fluid fixedtop">
    <template v-for="(item,key) in menuIteCompute">
      <amenuitem 
        :class = "floatstr(item)" 
        :menuite = "item" 
        :key = "'menu_'+key" 
        :nobg = "nobgWrap"
      />
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import menuItem from './menu_li.vue'
export default {
  name: 'MenuMod',
  components: {
    amenuitem: menuItem
  },
  props: {
    pmenuitem: {
      type:Object,
      default:() => { return {} }
    },
    fixhover: {
      type:Boolean,
      default:false
    },
    nobg: {
      type:Boolean,
      default:false
    }
  },
  
  data() {
    return {
      showMenu: false,
      dataNobg: false
    }
  },
  computed: {
    nobgWrap: {
      // getter
      get: function() {
        console.log('get--'+this.dataNobg)
        return this.dataNobg
      },
      // setter
      set: function(newValue) {
        this.dataNobg = newValue
        console.log('set--'+this.dataNobg)

      }
    },
    menuIteCompute() {
      // var lMeue = undefined
      // console.log('-----menu:menuIteCompute()---------')
      // console.log(this.pmenuitem)
      // if ( (this.pmenuitem || undefined) == undefined ){
      var lMeue = this.$store.getters.getMenu(this.$route)
      //} else {
      //  lMeue = this.pmenuitem //JSON.parse(JSON.stringify())
      //}
      //console.log('-----menu:menuIteCompute()---------'+JSON.stringify(lMeue))
      return lMeue
    }
  },
  beforeMount() {
    this.dataNobg = this.nobg
  },
  mounted() {
    // console.log("mounted");
    var vm1 = this
    document.onscroll = function(e) {
      // console.log("scrolling");
      if (vm1.fixhover == false) {
        var top = window.pageYOffset || document.documentElement.scrollTop,
          left = window.pageXOffset || document.documentElement.scrollLeft
        //console.log(top);
        if (top > 134.765625) {
          document
            .getElementsByClassName('fixedtop')[0]
            .classList.add('fixhover')
          if (
            document.getElementsByClassName('langclass') != null &&
            document.getElementsByClassName('langclass') != undefined &&
            document.getElementsByClassName('langclass').length > 0
          ) {
            document
              .getElementsByClassName('langclass')[0]
              .classList.remove('fixLang')
          }

          vm1.nobgWrap = true
        } else {
          document
            .getElementsByClassName('fixedtop')[0]
            .classList.remove('fixhover')

          if (
            document.getElementsByClassName('langclass') != null &&
            document.getElementsByClassName('langclass') != undefined &&
            document.getElementsByClassName('langclass').length > 0
          ) {
            document
              .getElementsByClassName('langclass')[0]
              .classList.add('fixLang')
          }

          vm1.nobgWrap = false
        }
      }
    }
    if (vm1.fixhover == true) {
      document.getElementsByClassName('fixedtop')[0].classList.add('fixhover')
      vm1.nobgWrap = true
    }
  },
  methods: {
    toggleMenu(pOpen) {
      if (pOpen == true) {
        this.showMenu = true
      }
      if (pOpen == false) {
        this.showMenu = false
      }
    },
    len(arr) {
      return arr.length
    },
    floatstr(item) {
      if (item.s != undefined) {
        return 'search'
      }
      // if(item.b!=undefined){
      //   return 'left brand';
      // }
      // if(item.m!=undefined){
      //   return 'right';
      // }
      if (item.m1 != undefined) {
        return 'relaFrame'
      }
      if (item.lang != undefined) {
        var className = 'langclass'
        if (!this.nobgWrap) {
          className = className + ' fixLang'
        }
        return className
      }
    }
  }
}
</script>

<style lang='less' scoped>
li:focus,
a:focus {
  outline: none;
}

.fixhover {
  -webkit-transform: translate3d(0, -5vw, 0);
  transform: translate3d(0, -5vw, 0);
  background: #fff !important;
  z-index: 9999;
  box-shadow: 0px 1px 2px 1px #888888;
  border-radius: 0px !important;
  height: 4rem;
  font-size: 1.4rem;
  padding-left: 8rem;
  padding-right: 8rem;
}

.fixedtop {
  position: fixed;
  z-index: 9999;
  top: 5vw; /*与fixhover动画垂直运动距离相等*/
  border: 0px;
  background-color: rgba(255, 255, 255, 0);
  width: 100%;
  padding-left: 8rem !important;
  padding-right: 8rem !important;

  display: flex;
  justify-content: space-between;
}

.fixLang {
  position: relative;
  top: -60px;
  left: 70px;
}
.langclass {
  margin: 0 0px;
  position: relative;
  left: 70px;
}
.smallsize {
}

.relaFrame {
  position: relative;
}

.brand img {
  /*width: 7em;*/
  height: 50px;
}

.brand {
  height: 3rem !important;
  font-family: MyriadPro-Bold;
  font-size: 36px;
  display: inline;
}

.search {
  flex-grow: 2;
  display: flex;
}

.showsearchbox-enter-active,
.showsearchbox-leave-active {
  transition: opacity 0.5s;
}
.showsearchbox-enter, .showsearchbox-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.right {
  float: right;
}
.left {
  float: left;
}
</style>








