<template>
    <div class="app-home" v-padding="20">
        <div class="h-panel">
            <div class="h-panel-bar" v-padding="10">
                链接管理
            </div>
            <div class="h-panel-bar">
                <Form mode="inline" v-padding="5">
                    <FormItem label="地址" v-padding="5">
                        <div class="h-input">
                            <input type="text"/>
                        </div>
                    </FormItem>
                    <FormItem label="资源类型" v-padding="5">
                        <Select v-model="toolbar.flag" :datas="flagList"></Select>
                    </FormItem>
                    <FormItem label="提交时间" v-padding="5">
                        <div class="h-input">
                            <DatePicker v-model="toolbar.submitetime" placeholder="请选择日期"></DatePicker>
                        </div>
                    </FormItem>
                    <FormItem v-padding="5">
                        <Button color="primary">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="h-panel-body">
                <Table :datas="datas">
                    <TableItem title="序号" :width="60" prop="id"></TableItem>
                    <TableItem title="地址" :width="250">
                        <template slot-scope="props">
                            <a :href="props.data.resources" target="_blank">
                                <span class="text-hover">{{props.data.resources}}</span>
                            </a>
                        </template>
                    </TableItem>
                    <TableItem title="资源分组" :width="100">
                        <template slot-scope="props">
                            <span v-if="props.data.rgroup" class="h-tag h-tag-circle h-tag-bg-red"> </span>
                            <span>{{props.data.rgroup}}</span>
                        </template>
                    </TableItem>
                    <!-- <TableItem title="类别" :width="100">
                        <template slot-scope="props">
                            <span v-if="props.data.rtype" class="h-tag h-tag-circle h-tag-bg-green"></span>
                            <span>{{props.data.rtype}}</span>
                        </template>
                    </TableItem> -->
                    <TableItem title="提交时间" :width="120">
                        <template slot-scope="props">
                            <span>{{props.data.createdate.split(".")[0]}}</span>
                        </template>
                    </TableItem>
                    <!--<TableItem title="修改时间" :width="120">-->
                        <!--<template slot-scope="props">-->
                            <!--<span>{{props.data.updatedate}}</span>-->
                        <!--</template>-->
                    <!--</TableItem>-->
                    <TableItem title="状态" :width="75">
                        <template slot-scope="props">
                            <span v-if="props.data.flag === 0" class="h-tag h-tag-bg-green">未审核</span>
                            <span v-if="props.data.flag === 1" class="h-tag h-tag-bg-blue">正常</span>
                            <span v-if="props.data.flag === 2" class="h-tag h-tag-bg-red">失效</span>
                            <span v-if="props.data.flag === 9" class="h-tag h-tag-bg-red">删除</span>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="140">
                        <template slot-scope="props">
                            <button class="h-btn h-btn-s h-btn-green" @click="edit(props.data)">
                                编辑
                                <i class="h-icon-edit"></i>
                            </button>
                            <button v-if="props.data.rgroup == 'site'" @click="editRule(props.data)"
                                    class="h-btn h-btn-s h-btn-yellow">
                                编辑规则
                                <i class="h-icon-search"></i>
                            </button>
                            <button class="h-btn h-btn-s h-btn-red"
                                    @click="remove(props.data)">
                                删除
                                <i class="h-icon-trash"></i>
                            </button>
                        </template>
                    </TableItem>
                    <div slot="empty">提醒：暂时无数据</div>
                </Table>
                <div v-padding="10">
                    <Pagination :cur="page.current" :size="page.size" :total="page.total" @change="currentChange"
                                :small="true"></Pagination>
                </div>
                <Loading text="请稍等..." :loading="loading"></Loading>
            </div>
            <Modal v-model="modal.opened">
                <div slot="header" v-width="500">编辑</div>
                <div>
                    <Form :label-width="90">
                        <FormItem label="地址">
                            <input type="text" v-model="modal.resources"/>
                        </FormItem>
                        <FormItem label="资源分组">
                            <Select v-model="modal.rgroup" :datas="modal.rgroups"></Select>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <button class="h-btn" @click="cancel">取消</button>
                    <button class="h-btn h-btn-primary" @click="update">确定</button>
                </div>
            </Modal>

            <Modal v-model="rulesModel.opened">
                <div slot="header">配置规则</div>
                <div v-width="600">
                    <Form :label-width="90" :width="300" v-padding="5" labelPosition="right" :model="rulesModel">
                        <FormItemList>
                            <FormItem label="地址">
                                <Row>
                                    <Col v-padding="2">
                                    <input type="text" readonly v-model="rulesModel.resources"/>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem>
                                <!-- title -->
                                <div class="h-panel">
                                    <div class="h-panel-bar">
                                        <span class="h-panel-title">规则配置[ 标题 ]</span>
                                        <div class="h-panel-right">
                                            <Button color="blue" size="s" @click="addrule('title')"><i
                                                    class="h-icon-plus"></i>添加规则
                                            </Button>
                                            <Button color="red" size="s" @click="testRule('title')">测试</Button>
                                        </div>
                                    </div>
                                    <div class="h-panel-body">
                                        <div>
                                            <Row>
                                                <Col width="9" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">前缀</span>
                                                    <input type="text" v-model="rulesModel.title.prefix"/>
                                                </div>
                                                </Col>
                                                <Col width="9" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">后缀</span>
                                                    <input type="text" v-model="rulesModel.title.suffix"/>
                                                </div>
                                                </Col>
                                                <Col width="6" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">属性</span>
                                                    <input type="text" v-model="rulesModel.title.attr"/>
                                                </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-for="(rule,index) in rulesModel.title.rules">
                                            <Row>
                                                <Col width="22" v-padding="2">
                                                <input type="text" placeholder="请输入规则..." v-model="rule.rule"/>
                                                </Col>
                                                <Col width="2">
                                                <Button icon="h-icon-trash" @click="removeRule(index,'title')"
                                                        text-color="red" :no-border="true"></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-if="rulesModel.title.rules.length <= 0" v-padding="2">
                                            <span class="primary-color text-center">暂无规则</span>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                <!-- url -->
                                <div class="h-panel">
                                    <div class="h-panel-bar">
                                        <span class="h-panel-title">规则配置[ 地址 ]</span>
                                        <div class="h-panel-right">
                                            <Button color="blue" size="s" @click="addrule('url')"><i
                                                    class="h-icon-plus"></i>添加规则
                                            </Button>
                                            <Button color="red" size="s" @click="testRule('url')">测试</Button>
                                        </div>
                                    </div>
                                    <div class="h-panel-body">
                                        <div>
                                            <Row>
                                                <Col width="9" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">前缀</span>
                                                    <input type="text" v-model="rulesModel.url.prefix"/>
                                                </div>
                                                </Col>
                                                <Col width="9" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">后缀</span>
                                                    <input type="text" v-model="rulesModel.url.suffix"/>
                                                </div>
                                                </Col>
                                                <Col width="6" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">属性</span>
                                                    <input type="text" v-model="rulesModel.url.attr"/>
                                                </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-for="(rule,index) in rulesModel.url.rules">
                                            <Row>
                                                <Col width="22" v-padding="2">
                                                <input type="text" placeholder="请输入规则..." v-model="rule.rule"/>
                                                </Col>
                                                <Col width="2">
                                                <Button icon="h-icon-trash" @click="removeRule(index,'url')"
                                                        text-color="red" :no-border="true"></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-if="rulesModel.url.rules.length <= 0" v-padding="2">
                                            <span class="primary-color text-center">暂无规则</span>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                <!-- desc -->
                                <div class="h-panel">
                                    <div class="h-panel-bar">
                                        <span class="h-panel-title">规则配置[ 简介 ]</span>
                                        <div class="h-panel-right">
                                            <Button color="blue" size="s" @click="addrule('desc')"><i
                                                    class="h-icon-plus"></i>添加规则
                                            </Button>
                                            <Button color="red" size="s" @click="testRule('desc')">测试</Button>
                                        </div>
                                    </div>
                                    <div class="h-panel-body">
                                        <div>
                                            <Row>
                                                <Col width="9" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">前缀</span>
                                                    <input type="text" v-model="rulesModel.desc.prefix"/>
                                                </div>
                                                </Col>
                                                <Col width="9" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">后缀</span>
                                                    <input type="text" v-model="rulesModel.desc.suffix"/>
                                                </div>
                                                </Col>
                                                <Col width="6" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">属性</span>
                                                    <input type="text" v-model="rulesModel.desc.attr"/>
                                                </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-for="(rule,index) in rulesModel.desc.rules">
                                            <Row>
                                                <Col width="22" v-padding="2">
                                                <input type="text" placeholder="请输入规则..." v-model="rule.rule"/>
                                                </Col>
                                                <Col width="2">
                                                <Button icon="h-icon-trash" @click="removeRule(index,'desc')"
                                                        text-color="red" :no-border="true"></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-if="rulesModel.desc.rules.length <= 0" v-padding="2">
                                            <span class="primary-color text-center">暂无规则</span>
                                        </div>
                                    </div>
                                </div>
                                <br>

                                <!-- pubdate -->
                                <div class="h-panel">
                                    <div class="h-panel-bar">
                                        <span class="h-panel-title">规则配置[ 发布时间 ]</span>
                                        <div class="h-panel-right">
                                            <Button color="blue" size="s" @click="addrule('pubdate')"><i
                                                    class="h-icon-plus"></i>添加规则
                                            </Button>
                                            <Button color="red" size="s" @click="testRule('pubdate')">测试</Button>
                                        </div>
                                    </div>
                                    <div class="h-panel-body">
                                        <div>
                                            <Row>
                                                <Col width="9" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">前缀</span>
                                                    <input type="text" v-model="rulesModel.pubdate.prefix"/>
                                                </div>
                                                </Col>
                                                <Col width="9" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">后缀</span>
                                                    <input type="text" v-model="rulesModel.pubdate.suffix"/>
                                                </div>
                                                </Col>
                                                <Col width="6" v-padding="2">
                                                <div class="h-input-group">
                                                    <span class="h-input-addon">属性</span>
                                                    <input type="text" v-model="rulesModel.pubdate.attr"/>
                                                </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-for="(rule,index) in rulesModel.pubdate.rules">
                                            <Row>
                                                <Col width="22" v-padding="2">
                                                <input type="text" placeholder="请输入规则..." v-model="rule.rule"/>
                                                </Col>
                                                <Col width="2">
                                                <Button icon="h-icon-trash" @click="removeRule(index,'pubdate')"
                                                        text-color="red" :no-border="true"></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div v-if="rulesModel.pubdate.rules.length <= 0" v-padding="2">
                                            <span class="primary-color text-center">暂无规则</span>
                                        </div>
                                    </div>
                                </div>
                            </FormItem>
                        </FormItemList>
                    </Form>
                </div>
                <div slot="footer">
                    <button class="h-btn" @click="cancelpass">取消</button>
                    <button class="h-btn h-btn-primary" @click="submitpass">确定</button>
                </div>
                <Loading text="数据加载中..." :loading="rulesModel.loading"></Loading>
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
        loading: false,
        toolbar: {
          title: null,
          flag: 4,
          submitetime: ""
        },
        rulesModel: {
          opened: false,
          resources: "",
          loading: false,
          title: {
            prefix: "",
            suffix: "",
            attr: "",
            rules: []
          },
          url: {
            prefix: "",
            suffix: "",
            attr: "",
            rules: []
          },
          desc: {
            prefix: "",
            suffix: "",
            attr: "",
            rules: []
          },
          pubdate: {
            prefix: "",
            suffix: "",
            attr: "",
            rules: []
          }
        },
        flagList: [
          {
            key: 1,
            title: "已发布"
          }, {
            key: 0, title: "未发布"
          }, {
            key: 9,
            title: "已删除"
          }, {
            key: 4,
            title: "全部"
          }
        ],
        datas: [],
        kinds: {},
        page: {
          current: 1,
          total: 0,
          size: 10
        },
        modal: {
          opened: false,
          id: "",
          resources: "",
          rgroup: "",
          rgroups: ["rss", "site"]
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
            this.datas = res.result.data
            this.page.total = res.result.page.total
            this.$LoadingBar.success()
          } else {
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
        this.modal.id = line.id
        this.modal.resources = line.resources
        this.modal.rgroup = line.rgroup
        this.modal.rtype = line.rtypeid
      },
      remove(line){
        if (line.id) {
          this.loading = true
          R.Resources.deleteResources(line.id).then(res => {
            if (!res.ok) {
              this.$Message.error("删除失败")
              console.log(res)
            }
            this.loading = false
            this.search()
          });
        } else {
          this.$Message.error("未获取到删除数据的id");
        }
      },
      editRule(line){
        this.rulesModel.opened = true
        this.rulesModel.resources = line.resources
      },
      cancel(){
        this.modal.opened = false
      },
      update(){
        this.$LoadingBar.start()
        R.Resources.updateResources({
          id: this.modal.id,
          resources: this.modal.resources,
          rgroup: this.modal.rgroup
        }).then(res => {
          if (res.ok) {
            this.$Message.success("修改成功")
            this.$LoadingBar.success()
          } else {
            this.$LoadingBar.fail()
          }
          this.modal.opened = false
          this.search()
        })
      },
      cancelpass(){
        this.rulesModel.opened = false
      },
      submitpass(){
        this.rulesModel.loading = true
      },
      addrule(type){
        if (type) {
          if (type === "title") {
            this.rulesModel.title.rules.push({
              rule: ""
            })
          } else if (type === "url") {
            this.rulesModel.url.rules.push({
              rule: ""
            })
          } else if (type === "desc") {
            this.rulesModel.desc.rules.push({
              rule: ""
            })
          } else if (type === "pubdate") {
            this.rulesModel.pubdate.rules.push({
              rule: ""
            })
          }
        }
      },
      removeRule(index, type){
        if (type) {
          if (type === "title") {
            this.rulesModel.title.rules.splice(index, 1)
          } else if (type === "url") {
            this.rulesModel.url.rules.splice(index, 1)
          } else if (type === "desc") {
            this.rulesModel.desc.rules.splice(index, 1)
          } else if (type === "pubdate") {
            this.rulesModel.pubdate.rules.splice(index, 1)
          }
        }
      },
      testRule(type){
        if (type) {
          var res = this.rulesModel.resources
          var rule = ""
          var prefix = ""
          var suffix = ""
          var attr = ""
          if (type === "title") {
            rule = this.rulesModel.title.rules.map(item => item.rule).join("@")
            prefix = this.rulesModel.title.prefix
            suffix = this.rulesModel.title.suffix
            attr = this.rulesModel.title.attr
          } else if (type === "url") {
            rule = this.rulesModel.url.rules.map(item => item.rule).join("@")
            prefix = this.rulesModel.url.prefix
            suffix = this.rulesModel.url.suffix
            attr = this.rulesModel.url.attr
          } else if (type === "desc") {
            rule = this.rulesModel.desc.rules.map(item => item.rule).join("@")
            prefix = this.rulesModel.desc.prefix
            suffix = this.rulesModel.desc.suffix
            attr = this.rulesModel.desc.attr
          } else if (type === "pubdate") {
            rule = this.rulesModel.pubdate.rules.map(item => item.rule).join("@")
            prefix = this.rulesModel.pubdate.prefix
            suffix = this.rulesModel.pubdate.suffix
            attr = this.rulesModel.pubdate.attr
          }

          this.$LoadingBar.start();
          R.Resources.testRule({
            url: res,
            rule: rule,
            prefix: prefix,
            suffix: suffix,
            attr: attr
          }).then(res => {
            if (res.ok) {
              const datas = res.result
              const resList = datas.filter(line => {
                return line && line.length > 0
              }).map(line => {
                return "<blockquote v-padding='5' class='bottom-line'>" + line + "</blockquote>"
              })
              this.$Modal({
                title: '内容 [ 共 ' + resList.length + ' 条 ]',
                content: resList.join("")
              });
              this.$LoadingBar.success();
            } else {
              this.$LoadingBar.fail();
            }
          })

        }
      }
    },
    mounted: function () {
      this.token = Utils.getLocal("token")
      this.search()
    }
  }
</script>
