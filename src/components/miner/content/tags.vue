<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                标签管理
            </div>
            <div class="h-panel-bar" v-padding="10">
                标签管理
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" :width="60" prop="id" ></TableItem>
                    <TableItem title="名称">
                        <template slot-scope="props">
                            <span class="text-hover">{{props.data.topic}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="状态" :width="100">
                        <template slot-scope="props">
                            <span v-if="props.data.flag === 0" class="h-tag h-tag-bg-green">正常</span>
                            <span v-if="props.data.flag === 9" class="h-tag h-tag-bg-red">删除</span>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="90" >
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-red" >
                                删除
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
                    <div slot="header">提示</div>
                    <div >确定要删除 {{confirm.itemtitle}} ({{confirm.itemid}}) 吗</div>
                    <div slot="footer"><button class="h-btn" @click="confirm.open = false">取消</button><button class="h-btn h-btn-primary">确定</button></div>
                </Modal>
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
            id: 0,
            topic: "java",
            flag: 0
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