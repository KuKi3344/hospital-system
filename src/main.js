import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SlideVerify from 'vue-monoplasty-slide-verify';
import VueParticles from 'vue-particles';
// import store from './store';
// import {initMenu} from './utils/menus';
import axios from 'axios'
import {
	getCookieValue,
	setCookieValue,
	clearCookie
}from './assets/js/cookie_utils'
import{
		getRequest,
		putRequest,
		deleteRequest,
		postRequest
	}from './utils/api'
Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.use(SlideVerify)
Vue.config.productionTip = false;
Vue.prototype.$axios=axios


//为了全局使用封装的请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;


Vue.prototype.getCookieValue = getCookieValue;
Vue.prototype.setCookieValue =setCookieValue;
Vue.prototype.clearCookie = clearCookie;

//准备一个路由前置导航守卫
router.beforeEach((to,from,next)=>{
	//如果有token，不拦截
	if(getCookieValue("oars-token")){
		// initMenu(router,store);
		//通过前置路由守卫获取用户信息
			//判断用户信息是否存在不存在就去获取
			if(!getCookieValue("user")){
				next({ path: '/Login' })
			}
		next();
	}else{
		//如果没有token就拦截，如果去登录页面不拦截，如果去别的就给调到404页面
		if(to.path=='/'||to.path=='/Login'||to.path=='/404'||to.path=='/Regist'){
			next();
		}
		else{
			next({ path: '/404' })
		}
	}
	next();
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')