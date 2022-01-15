<template>
	<div class="main">
		<vue-particles color="#76aed3" :particleOpacity="0.7" :particlesNumber="50" shapeType="triangle"
			:particleSize="3.5" linesColor="#a0d7f9" :linesWidth="1.5" :lineLinked="true" :lineOpacity="0.7"
			:linesDistance="100" :moveSpeed="3" :hoverEffect="false" hoverMode="grab" :clickEffect="false"
			clickMode="push" class="lizi">
		</vue-particles>

		<el-container>
			<el-header style="min-width:800px;z-index: 999;">
				<div class="titleleft"> DLNU门诊挂号系统</div>
				<div class="right">
					<span id="nav">&emsp;今日气温:</span>
					<div id="he-plugin-simple"></div> <!-- 天气预报接口实现 -->

					<el-dropdown @command="commandHandler">
						<span class="el-dropdown-link">
							您好,{{user.name}}
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="exit">注销</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-header>
			<el-container style="display: flex;justify-content: space-around;align-items:center;min-width:800px;">
				<el-aside style="flex:1;min-width: 300px;">
					<el-descriptions direction="horizontal" :column="1" title="用户信息" size="medium">
						<template slot="extra">
							<el-button type="primary" size="medium" style="margin-right: 25px;" @click="clickedit">编辑
							</el-button>
						</template>
						<el-descriptions-item label="用户名">{{user.name}}</el-descriptions-item>
						<el-descriptions-item label="手机号">{{user.phone}}</el-descriptions-item>
						<el-descriptions-item label="邮箱">{{user.email}}</el-descriptions-item>
						<el-descriptions-item label="居住地">{{user.address}}</el-descriptions-item>
						<el-descriptions-item label="生日">
							<el-tag size="small">{{user.birthday}}</el-tag>
						</el-descriptions-item>
						<el-descriptions-item label="身份证">{{user.idCard}}</el-descriptions-item>
						<el-descriptions-item label="描述">{{remark}}</el-descriptions-item>
					</el-descriptions>
					
					<el-dialog style="width: 900px;height:900px;" title="个人信息编辑" :visible.sync="showedit"
						append-to-body top="10px">
						<el-form :model="editList">
							<el-form-item label="用户名" width="150px">
								<el-input class="dialog_input" v-model="editList.name"></el-input>
							</el-form-item>
							<el-form-item label="手机号" width="150px">
								<el-input class="dialog_input" v-model="editList.phone"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" width="150px">
								<el-input class="dialog_input" v-model="editList.email"></el-input>
							</el-form-item>
							<el-form-item label="居住地" width="150px">
								<el-input class="dialog_input" v-model="editList.address"></el-input>
							</el-form-item>
							<el-form-item label="生日" width="150px">
								<el-input class="dialog_input" v-model="editList.birthday"></el-input>
							</el-form-item>
							<el-form-item label="身份证" width="150px">
								<el-input class="dialog_input" v-model="editList.idCard"></el-input>
							</el-form-item>
							<el-form-item label="描述" width="150px">
								<el-input class="dialog_input" v-model="editList.remark"></el-input>
							</el-form-item>
						</el-form>

						<div slot="footer" class="dialog-footer">
							<el-button @click="flushed">取 消</el-button>
							<el-button type="primary" @click="edit">确 定</el-button>
						</div>
					</el-dialog>
					
				</el-aside>
				<el-main style="flex:2;height:650px;">
					<userview v-show="rolemark == 'person'"></userview>
					<doctorview v-show="rolemark == 'doctor'"></doctorview>
					<adminview v-show="rolemark == 'admin'"></adminview>
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
				user: {},
				userid: '',
				showedit: false,
				editList:{},
				remark:'',
				rolemark:'',
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
			
			if (!this.getCookieValue("userid")) {
				this.$router.replace('/Login');
			}
			
			this.userid = this.getCookieValue("userid");
			this.rolemark = this.getCookieValue('rolemark');
			this.getRequest('/api/user/select/one/' + this.userid).then(resp => {
				this.user = resp.data;
				if(this.user.remark==''|| this.user.remark==null){
					this.remark = '暂无'
				}else{
					this.remark = this.user.remark;
				}
			})
		},
		methods: {
			commandHandler(command) {
				if (command == 'exit') {
					this.postRequest('/logout').then(resp => {
						this.clearCookie("rolemark");
						this.clearCookie("userid");
						this.$router.replace('/Login');
					})
				}
			},
			clickedit() {
				this.getRequest('/api/user/select/one/' + this.userid).then(resp => {
					this.editList = resp.data;
					this.showedit = true;
				})
			},
			edit() {
				//1.发送请求把editList传回去
				//2.刷新
				this.putRequest('/api/user/update',this.editList).then(resp=>{
					this.user = resp.data;
					if(this.user.remark == '' || this.user.remark==null){
						this.remark = '暂无';
					}
					else{
						this.remark = this.user.remark;
					}
					this.setCookieValue("rolemark", this.user.roleMark)
					this.showedit = false;
					console.log(this.editList)
				})
				
			},
			flushed(){
				this.showedit = false;
				this.getRequest('/api/user/select/one/' + this.userid).then(resp => {
					this.user = resp.data;
					this.setCookieValue("rolemark", this.user.roleMark)
				})
			}
		}


	}
</script>
<style scoped="scoped">
	@import url("../assets/css/home.css");
</style>
