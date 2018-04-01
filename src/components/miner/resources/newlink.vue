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
                                <Button class="h-btn h-btn-green" @click="passmodel" >通过</Button>
                                <Button class="h-btn h-btn-primary">暂存</Button>
                                <Button class="h-btn h-btn-red" >删除</Button>
                            </FormItem>
                        </Form>
                        <div v-if="!detailinfo.resources" class="primary-color text-center" v-padding="30" >
                            暂无数据
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <div>
            <Modal v-model="pass.opened">
                <div slot="header">配置规则</div>
                <div v-width="600">
                    <Form :label-width="90" :width="300" labelPosition="right" :model="detailinfo" >
                        <FormItemList>
                            <FormItem label="地址">
                                <input type="text" readonly v-model="detailinfo.resources" />
                            </FormItem>
                            <FormItem>
                                <!-- title -->
                                <div class="h-panel">
                                    <div class="h-panel-bar">
                                        <span class="h-panel-title">规则配置[ 标题 ]</span>
                                        <div class="h-panel-right">
                                            <Button color="blue" size="s" @click="addrule('title')" ><i class="h-icon-plus"></i>添加规则</Button>
                                            <Button color="red" size="s" @click="testRule('title')" >测试</Button>
                                        </div>
                                    </div>
                                    <div class="h-panel-body" >
                                        <div>
                                            <Row>
                                                <Col width="9" v-padding="2">
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">前缀</span>
                                                        <input type="text" placeholder="请输入前缀，如果有的话..." />
                                                    </div>
                                                </Col>
                                                <Col width="9" v-padding="2" >
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">后缀</span>
                                                        <input type="text" placeholder="请输入后缀，如果有的话..." />
                                                    </div>
                                                </Col>
                                                <Col width="6" v-padding="2" >
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">属性</span>
                                                        <input type="text" placeholder="取值属性" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-for="(rule,index) in pass.titleRules" >
                                            <Row>
                                                <Col width="22" v-padding="2">
                                                    <input type="text" placeholder="请输入规则..." v-model="rule.rule" />
                                                </Col>
                                                <Col width="2" >
                                                    <Button icon="h-icon-trash" @click="removeRule(index,'title')" text-color="red" :no-border="true" ></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-if="pass.titleRules.length <= 0" v-padding="2">
                                            <span class="primary-color text-center" >暂无规则</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <br/>
                                <!-- url -->
                                <div class="h-panel">
                                    <div class="h-panel-bar">
                                        <span class="h-panel-title">规则配置 [ 地址 ] </span>
                                        <div class="h-panel-right">
                                            <Button color="blue" size="s" @click="addrule('url')" ><i class="h-icon-plus"></i>添加规则</Button>
                                            <Button color="red" size="s" @click="testRule('url')" >测试</Button>
                                        </div>
                                    </div>
                                    <div class="h-panel-body" >
                                        <div>
                                            <Row>
                                                <Col width="9" v-padding="2">
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">前缀</span>
                                                        <input type="text" placeholder="请输入前缀，如果有的话..." />
                                                    </div>
                                                </Col>
                                                <Col width="9" v-padding="2" >
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">后缀</span>
                                                        <input type="text" placeholder="请输入后缀，如果有的话..." />
                                                    </div>
                                                </Col>
                                                <Col width="6" v-padding="2" >
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">属性</span>
                                                        <input type="text" placeholder="取值属性" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-for="(rule,index) in pass.urlRules" >
                                            <Row>
                                                <Col width="22" v-padding="2" >
                                                    <input type="text" placeholder="请输入规则..." v-model="rule.rule" />
                                                </Col>
                                                <Col width="2" >
                                                    <Button icon="h-icon-trash" @click="removeRule(index,'url')" text-color="red" :no-border="true" ></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-if="pass.urlRules.length <= 0" v-padding="2">
                                            <span class="primary-color text-center" >暂无规则</span>
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <!-- description -->
                                <div class="h-panel">
                                    <div class="h-panel-bar">
                                        <span class="h-panel-title">规则配置 [ 简介 ] </span>
                                        <div class="h-panel-right">
                                            <Button color="blue" size="s" @click="addrule('desc')" ><i class="h-icon-plus"></i>添加规则</Button>
                                            <Button color="red" size="s" @click="testRule('desc')" >测试</Button>
                                        </div>
                                    </div>
                                    <div class="h-panel-body" >
                                        <div>
                                            <Row>
                                                <Col width="9" v-padding="2">
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">前缀</span>
                                                        <input type="text" placeholder="请输入前缀，如果有的话..." />
                                                    </div>
                                                </Col>
                                                <Col width="9" v-padding="2" >
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">后缀</span>
                                                        <input type="text" placeholder="请输入后缀，如果有的话..." />
                                                    </div>
                                                </Col>
                                                <Col width="6" v-padding="2" >
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">属性</span>
                                                        <input type="text" placeholder="取值属性" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-for="(rule,index) in pass.descRules" >
                                            <Row>
                                                <Col width="22" v-padding="2" >
                                                    <input type="text" placeholder="请输入规则..." v-model="rule.rule" />
                                                </Col>
                                                <Col width="2" >
                                                    <Button icon="h-icon-trash" @click="removeRule(index,'desc')" text-color="red" :no-border="true" ></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-if="pass.descRules.length <= 0" v-padding="2">
                                            <span class="primary-color text-center" >暂无规则</span>
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <!-- pubdate -->
                                <div class="h-panel">
                                    <div class="h-panel-bar">
                                        <span class="h-panel-title">规则配置 [ 发布时间 ] </span>
                                        <div class="h-panel-right">
                                            <Button color="blue" size="s" @click="addrule('pubdate')" ><i class="h-icon-plus"></i>添加规则</Button>
                                            <Button color="red" size="s" @click="testRule('pubdate')" >测试</Button>
                                        </div>
                                    </div>
                                    <div class="h-panel-body" >
                                        <div>
                                            <Row>
                                                <Col width="9" v-padding="2">
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">前缀</span>
                                                        <input type="text" placeholder="请输入前缀，如果有的话..." />
                                                    </div>
                                                </Col>
                                                <Col width="9" v-padding="2" >
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">后缀</span>
                                                        <input type="text" placeholder="请输入后缀，如果有的话..." />
                                                    </div>
                                                </Col>
                                                <Col width="6" v-padding="2" >
                                                    <div class="h-input-group">
                                                        <span class="bg-blue-color white-color h-input-addon">属性</span>
                                                        <input type="text" placeholder="取值属性" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-for="(rule,index) in pass.pubdateRules" >
                                            <Row>
                                                <Col width="22" v-padding="2" >
                                                    <input type="text" placeholder="请输入规则..." v-model="rule.rule" />
                                                </Col>
                                                <Col width="2" >
                                                    <Button icon="h-icon-trash" @click="removeRule(index,'pubdate')" text-color="red" :no-border="true" ></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-if="pass.pubdateRules.length <= 0" v-padding="2">
                                            <span class="primary-color text-center" >暂无规则</span>
                                        </div>
                                    </div>
                                </div>
                            </FormItem>
                        </FormItemList>
                    </Form>
                </div>
                <div slot="footer">
                    <button class="h-btn" >取消</button>
                    <button class="h-btn h-btn-primary" >确定</button>
                </div>
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
        detailinfo: {},
        kinds:{},
        page: {
            current: 1,
            total: 0,
            size: 10
        },
        confirm:{
            opened: false,
            itemid: null,
            itemtitle: null
        },
        pass: {
            opened: false,
            titleRules: [],
            urlRules: [],
            descRules: [],
            pubdateRules: []
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
    },
    passmodel(){
        this.pass.opened = true
    },
    addrule(type){
        if (type) {
            if (type === "title") {
                this.pass.titleRules.push({
                    rule: ""
                })
            }else if (type === "url") {
                this.pass.urlRules.push({
                    rule: ""
                })
            }else if(type === "desc"){
                this.pass.descRules.push({
                    rule: ""
                })
            }else if (type === "pubdate") {
                this.pass.pubdateRules.push({
                    rule: ""
                })
            }
        }
    },
    removeRule(index,type){
        if (type) {
            if (type === "title") {
                this.pass.titleRules.splice(index, 1)
            }else if (type === "url") {
                this.pass.urlRules.splice(index, 1)
            }else if(type === "desc"){
                this.pass.descRules.splice(index, 1)
            }else if (type === "pubdate") {
                this.pass.pubdateRules.splice(index, 1)
            }
        }
    },
    testRule(type){
        if (type) {
            this.$Message.error(type)
        }
    }
  },
  mounted: function(){
      this.token = Utils.getLocal("token")
      this.search()
  }
}
</script>
