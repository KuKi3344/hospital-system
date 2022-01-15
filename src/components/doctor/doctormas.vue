<template>
	<div>
		<el-table v-loading="loading" :data="dataList" height="480" border style="width:100%; border-radius:10px;font-size: 13px;"
			:header-cell-style="{background:'#eef1f4',color:'#606266'}">
			<el-table-column prop="id" label="问诊单id" width="150" height="40">
			</el-table-column>
			<el-table-column prop="personName" label="预约病人姓名" width="150" height="40">
			</el-table-column>
			<el-table-column prop="subDate" label="预约日期" width="150" height="40">
			</el-table-column>
			<el-table-column prop="handleBegainDate" label="问诊处理日期" width="150" height="40">
			</el-table-column>
			<el-table-column prop="enquiryStatus" label="问诊状态" width="150" height="40">
				<template slot-scope="scope">
					<el-tag type="danger">{{scope.row.enquiryStatus}}</el-tag>
				</template>
			</el-table-column>
	
	
			<el-table-column label="操作" width="210" height="40">
	
				<template slot-scope="scope">
					<el-button size="mini" type="primary"  @click="confirmlist(scope.row)">确认问诊</el-button>
				</template>
	
			</el-table-column>
	
		</el-table>
	</div>
</template>

<script>
	export default {
		name: "doctormas",
		data() {
	
			return {
				loading: true,
				dataList: [],
				timeid:'',
			}
		},
		created() {
			let id = this.getCookieValue("userid");
			this.getTime();
			// console.log(this.filterList)
			this.$axios.get('/api/pdr/query/doctor', {
				params: {
					id: id,
					subDate:this.timeid,
					enquiryStatus:"未问诊"
				}
			}).then(resp => {
				this.dataList = resp.data;
				this.loading = false;
			})
	
		},
		methods:{
			getTime(){
			        var _this = this;
					let yy = new Date().getFullYear();
			        let mm = new Date().getMonth()+1;
			        let dd = new Date().getDate();
					if(mm<10){mm='0'+mm}
			        this.timeid = yy+'-'+mm+'-'+dd;
					console.log(this.timeid);
			      },
			search(){
				let id = this.getCookieValue("userid");
				for(var item in this.searchList){
					if(this.searchList[item] == ""){
						this.searchList[item] = null;
					}
				}
				console.log(this.searchList)
				this.$axios.get('/api/pdr/query/doctor',{
						params: {
							id: id,
							subDate:this.searchList.subDate,
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
