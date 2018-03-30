<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                最新文章
            </div>
            <div class="h-panel-bar" v-padding="10">
                新抓取的文章
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" :width="60" prop="id" ></TableItem>
                    <TableItem title="作者" :width="80" >
                        <template slot-scope="props">
                            <span class="text-hover">{{props.data.author}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="站点名称" :width="100" >
                        <template slot-scope="props">
                            <a :href="props.data.site" target="_blank">
                                <span class="text-hover">{{props.data.sitename}}</span>
                            </a>
                        </template>
                    </TableItem>
                    <TableItem title="文章标题" :width="120">
                        <template slot-scope="props">
                            <a :href="props.data.url" target="_blank">
                                <span>{{props.data.title}}</span>
                            </a>
                        </template>
                    </TableItem>
                    <TableItem title="简介" :width="120">
                        <template slot-scope="props">
                            <Tooltip theme="white" placement="right">
                                <span v-if="props.data.comment && props.data.description.length<=20" class="text-hover desc-text">{{props.data.description}}</span>
                                <span v-if="props.data.comment && props.data.description.length>20" class="text-hover desc-text">{{props.data.description.substr(0,20)}}...</span>
                                <div slot="content">
                                    {{props.data.description}}
                                </div>
                            </Tooltip>
                        </template>
                    </TableItem>
                    <TableItem title="发布时间" :width="120">
                        <template slot-scope="props">
                            <span>{{props.data.pubdate}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="抓取时间" :width="120">
                        <template slot-scope="props">
                            <span>{{props.data.getdate}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="推送时间" :width="120">
                        <template slot-scope="props">
                            <span>{{props.data.pushdate}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="状态" :width="100">
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
                            <button class="h-btn h-btn-s h-btn-green" @click="ok(props.data)" >
                                好
                                <i class="h-icon-edit"></i>
                            </button>
                            <button class="h-btn h-btn-s h-btn-red" >
                                垃圾
                                <i class="h-icon-trash"></i>
                            </button>
                        </template>
                    </TableItem>
                    <div slot="empty">提醒：暂时无数据</div>
                </Table>
                <div v-padding="10">
                    <Pagination :cur="page.current" :size="page.size" :total="page.total" @change="currentChange" :small="true"></Pagination>
                </div>
            </div>
        </div>
        <div>
            <Modal v-model="modal.opened">
                <div slot="header">文章审核</div>
                <div >
                    <Form :label-width="90" :model="modal">
                      <FormItem label="标题">
                        <input type="text" v-width="600" disabled v-model="modal.title" />
                      </FormItem>
                      <FormItem label="简评">
                        <textarea placeholder="请输入简评..." v-height="200" v-model="modal.comment"></textarea>
                      </FormItem>
                    </Form>
                </div>
                <div slot="footer"><button class="h-btn" @click="cancel">取消</button><button class="h-btn h-btn-primary" @click="okContent" >确定</button></div>
            </Modal>
        </div>
    </div>
</template>
<script>

import store from 'js/vuex/store';

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
        kinds:{},
        page: {
            current: 1,
            total: 0,
            size: 10
        },
        modal: {
            opened: false,
            id: "",
            title: "",
            comment: ""
        }
    }
  },
  methods: {
    search(){
        console.log(this.toolbar)
        this.datas.push({
            id:0,
            author: "zhangsan",
            sitename: "小胡子哥的个人网站",
            site: "http://www.barretlee.com/",
            url: "http://www.barretlee.com/blog/2017/04/01/hsts-downgrade/",
            title: "聊聊 HSTS 下的 HTTPS 降级问题",
            description: "description",
            comment: "这里是一些简评，主要是如果我看到文章有些意思的话，会写一些自己的见解，无关乎对错，无关乎立场",
            pubdate: "2017-08-28 21:26:19",
            getdate: "2017-08-28 21:26:19",
            pushdate: "2017-08-28 21:26:19",
            state: 4
        })
    },
    currentChange(value){
        this.page.current = value.cur
        this.page.size = value.size
        this.search()
    },
    ok(line){
        this.modal.opened = true
        this.modal.title = line.title
        this.modal.id = line.id
    },
    cancel(){
        this.modal.opened = false
    },
    okContent(){
        console.log(this.modal)
        this.modal.opened = false
    },
    clearModal(){
        this.modal.title = ""
        this.modal.id = ""
        this.modal.comment = ""
    }
  },
  mounted: function(){
      this.token = Utils.getLocal("token")
      this.search()
  }
}
</script>