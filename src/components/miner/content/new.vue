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
                                <span v-if="props.data.description && props.data.description.length<=20" class="text-hover desc-text">{{props.data.description}}</span>
                                <span v-if="props.data.description && props.data.description.length>20" class="text-hover desc-text">{{props.data.description.substr(0,20)}}...</span>
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
                            <button class="h-btn h-btn-s h-btn-red" @click="laji(props.data)" >
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
                <div v-width="700">
                    <Form :label-width="90" :model="modal">
                      <FormItem label="标题">
                        <Row>
                            <Col width="18">
                                <input type="text" disabled v-model="modal.title" />
                            </Col>
                            <Col width="6">
                                <Select v-model="modal.select" :datas="modal.param" placeholder="请选择文章分类"></Select>
                            </Col>
                        </Row>
                      </FormItem>
                      <FormItem label="简评">
                        <textarea placeholder="请输入简评..." v-height="200" v-model="modal.comment"></textarea>
                      </FormItem>
                    </Form>
                </div>
                <div slot="footer"><button class="h-btn" @click="cancel">取消</button><button class="h-btn h-btn-primary" @click="okContent" >确定</button></div>
                <Loading text="请耐心等待一下哈..." :loading="modal.loading"></Loading>
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
            comment: "",
            loading: false,
            select: null,
            param: [{ 
                title: 'java', 
                key: 0 
            }]
        }
    }
  },
  methods: {
    search(){
        this.$LoadingBar.start()
        R.Content.listNews({
            current: this.page.current,
            pageSize: this.page.size
        }).then(res => {
            if (res.ok) {
                this.datas = res.result.data
                this.page.total = res.result.page.total
                this.$LoadingBar.success()
            }else{
                this.$LoadingBar.fail()
            }
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
        this.modal.comment = ""
        this.modal.select = null

        this.modal.loading = true
        R.Content.listTopics().then(res => {
            if (res.ok) {
                this.modal.param = res.result
            }
            this.modal.loading = false
        })
    },
    laji(line){
        this.$LoadingBar.start()
        R.Content.isRubbis(line.id).then(res => {
            if (res.ok) {
                this.$LoadingBar.success()
            }else{
                this.$LoadingBar.fail()
            }
            this.search()
        })
    },
    cancel(){
        this.modal.opened = false
    },
    okContent(){
        if (!this.modal.select) {
            this.$Message.error("请选择文章分类")
            return
        }
        this.modal.loading = true
        R.Content.readyToPush(this.modal).then(res => {
            if (res.ok) {
                this.$Message.success(res.message)
            }else{
                this.$Message.error("失败")
            }
            this.modal.loading = false
            this.modal.opened = false
            this.search()
        })
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