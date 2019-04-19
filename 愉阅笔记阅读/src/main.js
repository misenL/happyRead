// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import {Range} from 'mint-ui'
import  { 
  Tabbar, TabbarItem, Search, Group, Panel, Cell, CellBox, XImg
		} from 'vux'
import OIcon from './components/o-icon.vue'
import OHeader from './components/o-header.vue'
import XPanel from './components/x-panel.vue'
import panelGroup from './components/panel-group.vue'

import axios from 'axios'

import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex)

Vue.use(VueRouter)
Vue.use(VueResource)

import store from './store'

Vue.config.productionTip = false
Vue.prototype.HOST = 'http://localhost:3000/'

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.component('OHeader', OHeader)
Vue.component('OIcon', OIcon)
Vue.component('XPanel', XPanel)
Vue.component('panelGroup', panelGroup)
Vue.component('search', Search)
Vue.component('group', Group)
Vue.component('panel', Panel)
Vue.component('cell', Cell)
Vue.component('cell-box', CellBox)
Vue.component('x-img', XImg)
// Vue.component('Popup', Popup);
Vue.component(Range.name, Range);
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
