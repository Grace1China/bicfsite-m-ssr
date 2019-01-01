
<template>
  <div class="row segment intro">
    <parTitle :item="'Welcome'" />
    <parContent >
      <template slot="pcont1">
        Beijing International Christian Fellowship is a family of churches and believers from over 70 nations gathering at various locations around the city of Beijing. No matter where or when you join us, you'll find friendly people excited to welcome you into our growing fellowship.
      </template>
    </parContent>
    <div 
      class="col-lg-12" 
      style="margin-top: 40px;text-align: center;">
      <div class="col-lg-3">
        <p class="church-feature subtitle">15+</p>
        <parContent ><template slot="pcont1">Churches</template></parContent>
        <parContent ><template slot="pcont1">Exalting Jesus</template></parContent>
      </div>
      <div class="col-lg-3">
        <p class="church-feature subtitle">70+</p>
        <parContent ><template slot="pcont1">Nations United</template></parContent>
        <parContent ><template slot="pcont1">in Worship</template></parContent>
      </div>
      <div class="col-lg-3">
        <p class="church-feature subtitle">1000+</p>
        <parContent ><template slot="pcont1">People</template></parContent>
        <parContent ><template slot="pcont1">Sent Yearly</template></parContent>
      </div>
      <div class="col-lg-3">
        <p class="church-feature subtitle">3000+</p>
        <parContent ><template slot="pcont1">People</template></parContent>
        <parContent ><template slot="pcont1">Impacted Weekly</template></parContent>
      </div>
    </div>

    <div 
      class="col-lg-12" 
      style="text-align: center;
      padding: 40px 0 0 0;">
      <ButtonLayout :isinline="true" >
        <template slot="btncont">
          About Us
        </template>
      </ButtonLayout>
    </div>
  </div>
</template>
<script>
 export default {
        props: {
            
        },
        data() {
            return {
                churches1:[],
            }
        },

        mounted() {
            
        },

        methods: {
          log(){
            console.log(1);
          }
        }
    }

</script>
<style scoped>
   .title{
          font-family: MyriadPro-Bold;
          font-size : 6.56rem;
          color : #3C8C63;;
        }
        .subtitle{
          font-family: MyriadPro-Bold;
          font-size: 3.73rem;
          color : #3C8C63;
        }
        .content{
          font-family: MyriadPro-Regular;
          font-size: 2.48rem;
          color : #000;
        }

        .intro {
          text-align: center;
        }
        
        .segment.intro{
          width: 54.37vw;
          margin:0 auto;
        }
        .segment.row{
          padding: 50px 0
        }

        .segment button{
            background : gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
            background : -moz-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
            background : -webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) ));
            background : -o-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(0, 167, 107, 1) ),color-stop(0.5357,rgba(57, 151, 103, 1) ),color-stop(1,rgba(56, 138, 98, 1) )); 
              border-radius : 10px;
              -moz-border-radius : 10px;
              -webkit-border-radius : 10px;
              padding: 0 15px;
              font-family : MyriadPro Light;
              font-size : 1.17vw;
              font-variant : small-caps;
              color : #FFFFFF;


        }
</style>

  