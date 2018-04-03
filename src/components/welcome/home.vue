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
      闲置空间
  </div>
</template>
<script>

export default {
  data() {
    return {
      count: 0,
      rescount: 0,
      visitcount: 0
    }
  },
  methods: {
    getArticleCount(){
      R.Home.articleCount().then(resp => {
        if (resp.ok) {
          if(resp.code == 200){
            this.count = resp.result.data
          }else{
            this.$Message(resp.message)
          }
        }else{
          this.$Message("系统错误")
        }
      })
    },
    getResourcesCount(){
      R.Home.resourcesCount().then(resp => {
        if (resp.ok) {
          if(resp.code == 200){
            this.rescount = resp.result.data
          }else{
            this.$Message(resp.message)
          }
        }else{
          this.$Message("系统错误")
        }
      })
    },
    getVisitCount(){
      R.Home.visitCount().then(resp => {
        if (resp.ok) {
          if(resp.code == 200){
            this.visitcount = resp.result.data
          }else{
            this.$Message(resp.message)
          }
        }else{
          this.$Message("系统错误")
        }
      })
    }
  },
  mounted: function(){
  }
}
</script>
