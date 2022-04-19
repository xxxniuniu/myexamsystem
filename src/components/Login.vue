<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/flag_login.png" alt="" style="height:auto;width:100px;">
            </div>
            <el-form ref="loginFormRef" class="login_form" label-width="" :model="loginForm" :rules="loginFormRules">
                <el-form-item label="" prop="username">
                    <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input prefix-icon="el-icon-view" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="" prop="role" style="width:50%;display:inline-flex;margin-right:80px">
                    <el-radio v-model="loginForm.role" label="学生"></el-radio>
                    <el-radio v-model="loginForm.role" label="教师"></el-radio>
                    <el-radio v-model="loginForm.role" label="管理员"></el-radio>
                </el-form-item>
                <el-form-item class="btns" style="display:inline-flex">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { Message } from "element-ui"

import Cookies from 'js-cookie'
export default{
    data(){
        return{
            // 登陆表单的数据对象
            loginForm:{
                username:"admin",
                password:"123456",
                role:''
            },
            // 表单验证规则
            loginFormRules:{
                username:[
                    {required:true , message:"请输入用户名",trigger:"blur"},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    {required:true , message:"请输入密码",trigger:"blur"},
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 重置按钮
        resetLoginForm(){
            console.log(this);
            this.$refs.loginFormRef.resetFields();
            // this.$data.loginForm.username = "";
        },
        // 登陆前利用表单验证进行预验证
        login(){
            if (this.loginForm.role === '学生'){
                console.log('学生');
                this.$router.push('/studenthome');
            }else if(this.loginForm.role === '教师'){
                console.log('教师');
                this.$router.push('/home');
            }else if(this.loginForm.role ==='管理员'){
                console.log('管理员');
                this.$router.push('/adminhome');
            }else if (this.loginForm.role ===''){
                return this.$message.error('请选择用户身份！');
            }
            Cookies.set('username',this.loginForm.username);
            // this.$router.push('/home');
            // 回调函数
            // 方法返回promise，简化操作加await，前面的函数加async，变成异步
            this.$refs.loginFormRef.validate(async valid =>{
                console.log(valid);
                // if (!valid){
                //     return;
                // }
                // const {data:res} = await this.$http.post('login',this.loginForm);
                // var meta = res.meta;
                // console.log(res);
                // if (meta.status != 200) return this.$message.error('登陆失败');
                // else this.$message.success('登陆成功');
                // // 将token保存至sessionStorage
                // sessionStorage.setItem('token',res.data.token);
                // // 编程式导航，跳转到主页，/home
                // this.$router.push('/home');
            });
        }
    }
}
</script>
<style lang="less" scoped>
    /* scoped:只在当前组件生效 */
    .login_container{
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box{
        width: 500px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        // 居中
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .avatar_box{
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #fff;
            img{
                height: 100%;
                widows: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }
    .btns{
        display: flex;
        // 尾部对齐
        justify-content: flex-end;
    }
    .login_form{
        width: 100%;
        padding: 0 20px;
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
    }
</style>