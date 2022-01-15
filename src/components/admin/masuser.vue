<template>
	<div>
		<div style="display: flex;justify-content: space-between;">
			<el-input size="mini" v-model="searchList.id" placeholder="请输入查询id"></el-input>
			<el-input  size="mini" v-model="searchList.email" placeholder="请输入查询邮箱"></el-input>
			<el-input  size="mini" v-model="searchList.phone" placeholder="请输入查询电话"></el-input>
			<el-select  size="mini" v-model="searchList.roleMark" clearable placeholder="请选择查询权限">
				<el-option key="person" label="person" value="person"></el-option>
				<el-option key="admin"  label="admin" value="admin"></el-option>
				<el-option key="doctor" label="doctor" value="doctor"></el-option>
			</el-select>
			<el-button type="primary" icon="el-icon-search" @click="search" size="mini"></el-button>
		</div>
		<el-table v-loading="loading" :data="dataList" height="480" border style="width:100%; border-radius:10px;font-size: 13px;"
			:header-cell-style="{background:'#eef1f4',color:'#606266'}">
			<el-table-column fixed prop="id" label="id" width="100" height="25">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100" height="25">
			</el-table-column>
			<el-table-column prop="phone" label="电话号" width="110" height="25">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="170" height="25">
			</el-table-column>
			<el-table-column prop="birthday" label="生日" width="120" height="25">
			</el-table-column>
			<el-table-column prop="idCard" label="身份证" width="170" height="25">
			</el-table-column>
			<el-table-column prop="address" label="地址" width="120" height="25">
			</el-table-column>
			<el-table-column prop="roleMark" label="权限" width="100" height="25">
				<template slot-scope="scope">
					<el-tag type="success">{{scope.row.roleMark}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="enabled" label="是否禁用" width="80" height="40">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.enabled" type="success">正常</el-tag>
					<el-tag v-else type="danger">禁用</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="150" height="40">

				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="update(scope.row.id)">编辑</el-button>
					<el-button type="danger" size="small" @click="deleteuser(scope.row.id)">封禁</el-button>
				</template>

			</el-table-column>

		</el-table>
		<el-button size="small" icon="el-icon-circle-plus-outline" type="primary" round  style="float: right;margin-top: 10px;" @click = "add">添加用户</el-button>
		
		<el-dialog style="width: 1000px;height: 1000px" title="用户添加" :visible.sync="addview" append-to-body>
			<el-form :model="addList">
				<el-form-item label="姓名" width="100px">
					<el-input class="dialog_input" v-model="addList.name"></el-input>
				</el-form-item>
				<el-form-item label="电话号码" width="100px">
					<el-input class="dialog_input" v-model="addList.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" width="100px">
					<el-input class="dialog_input" v-model="addList.email"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" width="100px">
					<el-input class="dialog_input" v-model="addList.idCard"></el-input>
				</el-form-item>
				<el-form-item label="密码" width="100px">
					<el-input class="dialog_input" v-model="addList.password"></el-input>
				</el-form-item>
			</el-form>
			<el-select v-model="addList.roleMark" clearable placeholder="请选择权限">
				<el-option key="person" label="person" value="person"></el-option>
				<el-option key="admin"  label="admin" value="admin"></el-option>
				<el-option key="doctor" label="doctor" value="doctor"></el-option>
			</el-select>
		
			<div slot="footer" class="dialog-footer">
				<el-button @click="flushed">取 消</el-button>
				<el-button type="primary" @click="adduser">确 定</el-button>
			</div>
		</el-dialog>
		
		<el-dialog style="width: 1000px;height: 1000px;" title="用户编辑" :visible.sync="editview" append-to-body>
			<el-form :model="updateList">
				<el-form-item label="姓名" width="80px">
					<el-input class="dialog_input" v-model="updateList.name" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="电话号" width="80px">
					<el-input class="dialog_input" v-model="updateList.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" width="80px">
					<el-input class="dialog_input" v-model="updateList.email"></el-input>
				</el-form-item>
				<el-form-item label="生日" width="80px">
					<el-input class="dialog_input" v-model="updateList.birthday"></el-input>
				</el-form-item>
				<el-form-item label="身份证" width="80px">
					<el-input class="dialog_input" v-model="updateList.idCard"></el-input>
				</el-form-item>
				<el-form-item label="密码" width="80px">
					<el-input class="dialog_input" v-model="updateList.password"></el-input>
				</el-form-item>
				<el-select v-model="updateList.roleMark" clearable placeholder="权限">
					<el-option key="person" label="person" value="person"></el-option>
					<el-option key="admin"  label="admin" value="admin"></el-option>
					<el-option key="doctor" label="doctor" value="doctor"></el-option>
				</el-select>
			</el-form>
			
			<div slot="footer" class="dialog-footer">
				<el-button @click="flushed">取 消</el-button>
				<el-button type="primary" @click="updateuser">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'maslist',
		data() {

			return {
				loading: true,
				dataList: [],
				searchList:{
					id: null,
					userphone:null,
					useremail: null,
					userrolemark: null
				},	
				addList:{
					name:'',
					phone:'',
					email:'',
					idCard:'',
					password:'',
					roleMark:'',
				},
				updateList:{},
				addview:false,
				editview:false,
			}
		},
		created() {
			this.flushed();
			this.loading = false;	
		},
		methods:{
			flushed(){
				this.$axios.get('/api/user/select/condition/').then(resp => {
					this.dataList = resp.data;
				})
				this.addview = false;
				this.editview = false;
			},
			search(){
				for(var item in this.searchList){
					if(this.searchList[item] == ""){
						this.searchList[item] = null;
					}
				}
				this.$axios.get('/api/user/select/condition/',{
						params: this.searchList
				}).then(resp=>{
						this.dataList = resp.data;
				})
			},
			deleteuser(id){
				this.$confirm('该用户将被封禁, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
						this.$axios.delete('/api/user/ban/'+id).then(resp=>{
								this.flushed();
						})
				        }).catch(() => {
				
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          }); 
							this.flushed();
				        });
			},
			add(){
				this.addview = true;
			},
		adduser(){
			this.postRequest('/api/user/register',this.addList).then(resp=>{
				for(var item in this.addList){
					this.addList[item] ='';
				}
				this.flushed();
			})
		},
		update(id){
			this.$axios.get('/api/user/select/one/'+id).then(resp=>{
				this.updateList = resp.data;
				this.editview = true;
			})
		},
		updateuser(){
			this.putRequest('/api/user/update',this.updateList).then(resp=>{
				this.flushed();
			})
		},
		}
	}
</script>

<style>
	.el-input,
	.el-select{
		flex:1;
	}
</style>
