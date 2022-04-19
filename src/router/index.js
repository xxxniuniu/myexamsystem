import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/User/Users.vue'
import Problems from '../components/ProblemSet/Problems.vue'
import AddProblem from '../components/ProblemSet/AddProblem.vue'
import Welcome from '../components/Welcome'
import AddProBlemByTemplate from '@/components/ProblemSet/AddProBlemByTemplate'
import Monitor from '@/components/Exam/Monitor'
import GoToExam from '@/components/Exam/GoToExam'
import AllPapers from '@/components/Paper/AllPapers'
import Automatic from '@/components/Paper/Automatic'
import TestPaper from '@/components/Paper/TestPaper'
import Analysis from '@/components/Analysis/Analysis'
import AutoMarking from '@/components/Exam/AutoMarking'
import StudentHome from '@/components/Student/StudentHome'
import StudentExam from '@/components/Student/StudentExam'
import StudentExamDemo from '@/components/Student/StudentExamDemo'
import StudentIdentify from '@/components/Student/StudentIdentify'
import AdminHome from '@/components/Admin/AdminHome'
import UserManage from '@/components/Admin/UserManage'
import ExamDemo from '@/components/Student/ExamDemo'
import TestPaperDemo from '@/components/Paper/TestPaperDemo'
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    { path: '/',redirect:"/login"},
    {
      path: '/login',
      component: Login
    },
    {
      path:'/studenthome',
      component:StudentHome,
      // redirect:'welcome',
      children:[
        {
          path:'/studentexam',
          component:StudentExam
        },
        {
          path:'/examdemo',
          component:ExamDemo
        },
        {
          path:'/studentidentify',
          component:StudentIdentify
        },
        {
          path:'/studentexamdemo',
          component:StudentExamDemo
        }
      ]
    },
    {
      path:'/adminhome',
      component:AdminHome,
      children:[
        {
          path:'/usermanage',
          component:UserManage
        }
      ]
    },
    {
      path: '/home',
      component:Home,
      redirect:'/welcome',
      children:[
        // 访问到home页面，重定向到welcome，将welcome设置为home的子目录
          {
            path:'/welcome',
            component:Welcome
          },
          {
            path:'/users',
            component:Users
          },
          // 题目
          {
            path:'/Problems',
            component:Problems,
          },
          {
            path:'/AddProblem',
            component:AddProblem
          },
          {
            path:'/AddProblemByTemplate',
            component:AddProBlemByTemplate
          },
          // 考试
          {
            path:'/Monitor',
            component:Monitor
          },
          {
            path:'/GoToExam',
            component:GoToExam
          },
          {
            path:'/AllPapers',
            component:AllPapers
          },
          {
            path:'/Automatic',
            component:Automatic
          },
          {
            path:'/TestPaper',
            component:TestPaper
          },
          {
            path:'/TestPaperDemo',
            component:TestPaperDemo
          },
          {
            path:'/Analysis',
            component:Analysis
          },
          {
            path:'/AutoMarking',
            component:AutoMarking
          }
        ]
    },  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
  ]
})

export default router
