<template>
	<div>
		<div style="display: flex;justify-content: space-between;">
			<el-input size="mini" v-model="searchList.subDate.begin" placeholder="请输入查询的问诊预约日期(范围开始)"></el-input>
			<el-input size="mini" v-model="searchList.subDate.end" placeholder="请输入查询的问诊预约日期(范围结束)"></el-input>
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
			<el-table-column prop="id" label="问诊单id" width="175" height="40">
			</el-table-column>
			<el-table-column prop="personName" label="预约病人姓名" width="150" height="40">
			</el-table-column>
			<el-table-column prop="subDate" label="预约日期" width="180" height="40">
			</el-table-column>
			<el-table-column prop="handleBegainDate" label="问诊处理日期" width="150" height="40">
			</el-table-column>
			<el-table-column prop="registStatus" label="挂号状态" width="150" height="40">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.registStatus=='挂号成功'">{{scope.row.registStatus}}</el-tag>
					<el-tag type="warning" v-else>{{scope.row.registStatus}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="enquiryStatus" label="问诊状态" width="150" height="40">
				<template slot-scope="scope">
					<el-tag type="info" v-if="scope.row.enquiryStatus=='取消问诊'">{{scope.row.enquiryStatus}}</el-tag>
					<el-tag type="success" v-else-if="scope.row.enquiryStatus=='问诊结束'">{{scope.row.enquiryStatus}}</el-tag>
					<el-tag type="danger" v-else-if="scope.row.enquiryStatus=='未问诊'">{{scope.row.enquiryStatus}}</el-tag>
					<el-tag v-else>{{scope.row.enquiryStatus}}</el-tag>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: "doctorlist",
		data() {
	
			return {
				loading: true,
				dataList: [],
				searchList:{
					subDate:{
						begin:'',
						end:'',
					},
					enquiryStatus:'',				
				},
				findlist:{
					subDate:{
						begin:'',
						end:'',
					},
				}
	
			}
		},
		created() {
			let id = this.getCookieValue("userid");
			// console.log(this.filterList)
			this.$axios.get('/api/pdr/query/doctor', {
				params: {
					id: id,
				}
			}).then(resp => {
				this.dataList = resp.data;
				console.log(this.dataList)
				this.loading = false;
			})
	
		},
		methods:{
			search(){
				let id = this.getCookieValue("userid");
				if(this.searchList.subDate.begin == ''){
					this.findlist.subDate.begin ='2000-01-01' ;
				}else{
					this.findlist.subDate.begin = this.searchList.subDate.begin;
				}
				if(this.searchList.subDate.end == ''){
					this.findlist.subDate.end ='2100-01-01';
				}else{
					this.findlist.subDate.end = this.searchList.subDate.end;
				}
				if(this.findlist.subDate.end<this.findlist.subDate.begin){
					alert('结束日期不能小于开始日期')
					this.searchList.subDate.end = '';
					this.searchList.subDate.begin = '';
				}
				console.log(this.searchList)
				if(this.searchList.enquiryStatus != ""){
					this.$axios.get(`/api/pdr/query/doctor?id=${id}&subDate=${this.findlist.subDate.begin}&subDate=${this.findlist.subDate.end}&enquiryStatus=${this.searchList.enquiryStatus}`).then(resp=>{
							this.dataList = resp.data;
					})
				}else{
					this.$axios.get(`/api/pdr/query/doctor?id=${id}&subDate=${this.findlist.subDate.begin}&subDate=${this.findlist.subDate.end}`).then(resp=>{
							this.dataList = resp.data;
					})
				}
			},
		}
	}
</script>

<style scoped>
	.el-input{
		margin-right:10px;
		flex:1;
	}
	.el-select{
		flex:1;
	}
</style>