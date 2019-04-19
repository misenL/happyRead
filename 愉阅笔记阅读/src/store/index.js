import Vue from 'vue'
import Vuex from 'vuex'

import usermsg from './modules/usermsg'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        bookName:[{
            barr: '55555LMX'
        },{
            barr: '1354876'
        }]
    },
    modules:{
        usermsg
    },
    strict: process.env.NODE_ENV !== 'production' // 严格模式
})
