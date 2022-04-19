<template>
    <div>
        <el-breadcrumb separator="/" style="font-size:15px;margin-top:-5px">
            <el-breadcrumb-item :to="{ path: '/studenthome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>所有考试</el-breadcrumb-item>
            <el-breadcrumb-item>我的考试</el-breadcrumb-item>
            <el-breadcrumb-item>2020-2021(1)计算机网络期末模拟考试</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div class="nav">
                <div class="nav_main">
                    <h3 class="pt15">2020-2021(1)计算机网络期末模拟考试</h3>
                    <p class="mt10">总分：100分&nbsp;&nbsp;&nbsp;&nbsp;合格分数线：60分&nbsp;</p>
                    <!-- <span><img src="images/nav_erweima.jpg" /></span> -->
                </div>
            </div>
        </el-card>
        <el-card>
            <div slot="header" style="font-size:30px;">请面对摄像头进行人脸认证</div>
            <div>
                <el-button type="primary" @click="openFullScreen1" v-loading.fullscreen.lock="fullscreenLoading">开始识别</el-button>
            </div>
            <img src="../../assets/face.png" alt="" v-if="isshow" style="margin-top:20px">
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fullscreenLoading: false,
            isshow: false
        }
    },
    methods: {
        openFullScreen1() {
        this.fullscreenLoading = true;
        setTimeout(() => {
            this.$message.success('识别成功');
            this.isshow = true;
            this.fullscreenLoading = false;
            setTimeout(() =>{
                this.$router.push('/studentexamdemo');
            },1500);
        }, 2000);
        // setTimeout(() =>{
        //     this.$router.push('/studentexamdemo');
        // },1000);
      },
    },
}
</script>
<style lang="less">
    .nav h3{font-size: 24px;}
    h1, h2, h3, h4, h5, h6{ font-size:100%;}
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font:Microsoft YaHei,Helvitica,Verdana,Arial,san-serif;
    list-style:none;
    font-family:微软雅黑;
}
.mt10{ margin-top:10px;}
</style>