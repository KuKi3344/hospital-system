<template>
	<div class="main">
		<vue-particles color="#76aed3" :particleOpacity="0.7" :particlesNumber="50" shapeType="triangle"
			:particleSize="3.5" linesColor="#a0d7f9" :linesWidth="1.5" :lineLinked="true" :lineOpacity="0.7"
			:linesDistance="100" :moveSpeed="3" :hoverEffect="false" hoverMode="grab" :clickEffect="false"
			clickMode="push" class="lizi">
		</vue-particles>
		<span class="title">DLNU门诊挂号系统</span>
		<span class="title2">守护您和家人的健康</span>
		<el-form :rules="rules" v-loading="loading" element-loading-text="努力登录中..."
			element-loading-spinne="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)"
			ref="userLoginParam" :model="userLoginParam" class="loginbox">
			<el-form-item prop="username">
				<el-input type="text" v-model="userLoginParam.phone" placeholder="请输入手机号/邮箱">
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" auto-complete="false" v-model="userLoginParam.password" placeholder="请输入密码">
				</el-input>
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
		name: "Login",
		data() {
			return {
				userLoginParam: {
					phone: '',
					email: '',
					password: '',
				},
				checked: true,
				text: '向右滑',
				accuracy: 4,
				toverify: false,
				succeed: false,
				loading: false,
				rules: {
					phone: [{
							required: true,
							message: '请输入您得手机号或邮箱',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '账号必须为6-20个字符',
							trigger: ['blur', 'change']
						}
					],

					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							message: '密码必须为6位以上',
							trigger: ['blur', 'change']
						}
					],
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
			toRegist: function() {
				this.$router.push('/Regist');
			},
			doSubmit: function() {
				let regemail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if (regemail.test(this.phone)) {
					this.email = this.username;
					this.phone = '';
					
				}
				this.$refs.userLoginParam.validate((valid) => {
					if (valid) {
						if (this.succeed) {
							this.loading = true;
							//没有用封装的方法是因为路由特殊所以需要单独写
							this.postRequest('/login', this.userLoginParam).then(resp => {
								this.loading = false;
								if (resp) {

									//存储用户token
									const token = resp.data.tokenHead + resp.data.token;
									window.sessionStorage.setItem('token', token);
									//跳转首页
									this.$router.replace('/Home')
								}

							})
						} else {
							this.$message({
								message: '请先通过验证',
								type: 'warning'
							});
							this.toverify = true;
						}
					} else {
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
