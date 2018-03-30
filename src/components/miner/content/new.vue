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
                    <TableItem title="站点名称" :width="120" >
                        <template slot-scope="props">
                            <span class="text-hover">{{props.data.sitename}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="资源站地址" :width="120">
                        <template slot-scope="props">
                            <span>{{props.data.site}}</span>
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
                            <button class="h-btn h-btn-s h-btn-green">
                                通过
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
            </div>
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
        confirm:{
            open: false,
            itemid: null,
            itemtitle: null
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
  },
  mounted: function(){
      this.token = Utils.getLocal("token")
      this.search()
  }
}
</script>