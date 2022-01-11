<template>
	<div class="bk">
		<vue-particles color="#ffffff" :particleOpacity="0.7" :particlesNumber="70" shapeType="circle"
			:particleSize="4" linesColor="#a0d7f9" :linesWidth="0" :lineLinked="false" :lineOpacity="0.7"
			:linesDistance="80" :moveSpeed="4" :hoverEffect="false" hoverMode="grab" :clickEffect="false"
			clickMode="push" class="lizi">
		</vue-particles>
		<div class ="nonetitle">
			<div class="tip">404</div>
			<div class="tip2">小主，您没有权限QWQ&emsp;请<router-link to='/'>登录</router-link></div>
		
		</div>
		
	
	</div>
</template>

<script>
	export default{
		name:'none'
	}
</script>

<style scoped="scoped">
@import url("../assets/css/error.css");
</style>
