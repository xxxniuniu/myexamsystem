<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }" @click.native="clearActivePath">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <!-- input和搜索 -->
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-input placeholder="请输入内容" class="input-with-select" clearable @clear="getUserList" v-model="search">
                        <el-button slot="append" icon="el-icon-search" @click="doFilter"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!-- 用户列表 -->
        <el-card>
                <el-table
                :cell-style="stateJudge"
                :data="tableDataEnd"
                style="width: 100%"
                border stripe="">
                    <el-table-column
                        type="index"
                        label="#">
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="学号(工号)"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="role"
                        label="权限"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态"
                        width="220">
                        <!-- :formatter="formatBoolean"> -->
                        <!-- 作用域插槽 -->
                        <!-- <template v-slot:="scope">
                            <el-switch
                                v-model="scope.row.mg_state"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="changeUserState(scope.row)">
                            </el-switch>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200">
                        <template v-slot:="scope">
                            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                                <el-button type="danger" icon="el-icon-delete" circle></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                                <el-button type="warning" icon="el-icon-setting" circle></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="pageSize"
                    展示功能组件
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalItems">
                    </el-pagination>
                </div>
                <!-- 添加用户 -->
                <el-dialog
                    title="添加用户"
                    :visible.sync="addDialogVisible"
                    width="60%">
                     <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                        <el-form-item label="学号(工号)" prop="number" label-width="15%">
                        <el-input autocomplete="off" v-model="addForm.number"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="name" label-width="15%">
                        <el-input autocomplete="off" v-model="addForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" label-width="15%">
                        <el-input autocomplete="off" v-model="addForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email" label-width="15%">
                        <el-input autocomplete="off" v-model="addForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="权限" prop="role" label-width="15%">
                        <!-- <el-input autocomplete="off" v-model="addForm.role"></el-input> -->
                            <el-radio-group v-model="addForm.role">
                                <el-radio border label="学生"></el-radio>
                                <el-radio border label="教师"></el-radio>
                                <el-radio border label="管理员"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- <el-form-item label="邮箱" prop="email">
                        <el-input autocomplete="off" v-model="addForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="mobile">
                        <el-input autocomplete="off" v-model="addForm.mobile"></el-input>
                        </el-form-item> -->
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="addDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addUser">确 定</el-button>
                    </span>
                </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            search:'',
            flag:false,
            totalItems:0,
            pageSize:2,
            currentPage:1,
            tableDataEnd:[],
            filterTableDataEnd:[],
            userList:[
                {
                    number:'2019212212001',
                    name:'张三',
                    email:'776723aab@163.com',
                    role:'学生',
                    state:'在线'
                },
                {
                    number:'2019212212002',
                    name:'李三',
                    email:'338245241@qq.com',
                    role:'学生',
                    state:'离线'
                },
                {
                    number:'2019212212004',
                    name:'李一一',
                    email:'9982472@qq.com',
                    role:'学生',
                    state:'考试中'
                },
                {
                    number:'20134294',
                    name:'teacher张',
                    email:'3307852@qq.com',
                    role:'老师',
                    state:'在线'
                },
                {
                    number:'2019002123043',
                    name:'冯旭爽',
                    email:'78522313@qq.com',
                    role:'学生',
                    state:'在线'
                },
                {
                    number:'2019002123041',
                    name:'虞浩达',
                    email:'7242522313@qq.com',
                    role:'学生',
                    state:'在线'
                },
                {
                    number:'2019002123044',
                    name:'李星烨',
                    email:'52232313@qq.com',
                    role:'学生',
                    state:'在线'
                },
                {
                    number:'2019002123045',
                    name:'叶初航',
                    email:'78213522313@qq.com',
                    role:'学生',
                    state:'在线'
                },
                {
                    number:'2019002123046',
                    name:'翁鹏芸',
                    email:'78522313@qq.com',
                    role:'学生',
                    state:'在线'
                },
            ],
            addDialogVisible:false,
            // 添加用户的form
            addForm:{
                number:"",
                name:"",
                password:"",
                email:"",
                role:""
            },
            // 添加表单的验证规则对象
            addFormRules:{
                number:[
                    {required:true,message:"请输入学号(工号)",trigger:'blur'},
                    {min:6,max:20,message:"长度6-20",trigger:'blur'}
                ],
                password:[
                    {required:true,message:"请输入密码",trigger:'blur'},
                    {min:6,max:15,message:"长度6-15",trigger:'blur'}
                ],
                name:[
                    {required:true,message:"请输入姓名",trigger:'blur'},
                    // {min:6,max:15,message:"密码长度6-15",trigger:'blur'}
                ],
                email:[
                    {required:true,message:"请输入邮箱",trigger:'blur'},
                    // {min:3,max:20,message:"长度3-10",trigger:'blur'}
                ],
                role:[
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                    // {min:3,max:20,message:"长度3-10",trigger:'blur'}
                ],
                // email:[
                //     {required:true,message:"请输入邮箱",trigger:'blur'},
                //     {validator:checkEmail,trigger:'blur'}
                // ],
                // mobile:[
                //     {required:true,message:"请输入手机号",trigger:'blur'},
                //     {min:11,max:11,message:"请输入正确的手机号",trigger:'blur'}
                // ]
            }
        }
    },
    created(){
        this.totalItems = this.userList.length;
        if (this.totalItems > this.pageSize){
            for (let index=0;index<this.pageSize;index++){
                this.tableDataEnd.push(this.userList[index]);
            }
        }else{
            // 展示全部
            this.tableDataEnd = this.userList;
        }
    },
    methods:{
        // 搜索
        doFilter() {
            if (this.search == "") {
                // 为空，显示全部数据
                this.totalItems = this.userList.length;
                this.currentChangePage(this.userList); 
                this.flag = false;
                return;
            }
            this.tableDataEnd = []
            // 每次手动将数据置空,因为会出现多次点击搜索情况
            this.filterTableDataEnd=[]
            this.userList.forEach((value, index) => {
                if(value.name){
                    if(value.name.indexOf(this.search)>=0){
                        // 找到了把这一行push进去
                        this.filterTableDataEnd.push(value)
                    }
                }
            });
            // 页面数据改变重新统计数据数量和当前页
            this.currentPage=1
            this.totalItems=this.filterTableDataEnd.length
            // 渲染表格
            this.currentChangePage(this.filterTableDataEnd)
            // 页面初始化数据需要判断是否检索过
            this.flag=true
        },
        //每页展示条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(1);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            //需要判断是否检索
            if (!this.flag) {
                this.currentChangePage(this.userList);
                console.log(this.tableDataEnd);
            } else {
                this.currentChangePage(this.filterTableDataEnd);
                console.log(this.tableDataEnd);
            }
        },
        // 组件自带监控当前页码
        // 页码切换
        currentChangePage(list) {
            let from = (this.currentPage - 1) * this.pageSize;
            let to = this.currentPage * this.pageSize;
            this.tableDataEnd = [];
            for (; from < to; from++) {
                if (list[from]) {
                    this.tableDataEnd.push(list[from]);
                }
            }
        },
        stateJudge({row, column, rowIndex, columnIndex}){
			if(column.label === '状态'){   // 根据label（列名）确定要修改的列
				if (row.state === '在线') { // 判断每行yourRow的值
					return 'color: lightgreen;'
				}else if (row.state === '考试中') {
					return 'color: red;'
				}
			}
		},
         // 点击按钮，添加新用户
        addUser () {
        this.$refs.addFormRef.validate(async valid => {
            // 校验失败
            if (!valid) return;
            // 校验成功，可以发起添加用户的网络请求
            // const {data: res} = await this.$http.post('users', this.addForm)
            // if (res.meta.status !== 201) {
            // this.$message.error('添加用户失败！')
            // }
            // this.$message.success('添加用户成功！')
            // 隐藏添加用户的对话框
            console.log(this.addForm);
            this.userList.push(this.addForm);
            this.totalItems += 1;
            this.handleCurrentChang;
            this.addDialogVisible = false;
            // 重新获取用户列表数据
            // this.getUserList()
        })
        },
        async getUserList(){
            // const{data:res} = await this.$http.get('users',{params:this.queryInfo});
            // if (res.meta.status != 200) return this.$message.error('获取用户列表失败');
            // // const {data:data} = await this.$http.get('users',{params:this.queryInfo});
            // // console.log(data);
            // // 根据设定分页获取用户列表
            // this.userList = res.data.users;
            // console.log(this.userList);
            // // 获取总共记录数量
            // this.total = res.data.total;
        },
        async changeUserState(userinfo){
            // console.log(userinfo);
            // const{data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`);
            // console.log(res);
            // if (res.meta.status !== 200) {
            //     userinfo.mg_state = !userinfo.mg_state;
            //     return this.$message.error('更新用户状态失败');
            // }
            // return this.$message.success('更新用户状态成功');
        },
        formatBoolean(row,col,cellValue){
            if (cellValue) return "是";
            else return "否";
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
}
</script>

<style lang="less" scoped>

</style>