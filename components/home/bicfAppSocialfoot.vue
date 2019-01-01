<template>
  <div style="">
    <div class="row bicfapp" >
      <div class="layoutwrap">
        <parTitle :item="'BICF App'"/>
        <parContent style="width: 80vw;display: inline-block;" >
          <template slot="pcont1">
            Welcome to the official BICF App! When you download and use this Free App, you’re a swipe and tap away from our Sunday messages, the church calendar, Give, Social Media and much more!people
          </template>
        </parContent>
      </div>
      <div class="container" >
        <div class="row">
          <div class="col-lg-3"><a href=""><div><div 
            class="gstore" 
            style="width: 7.4rem;height: 7.4rem;margin: 0 auto 0;"/></div></a>
          </div>
          <div class="col-lg-3"><a href=""><div><div 
            class="wstore" 
            style="width: 7.4rem;height: 7.4rem; margin: 0 auto 0;"/></div></a>
          </div>
          <div class="col-lg-3"><a href=""><div><div 
            class="zstore" 
            style="width: 7.4rem;height: 7.4rem;margin: 0 auto 0; "/></div></a>
          </div>
          <div class="col-lg-3"><a href=""><div><div 
            class="apstore" 
            style="width: 7.4rem;height: 7.4rem;margin: 0 auto 0;"/></div></a>
          </div>
        </div>
      </div>
      <div >

        <div class="content">

          <parContent 
            style="display: inline;"
          >
            <template slot="pcont1">
              If you can't open Google Play, you can download it directly from here:
              
            </template>
          </parContent>

          <ButtonLayout style="margin-left: 0.5em;display: inline-block;">
            <template slot="btncont">
              download
            </template>
          </ButtonLayout>
        </div>
      </div>

    </div>

    <div class="row social" >
        
      <parContent style="display: inline;color:#fff;">
        <template slot="pcont1">
          FOLLOW US ON SOCIAL
        </template>
      </parContent>
        
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <a href="">
              <div>
                <div 
                  class="fbsocial" 
                  style="width: 3.7rem;height: 3.7rem;margin: 0 auto 0;"/>
              </div>
            </a>
          </div>
          <div class="col-lg-6"><a href="">
            <div>
              <div 
                class="wcsocial" 
                style="width: 3.7rem;height: 3.7rem;margin: 0 auto 0;"/>
              <div 
                class="wechatcode" 
                style="width: 13.2rem;height: 13.2rem;margin: 3.35rem auto 0;"/>
            </div>
          </a>
          </div>
        </div>
      </div>
        
    </div>

    <div class="row footer" >
      
      <parContent >
        <template slot="pcont1">
          BICF © 2018 Privacy Policy 京ICP备08101490号-1
        </template>
      </parContent>
    </div>
  </div>
</template>
<script>

 export default {
        props: {
           
        },
        data() {
            return {
                test:'',
            }
        },

        mounted() {
            
        },

        methods: {
         
        }
    }



</script>
<style lang='less' scoped>

  .row{
    margin: 0;
    
  }
  .wechatcode{
    background: url('~assets/CityChurch-QR.jpg') center;
    background-size: cover;
  }

  .apstore{
   background: url("~assets/apple-dark.png") center;
            background-size: cover;
  }
  .apstore:hover{
    background: url("~assets/apple-light.png") center;
            background-size: cover;
  }



  .gstore{
   background: url("~assets/google-dark.jpg") center;
            background-size: cover;
  }
  .gstore:hover{
    background: url("~assets/google-light.jpg") center;
            background-size: cover;
  }

  .wstore{
   background: url("~assets/win-dark.png") center;
            background-size: cover;
  }
  .wstore:hover{
    background: url("~assets/win-light.png") center;
            background-size: cover;
  }
  .zstore{
   background: url("~assets/amazon-dark.png") center;
            background-size: cover;
  }
  .zstore:hover{
    background: url("~assets/amazon-light.png") center;
            background-size: cover;
  }

  .bicfapp {

    text-align:center;
    margin:50px auto;

    /*.layoutwrap{
      height: 20em;
    }*/

    .layoutwrap{
      position: relative;
    }
    .container{
      padding-top: 40px;
    }

  }

  

  .title{
    font-family: Myriad Bold;
    font-size : 6.56rem;
    letter-spacing: -0.392vw;
    color : #3C8C63;;
  }
  .subtitle{
    font-family: MyriadPro Light;
    font-size: 2.4vw;
    color : #3C8C63;
  }

  .content{
    font-family: MyriadPro Light;
    font-size: 2.48rem;
    color: #000;
    margin-top: 40px;
    /* position: absolute; */
    /* width: 80%; */
    /* left: 50%; */
    /* margin-left: -40%; */

  }


.social{
  background: #271a20;
  color:#fff;
  text-align: center;
  padding: 50px 0;
  .container{
      width: 40%;
      margin: 40px auto 0;
  }
}
.fbsocial{
   background: url("~assets/facebook-dark.png") center;
            background-size: cover;
  }
  .fbsocial:hover{
    background: url("~assets/facebook-light.png") center;
            background-size: cover;
  }

  .wcsocial{
   background: url("~assets/wechat-dark.png") center;
            background-size: cover;
  }
  .wcsocial:hover{
    background: url("~assets/wechat-light.png") center;
            background-size: cover;
  }

  .footer{
    text-align: center;
    margin: 50px 0;
  }
  
</style>
  