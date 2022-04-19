<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>题库管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑题目</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 卡片视图 -->
        <el-card>
            <!-- input和搜索 -->
            <el-row :gutter="2">
                <el-col :span="1" style="margin-top:5px;margin-right:-35px">
                    <el-tag type="info">题型</el-tag>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="search.type" placeholder="请选择" filterable>
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1" style="margin-top:5px;margin-right:-35px;margin-left:-10px">
                    <el-tag type="info">学科</el-tag>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="search.subject" placeholder="请选择" filterable>
                        <el-option
                            v-for="item in subjects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1" style="margin-top:5px;margin-left:-10px;margin-right:15px">
                    <el-tag type="info">题干</el-tag>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入内容" class="input-with-select" v-model="search.content" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="doFilter"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </el-card>
         <el-card>
<!--                 
                <el-tag type="">难度系数注释</el-tag> -->
                <div style="text-align:left">
                    <el-tag type="info" style="margin-left:20px;margin-right:50px;color:red;font-size:18px">难度系数注释</el-tag>
                    <span style="font-size:15px;color:gray">容易:0～0.25 &nbsp&nbsp   适中:0.26～0.50 &nbsp&nbsp   较难:0.51～0.75 &nbsp&nbsp   难:0.76～1</span>
                </div>
                <el-table
                :data="tableDataEnd"
                style="width: 100%"
                border stripe="">
                    <!-- <el-table-column
                        type="index"
                        label="#">
                    </el-table-column> -->
                    <el-table-column
                        prop="number"
                        label="题号"
                        width="70">
                    </el-table-column>
                    <el-table-column
                        prop="subject"
                        label="学科"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="题型"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="题干"
                        width="260">
                    </el-table-column>
                    <el-table-column
                        prop="answer"
                        label="答案"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="point"
                        label="知识点"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="difficulty"
                        label="难度"
                        width="80">
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
                        prop="time"
                        label="创建时间"
                        width="180">
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
            </el-card>
                <!-- <div class="block">
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
                </div> -->
        <!-- 卡片视图 -->
    </div>
</template>
<script>
export default({
    data(){
        return {
            flag:false,
            totalItems:0,
            pageSize:2,
            currentPage:1,
            // 搜索
            filterTableDataEnd:[],
            tableDataEnd:[],
            problemList:[
                {
                    number:'101',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于物理层的描述中，错误的是',
                    point:'物理层',
                    answer:'D',
                    difficulty:'0.2',
                    time:'2021-10-30-14:56:22'
                },
                {
                    number:'102',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于数据传输速率的描述中，错误的是',
                    point:'数据链路层',
                    answer:'C',
                    difficulty:'0.6',
                    time:'2021-10-30-14:56:22'
                },
                {
                    number:'103',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于时分多路复用概念的描述中，错误的是',
                    point:'网络层',
                    answer:'C',
                    difficulty:'0.2',
                    time:'2021-10-30-14:56:22'
                },
                {
                    number:'104',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于奈奎斯特准则的描述中，错误的是',
                    point:'数据链路层',
                    answer:'A',
                    difficulty:'0.6',
                    time:'2021-10-30-14:56:22'
                },
                {
                    number:'501',
                    subject:'计算机网络',
                    type:'主观题',
                    content:'已知：电话线路宽带B=3000Hz，根据奈奎斯特准则，求：无噪声信道的最大数据传输速率是多少？',
                    point:'数据链路层',
                    answer:'6Kbps',
                    difficulty:'0.8',
                    time:'2021-10-30-14:56:22'
                },
                {
                    number:'106',
                    subject:'高等数学上',
                    type:'选择题',
                    content:'以下极限的定义正确的是',
                    point:'极限',
                    answer:'A',
                    difficulty:'0.2',
                    time:'2021-10-30-14:56:22'
                },
                {
                    number:'106',
                    subject:'高等数学上',
                    type:'选择题',
                    content:'以下反常积分收敛的是',
                    point:'定积分',
                    answer:'C',
                    difficulty:'0.2',
                    time:'2021-10-30-14:56:22'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.4',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                {
                    number:'107',
                    subject:'计算机网络',
                    type:'选择题',
                    content:'以下关于T1载波的描述中错误的是',
                    point:'',
                    answer:'A',
                    difficulty:'0.5',
                    time:'2022-04-13-20:38:50'
                },
                
            ],
            options:[
                {
                    value:'选项1',
                    label:'单选题'
                },
                {
                    value:'选项2',
                    label:'多选题'
                },
                {
                    value:'选项3',
                    label:'填空题'
                },
                {
                    value:'选项4',
                    label:'主观题'
                },
                {
                    value:'选项5',
                    label:'判断题'
                }
            ],
            subjects:[
                {
                    value:'选项1',
                    label:'高等数学上'
                },
                {
                    value:'选项2',
                    label:'高等数学下'
                },
                {
                    value:'选项3',
                    label:'大学英语一'
                },
                {
                    value:'选项4',
                    label:'大学英语二'
                },
                {
                    value:'选项5',
                    label:'程序设计基础c语言'
                },
                {
                    value:'选项6',
                    label:'计算机网络'
                }
            ],
            search:{
                type:'',
                subject:'',
                content:''
            },
            haveflag:false
            // type:''
        }
    },
    created() {
        this.totalItems = this.problemList.length;
        // 当前pagesize放不下所有的problemlist
        if (this.totalItems > this.pageSize){
            for (let index=0;index<this.pageSize;index++){
                this.tableDataEnd.push(this.problemList[index]);
            }
        }else{
            this.tableDataEnd = this.problemList;
        }
    },
    methods:{
        doFilter(){
            if (this.search.content == ""){
                // if (this.search.type == ""){
                //     if (this.search.subject == ""){
                        // 为空，显示全部数据
                        this.totalItems = this.problemList.length;
                        this.currentChangePage(this.problemList); 
                        this.flag = false;
                        return;
                //     }
                // }
            }
            if (this.search.type !== ""){
                this.problemList.forEach((value,index) =>{
                    if(value.type.indexOf(this.search.type)>=0){
                        this.filterTableDataEnd.push(value)
                    }
                })
            }
            // if (this.search.subject !== ""){
            //     this.problemList.forEach((value,index) =>{
            //         if(value.subject.indexOf(this.search.subject)>=0){
            //             for (let index=0;index<this.filterTableDataEnd.length;index++){
            //                 if (this.filterTableDataEnd[index].number == value.number) {
            //                     this.haveflag = true;
            //                     break;
            //                 }
            //             }
            //         }
            //     })
            // }
            this.tableDataEnd = [];
            // 每次手动将数据置空,因为会出现多次点击搜索情况
            this.filterTableDataEnd=[];
            this.problemList.forEach((value, index) => {
                if(value.content){
                    if(value.content.indexOf(this.search.content)>=0){
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
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(1);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            if (!this.flag){
                this.currentChangePage(this.problemList);
                console.log(this.tableDataEnd);
            }else{
                this.currentChangePage(this.filterTableDataEnd);
                console.log(this.tableDataEnd)
            }
        },
        currentChangePage(list){
            this.tableDataEnd = [];
            let from = (this.currentPage-1) * this.pageSize;
            let to = this.currentPage * this.pageSize;
            for (; from < to; from++) {
                if (list[from]) {
                    this.tableDataEnd.push(list[from]);
                }
            }
        }
    }
})
</script>
<style scoped>
    /* span{
        margin-top: 10px;
    } */
</style>