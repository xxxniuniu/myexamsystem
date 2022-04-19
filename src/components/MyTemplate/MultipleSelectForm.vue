<template>
    <el-form ref="form" :model="addproblemform" label-width="130px" label-position="left" size="medium" style="width:100%;">
        <el-tag type="info" id="hint_tag" size="medium">当前选择的题型是：{{mytype}}</el-tag>
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
            <el-input v-model="addproblemform.answer" placeholder="多个答案用;隔开"></el-input>
        </el-form-item>
        <el-form-item label="部分得分" prop="delivery" style="width:15%;">
            <el-switch v-model="addproblemform.part_score"></el-switch>
        </el-form-item>
        <el-form-item label="难度" style="width:20%;">
            <el-input v-model="addproblemform.difficulty"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>保存草稿</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data() {
        return{
            addproblemform: {
                grade:'',
                subject: '',
                type: '',
                content: '',
                difficulty: 0,
                option_a: '',
                option_b: '',
                option_c: '',
                option_d: '',
                answer:'',
                part_score:false
            }
        }
    },
    methods:{
        onSubmit(){
            console.log("我是多选题模版"+this.addproblemform.grade+this.addproblemform.subject)
        }
    },
    props: {
        mytype: String,
        required:true
    },
}
</script>
<style scoped>
    #hint_tag{
        font-size: 20px;
        margin-left: -900px;
        margin-bottom: 20px;
    }
    #add_grade{
        width:60%;
    }
</style>