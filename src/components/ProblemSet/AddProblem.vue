<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>题库管理</el-breadcrumb-item>
            <el-breadcrumb-item>上传题目</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 卡片视图 -->
        <el-card>
            <!-- input和搜索 -->
            <el-row :gutter="4">
                <el-col :span="3" style="margin-top:5px;">
                    <el-tag type="info">请选择题目模版</el-tag>
                </el-col>
                <el-col :span="6">
                    <el-select  placeholder="请选择" filterable v-model="type">
                        <el-option
                            v-for="item in templates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col> 
            </el-row>
        </el-card>
        <el-card>
            <single-select-form :mytype="type" v-if="type=='单选题'?isShowSingle=true:isShowSingle=false"></single-select-form>
            <multiple-select-form :mytype="type" v-if="type=='多选题'?isShowMultiple=true:isShowMultiple=false"></multiple-select-form>
            <completion :mytype="type" v-if="type=='填空题'?isCompletion=true:isCompletion=false"></completion>
            <!-- <el-form ref="form" :model="addproblemform" label-width="100px" label-position="left" size="medium" style="width:100%;">
                <el-tag type="info" id="hint_tag" size="medium">当前选择的题型是：{{addproblemform.type}}</el-tag>
                <el-form-item label="年级" style="width:30%;">
                    <el-input id="add_grade" v-model="addproblemform.grade"></el-input>
                </el-form-item>
                <el-form-item label="学科" style="width:30%;">
                    <el-input v-model="addproblemform.subject"></el-input>
                </el-form-item>
                <el-form-item label="题干" style="width:80%;">
                    <el-input v-model="addproblemform.content" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="选项A" style="width:80%;">
                    <el-input v-model="addproblemform.option_a"></el-input>
                </el-form-item>
                <el-form-item label="选项B" style="width:80%;">
                    <el-input v-model="addproblemform.option_b"></el-input>
                </el-form-item>
                <el-form-item label="选项C" style="width:80%;">
                    <el-input v-model="addproblemform.option_c"></el-input>
                </el-form-item>
                <el-form-item label="选项D" style="width:80%;">
                    <el-input v-model="addproblemform.option_d"></el-input>
                </el-form-item>
                <el-form-item label="答案" style="width:30%;">
                    <el-input v-model="addproblemform.answer"></el-input>
                </el-form-item>
                <el-form-item label="难度" style="width:30%;">
                    <el-input v-model="addproblemform.difficulty"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>保存草稿</el-button>
                </el-form-item>
            </el-form> -->
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
import SingleSelectForm from '../MyTemplate/SingleSelectForm.vue'
import MultipleSelectForm from '@/components/MyTemplate/MultipleSelectForm'
import Completion from '@/components/MyTemplate/Completion'
export default {
    components:{
        SingleSelectForm,
        MultipleSelectForm,
        Completion
    },
    data() {
        return{
            isShowSingle:false,
            isShowMultiple:false,
            isCompletion:false,
            type:'',
            templates:[
                {
                    value:'单选题',
                    label:'单选题'
                },
                {
                    value:'多选题',
                    label:'多选题'
                },
                {
                    value:'填空题',
                    label:'填空题'
                },
                {
                    value:'主观题',
                    label:'主观题'
                },
                {
                    value:'判断题',
                    label:'判断题'
                }
            ],
            // addproblemform: {
            //     grade:'',
            //     subject: '',
            //     type: '',
            //     content: '',
            //     difficulty: 0,
            //     option_a: '',
            //     option_b: '',
            //     option_c: '',
            //     option_d: '',
            //     answer:''
            // }
        }
    },
}
</script>