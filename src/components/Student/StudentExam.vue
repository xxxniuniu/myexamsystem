<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/studenthome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>所有考试</el-breadcrumb-item>
            <el-breadcrumb-item>我的考试</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
                <el-table
                :cell-style="stateJudge"
                :data="testList"
                style="width: 100%"
                border stripe="">
                    <el-table-column
                        type="index"
                        label="#">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="考试名称"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="subject"
                        label="考试科目"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="class"
                        label="考试班级"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="时长"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态"
                        width="130">
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
                            <el-tooltip effect="dark" content="进入" placement="top" :enterable="false">
                                <el-button type="primary" plain @click="goto" v-if="isShowGoTo">进入</el-button>
                                <el-button type="info" plain @click="mark" v-if="isShowMarking" disabled>进入</el-button>
                            </el-tooltip>
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
            testList:[
                {
                    name:'2020-2021(1)计算机网络期末模拟考试',
                    subject:'计算机网络',
                    class:'计算机194;计算机195',
                    time:'2小时',
                    state:'已开始'
                },
                {
                    name:'高等数学上期末考试',
                    subject:'高等数学上',
                    class:'计算机194;计算机195',
                    time:'2小时',
                    state:'未开始'
                },
            ],
            todo:'进入',
            isShowMarking:false,
            isShowGoTo:true
        }
    },
    
    methods:{
        stateJudge({row,column,rowIndex,columnIndex}){
            if (column.label === '状态'){
                if (row.state === '已开始'){
                    this.isShowGoTo = true;
                    this.isShowMarking = false;
                    return 'color:red;'
                }
                if (row.state === '未开始'){
                    this.isShowMarking = true;
                    this.isShowGoTo = false;
                }
            }
        },
        goto(){
            this.$router.push('/studentidentify')
        },
        mark(){
            this.$router.push('/automarking')
        }
    }
}
</script>