<template>
  <div id="page-login">
    <div class="login-container">
      <div class="login-title">MinerPlud 管理端</div>
      <div class="login-name">
        <input type="text" v-model="login.username" placeholder="用户名"/>
      </div>
      <div class="login-password">
        <input type="password" v-model="login.password" placeholder="密码" @keyup.enter="submit"/>
      </div>
      <div class="buttonDiv">
        <p @click="submit" ><i class="h-loading" v-if="loading"></i>登录</p>
      </div>
    </div>
  </div>
</template>
<script>

import Login from 'model/login/Login';

export default {
  data() {
    return {
      login: {
        username: null,
        password: null
      },
      loading: false
    }
  },
  methods: {
    submit() {
      const self = this;
      this.loading = true;
      R.Login.login(this.login).then(resp=>{
        console.log(resp)
        if(resp.ok){
          if(resp.code === 200){
            this.$Message(resp.message)
            console.log(resp.result.data)
            Utils.removeLocal("miner-token")
            Utils.removeLocal("loginuser")
            Utils.saveLocal("miner-token", resp.result);
            Utils.saveLocal("loginuser",self.login.username)
            this.$router.replace('/');
          }else{
            this.$Message(resp.message)
          }
        }else{
          this.$Message("系统错误")
        }
        this.loading = false;
      });
    }
  }
}
</script>
