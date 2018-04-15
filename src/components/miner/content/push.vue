<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                待推送文章
            </div>
            <div class="h-panel-bar" v-padding="10">
                <span v-for="item in pushcount" v-padding="20">
                    <Badge :count="item.count">
                        <span v-bg-color:primary v-color:white v-padding="2" style="border-radius: 4px;">{{item.pushdate}}</span>
                    </Badge>
                </span>
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" :width="60" prop="id" ></TableItem>
                    <!-- <TableItem title="作者" :width="60" >
                        <template slot-scope="props">
                            <span class="text-hover">{{props.data.author}}</span>
                        </template>
                    </TableItem> -->
                    <TableItem title="站点" :width="120" >
                        <template slot-scope="props">
                            <a :href="props.data.site" target="_blank"><span class="text-hover">{{props.data.sitename}}</span></a>
                        </template>
                    </TableItem>
                    <TableItem title="文章" :width="120">
                        <template slot-scope="props">
                            <a :href="props.data.url" target="_blank">
                                <span>{{props.data.title}}</span>
                            </a>
                        </template>
                    </TableItem>
                    <TableItem title="简介" :width="120">
                        <template slot-scope="props">
                            <Tooltip theme="white" placement="right">
                                <span v-if="props.data.description && props.data.description.length<=20" class="text-hover desc-text">{{props.data.description}}</span>
                                <span v-if="props.data.description && props.data.description.length>20" class="text-hover desc-text">{{props.data.description.substr(0,20)}}...</span>
                                <div slot="content">
                                    {{props.data.description}}
                                </div>
                            </Tooltip>
                        </template>
                    </TableItem>
                    <TableItem title="简评" :width="100">
                        <template slot-scope="props">
                            <Tooltip theme="white" placement="right">
                                <span v-if="props.data.comment && props.data.comment.length<=20" class="text-hover desc-text">{{props.data.comment}}</span>
                                <span v-if="props.data.comment && props.data.comment.length>20" class="text-hover desc-text">{{props.data.comment.substr(0,20)}}...</span>
                                <div slot="content">
                                    {{props.data.comment}}
                                </div>
                            </Tooltip>
                        </template>
                    </TableItem>
                    <TableItem title="发布时间" :width="120">
                        <template slot-scope="props">
                            <span>{{props.data.pubdate}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="抓取时间" :width="125">
                        <template slot-scope="props">
                            <span>{{props.data.getdate}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="推送时间" :width="125">
                        <template slot-scope="props">
                            <span>{{props.data.pushdate}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="状态" :width="90">
                        <template slot-scope="props">
                            <span v-if="props.data.state === 0" class="h-tag h-tag-bg-green">初始</span>
                            <span v-if="props.data.state === 1" class="h-tag h-tag-bg-green">正常</span>
                            <span v-if="props.data.state === 2" class="h-tag h-tag-bg-primary">失效</span>
                            <span v-if="props.data.state === 3" class="h-tag h-tag-bg-primary">审核不通过</span>
                            <span v-if="props.data.state === 4" class="h-tag h-tag-bg-primary">审核通过</span>
                            <span v-if="props.data.state === 9" class="h-tag h-tag-bg-red">删除</span>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="150" >
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-green" @click="willpush(props.data)" >
                                计划推送
                                <i class="h-icon-edit"></i>
                            </button>
                            <button class="h-btn h-btn-s h-btn-red" >
                                驳回
                                <i class="h-icon-trash"></i>
                            </button>
                        </template>
                    </TableItem>
                    <div slot="empty">提醒：暂时无数据</div>
                </Table>
                <div v-padding="10">
                    <Pagination :cur="page.current" :size="page.size" :total="page.total" @change="currentChange" :small="true"></Pagination>
                </div>
                <Modal v-model="confirm.open">
                    <div slot="header">设置计划</div>
                    <div v-width="500" >
                        <Form label-position="right" :label-width="90">
                            <FormItem label="文章" prop="name">
                                <input readonly type="text" v-model="confirm.title" />
                            </FormItem>
                            <FormItem label="推送时间" prop="password">
                                <DatePicker v-model="confirm.date" placeholder="请选择日期" :option="confirm.param"></DatePicker>
                            </FormItem>
                        </Form>
                    </div>
                    <div slot="footer"><button class="h-btn" @click="confirm.open = false">取消</button><button class="h-btn h-btn-primary" @click="okpush" >确定</button></div>
                </Modal>
            </div>
        </div>
    </div>
</template>
<script>

import manba from 'manba';

export default {
  data() {
    return {
        token: "",
        toolbar: {
            title: null,
            flag: 4
        },
        flagList: [
            {
                key: 1,
                title: "已发布"
            },{
                key: 0, title: "未发布"
            },{
                key: 9,
                title: "已删除"
            },{
                key: 4,
                title: "全部"
            }
        ],
        datas: [],
        pushcount: [],
        kinds:{},
        page: {
            current: 1,
            total: 0,
            size: 10
        },
        confirm:{
            open: false,
            id: null,
            param: {
                //具体配置在"config.datepicker.shortcuts"中
                shortcuts:['today',{
                    title: '明天',
                    value(){
                    return manba().add(1, manba.DAY);
                    }
                },{
                    title: '后天',
                    value(){
                    return manba().add(2, manba.DAY);
                    }
                }]
            },
            date: null
        }
    }
  },
  methods: {
    search(){
        // this.datas.push({
        //     id:0,
        //     author: "zhangsan",
        //     sitename: "小胡子哥的个人网站",
        //     site: "http://www.barretlee.com/",
        //     url: "http://www.barretlee.com/blog/2017/04/01/hsts-downgrade/",
        //     title: "聊聊 HSTS 下的 HTTPS 降级问题",
        //     description: "description",
        //     comment: "这里是一些简评，主要是如果我看到文章有些意思的话，会写一些自己的见解，无关乎对错，无关乎立场",
        //     pubdate: "2017-08-28 21:26:19",
        //     getdate: "2017-08-28 21:26:19",
        //     pushdate: "2017-08-28 21:26:19",
        //     state: 4
        // })
        this.$LoadingBar.start()
        R.Content.listPush({
            current: this.page.current,
            pageSize: this.page.size
        }).then(res => {
            console.log(res)
            if (res.ok) {
                this.datas = res.result.data.map(line => {
                    if (line.pushdate) {
                        if (line.pushdate.startWith(this.getNowFormatDate())) {
                            line.pushdate = line.pushdate + "[今天]"
                        }
                    }
                    return line;
                })
                this.page.total = res.result.page.total
                this.$LoadingBar.success()
            }else{
                this.$LoadingBar.fail()
            }
        })
        this.listPushCount()
    },
    listPushCount(){
        R.Content.listPushCounts().then(res => {
            if (res.ok) {
                if (res.result) {
                    this.pushcount = res.result.map(line => {
                        var result = {}
                        if (line.pushdate) {
                            result = {
                                pushdate: line.pushdate.split(" ")[0],
                                count: line.count
                            }
                        }else{
                            result = {
                                count: line.count,
                                pushdate: '未分配'       
                            }
                            console.log(line)
                        }
                        return result
                    }).map(line => {
                        if (line.pushdate.startWith(this.getNowFormatDate())) {
                            line.pushdate = line.pushdate + "[今天]"
                        }
                        return line
                    })
                }
            }else{
                
            }
        })
    },
    currentChange(value){
        this.page.current = value.cur
        this.page.size = value.size
        this.search()
    },
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    willpush(line){
        this.confirm.date = null
        this.confirm.open = true
        this.confirm.title = line.title
        this.confirm.id = line.id
    },
    okpush(){
        this.$LoadingBar.start()
        R.Content.pushOne({
            id: this.confirm.id,
            date: this.confirm.date
        }).then(res => {
            if (res.ok) {
                this.$LoadingBar.success()
            }else{
                this.$LoadingBar.fail()
            }
            this.confirm.open = false
            this.search()
        })
    }
  },
  mounted: function(){
    String.prototype.startWith=function(str){     
      var reg=new RegExp("^"+str);     
      return reg.test(this);        
    }  
    this.token = Utils.getLocal("token")
    this.search()
  }
}
</script>