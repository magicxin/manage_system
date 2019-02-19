import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import signin from '@/pages/signin'
import home from '@/pages/home'
import news from '@/pages/news'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'*',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        auth:false,
        keepAlive: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin,
      meta: {
        auth:false,
        keepAlive: false
      }
    },
    {
      path: '/',
      component: home,
      redirect: '/home',
      meta: {
        auth:true,
        keepAlive: false
      },
      children:[{
        path: 'home',
        name: 'home',
        component: news,
        meta: {
          auth:true,
          keepAlive: false
        }
      }]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.meta.auth) {
    if(window.localStorage.getItem('token')) {
      next()
    }else {
      next('login')
    }
  }else{
    next()
  }
})

export default router;

