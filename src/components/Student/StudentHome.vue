<template>
    <el-container class="home_container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../../assets/flag.png" alt="">
                <span>考试管理系统</span>
            </div>
            <span id='username'>学生：{{showUsername}}</span>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体 -->
    <el-container>
        <!-- 侧边栏 -->
        <el-aside :width='isCollapse? "64px":"200px"'>
            <div class="toggle-button" @click="toggleCollapse">|||</div>
            <el-menu
                @open="handleOpen"
                @close="handleClose"
                class="el-menu-vertical-demo"
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409EFF"
                :unique-opened="true"
                :collapse=isCollapse
                :collapse-transition="false"
                :router="true"
                :default-active=activePath
                >
                <!-- 一级菜单 -->
                <el-submenu :index="item.id.toString()" v-for="item in menulist" :key="item.id">
                    <!-- 一级菜单模版 -->
                    <template slot="title">
                        <i :class="iconsObj[item.id.toString()]"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{subItem.authName}}</span>
                        </template>
                    </el-menu-item>
                    <!-- <el-menu-item-group>
                        <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group> -->
                    <!-- <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group> -->
                    <!-- <el-submenu el-submenu index="1-4">
                        <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu> -->
                </el-submenu>
            
            </el-menu>
        </el-aside>
        <!-- 右侧内容主题 -->
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
</template>

<script>
import Cookie from 'js-cookie'
    export default {
        data(){
           return{
               menulist:[
                   {
                       id:1003,
                       authName:'我的考试',
                       children:[
                           {
                               authName:'所有考试',
                               path:'studentexam'
                           },
                       ]
                   },
                   {
                       id:1005,
                       authName:'我的成绩',
                       children:[
                           {
                               authName:'我的成绩',
                               path:'analysis'
                           }
                       ]
                   }
               ],
               iconsObj:{
                    '1001':'iconfont icon-user',
                    '1002':'iconfont icon-tijikongjian',
                    '1003':'el-icon-notebook-2',
                    '1004':'el-icon-reading',
                    '1005':'el-icon-s-data'
                    // '101':'iconfont icon-shangpin',
                    // '102':'iconfont icon-danju',
                    // '145':'iconfont icon-baobiao'
               },
               // 是否可以折叠
               isCollapse:false,
               // 被激活的nav地址
               activePath:""
           } 
        },
        // created(){
        //     this.getMenuList()
        //     this.activePath = sessionStorage.getItem('activePath');
        // },
        methods:{
            logout(){
                sessionStorage.clear();
                // 重定向
                this.$router.push('/login');
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            async getMenuList(){
                // const {data:res} = await this.$http.get('menus');
                // console.log({res});
                // if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
                // this.menulist = res.data;
            },
            toggleCollapse(){
                this.isCollapse = !this.isCollapse;
            },
            // saveNavState(activePath){
            //     this.activePath = activePath;
            //     // 刷新页面保存状态
            //     sessionStorage.setItem('activePath',activePath);
            // }
        },
        computed:{
            showUsername(){
                return Cookie.get('username')
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-header{
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;
        > div{
            display: flex;
            align-items: center;
            > span{
                margin-left: 15px;
            }
        }
        #username{
            margin-left: 1000px;
            font-size: 16px;
        }
    }
    .el-aside{
        background-color: #333744;
        .el-menu{
            border-right: none;
        }
        .toggle-button{
            background-color: #4a5064;
            font-size: 10px;
            line-height: 24px;
            color: #fff;
            text-align: center;
            letter-spacing: 0.2em;
            cursor: pointer;
        }
    }
    .el-main{
        background-color: #eaedf1;
    }
    .home_container{
        height: 100%;
    }
    img{
        height: 40px;
        width: 30px;
        margin-left: 15px;
    }
    .iconfont{
        padding-right: 10px;
    }
    span{
        margin-right: 20px;
    }
    // 二级菜单
    .el-icon-menu{
        margin-left: 20px;
    }
</style>