<template>
  <div> 
    <span 
      :style="{visibility:isChoose()? 'visible':'hidden'}" 
      class="glyphicon glyphicon-remove" 
      aria-hidden="true" 
      @click="delChoose()"/>
    <div 
      :style="{width:widthit1}" 
      class="btn-group" 
      @mouseover="toggleMenu(true)" 
      @mouseout="toggleMenu(false)">
       
      <li 
        v-if="selectedOption.key !== undefined" 
        class="dropdown-toggle">
        <pButn style="color:#fff;"> <template slot="pcont1">{{ selectedOption.key }}</template></pButn>
        <span class="caret1">></span>
      </li>

      <li 
        v-if="selectedOption.key === undefined" 
        :class="{'dropdown-toggle-bg':bgitd}" 
        class="dropdown-toggle">
          
        <pButn style="color:#fff;"> <template slot="pcont1">{{ placeholderText }}</template></pButn>
        <span class="caret1">></span>

      </li>

      <div style="height: 1.8rem;position: relative;"/>

      <transition name="showit">
          
        <ul 
          v-if="showMenu" 
          style="width: 100%;text-align: center;" 
          class="dropdown-menu">
          <li 
            v-for="(item, index) in options" 
            v-if="index>0" 
            :key="index">
            <a 
              href="javascript:void(0)" 
              @click="updateOption(item)">
                        
              <pButn 
                class="mediaqr1" 
                style="color:#fff;"> 
                <template slot="pcont1">{{ item.key }}
                </template>
              </pButn>
            </a>
          </li>
        </ul>
            
      </transition>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: [Array, Object],
      default: () => { return [] }
    },
    selected: {
      type:String,
      default: () => { return "" }
    },
    placeholder: {
      type:[String],
      default: () => { return [] }
    },
    widthit:{
      type:String,
      default:""
    },
    bgit:{
      type:Boolean,
      default:false,
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
      bgitd:false,
    }
  },

  mounted() {
    this.selectedOption = this.selected;
    if (this.placeholder)
    {
        this.placeholderText = this.placeholder;
    }
    this.widthit1 = this.widthit;
    this.bgitd = this.$props.bgit;
  },

  methods: {
    updateOption(option) {
        this.selectedOption = option;
        this.showMenu = false;
        this.bgitd = this.$props.bgit;
        this.$emit('updateOption', this.selectedOption);
    },
    isChoose(){
      
      if (this.selectedOption.key == null || this.selectedOption.key == undefined || this.selectedOption.key=="Choose Language" || this.selectedOption.key=="Choose Location" || this.selectedOption.key=="Choose Time"){
        // console.log(false);
        // console.log(this.selectedOption.key);
        return false
      }else{
        // console.log(true);
        // console.log(this.selectedOption.key);
        return true;
      }
    },

    toggleMenu(bShow) {
      this.showMenu = bShow;
    },
    delChoose(){
        this.updateOption(this.options[0]);
    }
  }
}
</script>

<style scoped>

.showit-enter-active{
  transition: opacity .5s;
}

.showit-leave-active {
  transition: opacity 0s;
}
.showit-enter, .showit-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 1460px) {
  .btn-group{
    min-width: 16em !important;

  }
  .mediaqr1{
    font-size: 1.5rem !important
  }

}
.btn-group {
  min-width: 18em;
  height: 2.06em;
  position: relative;
  margin: 10px 1px 0;
  display: inline-block;
  vertical-align: middle;
  font-size: 1.94rem !important;
  border :1px solid #fff; 
  border-radius : 10px ; 
  
  font-family: MyriadPro-Regular;
}
.btn-group:hover {
  background:-webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
  cursor: pointer;
  background-origin: border-box;
  border :.167rem solid #fff0
}

.btn-group a:hover {
  text-decoration: none;

}
.dropdown-toggle-bg{
   background : gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
              background : -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
              background : -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
              background : -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));   
  background-origin: border-box;    
}

.dropdown-toggle {
  color: #636b6f;
  min-width: 160px;
  padding: 10px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 0px;
  border: 0;
  transition: background 0s ease-out;
  float: none;
  box-shadow: none;
  /*background:-webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));*/

  
  height: 2.33vw;
  color:white;
}

.dropdown-menu {
  display: block;
  position: absolute;
  top: 110%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 10px 0;
  margin: 0px 0 0;
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
  padding: 10px 15px;
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

.caret1 {
  width: 0;
  position: relative;
  left: -0.5em; 
  vertical-align: middle;
  float: right;
  top: -1.25em;
}
.glyphicon-remove{
  top:7px;
}

li {
    list-style: none;
}
</style>
