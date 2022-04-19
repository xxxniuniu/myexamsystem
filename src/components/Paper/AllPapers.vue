<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>卷库管理</el-breadcrumb-item>
            <el-breadcrumb-item>所有试卷</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户列表 -->
        <el-card>
                <el-table 
                :cell-style="stateJudge"
                :data="paperList"
                style="width: 100%"
                border stripe="">
                    <el-table-column
                        type="index"
                        label="#">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="试卷名称"
                        width="270">
                    </el-table-column>
                    <el-table-column
                        prop="subject"
                        label="试卷科目"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="author"
                        label="作者"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="score"
                        label="总分"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态"
                        width="120">
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
                        width="300">
                        <template v-slot:="scope">
                            <!-- <el-tooltip effect="dark" content="进入" placement="top" :enterable="false"> -->
                                <el-tooltip effect="dark" content="查看" placement="top" :enterable="false">
                                <el-button type="primary"  plain @click="goto">查看</el-button>
                                </el-tooltip>
                                <el-button type="warning" plain>编辑</el-button>
                                <el-button type="danger" plain>删除</el-button>
                            <!-- </el-tooltip> -->
                        </template>
                    </el-table-column>
                </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            paperList:[
                {
                    name:'2020-2021(1)期末考试模拟试卷',
                    subject:'高等数学上',
                    author:'张劳士',
                    score:'100',
                    state:'公开'
                },
                {
                    name:'2020-2021(1)期末考试',
                    subject:'高等数学上',
                    author:'张劳士',
                    score:'100',
                    state:'公开'
                },
                {
                    name:'2020-2021(1)计算机网络期末模拟考试',
                    subject:'计算机网络',
                    author:'teacher张',
                    score:'100',
                    state:'公开'
                },
            ]
        }
    },
    methods:{
        stateJudge({row,column,rowIndex,columnIndex}){
            if (column.label === '状态'){
                if (row.state === '公开'){
                    return 'color:lightgreen;'
                }
            }
        },
        goto(){
            this.$router.push('/testpaperdemo')
        }
    }
}
</script>