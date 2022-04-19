<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>卷库管理</el-breadcrumb-item>
            <el-breadcrumb-item>智能组卷</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!-- input和搜索 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="试卷名称" prop="papername" style="width:60%;">
                <el-input v-model="ruleForm.papername"></el-input>
            </el-form-item>
            <el-form-item label="学科" prop="subject" style="width:50%;text-align:left;">
            <el-select v-model="ruleForm.subject" placeholder="请选择试卷学科">
                <el-option label="高等数学" value="高等数学"></el-option>
                <el-option label="线性代数" value="线性代数"></el-option>
                <el-option label="大学英语" value="大学英语"></el-option>
                <el-option label="计算机组成原理" value="计算机组成原理"></el-option>
                <el-option label="计算机网络" value="计算机网络"></el-option>
                <el-option label="网络信用" value="网络信用"></el-option>
                <el-option label="数据结构" value="数据结构"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="总分" required style="width:15%" prop="total">
                <el-input v-model="ruleForm.score"><i slot="suffix" style="margin-right:5px">分</i></el-input>
            </el-form-item>
                <el-row :gutter="1">
                    <el-col :span="12">
                        <el-form-item label="偏重知识点" prop="point" style="width:100%;text-align:left;">
                            <el-select id="point" v-model="ruleForm.point" placeholder="为了更好地组卷，请选择试卷偏重考察的知识点"  multiple>
                                <el-option
                                    v-for="item in point_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="占比百分比" prop="per_point" style="margin-left:-50px;width:60%"> 
                            <!-- <el-input v-model="ruleForm.per_point"><i slot="suffix" style="margin-right:5px">%</i></el-input> -->
                            <el-popover
                            title="设置知识点百分比"
                            placement="top"
                            width="400px"
                            v-model="visible">
                            <!-- <p>这是一段内容这是一段内容确定删除吗？</p> -->
                            <el-form ref="form" :model="form" label-width="100px" label-position="left">
                                <el-form-item label="网络层次划分">
                                    <el-input v-model="form.line1" placeholder=""><i slot="suffix" style="margin-right:5px">%</i></el-input>
                                </el-form-item>
                                <el-form-item label="应用层">
                                    <el-input v-model="form.line2"><i slot="suffix" style="margin-right:5px">%</i></el-input>
                                </el-form-item>
                                <el-form-item label="物理层">
                                    <el-input v-model="form.line3"><i slot="suffix" style="margin-right:5px">%</i></el-input>
                                </el-form-item>
                                <el-form-item label="TCP/IP协议">
                                    <el-input v-model="form.line4"><i slot="suffix" style="margin-right:5px">%</i></el-input>
                                </el-form-item>
                            </el-form>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="confirm">确定</el-button>
                            </div>
                            <el-button slot="reference">设置</el-button>
                            </el-popover>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="4">
                        <el-form-item label="单选题题数" prop="SingleSelect">
                            <el-input v-model="ruleForm.single_select"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="每题分值" prop="SingleSelectPoint">
                            <el-input v-model="ruleForm.single_select_point"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="4">
                        <el-form-item label="多选题题数" prop="Multipleelect">
                            <el-input v-model="ruleForm.multiple_select"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="每题分值" prop="MultipleSelectPoint">
                            <el-input v-model="ruleForm.multiple_select_point"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="4">
                        <el-form-item label="判断题题数" prop="Multipleelect">
                            <el-input v-model="ruleForm.choice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="每题分值" prop="MultipleSelectPoint">
                            <el-input v-model="ruleForm.choice_point"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="4">
                        <el-form-item label="填空题题数" prop="Completion">
                            <el-input v-model="ruleForm.completion"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="每题分值" prop="CompletionPoint">
                            <el-input v-model="ruleForm.completion_point"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="4">
                        <el-form-item label="主观题题数" prop="Subjective">
                            <el-input v-model="ruleForm.subjective"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="每题分值" prop="SubjectivePoint">
                            <el-input v-model="ruleForm.subjective_point"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="难度系数" style="width:15%;">
                    <el-input v-model="ruleForm.difficulty"></el-input>
                </el-form-item>
                 <el-form-item label="是否公开" style="width:15%;">
                    <el-switch v-model="ruleForm.isopen"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        form:{
            line1:'',
            line2:'',
            line3:'',
            line4:''
        },
        visible: false,
        ruleForm: {
          name: '',
          subject: '',
          score:100,
          point:'',
          per_point:50,
          single_select:0,
          single_select_point:0,
          choice:0,
          choice_point:0,
          multiple_select:0,
          multiple_select_point:0,
          completion:0,
          completion_point:0,
          subjective:0,
          subjective_point:0,
          difficulty:0,
          isopen:true,
          type: [],
          resource: '',
          desc: ''
        },
        point_options:[
            {
                value: '选项1',
                label: '网络层次划分'
            },
            {
                value: '选项2',
                label: 'OSI七层网络模型'
            },
            {
                value: '选项3',
                label: '应用层'
            },
            {
                value:'选项4',
                label:'传输层'
            },
            {
                value:'选项5',
                label:'网络层'
            },
            {
                value:'选项6',
                label:'数据链路层'
            },
            {
                value:'选项7',
                label:'物理层'
            },
            {
                value:'选项8',
                label:'TCP/IP协议'
            },
            {
                value:'选项9',
                label:'路由选择协议'
            },
            {
                value:'选项10',
                label:'子网掩码及网络划分'
            },
            {
                value:'选项11',
                label:'DNS协议'
            },
            {
                value:'选项12',
                label:'ARP协议'
            }
        ],
        rules: {
          papername: [
            { required: true, message: '请输入考试名称', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ],
        //   total:[
        //     { required: true, message: '请输入考试名称', trigger: 'blur' },
        //     { min: , max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        //   ]
          subject: [
            { required: true, message: '请选择一个学科', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
        //   subject: [
        //     { type: 'array', required: true, message: '请选择一个学科', trigger: 'change' }
        //   ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        confirm(){
            this.visible = false;
            this.$message.success('设置知识点占比成功');
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onSubmit(){
          this.$message.success('创建成功');
      }
    }
  }
</script>
<style lang="less">
    #point{
        width:400px;
    }
</style>