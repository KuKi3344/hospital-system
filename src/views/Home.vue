<template>
	<div class="main">
		<vue-particles color="#76aed3" :particleOpacity="0.7" :particlesNumber="50" shapeType="triangle"
			:particleSize="3.5" linesColor="#a0d7f9" :linesWidth="1.5" :lineLinked="true" :lineOpacity="0.7"
			:linesDistance="100" :moveSpeed="3" :hoverEffect="false" hoverMode="grab" :clickEffect="false"
			clickMode="push" class="lizi">
		</vue-particles>

		<el-container>
			<el-header>
				<div class="titleleft"> DLNU门诊挂号系统</div>
				<div class="right">
					<span id="nav">&emsp;今日气温:</span>
					<div id="he-plugin-simple"></div> <!-- 天气预报接口实现 -->
					<span style="display: inline-block;">您好,xx</span>
				</div>
			</el-header>
			<el-container>
				<el-aside width="600px">
					
					
				</el-aside>
				<el-main>
					<userview></userview>
				</el-main>
			</el-container>
		</el-container>

	</div>
</template>

<script>
	// @ is an alias to /src
	import userview from '../components/userview'
	import doctorview from '../components/doctorview'
	import adminview from '../components/adminview'

	export default {
		name: 'Home',
		data() {

			return {
				user: JSON.parse(window.sessionStorage.getItem('user')),
			}
		},
		components: {
			userview,
			doctorview,
			adminview
		},
		created() {
			//和风天气插件调用
			window.WIDGET = {
				"CONFIG": {
					"modules": "02",
					"background": "5",
					"tmpColor": "#ffffff",
					"tmpSize": "15",
					"aqiColor": "#ffffff",
					"aqiSize": "15",
					"weatherIconSize": "20",
					"alertIconSize": "15",
					"padding": "10px 10px 10px 10px",
					"shadow": "0",
					"language": "auto",
					"fixed": "false",
					"vertical": "center",
					"horizontal": "center",
					"key": "bb0bd610ef8e4dd0b28f6920d11d41a8"
				}
			};
			(function(d) {
				var c = d.createElement('link');
				c.rel = 'stylesheet';

				c.href = 'https://widget.heweather.net/simple/static/css/he-simple.css?v=1.4.0';
				var s = d.createElement('script');

				s.src = 'https://widget.heweather.net/simple/static/js/he-simple.js?v=1.4.0';
				var sn = d.getElementsByTagName('script')[0];
			 sn.parentNode.insertBefore(c, sn);
				sn.parentNode.insertBefore(s, sn);
			})(document);
		},
		methods: {

		}


	}
</script>
<style scoped="scoped">
	@import url("../assets/css/home.css");
</style>
