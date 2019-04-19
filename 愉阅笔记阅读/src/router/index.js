import Vue from 'vue'
import Router from 'vue-router'
import pageIndex from '../page/index'
import pageHome from '../page/home'
import pageClass from '../page/class'
import pagePersonal from '../page/personal'
import pageShelf from '../page/shelf'
import reader from '../page/reader.vue'
import search from '../page/search-result.vue'
import myLogin from '../page/login'
import myReg from '../page/reg'
import myOperation from '../page/operation'
import myModify from '../page/modify'


Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: {
				name: 'index'
			}
		},
		{
			path: '/reader/:ids/:chapter',
			name: 'reader',
			component: reader
		},
		{
			path: '/operation/:ids',
			name: 'operation',
			component: myOperation
		},
		{
			path: '/index',
			name: 'index',
			component: pageIndex,
			redirect: {
				name: 'home'
			},
			children: [
				{
					path: 'home',
					name: 'home',
					component: pageHome
				},
				{
					path: 'class',
					name: 'class',
					component: pageClass
				},
				{
					path: 'shelf',
					name: 'shelf',
					component: pageShelf
				},
				{
					path: 'personal',
					name: 'personal',
					component: pagePersonal
				},
				{
					path: 'login',
					name: 'login',
					component: myLogin
				},
				{
					path: 'reg',
					name: 'reg',
					component: myReg
				},
				{
					path: 'modify',
					name: 'modify',
					component: myModify
				}
			]
		},
		{
			path: '/search/:value',
			name: 'search',
			component: search
		}
	]
})
