// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/css/normalize.css'
import '@/css/reset.css'
import 'element-ui/lib/theme-chalk/display.css'
import config from '../config'
import utils from 'utils/rest'
import store from 'store/store'

import ElementUI from 'element-ui';
Vue.use(ElementUI)

Vue.config.productionTip = false
if(process.env.NODE_ENV==='development' && config.dev.mock) {
  let Mock = require('mockjs')
  Vue.$mock = Vue.prototype.$mock = Mock
  require('./mock')
}

Vue.mixin({
  methods:{
    cw() {
      return window.innerWidth
    }
  }
})
Vue.directive('title', {
  componentUpdated: function (el, binding) {
    document.title = binding.value
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>',
  data(){
    return {
      screenWidth: document.body.clientWidth,
      timer:false
    }
  },
  watch: {
      screenWidth(val) {
        if(!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function() {
            that.timer = false
          }, 400)
        }
      }
    },
    mounted() {
      const that = this
      window.onresize = () => {
        that.screenWidth = document.body.clientWidth
      }
    },  
})
