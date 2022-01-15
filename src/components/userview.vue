<template>
	<div>
		<div style="display: flex;justify-content: space-between;">
			<el-input size="mini" v-model="searchList.subDate" placeholder="请输入查询的问诊预约日期"
				style="flex:1;margin-right:10px"></el-input>
			<el-select size="mini" v-model="searchList.enquiryStatus" clearable placeholder="请选择查询问诊状态" style="flex:1">
				<el-option key="未问诊" label="未问诊" value="未问诊"></el-option>
				<el-option key="正在问诊" label="正在问诊" value="正在问诊"></el-option>
				<el-option key="问诊结束" label="问诊结束" value="问诊结束"></el-option>
				<el-option key="取消问诊" label="取消问诊" value="取消问诊"></el-option>
			</el-select>
			<el-button style="margin-left:5px" type="primary" icon="el-icon-search" @click="search" size="mini">
			</el-button>
			<el-button size="small" icon="el-icon-circle-plus-outline" type="primary" round style="float: right;"
				@click="add">挂号申请</el-button>
		</div>

		<el-table v-loading="loading" :data="dataList" height="480" border
			style="width:100%; border-radius:10px;font-size: 13px;"
			:header-cell-style="{background:'#eef1f4',color:'#606266'}">
			<el-table-column prop="id" label="挂号单id" width="120" height="40">
			</el-table-column>
			<el-table-column prop="doctorName" label="预约医生姓名" width="125" height="40">
			</el-table-column>
			<el-table-column prop="subDate" label="挂号预约日期" width="130" height="40">
			</el-table-column>
			<el-table-column prop="handleDate" label="问诊处理日期" width="130" height="40">
			</el-table-column>
			<el-table-column prop="registStatus" label="挂号状态" width="100" height="40">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.registStatus=='挂号成功'">
						{{scope.row.registStatus}}
					</el-tag>
					<el-tag type="info" v-else>{{scope.row.registStatus}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="enquiryStatus" label="问诊状态" width="100" height="40">
				<template slot-scope="scope">
					<el-tag type="info" v-if="scope.row.enquiryStatus=='取消问诊'">
						{{scope.row.enquiryStatus}}
					</el-tag>
					<el-tag type="success" v-else-if="scope.row.enquiryStatus=='问诊结束'">
						{{scope.row.enquiryStatus}}
					</el-tag>
					<el-tag type="danger" v-else-if="scope.row.enquiryStatus=='未问诊'">
						{{scope.row.enquiryStatus}}
					</el-tag>
					<el-tag v-else>{{scope.row.enquiryStatus}}</el-tag>
				</template>
			</el-table-column>

			<el-table-column label="操作" width="250" height="40">

				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="updatelist(scope.row.id)">编辑</el-button>
					<el-button type="danger" size="small" @click="concellist(scope.row.id)">取消</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog style="width: 1000px;height: 1000px" title="申请挂号" :visible.sync="addview" append-to-body>
			<div style="display:flex;flex-direction: column;justify-content: center;">
				<el-select class="choose" v-model="addList.userDoctorId" clearable placeholder="请选择医生">
					<el-option v-for="item in namelist" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>

				<el-date-picker v-model="addList.subDate" type="datetime" placeholder="选择预约日期"
					:picker-options="getTime">
				</el-date-picker>

			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="flushed">取 消</el-button>
				<el-button type="primary" @click="toadd">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog style="width: 1000px;height: 1000px;" title="挂号单编辑" :visible.sync="editview" append-to-body>
			<el-form :model="editList">
				<el-form-item label="挂号单id" width="80px">
					<el-input class="dialog_input" v-model="editList.id" :disabled="true"></el-input>
				</el-form-item>

				<el-select class="choose" v-model="editList.userDoctorId" clearable placeholder="请选择医生">
					<el-option v-for="item in namelist" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>

				<el-date-picker v-model="editList.subDate" type="datetime" placeholder="选择预约日期"
					:picker-options="getTime">
				</el-date-picker>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="flushed">取 消</el-button>
				<el-button type="primary" @click="update">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "userview",
		data() {

			return {
				userid: '',
				loading: true,
				dataList: [],
				searchList: {
					subDate: null,
					enquiryStatus: null
				},
				addview: false,
				editview: false,
				namelist: [],
				addList: {
					userPersonId: '',
					userDoctorId: '',
					subDate: ''
				},
				editList: [],
				subeditList: [],
				getTime: {
					disabledDate(time) {
						let _now = Date.now() - 1 * 24 * 60 * 1000,
							seven = 6 * 24 * 60 * 60 * 1000,
							sevenDays = _now + seven;
						return time.getTime() > sevenDays || time.getTime() < _now - 8.64e7;
					}
				},
			}
		},
		created() {
			this.userid = this.getCookieValue("userid");
			// console.log(this.filterList)
			this.$axios.get('/api/pdr/query/person', {
				params: {
					id: this.userid,
				}
			}).then(resp => {
				this.dataList = resp.data;
				this.loading = false;
			})
			this.$axios.get('/api/user/select/condition/', {
				params: {
					roleMark: 'doctor',
				}
			}).then(resp => {
				this.namelist = resp.data;
			})
		},
		methods: {
			flushed() {
				this.$axios.get('/api/pdr/query/person', {
					params: {
						id: this.userid,
					}
				}).then(resp => {
					this.dataList = resp.data;
					this.addview = false;
					this.editview = false;
				})
			},
			search() {
				for (var item in this.searchList) {
					if (this.searchList[item] == "") {
						this.searchList[item] = null;
					}
				}
				console.log(this.searchList)
				this.$axios.get('/api/pdr/query/person', {
					params: {
						id: this.userid,
						subDate: this.searchList.subDate,
						enquiryStatus: this.searchList.enquiryStatus,
					}
				}).then(resp => {
					this.dataList = resp.data;
				})
			},
			add() {
				this.addview = true;
				this.addList.userPersonId = this.userid;
			},
			toadd() {
				let yy = this.addList.subDate.getFullYear();
				let mm = this.addList.subDate.getMonth() + 1;
				let dd = this.addList.subDate.getDate();
				let hh = this.addList.subDate.getHours();
				let mf = this.addList.subDate.getMinutes() < 10 ? '0' + this.addList.subDate.getMinutes() : this.addList
					.subDate.getMinutes();
				let ss = this.addList.subDate.getSeconds() < 10 ? '0' + this.addList.subDate.getSeconds() : this.addList
					.subDate.getSeconds();
				if (mm < 10) {
					mm = '0' + mm
				}
				if (dd < 10) {
					dd = '0' + dd
				}
				this.addList.subDate = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
				console.log(this.addList)
				this.postRequest('/api/sub/add', this.addList).then(resp => {
					this.flushed();
				})
			},
			updatelist(id) {
				this.$axios.get('/api/sub/select/one/' + id).then(resp => {
					if (resp.data) {
						this.editList = resp.data;
						this.subeditList = resp.data;
						this.editview = true;
					}
				})
			},
			update() {
				if (!(/^(\d{4})(-)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/).test(this.editList.subDate)) {
					//正则判断日期格式是否为要传回去的数据格式，如果不是就进行日期格式化操作
					let yy = this.editList.subDate.getFullYear();
					let mm = this.editList.subDate.getMonth() + 1;
					let dd = this.editList.subDate.getDate();
					let hh = this.editList.subDate.getHours();
					let mf = this.editList.subDate.getMinutes() < 10 ? '0' + this.editList.subDate.getMinutes() : this
						.editList.subDate.getMinutes();
					let ss = this.editList.subDate.getSeconds() < 10 ? '0' + this.editList.subDate.getSeconds() : this
						.editList.subDate.getSeconds();
					if (mm < 10) {
						mm = '0' + mm
					}
					if (dd < 10) {
						dd = '0' + dd
					}
					this.editList.subDate = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
				}
				this.putRequest('/api/sub/update', this.editList).then(resp => {
					this.flushed();
				})
			},
			concellist(id) {
				this.$confirm('该挂号申请将被取消, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.delete('/api/sub/delete/' + id).then(resp => {
						this.flushed();
					})
				}).catch(() => {

					this.$message({
						type: 'info',
						message: '已取消操作'
					});
					this.flushed();
				});
			},
		}
	}
</script>

<style scoped="scoped">
	.choose {
		margin-bottom: 20px;
		width: 300px;
	}
</style>
