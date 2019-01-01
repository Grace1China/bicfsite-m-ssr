<template>
  <div 
    :style="{width:widthit1}" 
    class="btn-group" 
    @mouseover="toggleMenu(true)" 
    @mouseout="toggleMenu(false)">
    <li 
      v-if="selectedOption.key !== undefined" 
      class="dropdown-toggle dropdown-toggle-bg">
      <pButn style="color:#fff;"> <template slot="pcont1">{{ selectedOption.key }}</template></pButn>          <span class="caret"/>
    </li>

    <li 
      v-if="selectedOption.key === undefined" 
      class="dropdown-toggle dropdown-toggle-bg">
      <pButn style="color:#fff;"> <template slot="pcont1">{{ placeholderText }}</template></pButn>
      <span class="caret"/>
    </li>
    <transition name="showit">
      <ul 
        v-if="showMenu" 
        style="width: 100%;text-align: center;" 
        class="dropdown-menu">
        <li 
          v-for="(option,key) in options" 
          :key="key">
          <a 
            href="javascript:void(0)" 
            @click="updateOption(option)">
            <pButn style="color:#fff;"> <template slot="pcont1">{{ option.key }}</template></pButn>
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
    export default {
        props: {
            options: {
              type: [Array, Object],
              default:() => { return [] }
            },
            selected: {
              type:String,
              default:() => { return "" }
            },
            placeholder: {
              type:[String],
              default:() => { return [] }
            },
            widthit:{
              type:String,
              default: "",
            }
           

        },
        data() {
            return {
                selectedOption: {
                  key: '',
                },
                showMenu: false,
                placeholderText: 'Please select an item',
                widthit1:'100%',
               
            }
        },

        mounted() {
            this.selectedOption = this.selected;
            if (this.placeholder)
            {
                this.placeholderText = this.placeholder;
            }
            this.widthit1 = this.widthit;
           

        },

        methods: {
            updateOption(option) {
                this.selectedOption = option;
                this.showMenu = false;
                
                this.$emit('updateOption', this.selectedOption);
            },

            toggleMenu(bShow) {
              this.showMenu = bShow;
            }
        }
    }
</script>

<style scoped>
.showit-enter-active {
  transition: opacity .5s;
}
.showit-leave-active{
  transition: opacity 0s;
}
.showit-enter, .showit-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.btn-group {
  min-width: 8em;
  height: 2em !important;
  
  

  font-size: 1.94rem !important;
     background : gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
              background : -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
              background : -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
              background : -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));

  color: #636b6f;
  padding: 0.5em;
  
  border :0.05em solid #fff; ;
  line-height: 1;
  border-radius: 10px;
  color:white;
}





.dropdown-menu {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  
  text-align: left;
  background-color: #fff;
  /*border: 1px solid #ccc;*/
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  background: #505050;
}

.dropdown-menu > li > a {
  padding: 10px 30px;
  display: block;
  clear: both;
  font-family: MyriadPro-light;
  font-size: 1.093rem;
  line-height: 1.5;
  text-align: center;
  color: #fff;
  white-space: nowrap;
  text-decoration: none;
}
.dropdown-menu > li > a:hover {
   background : gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
              background : -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
              background : -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
              background : -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));         
  color: #fff;
}

.dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.caret {
  width: 0;
  position: relative;
  top: -0.3em;
  left:0.2em;
  color: #fff;
  
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  float: right;
}

li {
    list-style: none;
}
</style>
