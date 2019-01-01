import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
// const Cfg = require('~/static/html/config.js')
import Locale from '~/locales'
Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
        pagedb: {
          churches:[],
          events: {
            list: [],
            total_pages: 0
          },
          theEvent: Object,
          sermon: {
            list: [],
            total_pages: 0
          },
          theSermon: Object,
          series:{
            list:[],
            total_pages: 0
          },
          theSeries:Object,
          teachers:{
            list:[],
            total_pages: 0
          },
          theTeacher:Object,
          ministries: {
            list:[],
            total_pages:0
          },
          theMinistry: Object,
          subChannels: [],
          eventBaseUrl:
            "http://47.95.199.234:8010/images/rseimgs/events/",
          ministryBaseUrl:`https://bicf.org/` ,
          menufixpoint: 134.7,
          article: {
            title:'',
            image_intro:'',
            image_fulltext:'',
            fulltext:'',
            introtext:''
          },
          home: {
            sublist:[],
          }
        },
        // HOST:Cfg.HOST,
        // APIHOST:Cfg.APIHOST,//{ DOMAIN: "http://localhost:8081", PORT: "" },//https://api.bicf.org
        // mst_api:Cfg.mst_api,//`http://127.0.0.1:83`,
    
        IMSMenuItem: {
          "brand":{ b: "BICF", url: "/" },
          "search":{ s: "search", url: "/" ,show:false},
          "about":{ m: "关于", url: "/article?q=about-bicf&church=ims&lang=zh-CN",q:'about-bicf'},
          "sermon":{ m: "讲道", url: "/sermons?church=ims" },
          "event":{ m: "活动", url: "/events?church=ims" },
          "ministry":{ m: "事工", url: "/ministries?church=ims" },
          "giving":{ m: "奉献", url: "/article?q=giving&&mn=ims&lang=zh-CN" },
          // "lang":{ lang: { en: "Eng", zh: "中" } }
        },
    
        HOMEMenuItem: {
          "BICF":{ b: "BICF", url: "/" },
          "search":{ s: "search", url: "/", show:false},
          "LOCATION":{
            m1: "LOCATION",
            url: "/location",
            submenu: {
              "21ST CENTURY":{
                sm1: "21ST CENTURY",
                submenu: {
                  "citychurch":{ sm: "CITY CHURCH", url: "/citychurch" },
                  "ims":{ sm: "IMS", url: "/ims" },
                  "aom":{ sm: "AOM", url: "/aom" },
                  "cantonese":{ sm: "CANTONESE", url: "/CANTONESE" },
                  "japanese":{ sm: "JAPANESE", url: "/JAPANESE" },
                  "filipino":{ sm: "FILIPINO", url: "/FILIPINO" }
                }
              },
              "ZGC":{
                sm1: "ZGC",
                url: "zgc",
                submenu: {
                  "ENGLISH":{ sm: "ENGLISH", url: "zgc/ENGLISH" },
                  "MANDARIN":{ sm: "MANDARIN", url: "zgc/MANDARIN" },
                  "KOREAN":{ sm: "KOREAN", url: "zgc/KOREAN" },
                  "CANTONESE":{ sm: "CANTONESE", url: "zgc/CANTONESE" },
                  "ACM":{ sm: "ACM", url: "zgc/ACM" },
                  "INDONESIAN":{ sm: "INDONESIAN", url: "zgc/INDONESIAN" },
                  "JAPANESE":{ sm: "JAPANESE", url: "zgc/JAPANESE" }
                }
              },
              "CBD":{ sm: "CBD", url: "/cbd" },
              "YIZHUANG":{ sm: "YIZHUANG", url: "/yizhuang" }
            }
          },
          "SERMON":{ m: "SERMON", url: "/sermons" },
          "EVENT":{ m: "EVENT", url: "/events" },
          "RESOURCES":{
            m1: "RESOURCES",
            url: "/resources",
            submenu: {
              fellowships:{
                sm: "International Christian Fellowships",
                url: "/article?q=international-fellowships", 
                q:"international-fellowships"
              },
              ThreeSelfChurches:{ sm: "Three-Self Churches", url: "/article?q=three-self-churches", q:"three-self-churches"},
              Downloads:{ sm: "Downloads", url: "/article?q=resources" , q:"resources"}
            }
          },
          GIVING:{ m: "GIVING", url: "/article?q=giving",q:"giving" },
          "lang":{ lang: { en: "Eng", zh: "中" } }
        },
        count: 0,
    
        footer: {
          title: "我们的联系方式",
          titlecn: "CONTACT",
          content: `北京市朝阳区亮马桥路40号<br>
    21世纪饭店2层FA201房间<br>
    邮编：100016<br>
    +86(10)8454 3468<br>
    办公时间: 周一 至 周五 (9:00 - 17:30)<br>
    根据政府的规定，我们的教会只向持有外国证件的人开放。谢谢你的理解！ `
        },
        debug: true,
        locales: ['en','zh'],
        locale: 'en'
      }
    ),
    mutations: {
      log(state, pStr) {
        if (state.debug) {
        }
      },
      setSubList(state,data){
        var kp = new Array();
        data.forEach(i => {
          kp.push({key:i.name,value:i.listid})
        });
        state.pagedb.home.sublist = kp
      },
      SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },
      setChurches(state,data){
        state.pagedb.churches = data
      }
      
    },
    getters: {
      getMenu: state => pRoute => {
        console.log('--------in getters-----------'+pRoute)
        var fp = pRoute.fullPath
        if (fp.indexOf("ims") >= 0 || pRoute.query.church == 'ims') {
          return state.IMSMenuItem;
        }
        return state.HOMEMenuItem;
      },
      getChurchByKey: state => key => {
        var retVal = undefined
        state.pagedb.churches.forEach(function(e){
          if(e.key == key){
            retVal = e
          }
        })
        console.log(retVal)
        return retVal
      },

    },
    actions
  })
}

export default createStore

