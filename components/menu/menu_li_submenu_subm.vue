
<template>
  <ul 
    class="thisdropdown-menu multi-level" 
    style="left:103%;top: 0;" >
    <li 
      v-for="(item,key) in submenusC" 
      :key="key">
      <template v-show="item['sm']!=null">
        <menu_li_a 
          :item="item['sm']" 
          :itemurl="item.url"/>
      </template>
    </li>
  </ul>
</template>
<script>
import menu_li_a from './menu_li_a.vue'
export default {
  components:{
    "menu_li_a":menu_li_a,
  },
  props: {
    submenus:{
      type:Object,
      default:() => { return {} }
    },
    showmenu:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {
      showMenu:false,
    }
  },
  computed:{
    submenusC(){
      console.log('----------menu_li_submenu_subm--------------')
      console.log(this.submenus)
      return this.submenus
    }
  },
  mounted() {
  },
  methods:{
      toggleMenu(bValue){
          this.showMenu = bValue;
      }
  }
}
</script>

<style lang='less' scoped>

.showmenu-enter-active, .showmenu-leave-active {
          transition: opacity 1s;
}
.showmenu-enter, .showmenu-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

li:focus{
    outline: none;
}

.thisdropdown-menu {
  display: block;
  position: absolute;
  z-index: 1000;
  float: left;
  min-width: 8em !important;
  width: 8em !important;
  padding: 10px 0;
  /*margin: 2px 0 0;*/
  list-style: none;
  
  text-align: left;
  background-color: #fff;
  
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  background: #505050;
}



.thisdropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}
</style>








    