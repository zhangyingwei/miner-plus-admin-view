<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                链接管理
            </div>
            <div class="h-panel-bar" v-padding="10">
                head
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" :width="60" prop="id" ></TableItem>
                    <TableItem title="地址" :width="250" >
                        <template slot-scope="props">
                            <a :href="props.data.resources" target="_blank">
                                <span class="text-hover">{{props.data.resources}}</span>
                            </a>
                        </template>
                    </TableItem>
                    <TableItem title="资源分组" :width="100">
                        <template slot-scope="props">
                            <span v-if="props.data.rgroup"  class="h-tag h-tag-circle h-tag-bg-red"> </span>
                            <span>{{props.data.rgroup}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="类别" :width="100">
                        <template slot-scope="props">
                            <span v-if="props.data.rtype" class="h-tag h-tag-circle h-tag-bg-green"></span>
                            <span>{{props.data.rtype}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="提交时间" :width="120">
                        <template slot-scope="props">
                            <span>{{props.data.createdate}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="修改时间" :width="120">
                        <template slot-scope="props">
                            <span>{{props.data.updatedate}}</span>
                        </template>
                    </TableItem>
                    <TableItem title="状态" :width="75">
                        <template slot-scope="props">
                            <span v-if="props.data.flag === 0" class="h-tag h-tag-bg-green">未审核</span>
                            <span v-if="props.data.flag === 1" class="h-tag h-tag-bg-blue">正常</span>
                            <span v-if="props.data.flag === 2" class="h-tag h-tag-bg-red">失效</span>
                            <span v-if="props.data.flag === 9" class="h-tag h-tag-bg-red">删除</span>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="100" >
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-green" @click="edit(props.data)">
                                编辑
                                <i class="h-icon-edit"></i>
                            </button>
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
            </div>
            <Modal v-model="modal.opened" width="600" >
                <div slot="header">编辑</div>
                <div >
                        <Form :label-width="90">
                          <FormItem label="地址">
                            <input type="text"  v-model="modal.resources" />
                          </FormItem>
                          <FormItem label="资源分组">
                            <input type="text" v-model="modal.rgroup" />
                          </FormItem>
                          <FormItem label="资源类别">
                            <Select v-model="modal.rtype" className="select-demo" :datas="modal.rtypes"></Select>
                          </FormItem>
                        </Form>
                </div>
                <div slot="footer"><button class="h-btn" @click="cancel">取消</button><button class="h-btn h-btn-primary">确定</button></div>
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
            resources: "",
            rgroup: "",
            rtype: "",
            rtypes: [{
                key: 1,
                title: 'java'
            },{
                key: 2,
                title: 'php'
            }]
        }
    }
  },
  methods: {
    search(){
        this.$LoadingBar.start()
        R.Resources.listResources({
            current: this.page.current,
            pageSize: this.page.size
        }).then(res => {
            if (res.ok) {
                console.log(res)
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
    edit(line){
        this.modal.opened = true
        this.modal.resources = line.resources
        this.modal.rgroup = line.rgroup
        this.modal.rtype = line.rtypeid
    },
    cancel(){
        this.modal.opened = false
    }
  },
  mounted: function(){
      this.token = Utils.getLocal("token")
      this.search()
  }
}
</script>
