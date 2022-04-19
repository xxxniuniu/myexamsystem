<template slot-scope="scope">
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>考试管理</el-breadcrumb-item>
            <el-breadcrumb-item>考试监考</el-breadcrumb-item>
            <el-breadcrumb-item>2020-2021(1)计算机网络期末模拟考试</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="10">
            <el-col :span="18">
                <el-card class="notice_card">
                <span>通知：</span>
                <span style="font-size:20px;color:red">{{note2students}}</span>
            </el-card>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" style="margin-top:24px" @click="dialogVisible = true">发送通知</el-button>
                <el-badge :value="3" class="item">
                    <el-popover
                    placement="right"
                    width="100px"
                    trigger="click">
                    <ul>
                        <li style="margin-bottom:10px"><el-tag style="margin-right:60px">座位号100</el-tag> <span style="margin-right:60px">举手1次</span></li>
                        <li style="margin-bottom:10px"><el-tag style="margin-right:60px">座位号103</el-tag> <span style="margin-right:60px">举手1次</span></li>
                        <li style="margin-bottom:5px"><el-tag style="margin-right:60px">座位号106</el-tag> <span style="margin-right:60px">举手1次</span></li>
                    </ul>
                    <el-button slot="reference" type="primary" style="margin-top:-18px;margin-left:15px;margin-bottom:4px" @click="showmessage">消息</el-button>
                    <!-- <el-button slot="reference">click 激活</el-button> -->
                    </el-popover> 
                </el-badge>
                
                <!-- <el-divider direction="vertical"></el-divider>
                <el-button type="primary">123</el-button> -->
            </el-col>
        </el-row>
        
        <el-divider></el-divider>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/paper.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>座位100</span>
                        <div class="bottom clearfix">
                        <!-- <time class="time">{{ currentDate }}</time> -->
                            <!-- <el-button type="primary" plain class="button">提醒学生</el-button> -->
                            <div style="font-size:30px">
                                <el-button type="primary" plain class="button" @click="studentDialogVisible = true">提醒学生</el-button>
                                <!-- <el-button size="medium" type="primary" icon="el-icon-chat-dot-square" circle></el-button> -->
                            </div>
                            
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/paper.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>座位101</span>
                        <div class="bottom clearfix">
                        <!-- <time class="time">{{ currentDate }}</time> -->
                            <!-- <el-button type="primary" plain class="button">提醒学生</el-button> -->
                            <div style="font-size:30px">
                                <el-button type="primary" plain class="button">提醒学生</el-button>
                                <!-- <el-button size="medium" type="primary" icon="el-icon-chat-dot-square" circle></el-button> -->
                            </div>
                            
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/paper.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>座位102</span>
                        <div class="bottom clearfix">
                        <!-- <time class="time">{{ currentDate }}</time> -->
                            <!-- <el-button type="primary" plain class="button">提醒学生</el-button> -->
                            <div style="font-size:30px">
                                <el-button type="primary" plain class="button">提醒学生</el-button>
                                <!-- <el-button size="medium" type="primary" icon="el-icon-chat-dot-square" circle></el-button> -->
                            </div>
                            
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/paper.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>座位103</span>
                        <div class="bottom clearfix">
                        <!-- <time class="time">{{ currentDate }}</time> -->
                            <!-- <el-button type="primary" plain class="button">提醒学生</el-button> -->
                            <div style="font-size:30px">
                                <el-button type="primary" plain class="button">提醒学生</el-button>
                                <!-- <el-button size="medium" type="primary" icon="el-icon-chat-dot-square" circle></el-button> -->
                            </div>
                            
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/paper.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>座位104</span>
                        <div class="bottom clearfix">
                        <!-- <time class="time">{{ currentDate }}</time> -->
                            <!-- <el-button type="primary" plain class="button">提醒学生</el-button> -->
                            <div style="font-size:30px">
                                <el-button type="primary" plain class="button">提醒学生</el-button>
                                <!-- <el-button size="medium" type="primary" icon="el-icon-chat-dot-square" circle></el-button> -->
                            </div>
                            
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/paper.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>座位105</span>
                        <div class="bottom clearfix">
                        <!-- <time class="time">{{ currentDate }}</time> -->
                            <!-- <el-button type="primary" plain class="button">提醒学生</el-button> -->
                            <div style="font-size:30px">
                                <el-button type="primary" plain class="button">提醒学生</el-button>
                                <!-- <el-button size="medium" type="primary" icon="el-icon-chat-dot-square" circle></el-button> -->
                            </div>
                            
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/paper.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>座位106</span>
                        <div class="bottom clearfix">
                        <!-- <time class="time">{{ currentDate }}</time> -->
                            <!-- <el-button type="primary" plain class="button">提醒学生</el-button> -->
                            <div style="font-size:30px">
                                <el-button type="primary" plain class="button">提醒学生</el-button>
                                <!-- <el-button size="medium" type="primary" icon="el-icon-chat-dot-square" circle></el-button> -->
                            </div>
                            
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/paper.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>座位107</span></span>
                        <div class="bottom clearfix">
                        <!-- <time class="time">{{ currentDate }}</time> -->
                            <!-- <el-button type="primary" plain class="button">提醒学生</el-button> -->
                            <div style="font-size:30px">
                                <el-button type="primary" plain class="button">提醒学生</el-button>
                                <!-- <el-button size="medium" type="primary" icon="el-icon-chat-dot-square" circle></el-button> -->
                            </div>
                            
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog
        title="通知"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <!-- <span>请编辑通知的内容</span> -->
        <!-- <span slot="footer" class="dialog-footer"> -->
            <div class="select">
                <el-select class="selectStudent" v-model="whichstudent" multiple placeholder="请选择学生座位号（默认全选）" style="width:300px">
                    <el-option
                    v-for="item in studentList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-input placeholder="请编辑通知的内容" style="margin-bottom:40px;height:30px"  v-model="note2students"  type="textarea"></el-input>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="test1">确定发送</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="已成功提醒学生"
        :visible.sync="studentDialogVisible"
        width="25%"
        :before-close="handleClose">
        <!-- <span>请编辑通知的内容</span> -->
        <!-- <span slot="footer" class="dialog-footer"> -->
            <!-- <el-input placeholder="请编辑通知的内容" style="margin-bottom:20px"  v-model="note2students" ></el-input> -->
            <!-- <el-button @click="studentDialogVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="studentDialogVisible = false" style="margin-top:-10px">确 定</el-button>
        <!-- </span> -->
        </el-dialog>
    </div>
</template>
<script>

export default{
    data() {
        return{
            currentDate:new Date(),
            note2students:'第7题有两个答案，需要将两个答案都写出来  ‼️',
            dialogVisible: false,
            studentDialogVisible: false,
            whichstudent:'',
            studentList:[
                {
                    value:'张三',
                    label:'100'
                },
                {
                    value:'李四',
                    label:'101'
                },
                {
                    value:'张5',
                    label:'102'
                },
                {
                    value:'张5',
                    label:'103'
                },
                {
                    value:'104',
                    label:'104'
                },
                {
                    value:'105',
                    label:'105'
                },
                {
                    value:'106',
                    label:'106'
                }
            ],
        }
    },
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        test1(){
            this.dialogVisible = false;
            this.$message.success('发送成功！');
        }
    },
    change () {
        this.$forceUpdate()
    },
    showmessage(){

    }
}
</script>

<style lang="less">
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
    .el-card{
        height: auto;
    }
    img{
        height: auto;
        width:280px;
    }
    .notice_card{
        height: auto;
        text-align: left;
        width: 100%;
    }
    .selectStudent{
        margin-bottom: 20px;
    }
    .select{
        text-align: left;
    }
</style>