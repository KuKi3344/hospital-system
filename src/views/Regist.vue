<template>
	<div class="main">
		<vue-particles color="#76aed3" :particleOpacity="0.7" :particlesNumber="50" shapeType="triangle"
			:particleSize="3.5" linesColor="#a0d7f9" :linesWidth="1.5" :lineLinked="true" :lineOpacity="0.7"
			:linesDistance="100" :moveSpeed="3" :hoverEffect="false" hoverMode="grab" :clickEffect="false"
			clickMode="push" class="lizi">
		</vue-particles>
		<el-form :rules="rules" ref="userRegistParam" :model="userRegistParam" class="registbox">
			<el-form-item prop="username">
				<el-input type="text" v-model="userRegistParam.username" placeholder="请输入用户名">
				</el-input>
			</el-form-item>
			<el-form-item prop="phone">
				<el-input type="text" v-model="userRegistParam.phone" placeholder="请输入电话号码">
				</el-input>
			</el-form-item>
			<el-form-item prop="email">
				<el-input type="email" v-model="userRegistParam.email" placeholder="请输入邮箱">
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" auto-complete="false" v-model="userRegistParam.password" placeholder="请输入密码">
				</el-input>
			</el-form-item>
			<el-form-item prop="conpwd">
				<el-input type="password" auto-complete="false" v-model="userRegistParam.conpwd" placeholder="请再次确认密码">
				</el-input>
			</el-form-item>
			
<!-- 			<el-date-picker
			      v-model="checktime"
			      type="date"
			      placeholder="选择日期"
				  :picker-options="getTime">
			    </el-date-picker> -->

			<el-button type="primary" style="width:100%;margin-top: 15px;" @click="dosubmit" round>提交</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			const checkpwd = (rule, value, cb) => {
				if (value.length > 5) {
					var modes = 0;
					//正则表达式验证符合要求的
					if (/\d/.test(value)) modes++; //数字
					if (/[A-z]/.test(value)) modes++; //小写
					if (/\W/.test(value)) modes++; //特殊字符					
					if (modes == 1) {
						cb(new Error('密码强度过低,请包含大小写字母、数字、特殊字符中两种及以上'))
					}
					return cb();
				} else {
					cb(new Error('请确保密码长度在6位以上'))
				}
			}
			const confirmpwd = (rule, value, cb) => {
				if (value != this.userRegistParam.password) {
					cb(new Error('两次密码输入不同，请重新输入'))
				}
				return cb();
			}


			return {
				userRegistParam: {
					username: '',
					phone: '',
					email: '',
					password: '',
					conpwd: '',
				},
				// checktime:'',
				// getTime:{
				// 	disabledDate(time){
				// 		let _now = Date.now(),
				// 		seven = 7* 24 *60 *60 *1000,
				// 		sevenDays = _now + seven;
				// 		return time.getTime() < _now || time.getTime() > sevenDays
				// 	}
				// },

				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '账号必须为6-20个字符',
							trigger: ['blur', 'change']
						}
					],

					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /^1[34578]\d{9}$/,
							message: "手机号码格式错误",
							trigger: ['blur', 'change'],
						}
					],

					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
							message: "邮箱格式错误",
							trigger: ['blur', 'change'],
						}
					],

					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							validator: checkpwd,
							trigger: ['blur', 'change'],
						}
					],

					conpwd: [{
							required: true,
							message: '请二次输入密码',
							trigger: 'blur'
						},
						{
							validator: confirmpwd,
							trigger: ['blur', 'change'],
						}

					],

				}
			}

		},

		methods: {

			dosubmit: function() {
				// let yy = this.checktime.getFullYear();
				// let mm = this.checktime.getMonth()+1;
				// let dd = this.checktime.getDate();
				// // if(mm<10){mm='0'+mm}
				// this.checktime =yy+'-'+ mm + '-'+dd;
				this.$refs.userRegistParam.validate((valid) => {
					console.log(this.checktime)
					if (valid) {
						// //没有用封装的方法是因为路由特殊所以需要单独写
						// this.postRequest('/login',this.userLoginParam).then(resp=>{
						// 	this.loading = false;
						// 	if(resp){

					} else {
						this.$message.error('输入格式错误，请检查！')
					}
				})
			},
		}
	}
</script>

<style scoped="scoped">
	@import url("../assets/css/regist.css");
</style>
