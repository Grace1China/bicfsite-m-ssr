<template>

  <div 
    id="app-carousel-loctime" 
    class=" row timelocation " >
    <div 
      class="col-lg-5 col-sm-12  left" 
      style="padding: 10rem 3.325rem 10rem 6.375rem;">
      <div>
        <pTtt 
          class="mediaqr1" 
          style="color:#fff; "> <template slot="pcont1">Time and Location</template></pTtt>
        <parContent style="color:#fff" >
          <template slot="pcont1">
            Beijing International Christian Fellowship is a family of churches and believers from over 70 nations gathering at various locations around the city of Beijing. No matter where or when you join us, you'll find friendly people excited to welcome you into our growing fellowship.
          </template>
        </parContent>
      </div>

      <div class="mediaqr2" >
        <dropdown 
          :options="timespansinch" 
          :selected="tispancompute" 
          :placeholder="'Choose Time'" 
          @updateOption="methodToRunOnSelect_ti"/>
      </div>
      <div class="mediaqr3" >
        <dropdown 
          :options="campusesinch" 
          :selected="camp" 
          :placeholder="'Choose Location'" 
          @updateOption="methodToRunOnSelect_camp"/>
      </div>
      <div class="mediaqr3" >
        <dropdown 
          :options="langsinch" 
          :selected="lang" 
          :placeholder="'Choose Language'" 
          @updateOption="methodToRunOnSelect_lang"/>
      </div>
         
    </div>
    <churchlist :churches1="churches1page"/>
         
  </div>
 
</template>

<style scoped lang="less">

@media (min-width: 0px) and (max-width: 768px) {
  .timelocation{
    text-align: center;
    display:block;
    height: 900px
  }
}


@media (min-width: 768px) and (max-width: 9999px) {
  .timelocation{
    text-align: center;
    display:inline-flex;
    height: 900px
  }
}


.mediaqr1{
    font-size: 6rem;

  }
  .mediaqr2{
    margin-top: 8rem
    
  }
  .mediaqr3{
    margin-top: 2rem;
  }

@media screen and (max-width: 1830px) {
  .mediaqr1{
    font-size: 4.5rem;

  }
  .mediaqr2{
    margin-top: 4rem
    
  }
  .mediaqr3{
    margin-top: 1rem;
  }
  .mediaqr4{
    
  }
  .mediaqr1{
    
  }
}
@media screen and (max-width: 1460px) {
  .mediaqr1{
    font-size: 4rem;

  }
  .mediaqr2{
    margin-top: 1rem
    
  }
  .mediaqr3{
    margin-top: .5rem;
  }
  .mediaqr4{
    
  }
  .mediaqr1{
    
  }
}

@media screen and (max-width: 1280px) {
  .mediaqr1{
    font-size: 4rem;

  }
  .mediaqr2{
    margin-top: 2rem
    
  }
  .mediaqr3{
    margin-top: 1rem;
  }
  .mediaqr4{
    
  }
  .mediaqr1{
    
  }
}


.timelocation>.left{
  background: #221815;
  color:#fff;
}
.timelocation>.right{
  background: #271a20;
  color:#fff;
}
.container {
          width: 100%;
          margin: 0px;
          padding: 0px; 
        }
        .row{
          margin:0px;
        }

        .title{
          font-family: MyriadPro-Bold;
          font-size : 6.56rem;
          letter-spacing: 0;
        }
        .subtitle{
          font-family: MyriadPro-Regular;
          font-size: 1.94rem;
        }
        .content{
          font-family: MyriadPro-Regular;
          font-size: 1.94rem;
        }
</style>

<script>
const axios = require("axios");
import churchlist from './ChurchList.vue';
import dropdown from './Dropdown.vue';
import { mapState } from 'vuex'

export default {
  components: {
    'churchlist':churchlist,
    'dropdown':dropdown
  },
  data() {
    return {
      language : "Choose Language",
      langsinch:[],//{"key":"Choose Language","count":0,"leftcount":0}
      location : "",
      locsinch:[],
      campus : "Choose Location",
      campusesinch:[],//{"key":"Choose Location","count":0,"leftcount":0}
      time : "",
      timesinch:[],
      timespan : 'Choose Time',
      timespansinch :[],//{"key":'Choose Time',"count":0,"leftcount":0}
      churches:[],
    }
  },
  computed: {
    ...mapState({
      churches__: state => state.pagedb.churches,
    }),
    churches1(){
      console.log('----------churches1-------------')
      console.log(this.churches__)
      return this.churches__
    },

    churches1page: {
      get: function() {
        if((this.lang === "" && this.tispancompute==="" && this.camp === "")
          || (this.lang === "Choose Language" && this.tispancompute==="Choose Time" && this.camp === "Choose Location")){
          return [];//当没有选项时，不出现教会
        } else {
          return this.churches;
          //return this.churches.slice(0,9);
        }
      },
    },

    lang: {
      get: function () {
        return this.language;
      },
      set: function (newValue) {
        var vm1 = this;
        this.language = newValue;
        this.churches = this.churches1.filter(function(e){
          var bLocation = false ;
          var bLanguage = false ;
          var bTimeSpan = false;
          if (vm1.campus=="Choose Location" || vm1.campus==e.Campus) bLocation=true;
          if (vm1.language=="Choose Language" || vm1.language==e.Language) bLanguage = true;
          if (vm1.timespan == "Choose Time" || vm1.timespan == e.TimeSpan ) bTimeSpan = true;
          return bLocation && bLanguage && bTimeSpan;
        });
        this.fitlerCond();
      }
    },
    loc: {
      get: function () {
        return this.location;
      },
      set: function (newValue) {
        var vm1 = this;
        this.location = newValue;
        this.churches = this.churches1.filter(function(e){
          var bLocation = false ;
          var bLanguage=false ;
          var bTimeSpan = false;
          if (vm1.campus=="Choose Location" || vm1.campus==e.Campus) bLocation=true;
          if (vm1.language=="Choose Language" || vm1.language==e.Language) bLanguage = true;
          if (vm1.timespan == "Choose Time" || vm1.timespan == e.TimeSpan ) bTimeSpan = true;
          return bLocation && bLanguage && bTimeSpan;
        });
        this.fitlerCond();
      }
    },
    camp:{
      // getter
      get: function () {
        return this.campus;
      },
      // setter
      set: function (newValue) {
        var vm1 = this;
        this.campus = newValue;
        this.churches = this.churches1.filter(function(e){
          var bLocation = false ;
          var bLanguage=false ;
          var bTimeSpan = false;
          if (vm1.campus=="Choose Location" || vm1.campus==e.Campus) bLocation=true;
          if (vm1.language=="Choose Language" || vm1.language==e.Language) bLanguage = true;
          if (vm1.timespan == "Choose Time" || vm1.timespan == e.TimeSpan ) bTimeSpan = true;
          return bLocation && bLanguage && bTimeSpan;
        });
        this.fitlerCond();
      }

    },
    ti: {
    get: function () {
      return this.time;
    },
    set: function (newValue) {
      var vm = this;
      this.time = newValue;
      this.churches = this.churches1.filter(function(e){
            return e.Time == vm.time;
        });
    }
    },
    tispancompute: {
      get: function () {
        return this.timespan;
      },
      set: function (newValue) {
        var vm1 = this;
        this.timespan = newValue;
        this.churches = this.churches1.filter(function(e){
          var bLocation = false ;
          var bLanguage=false ;
          var bTimeSpan = false;
          if (vm1.campus=="Choose Location" || vm1.campus==e.Campus) bLocation=true;
          if (vm1.language=="Choose Language" || vm1.language==e.Language) bLanguage = true;
          if (vm1.timespan == "Choose Time" || vm1.timespan == e.TimeSpan ) bTimeSpan = true;
          return bLocation && bLanguage && bTimeSpan;
        });
        this.fitlerCond();
      }
    }
  },
                  
  created: function () {
    /*prepare data for the filter*/
    this.churches = JSON.parse(JSON.stringify(this.churches1));
    this.langsinch=[{"key":"Choose Language","count":this.churches1.length,"leftcount":this.churches1.length}];
    this.campusesinch=[{"key":"Choose Location","count":this.churches1.length,"leftcount":this.churches1.length}];
    this.timespansinch=[{"key":"Choose Time","count":this.churches1.length,"leftcount":this.churches1.length}];
    var vm1 = this;
    this.churches1.forEach(function(e){
      //console.log(e);
    if(!vm1.containKey(vm1.langsinch,e.Language)){
      //console.log("add key"+e.Language);
      vm1.langsinch.push({"key":e.Language,"count":1,"leftcount":1});
    }

    if(!vm1.containKey(vm1.campusesinch,e.Campus)){
      //console.log("add key"+e.Campus);
      vm1.campusesinch.push({"key":e.Campus,"count":1,"leftcount":1});
    }

    if(!vm1.containKey(vm1.timespansinch,e.TimeSpan)){
      //console.log("add key"+e.TimeSpan);
      vm1.timespansinch.push({"key":e.TimeSpan,"count":1,"leftcount":1});
    }
    });

    this.addKeyLeftCount1(vm1.langsinch);
    this.addKeyLeftCount1(vm1.campusesinch);
    this.addKeyLeftCount1(vm1.timespansinch);
  },
  mounted(){
    this.getChurch()
  },
  methods: {
    async getChurch(){
      var api  = `${this.$store.state.APIHOST.DOMAIN}/churchs`
      let rsp = await axios.get(api)
      console.log(rsp)
      this.$store.commit('setChurches', rsp.data.data)
    },

    methodToRunOnSelect_ti(payload) {
          this.tispancompute = payload.key;
    },
    methodToRunOnSelect_camp(payload) {
          this.camp = payload.key;
    },
    methodToRunOnSelect_lang(payload) {
          this.lang = payload.key;
    },

    clearKeyLeftCount1(li){
          li.forEach(function(e){
            if(e["key"].indexOf('Choose')<0){
              e["leftcount"] = 0;
            }
            });
    },

    addKeyLeftCount1(li){
      li.forEach(function(e){
          e["leftcount"] = e["count"];
        });
    },
    containKeyLeftCount:function(li,pKey){
      var bInclude = false;
      li.forEach(function(e){
        //console.log("outside if "+ e["key"]+":count:"+e["count"]);
        if(e["key"]==pKey){ 
          e["leftcount"]=e["leftcount"]+1;
          //console.log("inside if " + e["key"]+":count:"+e["count"]);
            bInclude = true;
        }
        else {
        }
      });
      return bInclude;
    },
    containKey:function(li,pKey){
      var bInclude = false;
      li.forEach(function(e){
        //console.log("outside if "+ e["key"]+":count:"+e["count"]);
        if(e["key"]==pKey){ 
          e["count"]=e["count"]+1;
          e["leftcount"]=e["leftcount"]+1;
          //console.log("inside if " + e["key"]+":count:"+e["count"]);
            bInclude = true;
        }
        else {
        }
      });

      return bInclude;
        
    },
    change:function(selector){
      //console.log(selector);
    },
    scroll(){
      $("#churchstime").scrollLeft(270);
    },
    fitlerCond(){
      var vm1 = this;
      this.clearKeyLeftCount1(this.langsinch);
      this.clearKeyLeftCount1(this.campusesinch);
      this.clearKeyLeftCount1(this.timespansinch);
      this.churches.forEach(function(e){
        if(!vm1.containKeyLeftCount(vm1.langsinch,e.Language)){
          //console.log("add key"+e.Language);
          //vm1.langsinch.push({"key":e.Language,"count":1});
        }

        if(!vm1.containKeyLeftCount(vm1.campusesinch,e.Campus)){
          //console.log("add key"+e.Campus);
          //vm1.campusesinch.push({"key":e.Campus,"count":1});
        }

        if(!vm1.containKeyLeftCount(vm1.timespansinch,e.TimeSpan)){
          //console.log("add key"+e.TimeSpan);
          //vm1.timespansinch.push({"key":e.TimeSpan,"count":1});
        }
      });
    }
  }//method()
}//script


</script>
                                                              






    