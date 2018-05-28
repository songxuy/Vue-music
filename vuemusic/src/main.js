// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import list from './components/list'
import player from './components/player'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(VueRouter)
/* eslint-disable no-new */
const store=new Vuex.Store({
      state:{
        musiclist:[]
      },
      mutations:{
        INITMUSIC(state,data){
          state.musiclist = data;
        }
      }
})
const router = new VueRouter({
	routes:[
	{
		path:"/list",component:list
	},
	{
		path:"/item/:id",component:player
	}
	],
	mode:"history"//干掉路有中的#
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
