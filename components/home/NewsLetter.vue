
<template>
  <div 
    class="row newletter" 
    style="text-align: center;">
    <div style="text-align: center;">
      <parTitle :item="'Newsletter'" />
      <parContent >
        <template slot="pcont1">
          Beijing International Christian Fellowship is a family of churches and believers from over 70 nations gathering at various locations around the city of Beijing.
        </template>
      </parContent>
    </div>
    <div >
      <el-alert 
        v-if="showmsg != ''"
        :title="showmsg"
        :type="alerttype"
        :closable="true"
        center
        show-icon
        @close="handclose()"/>
        
      
      <div class="  nlctrwrap" >
        <dropdown 
          :options="newsoptionC" 
          :selected="selectC" 
          :placeholder="'Choose A Newsletter'" 
          @updateOption="methodToRunOnSelect"/>
      </div>
      
      <div class=" nlctrwrap" >
        <input 
          v-model="email"
          class="normalbar textinput" 
          type="text" 
          placeholder="Enter Eamil Address" 
          aria-describedby="basic-addon2">
      </div>

      
      <div class="  nlctrwrap">
        <div 
          @click="subit">
          <ButtonLayout 
            style="float:right;">
            <template slot="btncont">
              Subscribe
            </template>
          </ButtonLayout>
        </div>
      </div>

   
    </div>

  </div>
</template>
<script>
//import $ from "jquery";
const axios = require("axios");
import dropdown from "./newsletter/Dropdown.vue";

export default {
  components: {
    dropdown: dropdown
  },
  props: {},
  data() {
    return {
      newsoption: [
        { key: "Cantonese eWeekly" },
        { key: "Kidcity Parents" },
        { key: "BICF IMS eWeekly" },
        { key: "BICF 21st CityChurch eWeekly" },
        { key: "Japanese eweekly" }
      ],
      select: "",
      selectV:"",
      email:"",
      showmsg:"",
      alerttype:""
    };
  },

  computed: {
    selectC: function () {
      console.log(this.select);
      return this.select;
    },
    newsoptionC(){
      console.log(this.$store.state.pagedb);
      return this.$store.state.pagedb.home.sublist
    }

  },
  

  mounted() {
    //test some api
    // this.$store.dispatch('getEvents');
    // this.$store.dispatch('getEventById',31);
    // this.$store.dispatch('getSermonById',804);
    // this.$store.dispatch('getSermons');
    // this.$store.dispatch('subscribe','120022950@qq.com');
  },

  methods: {
    handclose(){
      this.showmsg = ""
      console.log('------------handclose-----------')
    },
    methodToRunOnSelect(playLoad) {
      console.log(playLoad.key);
      this.select = playLoad.key;
      this.selectV = playLoad.value;
    },
    async subit(item){
      console.log('in subscribe' + item)
      this.validateInput(this.email,this.selectV,this.postSub)
    },
    async postSub(){
      const tnow = Math.round(new Date().getTime()/1000)
      var data = {'email':this.email,'listid':this.selectV,'subdate':tnow}
      console.log(data)
      let rsp = await axios.post(`${this.$store.state.mst_api}/mst/subscribe`,data)
      console.log(rsp)
      if(rsp.data.code != 0){
        this.showmsg=rsp.data.msg
        // this.info = ""
        this.alerttype = "error"
        //open2(rsp.data.msg,'warning')
      } else {
        this.showmsg = rsp.data.msg
        // this.error = ""
        this.alerttype = "success"
        //this.open2(rsp.data.msg,'success')
      }
    },
    validateInput (pmail,sublistid,cbpost) {
      this.alerttype = "error"
      var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(sublistid == ""){
        this.showmsg='Please chose a Newsletter.'
      } else if(pmail === '' || !reg.test(pmail)) {
        this.showmsg='Please input a valid email address.'
      }else{
        cbpost()
      }
    },

    open2(msg,type) {
      this.$message({
        message: msg,
        type: type//'success'
      });
    },
    
  }
};
</script>
<style scoped>
.nlctrwrap {
  position: relative;
  font-family: MyriadPro-Regular;
  font-size: 1.85rem;
  margin-top: 2rem;
}
.nlctrwrap > div {
  width: 60% !important;
  /*padding: 0.5em;*/
  text-align: center;
  display: inline-block;
}
.nlctrwrap > input {
  width: 60% !important;
  min-width: 8em;
  height: 2em !important;
  font-family: MyriadPro-light;

  color: #231815;
  padding: 0.5em;
  line-height: 1;
  border: 1px solid;
  border-radius: 10px;
  text-align: center;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-size: 1.5rem;
}
::-moz-placeholder {
  /* Firefox 19+ */
  font-size: 1.5rem;
}
:-ms-input-placeholder {
  /* IE 10+ */
  font-size: 1.5rem;
}
:-moz-placeholder {
  /* Firefox 18- */
  font-size: 1.5rem;
}

input:focus::-webkit-input-placeholder {
  color: #fff;
}

input:focus:-moz-placeholder {
  color: #fff;
}
input:focus:-moz-placeholder {
  color: #fff;
}

input:focus::-moz-placeholder {
  color: #fff;
}
input:focus::-moz-placeholder {
  color: #fff;
}

input:focus:-ms-input-placeholder {
  color: #fff;
}
input:focus:-ms-input-placeholder {
  color: #fff;
}

.row {
  margin: 0;
}

.intro {
  text-align: center;
}

.newletter {
  width: 54.37vw;
  margin: 0 auto;
  padding: 50px 0;
}
</style>
  