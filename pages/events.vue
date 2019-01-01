<template>
  <PageLayout>
    <template slot="pagecont1">
      <MenuMod 
        :fixhover="true" 
        :nobg="true" />
      <banner 
        :title="''"
        :pagehint="''" 
        style="margin-top: 48px;">
        <template slot="bgimg">
          <div 
            :style="{ backgroundImage: 'url(/html/images/shepherd.jpg)' }" 
            class="" 
            style="height:50vh;background-position: center;background-repeat: no-repeat;background-size: cover;" />
        </template>
      </banner>
      <ModLayout style="background-color: #28343b;">
        <template slot="modcont1">
          <div class="mdrow header">
            <p 
              class="title" 
              style="color:#fff;"><span class="cn">活动</span>|<span class="en">MINISTRY</span></p>
            <p 
              class="content" 
              style="color:#fff;">凡耶稣基督所吩咐我们的，都教训他们遵守”。 
              我们的异象是“在基督里建立一个充满活力、不断倍增的社群，</p>
          </div>
                
          <TimeLine 
            :list="events4timeLine" 
            :pagepath="'event'" 
            :image-base-url="'eventBaseUrl'" 
            style="margin-top:40px;"/>
        </template>
      </ModLayout>
      <vpage 
        :setting="pageSet" 
        class="paging" 
        style="text-align: center;" 
        @page-change="pageChange"/>
      
      <pagefooter  
        :title="footer.title"
        :content="footer.content"
        style="margin-top: 0px;"
      />
    </template>
  </PageLayout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Events",
  components: {
  },
  data() {
    return {
      size: 10,
      from: 1
    };
  },
  computed: {
    ...mapState({
      IMSMenuItem: state => state.IMSMenuItem,
      events: state => state.pagedb.events,
      footer: state => state.footer
    }),

    pageSet() {
      return {
        totalRow: 0, //required option
        language: "en", //default: 'cn'
        pageSizeMenu: [10, 20, 50, 100], //default: [10, 20, 50, 100]
        backColor: "dark",
        totalPage: this.events.total_pages
      };
    },

    events4timeLine: function() {
      var aV = this;
      this.events.list.forEach(function(e) {
        e.tltitle = e.title;
        if((e.summary || "")!=""){
          e.tlintro = e.summary
        }else{
          e.tlintro = e.content.replace(/<[^>]+>/g,"")
          e.tlintro = aV.sword(e.tlintro, 120)
        }
      });
      console.log('-------event page events4timeLine--------')
      console.log(this.events.list)
      return this.events.list;
    },
  },

  watch: {
    events(oldv, newv) {
      // console.log(newv) ;
      //this.pageSet.totalRow = newv.totalpage*this.size;
    }
  },
  mounted() {
    this.$store
      .dispatch(
        "getEvents",
        this.getParams({
          church: this.$route.query.church,
          page_size: this.size,
          start: this.from
        })
      )
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  },

  methods: {
    sword(text,len) {
      //如果要截取文本的长度小于或者等于要截取的长度，则不进行截取，直接返回文本
      if(text.length < len) {
          return text;
      } else {
          text = text.substr(0,len);
          //       以空格切分字符串
          var textArr = text.split(" ");
          //           最后一个字符长度
          var lastLen = textArr.pop().length;
          if(lastLen > 3) {
              return text.substr(0,text.length-lastLen-1)+' ...';
          } else if(lastLen === 3 ){
              return text;
          }else{
              var lastTwoLen =  textArr[textArr.length - 1].length;
              return text.substr(0,text.length-lastLen-lastTwoLen-2)+' ...';
          }
      }
    },
    getParams(pars) {
      var arr = this.$route.fullPath.split("/");
      if (arr.length > 3) {
        pars.church = arr[1];
      }
      return pars;
    },
    pageChange(pInfo) {
      let that = this;
      console.log(pInfo); //{pageNumber: 1, pageSize: 10}

      this.$store.dispatch(
        "getEvents",
        this.getParams({
          church: this.$route.query.church,
          page_size: pInfo.pageSize,
          start: (pInfo.pageNumber - 1) * pInfo.pageSize + 1
        })
      );

    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/var";
.paging {
  // padding: 40px;
  background: @footerbg;
}


.title {
  font-size: 3rem;
  text-align: center;
  color: #3b8c63;
}
.title .cn {
  /*margin-right: 3rem;*/
  letter-spacing: 1.5rem;
}
.title .en {
  font-family: MyriadPro-Bold;
  margin-left: 2rem;
  font-size: 2rem;
  letter-spacing: 1px;
}

</style>







