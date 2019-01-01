<template>
  <PageLayout >
    <template slot="pagecont1" >
      <MenuMod 
        :fixhover="true" 
        :nobg="true"/>
      <div 
        class="container" 
        style="background-color: #00000000;">
        <div class="drow header">
          <div class="col-lg-10 col-lg-offset-1">
            <div class="title" >{{ info.title }}</div>
            <div class="date" >{{ info.datefrom+'~'+info.dateto }}</div>
            <div class="clearfix"/>
            <img 
              :src="imageUrl+info.image" 
              class="image">
            <div 
              ref="contdiv" 
              class="content" 
              v-html="info.content"/>
          </div>
        </div>
      </div>

      <pagefooter  
        :title="footer.title"
        :content="footer.content"/>

       
    </template>
  </PageLayout>
</template>

<script>

const axios = require("axios");
import { mapState } from 'vuex'
export default {
        name:"Event",

        components: {
        },
        data() {
          return {
            info:{}
          }
        },
        computed: {
            ...mapState({
                IMSMenuItem: state => state.IMSMenuItem,
                events: state => state.pagedb.events,
                footer: state => state.footer,
                imageUrl: state => state.pagedb.eventBaseUrl,
            }),

            getMenu:function(){
              return this.$store.getters.getMenu(this.$route.fullPath);
            },
        },
        created(){
          this.getInfo(this.$route.query.id)
        },
        methods:{
          async getInfo(id=this.$route.query.id){
              var api  = `${this.$store.state.APIHOST.DOMAIN}/event/${id}`;//eg:id=12
              var response = await axios.get(api);
              console.log(response);
              if(response!=undefined && response.data.message=="Success"){
                this.info = response.data.data;
                console.log(this.info);
              }
          }
          
        }

       
      }
</script>
<style scoped>


  .title{
              font-size : 3rem;
              text-align: center;
              color:#3b8c63;
              font-family: MyriadPro-Bold;
          }
         .title .cn{
              margin-right: 3rem;
                
              }
        .title .en{
                font-family: MyriadPro-Bold;
                margin-left:2rem;
              }

        .date{
          font-size:1.5rem;
          line-height: 1.5em;
          float:left;
          color: #28343b;
          margin-top: 40px
        }
        .image{
          width:100%;
          margin-top: 10px;
          min-height: 100px;
        }
        .content{
          font-size: 1.5rem;
          color: #28343b;
          text-align: left;
          line-height:2rem;
          margin-top: 40px;
          overflow-wrap:break-word;
        }
       

	
</style>






