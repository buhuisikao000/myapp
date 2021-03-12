<template>
  <div>
    个人中心-登录页面
  </div>
</template>

<script>
const auth={
  isLogin (){
    return true
  }
}

export default{
  beforeRouteEnter(to, from, next){  
    if (auth.isLogin()){
      next()
      }else{
        next('/login')
      }
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
html{
  height:100%;
}
body{
  background:#eee;
}
ul,li{
  list-style:none;
}
</style>