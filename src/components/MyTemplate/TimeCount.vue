<template>
  <div class="timeCount-container">
    <el-card class="box-card" id="asidecrad">
      <div slot="header" class="clearfix">
        <span>剩余时间</span>
      </div>
      <div>{{ this.hour }} 时 {{ this.minute }} 分 {{ this.second }} 秒</div>
    </el-card>
  </div>
</template>
<script>
export default {
//   name: "timeCount",
  data() {
    return {
      endTime: 0,
      hour: 0,
      minute: 0,
      second: 0,
      interval: null,
    };
  },
  //传值
  props: {
    //倒计时时间
    longTime: {
      type: Number,
      default: 0,
    },
      //弹出框标题
      messageTitle:{
          type:String,
          default: ''
      },
      //弹出框内容
       messageText:{
          type:String,
          default: ''
      },
  },
  mounted() {
    //结束时间
    this.endTime = Date.parse(new Date()) + this.longTime * 1000;
    //开始倒计时
    this.countdown();
  },
  beforeDestroy() {
    //提前结束则销毁倒计时
    clearTimeout(this.interval);
  },
  methods: {
    countdown() {
      //计算运行时间
      const end = this.endTime;
      const now = Date.parse(new Date());
      const msec = end - now;
      //计算剩余时间
      this.second = (msec / 1000) % 60;
      this.minute = parseInt((msec / 1000 / 60) % 60);
      this.hour = parseInt(msec / 1000 / 60 / 60);
 
      console.log(this.hour, this.minute, this.second);
 
      console.log(msec);
      const that = this;
      //结束则弹框
      if (msec === 0) {
        this.$alert(this.messageTitle, this.messageText, {
          confirmButtonText: "确定",
          callback: () => {
            this.$router.push("/home");
          },
        });
      } else {
        //进入下一秒倒计时
        this.interval = setTimeout(that.countdown, 1000);
      }
    },
  },
};
</script>
<style lang='less' scoped>
.timeCount-container {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>