<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                失效链接
            </div>
            <div class="h-panel-bar blue-color" v-padding="10">
                疑似失效的站点
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" :width="60" prop="id" ></TableItem>
                    <TableItem title="地址" :width="250" >
                        <template slot-scope="props">
                            <span class="text-hover">
                                <a :href="props.data.resources" target="_blank">{{props.data.resources}}</a>
                            </span>
                        </template>
                    </TableItem>
                    <TableItem title="资源分组" :width="100">
                        <template slot-scope="props">
                            <span class="h-tag h-tag-green" >{{props.data.rgroup}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="类别" :width="100">
                        <template slot-scope="props">
                            <span class="h-tag h-tag-blue" >{{props.data.rtype}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="失效时间" :width="120">
                        <template slot-scope="props">
                            <i class="h-icon-calendar"></i>&nbsp;&nbsp;<span>{{props.data.updatedate}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="状态" :width="75">
                        <template slot-scope="props">
                            <span v-if="props.data.flag === 0" class="h-tag h-tag-bg-green">未审核</span>
                            <span v-if="props.data.flag === 1" class="h-tag h-tag-bg-primary">正常</span>
                            <span v-if="props.data.flag === 2" class="h-tag h-tag-bg-red">失效</span>
                            <span v-if="props.data.flag === 9" class="h-tag h-tag-bg-red">删除</span>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="100" >
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-green" @click="good(props.data)" >
                                有效
                                <i class="h-icon-edit"></i>
                            </button>
                            <button class="h-btn h-btn-s h-btn-red" @click="bad(props.data)" >
                                确认失效
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
                key: 0, 
                title: "未发布"
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
        }
    }
  },
  methods: {
    search(){
        console.log(this.toolbar)
        this.datas.push({
            id:1,
            resources: "http://dajiahoa.com",
            rgroup: "rss",
            rtype: "java",
            createdate: "2010-01-01 00:00:00",
            updatedate: "2010-01-02 00:00:00",
            flag: 2
        })
        this.datas.push({
            id:2,
            resources: "http://dajiahoa.com",
            rgroup: "rss",
            rtype: "java",
            createdate: "2010-01-01 00:00:00",
            updatedate: "2010-01-02 00:00:00",
            flag: 2
        })
    },
    currentChange(value){
        this.page.current = value.cur
        this.page.size = value.size
        this.search()
    },
    good(line){
        this.$Message(`这是一个有效的地址${line.id}`)
    },
    bad(line){
        this.$Message(`这是一个无效的地址${line.id}`)
    }
  },
  mounted: function(){
      this.token = Utils.getLocal("token")
      this.search()
  }
}
</script>
