<template>
  <div>
    <tabbar v-if='$store.state.isTabbarShow'></tabbar>
    
    
    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from '@/components/Tabbar'

//import bus from '@/bus/bus.js'

export default{
  data(){
    return{
      isShow:true
    }
  },
  components:{
    tabbar,
  },

  

  //事件总线方式实现非父子通信
  //beforeMounted(){
  //在这里订阅的目的是 解决先发布，后订阅的情况，因为detail组件是在beforeMount阶段发布消息
  //  console.log('我订阅了')
  //  bus.$on('maizuo',(data)=>{
  //    this.isShow=data
  //  })
  //}
}
</script>

<style lang='scss' scoped>
</style>