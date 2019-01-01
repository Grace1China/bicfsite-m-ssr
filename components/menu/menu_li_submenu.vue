<template>
  <ul 
    class="thisdropdown-menu multi-level" 
    style="" >
    <template v-for="(item,key) in submenus" >
      <menu_item 
        :item="item" 
        :key="'menu_li_sub'+key"
      />
    </template>
  </ul>
</template>
<script>
import menuItem from './menu_li_submenu_li.vue'
export default {
    components:{
        "menu_item":menuItem,
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
      left:{
        type:String,
        default:"50%"
      },
      marginleft:{
        type:String,
        default:"-5em"
      }
    },
    data() {
      return {
        showMenu1:false,
      }
    },
    mounted() {
      
    },
    methods:{
        toggleMenu(bValue){
            this.showMenu1 = bValue;
            console.log(this.showMenu1);
        }
    }
  }
</script>

<style lang='less' scoped>

.thisdropdown-menu {
  display: block;
  position: absolute;
  top: 100%;
  z-index: 1000;
  min-width: 8em !important;
  //width: 8em !important;
  padding: 10px 0;
  list-style: none;
  
  text-align: left;
  background-color: #fff;
  
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  background: #505050;
  left:50%;
  transform: translateX(-50%);
}




</style>








    