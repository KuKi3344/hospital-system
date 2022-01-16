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
					<el-button size="mini" type="primary"  @click="confirmlist(scope.row.id)">确认问诊</el-button>
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
				updateList:[],
			}
		},
		created() {
			this.flushed();	
		},
	
		methods:{
			flushed(){
				let id = this.getCookieValue("userid");
				this.getTime();
				let begin = this.timeid+' 00:00:00';
				let end = this.timeid +' 23:59:59';
				let enquiry = '未问诊'
					this.$axios.get(`/api/pdr/query/doctor?id=${id}&subDate=${begin}&subDate=${end}&enquiryStatus=${enquiry}`).then(resp=>{
							this.dataList = resp.data;
							this.loading = false;
					})

				// console.log(this.filterList)
				// this.$axios.get(`/api/pdr/query/doctor?id=${id}&subDate=${begin}&subDate=${this.findlist.subDate.end}&enquiryStatus=${this.searchList.enquiryStatus}`).then(resp=>{
				// 		this.dataList = resp.data;
				// })
			},
			getdetailTime(){
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth()+1;
				let dd = new Date().getDate();
				let hh =  new Date().getHours();
				let mf =  new Date().getMinutes() < 10 ? '0' +  new Date().getMinutes() :  new Date().getMinutes();
				let ss =  new Date().getSeconds() < 10 ? '0' +  new Date().getSeconds() :  new Date().getSeconds();
				if (mm < 10) {
					mm = '0' + mm
				}
				if (dd < 10) {
					dd = '0' + dd
				}
				this.timeid = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
			},
			getTime(){
			        var _this = this;
					let yy = new Date().getFullYear();
			        let mm = new Date().getMonth()+1;
			        let dd = new Date().getDate();
					if (mm < 10) {
						mm = '0' + mm
					}
					if (dd < 10) {
						dd = '0' + dd
					}
					this.timeid = yy + '-' + mm + '-' + dd;
			      },
			confirmlist(id){
					this.$axios.get('/api/sub/select/one/'+id).then(resp=>{
						this.updateList = resp.data;
						this.updateList.enquiryStatus = "正在问诊";
						this.getdetailTime();
						this.updateList.handleBegainDate = this.timeid;
						console.log(this.updateList)
						setTimeout(() =>{
						    this.send()
						},300);
					})
					
					
			},
			send(){
				this.putRequest('/api/sub/update',this.updateList).then(resp=>{
					this.flushed();
					 location.reload ()
				})
			}
		}
	}
</script>

<style>
</style>
