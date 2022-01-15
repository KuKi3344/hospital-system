<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="问诊单记录" name="first">
				<doctorlist></doctorlist>
				</el-tab-pane>
		 <el-tab-pane label="当日未问诊记录" name="second">
			 <doctormas></doctormas>
		 </el-tab-pane>
		 <el-tab-pane label="当日正在问诊记录" name="three">
		 			<doctoring></doctoring>
		 </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import doctorlist from './doctor/doctorlist'
	import doctormas from './doctor/doctormas'
	import doctoring from './doctor/doctoring'
	export default {
		name: "docterview",
		components: {
			doctorlist,
			doctormas,
			doctoring
		},
		data() {

			return {
				activeName: 'first'
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
