
<template>
  
  
  <div class="row segment intro">
    <p class="title"><span class="cn"> 寄语</span>|<span class="en">WELCOME</span></p>
    <p class="content"> 凡耶稣基督所吩咐我们的，都教训他们遵守”。 
    我们的异象是“在基督里建立一个充满活力、不断倍增的社群，
    使他能为基督拥抱和转变万国的人们去影响他们的城市、他们的国家、乃至全世界”。
    北京国际基督教教会希望为你提供一个安全的居所，在这里与神建立更亲密关系，
    与其他同生活在北京的人建立紧密的联系。
    请继续的了解更多关于这个教会的信息及如何在BICF这个大家庭中一同服侍神。</p>
    <div 
      class="col-lg-12" 
      style="margin-top: 40px;text-align: center;">
      <div class="col-lg-6"><p class="church-feature subtitle">9:00 AM</p><p class="content">时间: 每周日上午9:00<br>
        地点: 21世纪剧院主礼堂<br>
        每周日有主日学<br>
        联系方式: ims@bicf.org
      </p>
      </div>
      <div class="col-lg-6"><p class="church-feature subtitle">11:00 AM</p><p class="content">时间: 每周日上午11:00<br>
        地点: 21世纪剧院主礼堂<br>
        每周日有主日学<br>
        联系方式: ims@bicf.org</p></div>
       
    </div>

    <div 
      class="col-lg-12" 
      style="text-align: center;margin-top:40px">
      <ButtonLayout >
        <template slot="btncont">
          <router-link :to="'article?q=about-bicf&church=ims&lang=zh-CN'">About Us</router-link>
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
            
        }
    }

</script>
<style scoped>

.title{
  font-size : 3rem;
          letter-spacing: 1.5rem;
          color : #3C8C63;;
}
   .title .cn{
          margin-right: 1rem;
          
        }
  .title .en,.subtitle{
    font-family: MyriadPro-Bold;
    margin-left: 1rem;
    letter-spacing: 1px;
    font-size: 2rem;
    color : #3C8C63;


        }
        /*.subtitle{
          font-family: MyriadPro-Light;
          font-size: 2.5rem;
          color : #3C8C63;
        }*/
        .content{
          //font-family: Songti SC;
          font-size: 1.5rem;
          color : #000;
          font-weight: 100;
        }

        .intro {
          text-align: center;
        }
        
        .segment.intro{
          width: 54.37vw;
          margin:0 auto;
        }
        .segment.row{
          padding: 50px 0;
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
              font-family : MyriadPro-Light;
              font-size : 1.17vw;
              font-variant : small-caps;
              color : #FFFFFF;


        }
</style>

  