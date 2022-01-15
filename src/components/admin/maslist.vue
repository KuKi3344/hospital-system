<template>
	<div>
		<div style="display: flex;justify-content: space-between;">
			<el-input size="mini" v-model="searchList.subDate" placeholder="请输入查询的问诊预约日期"></el-input>
			<el-select  size="mini" v-model="searchList.registerStatus" clearable placeholder="请选择查询预约状态">
				<el-option key="挂号成功" label="挂号成功" value="挂号成功"></el-option>
				<el-option key="挂号取消"  label="挂号取消" value="挂号取消"></el-option>
			</el-select>
			<el-select  size="mini" v-model="searchList.enquiryStatus" clearable placeholder="请选择查询问诊状态">
				<el-option key="未问诊" label="未问诊" value="未问诊"></el-option>
				<el-option key="正在问诊"  label="正在问诊" value="正在问诊"></el-option>
				<el-option key="问诊结束" label="问诊结束" value="问诊结束"></el-option>
				<el-option key="取消问诊" label="取消问诊" value="取消问诊"></el-option>
			</el-select>
			<el-button type="primary" icon="el-icon-search" @click="search" size="mini"></el-button>
		</div>
	<el-table v-loading="loading" :data="dataList" height="480" border style="width:100%; border-radius:10px;font-size: 13px;"
		:header-cell-style="{background:'#eef1f4',color:'#606266'}">
		<el-table-column fixed prop="registration.id" label="问诊单id" width="75" height="40">
		</el-table-column>
		<el-table-column prop="person.id" label="病人id" width="80" height="40">
		</el-table-column>
		<el-table-column prop="person.name" label="病人姓名" width="100" height="40">
		</el-table-column>
		<el-table-column prop="doctor.id" label="预约医生id" width="100" height="40">
		</el-table-column>
		<el-table-column prop="doctor.name" label="预约医生姓名" width="100" height="40">
		</el-table-column>
		<el-table-column prop="registration.createDate" label="挂号申请日期" width="100" height="40">
		</el-table-column>
		<el-table-column prop="registration.subDate" label="挂号预约日期" width="100" height="40">
		</el-table-column>
		<el-table-column prop="registration.handleDate" label="挂号处理日期" width="100" height="40">
		</el-table-column>
		<el-table-column prop="registration.registStatus" label="挂号状态" width="100" height="40">
			<template slot-scope="scope">
				<el-tag type="success" v-if="scope.row.registration.registStatus=='挂号成功'">{{scope.row.registration.registStatus}}</el-tag>
				<el-tag type="warning" v-else>{{scope.row.registration.registStatus}}</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="registration.enquiryStatus" label="问诊状态" width="100" height="40">
			<template slot-scope="scope">
				<el-tag type="info" v-if="scope.row.registration.enquiryStatus=='取消问诊'">{{scope.row.registration.enquiryStatus}}</el-tag>
				<el-tag type="success" v-else-if="scope.row.registration.enquiryStatus=='问诊结束'">{{scope.row.registration.enquiryStatus}}</el-tag>
				<el-tag type="danger" v-else-if="scope.row.registration.enquiryStatus=='未问诊'">{{scope.row.registration.enquiryStatus}}</el-tag>
				<el-tag v-else>{{scope.row.registration.enquiryStatus}}</el-tag>
			</template>
		</el-table-column>
	
	</el-table>
	</div>
</template>

<script>
	export default{
		name:'maslist',
			data(){
				
				return{
					loading:true,
					dataList:[],
					searchList:{
						subDate:'',
						registerStatus:'',
						enquiryStatus:'',
					}
					
				}
			},
			created(){
				let id = this.getCookieValue("userid");
				// console.log(this.filterList)
				this.$axios.get('/api/pdr/query/all').then(resp=>{
					this.dataList = resp.data;
					this.loading = false;
				})
				
			},
			methods:{
				search(){
					for(var item in this.searchList){
						if(this.searchList[item] == ""){
							this.searchList[item] = null;
						}
					}
					this.$axios.get('/api/pdr/query/all',{
							params: {
								subDate: this.searchList.subDate,
								registerStatus: this.searchList.registerStatus,
								enquiryStatus: this.searchList.enquiryStatus,
							}
					}).then(resp=>{
							this.dataList = resp.data;
					})
				},
			}
		}
</script>

<style>
</style>
