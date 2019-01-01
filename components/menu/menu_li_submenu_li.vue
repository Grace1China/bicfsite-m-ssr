
<template>
  <li 
    class="thisdropdown-submenu" 
    @mouseover="toggleMenu(true)" 
    @mouseout="toggleMenu(false)" >
    <template v-if="item['sm']!=null">
      <menu_li_a 
        :item="item['sm']" 
        :itemurl="item.url"/>
    </template>
    <template v-if="item['sm1']!=null">
      <menu_li_a 
        :item="item['sm1']" 
        :has-sub="true"/>
      <div 
        v-if="showMenu" 
        style="position: absolute; left:100%;top:0;width:0.3em;height: 14em;" />
      <transition name="showmenu">
        <menu_mod_sub_sub 
          v-if="showMenu" 
          :submenus="item.submenu" />
      </transition>
    </template>
  </li>
</template>
<script>
import menu_li_a from './menu_li_a.vue'
import menu_mod_sub_sub from './menu_li_submenu_subm.vue'
export default {
    components:{
      'menu_li_a':menu_li_a,
      menu_mod_sub_sub:menu_mod_sub_sub
    },
    props: {
      item:{
        type:Object,
        default:() => { return {} } 
      }
    },
    data() {
      return {
        showMenu:false,
      }
    },
    mounted() {
      
    },
    methods: {
      toggleMenu(pOpen){
        if(pOpen == true){
          this.showMenu = true;
        }
        if(pOpen == false){
          this.showMenu = false;
        }
        //console.log(this.item);
        /*如果，我是让他两秒消失，没有out事件。点击消失*/
        
      },
      len(arr){
        return arr.length;
      }
    }
  }
</script>
<style lang='less' scoped>
li:focus,a:focus{
    outline: none;
}
.showmenu-enter-active, .showmenu-leave-active {
  transition: opacity 1s;
}
.showmenu-enter, .showmenu-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.dropdown-submenu {
  position: relative;
}
</style>









