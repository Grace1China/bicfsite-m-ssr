import Vue from 'vue'
//import 'vue-plyr'
import VueI18n from 'vue-i18n'
import { stringify } from 'querystring';
Vue.use('VueI18n')


Vue.component('Agile', () => import('~/components/base/Agile.vue'))
Vue.component('ButtonLayout', () => import('~/components/base/buttonlayout.vue'))
Vue.component('icon', () => import('~/components/base/icon.vue'))

Vue.component('ModLayout', () => import('~/components/base/modlayout.vue'))
Vue.component('pButn', () => import('~/components/base/parButton.vue'))
Vue.component('parContent', () => import('~/components/base/parContent.vue'))

Vue.component('parTitle', () => import('~/components/base/parTitle.vue'))
Vue.component('pTtt', () => import('~/components/base/parTitleTemp.vue'))
// Vue.component('VideoCousre', () => import('~/components/base/VideoCousre.vue'))
Vue.component('PageLayout', () => import('~/components/base/pagelayout.vue'))
Vue.component('TimeLine', () => import('~/components/base/TimeLine.vue'))


// Vue.component('banner', () => import('./banner'))
Vue.component('centerinfo', () => import('~/components/base/centerinfo'))
Vue.component('gridList', () => import('~/components/base/gridList'))
Vue.component('SermonList', () => import('~/components/base/SermonList'))
Vue.component('TimeLine', () => import('~/components/base/TimeLine'))
Vue.component('pagefooter', () => import('~/components/base/footer'))

Vue.component('vpage', () => import('~/components/base/paging/index.vue'))

Vue.component('MenuMod', () => import('~/components/menu/menu.vue'))
Vue.component('banner', () => import('~/components/base/banner.vue'))

// Vue.component('loadstore', () => import('~/components/base/loadstore.vue'))

import {APIHOST,HOST,mst_api} from '~/static/html/config.js'

Vue.filter('toDate', function (value) {
    // 返回处理后的值
    if(value == "" || value == undefined){
        return ""
    }
    // console.log(value)
    var d = new Date(value)
    return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`

  })

















