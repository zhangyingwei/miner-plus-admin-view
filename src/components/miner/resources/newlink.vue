<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                新增链接
            </div>
            <div class="h-panel-bar" v-padding="10">
                head
            </div>
            <Row :space="9">
                <Col width="14" >
                    <div class="h-panel-body">
                        <Table :datas="datas" stripe @select="onselect">
                            <TableItem title="序号" :width="60" prop="id" ></TableItem>
                            <TableItem title="地址" :width="250" >
                                <template slot-scope="props">
                                    <span class="text-hover">{{props.data.resources}}</span>
                                </template>
                            </TableItem>
                            <TableItem title="提交时间" :width="120">
                                <template slot-scope="props">
                                    <span>{{props.data.createdate}}</span>
                                </template>
                            </TableItem>
                            <TableItem title="操作" :width="70" >
                                <template slot-scope="props">
                                    <button class="h-btn h-btn-s h-btn-green" @click="showdetail(props.data)">
                                        查看详情
                                        <i class="h-icon-edit"></i>
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
                </Col>
                <Col width="10" >
                    <div class="h-panel-body">
                        <div class="h-panel-bar" v-padding="10">详细信息</div>
                        <Form v-padding="10" v-if="detailinfo.resources" :readonly="true" :labelWidth="100" labelPosition="left">
                            <FormItem label="序号">
                                <span class="h-tag h-tag-gray">{{detailinfo.id}}</span>
                            </FormItem>
                            <FormItem label="地址">
                                <a :href="detailinfo.resources" target="_blank" class="primary-color"> {{detailinfo.resources}} </a>
                            </FormItem>
                            <FormItem label="资源类型">
                                <span class="h-tag h-tag-blue">{{detailinfo.rgroup}}</span>
                            </FormItem>
                            <FormItem label="提交时间"><i class="h-icon-calendar"> {{detailinfo.createdate}}</i></FormItem>
                            <FormItem label="来源 IP">{{detailinfo.sip}}</FormItem>
                            <FormItem label="IP 归属地" class="dark1-color">{{detailinfo.sarea}}</FormItem>
                            <FormItem>
                                <br/>
                                <Button class="h-btn h-btn-green" :loading="true">通过</Button>
                                <Button class="h-btn h-btn-primary">暂存</Button>
                                <Button class="h-btn h-btn-red" >删除</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
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
        detailinfo: {},
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
        for (let index = 0; index < 10; index++) {
            this.datas.push({
                id:index,
                resources: "http://dajiahoa.com",
                rgroup: "rss",
                rtype: "java",
                createdate: "2010-01-01 00:00:00",
                updatedate: "2010-01-02 00:00:00",
                flag: 1,
                sip: "172.0.0.1",
                sarea: "中国,北京"
            })
        }
    },
    currentChange(value){
        this.page.current = value.cur
        this.page.size = value.size
        this.search()
    },
    onselect(data) {
      log(data);
    },
    showdetail(line){
        this.detailinfo = line;
    }
  },
  mounted: function(){
      this.token = Utils.getLocal("token")
      this.search()
  }
}
</script>
