<template>
    <!-- 动态设置元素的高度 -->
  <div class='cinemas' :style='mystyle'>
    <ul>
      <li v-for='data in cinemaList' :key='data.cinemaId'>
        {{ data.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import BetterScroll from 'better-scroll'
export default{
  data(){
    return{
      cinemaList:[],
      mystyle:{
        height:'0px',
      }
    }
  },
  mounted(){
          //动态获取视口高度
          //console.log(document.documentElement.clientHeight)
          this.mystyle.height=document.documentElement.clientHeight-50+'px'
        let id=localStorage.getItem('cityId')
      axios({
        url:`https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=7952814`,
        headers:{
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614697283756713108013057"}',
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res=>{
        this.cinemaList=res.data.data.cinemas

        //处理异步，数据回来之后才创建实例
        this.$nextTick(()=>{
          new BetterScroll('.cinemas',{
            scrollbar:{
              fade:true,
              interactive:false
            }
          })
        })
      })
  },

}
</script>

<style lang='scss' scoped>
li{
  height:50px;
}
.cinemas{
  //better-scroll 需要overflow和position的配置
  height:500px;
  overflow:hidden;
  position:relative;
}
</style>