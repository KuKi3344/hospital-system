<template>
		<div>
		 <el-tabs  v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="用户管理" name="first">
				<masuser></masuser>
			</el-tab-pane>
		    <el-tab-pane label="问诊单汇总" name="second">
				<maslist></maslist>
			</el-tab-pane>
		  </el-tabs>
		</div>
	</div>
</template>

<script>
	import masuser from './admin/masuser'
	import maslist from './admin/maslist'
	export default{
		name:"adminview",
		components:{
			maslist,
			masuser
			
		},
		data(){
			
			return{
				activeName:'second'
				
			}
		},
		 methods: {
		      handleClick(tab, event) {
		      }
		    }
	}
</script>

<style>
</style>
