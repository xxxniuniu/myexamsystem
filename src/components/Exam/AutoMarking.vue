<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }" @click.native="clearActivePath">首页</el-breadcrumb-item>
            <el-breadcrumb-item>考试管理</el-breadcrumb-item>
            <el-breadcrumb-item>试卷批阅</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div style="text-align:right;margin-right:20px">
                <el-button type="primary" @click="selectAll">全选</el-button>
                <el-button type="primary" @click="checkAll"
                v-loading.fullscreen.lock="fullscreenLoading"
                >阅卷</el-button>
                <el-button type="danger">提交</el-button>
            </div>
            <el-table
            :cell-style="stateJudge"
            :data="tableDataEnd"
            :span-method="objectSpanMethod"
            style="width: 100%"
            border>
                <el-table-column
                    type="index"
                    label="#">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="题型"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="题目"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="checked"
                    label="选中框"
                    width="100">
                    <template slot-scope="scope">
                        <el-checkbox v-model="tableDataEnd[scope.$index].checked"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="座位号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="autoscore"
                    label="自动批阅得分"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="detail"
                    label="详情"
                    width="200">
                    <template slot-scope="scope">
                        <el-popover
                            placement="bottom"
                            :title="scope.row.name"
                            width="200"
                            trigger="click">
                            <el-tree
                                :data="tableDataEnd[scope.$index].answer"
                                :props="defaultProps"
                                @node-click="handleNodeClick">
                            </el-tree>
                            <el-button slot="reference" type="primary">查看答案</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="finalscore"
                    label="最终得分"
                    width="150">
                    <template slot-scope="scope">
                        <el-input v-model="tableDataEnd[scope.$index].finalscore" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200">
                    <template v-slot:="scope">
                        <el-tooltip effect="dark" content="保存" placement="top" :enterable="false">
                            <el-button type="success" icon="el-icon-document-checked" circle @click="saveRow"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            fullscreenLoading: false,
            tableDataEnd:[
                {
                    id:'10001',
                    type:'选择题',
                    name:'题目1',
                    num:100,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:true,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'C'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    id:'10002',
                    type:'选择题',
                    name:'题目1',
                    num:101,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:false,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    id:'10003',
                    type:'选择题',
                    name:'题目2',
                    num:100,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:false,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'C'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    id:'10003',
                    type:'选择题',
                    name:'题目2',
                    num:101,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:false,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'C'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    id:'20001',
                    type:'主观题',
                    name:'题目3',
                    num:100,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:false,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'C'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    id:'20001',
                    type:'主观题',
                    name:'题目3',
                    num:101,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:false,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'C'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    id:'20002',
                    type:'主观题',
                    name:'题目4',
                    num:100,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:false,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'C'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    id:'20002',
                    type:'主观题',
                    name:'题目4',
                    num:101,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:false,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'C'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    id:'20003',
                    type:'主观题',
                    name:'题目5',
                    num:100,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:false,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'C'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    id:'20002',
                    type:'主观题',
                    name:'题目5',
                    num:101,
                    autoscore:0,
                    detail:'',
                    finalscore:0,
                    checked:false,
                    answer:[
                        {
                            label:'标准答案',
                            children:[
                                {
                                    label:'A'
                                }
                            ]
                        },
                        {
                            label:'学生答案',
                            children:[
                                {
                                    label:'C'
                                }
                            ]
                        }
                    ]
                } 
            ],
            spanArr: [],
            spanArrType: [],
            position: 0,
            positionType: 0,
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods:{
        checkAll(){
            this.fullscreenLoading = true;
            setTimeout(() => {
            this.fullscreenLoading = false;
            }, 2000);
            this.tableDataEnd.forEach(element => {
                if (element.type == '主观题'){
                    if (element.num == '100'){
                        element.autoscore = 5;
                    element.finalscore = 5;
                    }else{
                        element.autoscore = 10;
                    element.finalscore = 10;
                    }
                }else{
                    element.autoscore = 6;
                    element.finalscore = 6;
                }
              
            });
        },
        handleNodeClick(data) {
            console.log(data);
        },
        saveRow(){
            console.log(this.tableDataEnd);
            console.log(this.checked);
            this.$message.success('保存成功');
        },
        onMergeLines(){
            this.tableDataEnd.forEach((item,index)=>{
                // 第一行
                if (index == 0){
                    this.spanArr.push(1);
                    this.position = 0;
                    this.spanArrType.push(1);
                    this.positionType = 0;
                }else{
                    // 如果这行和上一行的type字段相等，标记spanArr[上一行]+=1
                    if (this.tableDataEnd[index-1].type === this.tableDataEnd[index].type){
                        this.spanArr[this.position] += 1;
                        this.spanArr.push(0);
                    }else{
                        this.spanArr.push(1);
                        this.position = index;
                    }
                    if (this.tableDataEnd[index-1].name === this.tableDataEnd[index].name){
                        this.spanArrType[this.positionType] += 1;
                        this.spanArrType.push(0);
                    }else{
                        this.spanArrType.push(1);
                        this.positionType = index;
                    }
                }
            })
        },
        	// /**
		    //  * @description 实现合并行或列
		    //  * @param row:Object 需要合并的列name 如:'name' 'id'
		    //  * @param column:Object 当前行的行数，由合并函数传入
		    //  * @param rowIndex:Number 当前列的数据，由合并函数传入
		    //  * @param columnIndex:Number 当前列的数据，由合并函数传入
		    //  *
		    //  * @return 函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象
		    //  * 参考地址：https://element.eleme.cn/#/zh-CN/component/table#table-biao-ge
		    // */
        objectSpanMethod({row,column,rowIndex,columnIndex}){
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            if (columnIndex === 2) {
                const _row = this.spanArrType[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
        },
        selectAll(){
            this.tableDataEnd.forEach((item,index) => {
                item.checked = !item.checked;
            });
        }
    },
    mounted(){
        this.onMergeLines();
    },
}
</script>