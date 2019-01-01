<template>
  <div 
    class="container-fluid" 
    style="background-color:#fff;padding: 0;">
    <div 
      v-for="ii in 10" 
      :key="ii">
      <div 
        v-if="listCompu.length>=ii" 
        class="drow ">
        <div 
          :class="{ 'right':!isOdd(ii) }" 
          class="image col-lg-6 " >
          <div 
            :style="{ backgroundImage: 'url(' + getImageFullPath(listCompu[ii-1].image) + ')' }" 
            class="ms-info content" 
            style="background-position: center;background-repeat: no-repeat;" />
        </div>  
        <div class="info col-lg-6" >
          <div class="ms-intro">
            <div class="inner">
              <p class="title">
                <a :href="getlink(ii-1)" >{{ ($route.query.lang || 'en') == 'en' ? listCompu[ii-1].tltitle.split('|')[0]:listCompu[ii-1].tltitle.split('|')[1] }}</a>  
              </p><hr>
              <p 
                class="desc" 
                v-html="listCompu[ii-1].tlintro"/>

              <ButtonLayout style="margin-top:20px">
                <template slot="btncont">
                  <a :href="getlink(ii-1)" >See All</a>  
                <!-- <router-link :to="getlink(ii)">See All</router-link> -->
                </template>
              </ButtonLayout>
              <!-- <buttonLay slot="btncont" style="width: 10rem;" :isinline='true' :link='getlink(ii)'>
                                <template slot="btncont">
                                  see all
                                </template>
                              
                              </buttonLay> -->
            </div>
          </div>
        </div>
            
      </div>
    </div>



  </div>
</template>
<script scoped>
// import buttonLay from '@/common/buttonlayout.vue'
export default {
  components: {
    // 'buttonLay':buttonLay,
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    pagepath: {
      type:String,
      default:""
    },
    imageBaseUrl: {
      type:String,
      default:""
    }
  },
  data() {
    return {
      test: false
    };
  },

  computed: {
    listCompu() {
      console.log(this.list)
      return this.list;
    }
  },
  methods: {
    isOdd(ii) {
      //console.log(ii);
      return ii & (1 > 0) ? true : false;
    },
    getlink(ii) {
      if (this.listCompu.length <= ii) {
        return "/" + this.pagepath + "?id=0";
      }
      if( /=$/.test(this.pagepath) ){
        if((this.$route.query||{}).church != undefined){
          return `/${this.pagepath}${this.listCompu[ii].id}&church=${this.$route.query.church}`
        } else {
          return "/" + this.pagepath + "?id=" + this.listCompu[ii].id;
        }
      }
    },
    getImageFullPath(imgFile) {
      console.log('this.imageBaseUrl------'+this.imageBaseUrl)
      var retUrl = ""
      if (this.imageBaseUrl == "eventBaseUrl") {
        retUrl = this.$store.state.pagedb.eventBaseUrl + imgFile;
      } else if (this.imageBaseUrl == "ministryBaseUrl") {
        retUrl = this.$store.state.pagedb.ministryBaseUrl + imgFile;
      } else {
        retUrl = imgFile;
      }
      console.log(retUrl)
      return  retUrl;
    }
  }
};
</script>

<style lang='less' scoped>
.container,
.row {
  margin: 0;
  padding: 0;
}

.image {
  margin: 0;
  padding: 0;
  .ms-info {
    height: 34rem;
    position: relative;
    background-size: cover;
  }
}
.info {
  height: 34rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .ms-intro {
    // left: 50%;
    // transform: translate(-50%, -50%);
    // top: 50%;
    // position: absolute;
    // overflow: hidden;

    width: 100%;
    .inner {
      margin: auto;
      border-radius: 2rem;
      width: 80%;
      height: 20rem; /*need calc*/
      color: #000;
      text-align: left;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .title {
      font-size: 2.5rem;
      overflow: hidden;
    }
    .desc {
      font-size: 2.07rem;
      line-height: 1.25em;
      overflow: hidden;
      height: 4em;
    }
  }
}

.left {
  float: left;
}
.right {
  float: right;
}
</style>






    