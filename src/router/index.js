import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import signin from '@/pages/signin'
import home from '@/pages/home'
import house from '@/pages/house'
import tofix from '@/pages/tofix'
import auth from '@/pages/admin/auth'
import user from '@/pages/admin/user'
import userInfo from '@/pages/admin/user-info'
import resetPassword from '@/pages/admin/reset-password'
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
        path: '/home',
        name: 'home',
        component: news,
        meta: {
          auth:true,
          keepAlive: false
        }
      },{
        path: '/house',
        name: 'house',
        component: house,
        meta: {
          auth:true,
          keepAlive: false
        }
      },{
        path: '/tofix',
        name: 'tofix',
        component: tofix,
        meta: {
          auth:true,
          keepAlive: false
        }
      },{
        path: '/auth',
        name: 'auth',
        component: auth,
        meta: {
          auth:true,
          keepAlive: false
        }
      },{
        path: '/user',
        name: 'user',
        component: user,
        meta: {
          auth:true,
          keepAlive: false
        },
        children:[{
          path: '/user/user_info',
          name: 'user_info',
          component: userInfo,
          meta: {
            auth:true,
            keepAlive: false
          }
        },{
          path: '/user/reset_password',
          name: 'reset_password',
          component: resetPassword,
          meta: {
            auth:true,
            keepAlive: false
          }
        }]
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

