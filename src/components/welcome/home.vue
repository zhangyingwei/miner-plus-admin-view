<style lang='less'>
.progress-div{
  padding: 30px 40px;
  >p{
    margin: 10px;
  }
}
</style>
<template>
  <div class="app-home" v-padding="20">
    <Row>
      <Col width="4">
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">昨日新增</span> 
          </div>
          <div class="h-panel-body" v-font="36">
            <i class="h-icon-plus green-color">&nbsp;{{yesterdaynew}}</i>
          </div>
        </div>
      </Col>
    </Row>
    <Loading text="加载中..." :loading="loading"></Loading>
  </div>
</template>
<script>

export default {
  data() {
    return {
      yesterdaynew: 0,
      loading: false
    }
  },
  methods: {
    getYesterdayAdd(){
      this.loading = true
      R.Content.getYesterdayNew().then(resp => {
        if (resp.ok) {
          if(resp.code == 200){
            this.yesterdaynew = resp.result
          }else{
            this.$Message(resp.message)
          }
        }else{
          this.$Message("系统错误")
        }
        this.loading = false
      })
    }
  },
  mounted: function(){
    this.getYesterdayAdd()
  }
}
</script>
