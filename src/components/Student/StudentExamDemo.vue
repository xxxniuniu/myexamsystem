<template>
<div class="exam-detail">
    <div class="inner">
        <el-breadcrumb separator="/" style="font-size:15px;margin-top:-5px">
            <el-breadcrumb-item :to="{ path: '/studenthome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>所有考试</el-breadcrumb-item>
            <el-breadcrumb-item>我的考试</el-breadcrumb-item>
            <el-breadcrumb-item>2020-2021(1)计算机网络期末模拟考试</el-breadcrumb-item>
        </el-breadcrumb>
    <!-- nav -->
    <el-card style="margin-top:20px">
        <div style="text-align:left;">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="2">
              <el-tag type="info" style="font-size:20px;margin-left:20px">人脸监测</el-tag>
            </el-col>
            <el-col :span="4">
              <img src="../../assets/face.png" alt="" style="width:100px;height:auto;margin-left:50px"> 
            </el-col>
            <el-col :span="8" style="margin-left:50px">
              <time-count :longTime="this.longTime" :messageTitle="messageTitle" :messageText="messageText"></time-count>
            </el-col>
            <el-col :span="4" style="margin-left:150px">
              <el-button type="primary" style="justify-content: flex-end;margin-left:20px" round @click="handsup">举手</el-button>
            <el-button type="danger" style="justify-content: flex-end;" round @click="submit">提交</el-button>
            </el-col>
          </el-row>
      </div>
    </el-card>
    <el-card>
        <div class="nav">
        <div class="nav_main">
            <div style="text-align:center">
                <h3 class="pt15">2020-2021(1)计算机网络期末模拟考试</h3>
                <p class="mt10">总分：100分&nbsp;&nbsp;&nbsp;&nbsp;合格分数线：60分&nbsp;</p>
            </div>
            <!-- <span style="margin-top:50px;margin-right:50px">人脸监测</span>
            <img src="../../assets/face.png" alt="" style="height:50px;width:50px;margin-left:1000px;margin-bottom:100px"> -->
            <!-- <span><img src="images/nav_erweima.jpg" /></span> -->
        </div>
    </div>
    </el-card>
    <el-row style="display: block;">
			<el-row class="backstyle" >
				</el-aside>
					<el-container> 
						<el-main class="content_style" style="margin-right: 15px;">
							<el-container>
								<!-- <el-header class="other_header" style="height: 80px;line-height: 35px;text-align: center; color:#5D9CEC ;">2020-2021(1)计算机网络期末模拟考试
									<p class="mt10" style="font-size:15px">总分：100分&nbsp;&nbsp;&nbsp;&nbsp;合格分数线：60分&nbsp;</p>
								</el-header> -->
								<el-main>
									<el-row>
										<el-tag class="type_tag" type="">选择题 （49分）</el-tag>
										<!-- 题目（总） -->
										<el-row :class="`classabc${index+1}`" v-for="(item,index) in datalist" style="margin-bottom: 20px;">
											<!-- 题号 -->
											<el-col span="2">
												<el-button class="i_style">{{index+1}}</el-button>
											</el-col>
											<!-- 题目 -->
											<el-col span="21">
												<!-- 题干 -->
												<el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
													{{item.title}}
												</el-row>
												<!-- 选择题选项 -->
												<el-row style="margin-top: 20px;" v-for="citem in item.result">
													<a @click="gotobutton(index)">
														<el-radio v-model="item.radio" :label="citem.outanswer">{{citem.outcome}}</el-radio>
													</a>
												</el-row>
											</el-col>
										</el-row>
										<el-tag class="type_tag" type="">判断题 （24分）</el-tag>
										<el-row :class="`classabc${index+1}`" v-for="(item,index) in choicelist" style="margin-bottom: 20px;">
											<!-- 题号 -->
											<el-col span="2">
												<el-button class="i_style">{{index+1}}</el-button>
											</el-col>
											<el-col span="21">
												<!-- 题干 -->
												<el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
													{{item.title}}
												</el-row>
												<!-- 判断题选项 -->
												<el-radio class="choice_radio" v-model="item.answer" label="1">正确</el-radio>
  												<el-radio class="choice_radio" v-model="item.answer" label="2">错误</el-radio>
											</el-col>
										</el-row>
										<el-tag class="type_tag" type="">填空题 （14分）</el-tag>
										<el-row :class="`classabc${index+1}`" v-for="(item,index) in completionlist" style="margin-bottom: 20px;">
											<!-- 题号 -->
											<el-col span="2">
												<el-button class="i_style">{{index+1}}</el-button>
											</el-col>
											<el-col span="21">
												<!-- 题干 -->
												<el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
													{{item.title}}
												</el-row>
												<!-- 填空题输入框选项 -->
												<el-input class='completion_input' v-model="item.answer"></el-input>
											</el-col>
										</el-row>
										<el-tag class="type_tag" type="">主观题 （13分）</el-tag>
										<el-row :class="`classabc${index+1}`" v-for="(item,index) in subjectivelist" style="margin-bottom: 20px;">
											<!-- 题号 -->
											<el-col span="2">
												<el-button class="i_style">{{index+1}}</el-button>
											</el-col>
											<el-col span="21">
												<!-- 题干 -->
												<el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
													{{item.title}}
												</el-row>
												<!-- 填空题输入框选项 -->
												<el-input class='subjective_input' v-model="item.answer" 
												type="textarea"
												:rows="4"
												placeholder="请输入内容"
												></el-input>
											</el-col>
										</el-row>
										<!-- <el-row style="margin-top: 60px;text-align: center;">
											<el-col span="12">
												<div>
												  <div class="mask" v-if="showModal" @click="showModal=false"></div>
												  <div class="pop" v-if="showModal">
														<img src="../../assets/niuniu.png" style="width: 100%;height:100%;"></img>
												  </div>
												  <el-button @click="showModal=true" type="primary" round>提交</el-button>
												</div>
											</el-col>
											<el-col span="12">
												<el-button type="primary" round>取消</el-button>
											</el-col>
										</el-row> -->
									</el-row>     
								</el-main>
							</el-container>
						</el-main>
					</el-container>
				</el-container>
		</el-row>
	</el-row>
<!-- 
    <el-button
    plain
    @click="open2">
    不会自动关闭
    </el-button>
    <el-button
    plain
    @click="open1">
    提醒
  </el-button> -->
    </div>
</div>

    
</template>
<script>
import TimeCount from '@/components/MyTemplate/TimeCount'
export default {
  components:{
    TimeCount
  },
  data() {
      return{
        longTime:60*60*2,
        messageTitle:'剩余时间',
        messageText:'内容',
        showModal: false,
      grades: 0,
      choicelist:[
        {
          title:'应用网关是在应用层实现网络互连的设备',
          answer:''
        },
        {
          title:'所有以太网交换机端口既支持10BASET标准，又支持100BASE－T标准',
          answer:''
        },
        {
          title:'UNIX和Linux操作系统均适合作网络服务器的基本平台',
          answer:''
        },
        {
          title:'半双工与全双工都有两个传输通道',
          answer:''
        }
      ],
      completionlist:[
        {
          title:'在大多数广域网中，通信子网一般都包括两部分：传输信道和____________',
          answer:''
        },
        {
          title:'IP的主要功能包括无连接数据传送、差错处理和____________',
          answer:''
        }
      ],
      subjectivelist:[
        {
          title:'请根据QAM 调制中波特率与相数，计算对应的比特率值。',
          answer:''
        }
      ],
      datalist: [{
        title: '以下关于物理层的描述中，错误的是？',
        answer: 'D',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '物理层的主要任务是保证比特流通过传输介质的正确传输',
        }, {
          outanswer: 'B',
          outcome: '连接物理层的传输介质可以有不同类型，如光纤与无线通信线路等',
        }, {
          outanswer: 'C',
          outcome: '物理层协议可以分为基于点-点通信线路与机遇广播线路两类',
        }, {
          outanswer: 'D',
          outcome: '物理层屏蔽了Ethernet 与IP 的差异性',
        }]
      }, {
        title: '以下关于数据传输速率的描述中，错误的是？',
        answer: 'C',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '数据传输速率表示每秒钟传输构成数据代码的二进制比特数',
        }, {
          outanswer: 'B',
          outcome: '对于二进制数据，数据传输速率为S=1/T(bps)',
        }, {
          outanswer: 'C',
          outcome: '常用的数据传输速率单位有：1Mbps=1.024x10^6bps',
        }, {
                      outanswer:'D',
                      outcome:'数据传输速率是描述数据传输系统性能的重要技术指标之一'
                  }]
      },{
        title: '以下关于时分多路复用概念的描述中，错误的是？',
        answer: 'C',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '时分多路复用将线路使用的时间分成多个时间片',
        }, {
          outanswer: 'B',
          outcome: '时分多路复用分为同步时分多路复用与统计时分多路复用',
        },{
          outanswer: 'C',
          outcome: '统计时分多路复用将时间片预先分配给各个信道',
        }, {
          outanswer: 'D',
          outcome: '时分多路复用使用“帧”与数据链路层“帧”的概念、作用是不同的',
        }]
      }, {
        title: '如果以下是一个8bit 数据的曼彻斯特编码波形这个数据是？',
        answer: 'B',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '10110100',
        }, {
          outanswer: 'B',
          outcome: '01001011',
        },{
          outanswer: 'C',
          outcome: '11010010',
        }, {
          outanswer: 'D',
          outcome: '01011100',
        }]
      },{
        title: '以下关于ADSL 与HFC 技术特点比较的描述中，错误的是?',
        answer: 'A',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: 'ADSL 主干线路使用光纤，HFC 主干线路使用宽带同轴电缆',
        }, {
          outanswer: 'B',
          outcome: 'ADSL 主干线路使用光纤，HFC 主干线路使用宽带同轴电缆',
        },{
          outanswer: 'C',
          outcome: '连接ADSL Modem 电话线是用户专用的，HFC 用户接入CATV 电缆是共享的',
        }, {
          outanswer: 'D',
          outcome: '连接ADSL Modem 电话线是用户专用的，HFC 用户接入CATV 电缆是共享的',
        }]
      },{
        title: '以下关于T1 载波的描述中，错误的是?',
        answer: 'D',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: 'T1 载波速率是针对脉冲编码调制PCM 的时分多路复用而设计',
        }, {
          outanswer: 'B',
          outcome: 'T1 系统将24 路数字语音信道复用在一条通信线路上',
        },{
          outanswer: 'C',
          outcome: 'PCM 编码器轮流将24 路、每个信道8bit 的数字语音信号插入到帧中指定位置',
        },{
          outanswer:'D',
          outcome:'T1 载波的数据传输速率为2.048Mbps'
        }]
      }, {
        title: '以下选项中不属于自含时钟编码的是?',
        answer: 'B',
        radio: '',
        show: '',
        result: [{
          outanswer: 'A',
          outcome: '曼彻斯特编码',
        }, {
          outanswer: 'B',
          outcome: '非归零码',
        }, {
          outanswer: 'C',
          outcome: '非归零码',
        }]
      }],
    }
  },
    methods:{
      			Submit(i) {
				var wei = "classabc" + i
				var el = document.getElementsByClassName(wei)[0];
				console.log(el.offsetTop);
				this.$nextTick(function() {
					window.scrollTo({
						"behavior": "smooth",
						"top": el.offsetTop
					});
				});
			},
			PritfGrade() {
				let a;
				for (a in this.$data.datalist) {
					if (this.$data.datalist[a].answer === this.$data.datalist[a].radio) {
						this.$data.grades = this.$data.grades + 1;
					}
				}
				alert("提交成功");
			},
			gotobutton(index) {
				this.$data.datalist[index].show = 'background: #00ABEA;';
			},
        handsup(){
            this.$message.success('已通知教师！');
        },
        submit(){
            this.$message.error('请注意，您还有未作答的题目！');
        },
        // 学生收到通知
        open2() {
            this.$notify({
            title: '通知',
            message: '禁止提前交卷！',
            duration: 0
            });
        },
        open1() {
            this.$notify({
            title: '警告',
            message: '请注意行为，收到老师的警告⚠️',
            type: 'warning',
            duration:10000
            });
        },
    }
}
</script>
<style scoped>
	.subjective_input{
		width: 500px;
	}
	.choice_radio{
		margin-top: 20px;
	}
	.type_tag{
		font-size: 18px;
		margin-bottom: 25px;
	}
	.completion_input{
	width: 400px;
	border-top-width: 0px;
	border-left-width: 0px;
	border-right-width: 0px;
	border-bottom-width: 1px;
	/*outline: medium;*/

	}
	.header_style {
		margin-top: 5px;
		border: 1px solid rgb(228, 228, 228);
		text-align: left;
		padding-left: 10px;
	}

	.other_header {
		background: rgb(255, 255, 255);
		font-size: 20px;
		font-weight: 400px;
		color: rgb(143, 201, 211);

	}

	.content_style {
		border: 1px solid rgb(228, 228, 228);
		text-align: left;
		padding-left: 10px;
	}

	.button_style {
		margin-top: 10px;
		margin-left: 18px;
		margin-left: 10px;
		width: 60px;
		text-align: center;
	}

	.i_style {
		background: rgb(93, 156, 236);
		font-weight: bold;
		border-radius: 50%;
	}

	/deep/ .el-radio__inner {}
    .mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1
}
    .pop {
  background-color: #fff;
  position: fixed;
  top: 300px;
  left: 550px;
  width: calc(100% - 1000px);
  height:calc(100% - 570px);
  z-index: 2
}
    .btn {
  background-color:rgb(93, 156, 236);;
  border-radius: 4px;
  border: 1px solid blue;
  padding: 4px 12px;
}

.exam-detail {
  background: #fafafa;

  padding: 20px 0;

  box-sizing: border-box;

  .inner {
    width: 1200px;

    margin: 0 auto;

    .title {
      margin-bottom: 20px;

      a {
        color: #333;

        margin-right: 5px;

      }

    }

    .cont {
      display: flex;

      justify-content: space-between;

      .cont-left {
        width: 742px;

        background: #fff;

        min-height: 600px;

        .subhead {
          width: 100%;

          height: 47px;

          background: #effaff;

          line-height: 47px;

          color: #0076ff;

          padding-left: 26px;

          box-sizing: border-box;

          font-size: 16px;

          font-weight: bold;

        }

        .item {
          padding: 15px 26px;

          box-sizing: border-box;

          .subject {
            margin-bottom: 20px;

          }

          .option {
            /deep/ .el-radio {
              margin-bottom: 15px;

              display: flex;

              flex-direction: row;

              flex-wrap: wrap;

            }

            /deep/ .el-radio__input {
              display: block;

            }

            /deep/.el-radio__label {
              display: block;

              white-space: normal;

              width: 600px;

              line-height: 15px;

            }

          }

        }

      }

    }

  }

}
ul {
  width: 270px;

  /* // padding: 10px;

  // box-sizing: border-box; */

  display: flex;

  flex-direction: row;

  justify-content: flex-start;

  flex-wrap: wrap;

  align-content: flex-start;

  align-items: flex-start;

  background: red;

  li {
    width: 35px;

    height: 35px;

    border-radius: 6px;

    margin: 5px;

    &.green-bg {
      background: green;

    }

    &.red-bg {
      background: red;

    }

    &.gray-bg {
      background: gray;

    }

  }
}

/* @import url(../../assets/css/index.css);
@import url(../../assets/css/print.css); */

</style>