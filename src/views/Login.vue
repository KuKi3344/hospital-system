<template>
	<div class="main">
		<vue-particles color="#76aed3" :particleOpacity="0.7" :particlesNumber="50" shapeType="triangle"
			:particleSize="3.5" linesColor="#a0d7f9" :linesWidth="1.5" :lineLinked="true" :lineOpacity="0.7"
			:linesDistance="100" :moveSpeed="3" :hoverEffect="false" hoverMode="grab" :clickEffect="false"
			clickMode="push" class="lizi">
		</vue-particles>
		<span class="title">DLNU门诊挂号系统</span>
		<span class="title2">守护您和家人的健康</span>
		<el-form 
		:rules="rules"
		v-loading="loading"
		element-loading-text="努力登录中..."
		element-loading-spinne="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.6)"
		ref="userLoginParam"
		:model="userLoginParam" 
		class="loginbox">
			<el-form-item prop="username">
				<el-input type="text" v-model="userLoginParam.username" placeholder="请输入用户名/邮箱">					
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" auto-complete="false" v-model="userLoginParam.password" placeholder="请输入密码"></el-input>
			</el-form-item>
			<div style="display: flex;justify-content: space-around;">
				<el-button type="primary" style="width:40%;margin-top:15px" @click="toRegist" round>注册</el-button>
				<el-button type="primary" style="width:40%;margin-top:15px" @click="doSubmit" round>登录</el-button>
			</div>
			
		</el-form>
		
		<div class="verify" v-if="toverify">
			<slide-verify ref="slideblock" @again="onAgain" @success="onSuccess" @fail="onFail" :accuracy="accuracy"
				:slider-text="text"></slide-verify>
		</div>
	</div>
</template>

<script>
	export default {
		 name:"Login",
		 data(){
			 return{
				 userLoginParam:{
					 username:'admin',
					 password:'123',
				 },
				 checked:true,
				 text: '向右滑',
				 accuracy: 4,
				 toverify: false,
				 succeed:false,
				 loading:false,
				 rules:{
					 username: [{required:true,message:'请输入用户名',trigger:'blur'},
					 { min: 5, max: 16, message: '账号必须为5-16个字符', trigger: 'blur' }],
					 
					 password: [{required:true,message:'请输入密码',trigger:'blur'},
					 { min: 3, max: 15, message: '密码必须为3-15个字符', trigger: 'blur' }],
					  code:[{required:true,message:'请输入验证码',trigger:'blur'}]
				 }
			 }
		 },
		 methods: {
			 onSuccess: function() {
			 	this.$message({
			 		type: 'success',
			 		message: '验证通过',
			 	});
			 	this.succeed = true;
			 	this.toverify = false;
			 },
			 onFail: function() {
			 	this.$message.error('验证失败');
			 },
			 onAgain: function() {
			 	this.$message({
			 		message: '请求错误，请重试',
			 		type: 'warning'
			 	});
			 	// 刷新
			 	this.$refs.slideblock.reset();
			 },
			 toRegist:function(){
				 this.$router.push('/Regist');
			 },
			doSubmit:function(){

				this.$refs.userLoginParam.validate((valid)=>{
					if(valid){
						if(this.succeed){	
						this.loading = true;
						//没有用封装的方法是因为路由特殊所以需要单独写
						this.postRequest('/login',this.userLoginParam).then(resp=>{
							this.loading = false;
							if(resp){
								
								//存储用户token
								const tokenStr = resp.data.tokenHead+resp.data.token;
								window.sessionStorage.setItem('tokenStr',tokenStr);
								//跳转首页
								this.$router.replace('/Home')
							}
							
						})
						}else{
							this.$message({
								message: '请先通过验证',
								type: 'warning'
							});
							this.toverify = true;
						}
					}else{
						this.$message.error('输入格式错误，请检查！')
					}
				})
				// }
			},
		 	
		 },
		 
	}
</script>
<style scoped>
	@import url(../assets/css/login.css);
</style>