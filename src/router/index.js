import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Regist from '../views/Regist'
import none from '../views/none'
import error from '../views/error'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {

return originalPush.call(this, location).catch(err => err)

}

const routes = [
  {
    path: '/',
	redirect:'/Login'
  },
 {
	 path:'/Login',
	 name:'登录',
	 component:Login
 },
 {
 	 path:'/home',
 	 name:'主页',
 	 component:Home
 },
 {
	 path:'/Regist',
	 name:'注册',
	 component:Regist
 },
 {
   path: '/404',
   name: '404',
   component: none,
 },
  { 
 	   path: '*',
 	   name:'error',
 	   component:error
 	   }
 
]

const router = new VueRouter({
  routes
})

export default router
