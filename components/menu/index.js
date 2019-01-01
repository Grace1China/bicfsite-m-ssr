import Vue from 'vue'
Vue.component('MenuMod', () => import('./menu.vue'))
Vue.component('MenuModSub', () => import('./menu_li_submenu.vue'))
Vue.component('MenuModSubSub', () => import('./menu_li_submenu_subm.vue'))
// export default {
//     MenuMod: './menu.vue',
//     MenuModSub:'./menu_li_submenu.vue',
//     MenuModSubSub:'./menu_li_submenu_subm.vue'
// }
