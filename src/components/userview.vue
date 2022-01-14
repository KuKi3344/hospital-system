<template>
	<div>
	<el-table v-loading="loading" :data="dataList" height="500" border
		style="width:100%; border-radius:10px;" :header-cell-style="{background:'#eef1f4',color:'#606266'}">
		<el-table-column prop="id" label="挂号单id" width="120" height="40">
		</el-table-column>
		<el-table-column prop="doctor.name" label="预约医生姓名" width="150" height="40">
		</el-table-column>
		<el-table-column prop="registration.subDate" label="挂号预约日期" width="150" height="40">
		</el-table-column>
		<el-table-column prop="registration.handleDate" label="挂号处理日期" width="150" height="40">
		</el-table-column>
		<el-table-column prop="registration.enquiryStatus" label="问诊状态" width="100" height="40">
			<template slot-scope="scope">
				<el-tag>{{scope.row.registration.enquiryStatus}}</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="registration.registStatus" label="处理状态" width="100" height="40">
			<template slot-scope="scope">
				<el-tag>{{scope.row.registration.registStatus}}</el-tag>
			</template>
		</el-table-column>
		
		<el-table-column label="操作" width="180" height="40">
	
			<template slot-scope="scope">
				<el-button type="primary" size="small" @click="updatePos(scope.row)">编辑</el-button>
				 <el-button type="danger" size="small" @click="deletePos(scope.row.id)">删除</el-button>
			</template>
	
		</el-table-column>
	
	</el-table>
	</div>
</template>

<script>
	export default{
		name:"userview",
		data(){
			
			return{
				loading:true,
				dataList:[],
				
			}
		},
		created(){
			let id = this.getCookieValue("userid");
			// console.log(this.filterList)
			this.$axios.get('/api/pdr/query/person', {
				params: {
					id: id,
				}
			}).then(resp=>{
				this.dataList = resp.data;
				console.log(this.dataList)
				this.loading = false;
			})
			
		},
	}
</script>

<style>
</style>
