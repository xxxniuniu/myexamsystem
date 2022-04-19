<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>题库管理</el-breadcrumb-item>
            <el-breadcrumb-item>模版导题</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card style="width:60%;height:300px">
            <el-row type="flex" justify="center" class="card_first_line">
                <el-col :span="24"><span class="title">单题图片识别</span></el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                  <!-- <el-button type="primary">上传图片<i class="el-icon-picture el-icon--right"></i></el-button> -->
                <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture"> -->
                      <el-popover
                            v-model="visible"
                            title="确认识别题目信息"
                            placement="top"
                            width="600"
                            trigger="click">
                            <!-- <p>这是一段内容这是一段内容确定删除吗？</p> -->
                            <el-form ref="form" :model="form" label-width="100px" label-position="left">
                                <el-form-item label="题干">
                                    <el-input v-model="form.content" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="选项A">
                                    <el-input v-model="form.option_a"></el-input>
                                </el-form-item>
                                <el-form-item label="选项B">
                                    <el-input v-model="form.option_b"></el-input>
                                </el-form-item>
                                <el-form-item label="选项C">
                                    <el-input v-model="form.option_c"></el-input>
                                </el-form-item>
                                <el-form-item label="选项D">
                                    <el-input v-model="form.option_d"></el-input>
                                </el-form-item>
                                <el-form-item label="答案">
                                    <el-input v-model="form.answer"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="难度">
                                    <el-input v-model="form.difficulty"><i slot="suffix" style="margin-right:5px">%</i></el-input>
                                </el-form-item> -->
                                <el-form-item label="难度">
                                  <el-select v-model="form.difficulty">
                                    <el-option
                                        v-for="item in difficulties"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"    >
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item label="知识点">
                                    <el-input v-model="form.point"></el-input>
                                </el-form-item>
                            </el-form>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="confirm">确定</el-button>
                            </div>
                            <el-button type="primary" slot="reference">点击上传<i class="el-icon-picture el-icon--right"></i></el-button>
                            </el-popover>
                <div class="el-upload__tip">只能上传jpg/png文件，且不超过2mb</div>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2mb</div> -->
                <!-- </el-upload> -->
                </el-col>
            </el-row>
        </el-card>
        <el-card style="width:60%;height:300px">
            <el-row type="flex" justify="center" class="card_first_line">
                <el-col :span="24"><span class="title">按照模版上传题目</span></el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="24"><el-button type="primary">上传文件<i class="el-icon-upload el-icon--right"></i></el-button></el-col> -->
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
                style="margin-top:10px">
                <el-button type="primary">上传文件<i class="el-icon-upload el-icon--right"></i></el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2mb</div> -->
                </el-upload>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
          difficulties:[
                {
                    value:'选项1',
                    label:'容易'
                },
                {
                    value:'选项2',
                    label:'适中'
                },
                {
                    value:'选项3',
                    label:'较难'
                },
                {
                    value:'选项4',
                    label:'难'
                }
            ],
            imageUrl: '',
            // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            fileList:[],
            fullscreenLoading: false,
            visible:false,
            form:{
              content:'以下关于T1 载波的描述中，错误的是',
              option_a:'T1 载波速率是针对脉冲编码调制PCM 的时分多路复用而设计',
              option_b:'T1 系统将24 路数字语音信道复用在一条通信线路上',
              option_c:'PCM 编码器轮流将24 路、每个信道8bit 的数字语音信号插入到帧中指定位置',
              option_d:'T1 载波的数据传输速率为2.048Mbps',
              answer:'D',
              point:'',
              difficulty:''
            },
        }
    },
 methods: {
      confirm(){
        this.visible = false;
        this.$message.success('导入成功');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      submit(){
        this.visible = false;
      }
    }
}
</script>
<style lang="less" scoped>
    .el-card{
        margin-top: 30px;
    }
    .title{
        font-size: 20px;
    }
    .card_first_line{
        margin-bottom: 20px;
        margin-top: 20px;

    }
      .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>