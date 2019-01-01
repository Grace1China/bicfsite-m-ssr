<template>
  <div class="row aboutus">
    <div class="inner">
      <div style="text-align: center;">
        <parTitle 
          :item="'Contact Us'" 
          :colorexpr="'#fff'"/>
        <parContent style="color:#fff;">
          <template slot="pcont1">
            Beijing International Christian Fellowship is a family of churches and believers from over <br>70 nations gathering at various locations around the city of Beijing.
          </template>
        </parContent>
      </div>
      <div 
        class="container" 
        style="display: inline-block;">
        <el-alert 
          v-if="(info != '' || error != '')"
          :title="(info==''?error:info)"
          :type="alerttype"
          :closable="true"
          center
          show-icon/>
        <div class="row" ><!-- style="margin-top:4.375rem" -->
          <div class="col-lg-4"><div><input 
            v-model="name"
            style="width: 100%" 
            type="text" 
            placeholder="Name" 
            aria-describedby="basic-addon2"></div>
          </div>
          <div class="col-lg-4"><div class="leftmargindiv"><input 
            v-model="email"
            style="width: 100%" 
            type="text" 
            placeholder="Email" 
            aria-describedby="basic-addon2"></div>
          </div>
          <div class="col-lg-4"><div class="leftmargindiv"><input 
            v-model="phone"
            style="width: 100%" 
            type="text" 
            placeholder="Phone" 
            aria-describedby="basic-addon2"></div>
          </div>
        </div>
        <div class="row" ><!-- style="margin-top:3.625rem" -->
          <textarea 
            v-model="content"
            style="width: 100%" 
            rows="9" 
            placeholder="Message"/>
        </div>
        <div 
          class="btnRow" 
          style="margin-top:20px"
          @click="sendmail">
          <ButtonLayout>
            <template slot="btncont">
              Send
            </template>
          </ButtonLayout>
          <!-- <ButtonLayout style="margin-left:20px;">
            <template slot="btncont">
              Clear
            </template>
          </ButtonLayout> -->
        </div>

      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
export default {
        props: {
           
        },
        data() {
            return {
                test:'',
                name:'',
                email:'',
                phone:'',
                content:'',
                error:"",
                info:"",
                alerttype:""
            }
        },

        mounted() {
            
        },

        methods: {
          async sendmail(){
            var data = {'name':this.name,'email':this.email,'phone':this.phone,'content':this.content}
            console.log(data)

            var vm_ = this
            axios.post(`${this.$store.state.APIHOST.DOMAIN}/contact`,data)
            .then(function(response) {
              console.log(response.data);
              if ( (response.data.message == "Success" ) && response.data.data != undefined ) {
                vm_.info = "You mail has send to BICF,we will reply ASAP."
                vm_.error = ""
                vm_.alerttype = "success"
              } else {
                // context.state.pagedb.article = "";
              }
              return response;
            })
            .catch(function(error) {
              vm_.error=error.response.data.message
              vm_.info = ""
              vm_.alerttype = "error"
              return error;
            })
            .then(function(response) {
              // vm_.error=error
              // vm_.info = ""
              // vm_.alerttype = "error"
              console.log('-------finall then--------------')
              console.log(response)
              return response;
            });
            // try {
            //   let rsp = await axios.post(`${this.$store.state.APIHOST.DOMAIN}/contact`,data)//https://api.bicf.org
            // console.log(rsp)
            //   if(rsp.status != 200){
            //     this.error=rsp.message
            //     this.info = ""
            //     this.alerttype = "error"
            //     //open2(rsp.data.msg,'warning')
            //   } else {
            //   //this.open2(rsp.data.msg,'success')
            //   }
            // } catch (error) {
            //   console.log(error)
            // }
            
          }
        }
    }



</script>
<style scoped lang="less">
          .container{
            margin: 0;
            width: 50%;
            .row{
              margin: 0;
              margin-top:20px;
              
            }
          }

          @media (min-width: 1199.98px) { 
              .leftmargindiv{
              margin-left: 1.775rem !important;
            }
          }
          @media (max-width: 1199.98px) { 
              .leftmargindiv{
              margin-left: 0rem !important;
              margin-top: 5px;
            }
          }
         
          input{
            BACKGROUND-COLOR: transparent;
            color:#fff;
            height: 3.725rem;
            border:1px solid #fff;
            border-radius: 0.625rem;
            font-family: MyriadPro-light;
            font-size : 1.5rem;
            padding-left: 0.5em;
          }

          textarea{
            width: 20.55rem;
            BACKGROUND-COLOR: transparent;
            color:#fff;
            border:1px solid #fff;
            border-radius: 0.625rem;
            font-family: MyriadPro-light;
            padding-left: 0.5em;
            font-size : 1.5rem;
          }

          ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            //margin-left:0.375rem;
            //padding-left:0.375rem;
            font-size : 1.5rem;
            color: #fff;
          }
          ::-moz-placeholder { /* Firefox 19+ */
            font-size : 1.5rem;
            color: #fff;
          }
          :-ms-input-placeholder { /* IE 10+ */
            font-size : 1.5rem;
            color: #fff;
          }
          :-moz-placeholder { /* Firefox 18- */
            font-size : 1.5rem;
            color: #fff;
          }
input:focus::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0);
}

input:focus:-moz-placeholder {
    color: rgba(255, 255, 255, 0);
}
input:focus:-moz-placeholder {
    color: rgba(255, 255, 255, 0);
}

input:focus::-moz-placeholder {
    color: rgba(255, 255, 255, 0);
}
input:focus::-moz-placeholder {
    color: rgba(255, 255, 255, 0);
}

input:focus:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0);
}
input:focus:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0);
}




textarea:focus::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0);
}

textarea:focus:-moz-placeholder {
    color: rgba(255, 255, 255, 0);
}
textarea:focus:-moz-placeholder {
    color: rgba(255, 255, 255, 0);
}

textarea:focus::-moz-placeholder {
    color: rgba(255, 255, 255, 0);
}
textarea:focus::-moz-placeholder {
    color: rgba(255, 255, 255, 0);
}

textarea:focus:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0);
}
textarea:focus:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0);
}

          .aboutus button{
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

          .aboutus{
            text-align: center;
            margin: 0;
            padding: 50px 0;
           
            background: url("~assets/romans-PSD.jpg") center;
            background-size: cover;
            .inner{
                /*width: 80rem;*/
                 margin:auto;
                
            }
            color:#fff;
          }
        .title{
          font-family: Myriad Bold;
          font-size : 4vw;
          letter-spacing: -0.392vw;
          color : #fff;;
        }
        

        .intro {
          text-align: center;
        }
        
        
        .aboutus .col-lg-4{
          padding:0;
        }

        .btnRow{
          display:inline-flex;
          justify-content: flex-end;
          float:right;
        }
       

  
  
</style>
  