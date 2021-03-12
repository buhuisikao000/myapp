<template>
  <div>
    <ul v-infinite-scroll='loadMore' 
    infinite-scroll-distance='0'
    infinite-scroll-disabled='loading'
    infinite-scroll-immediate-check='false'>
    
      <li v-for='data in datalist' :key='data.filmId' @click='handlePageChange(data.filmId)'>
        <img :src='data.poster'>
        <h3>{{data.name}}</h3>
        <p>观众评分&nbsp;{{ data.grade }}</p>
        <p>主演:&nbsp;{{ getActors(data.actors) }}</p>
      </li>
    </ul>
    
  </div>
</template>
<script>
import axios from 'axios'

export default{
  
  data(){
    return{
      datalist:[],
      currentPage:1,
      loading:false,
      totalMessage:1,
      message:'loading'
    }
  },
  methods:{
    handlePageChange(id){
      //编程式导航-路径跳转
      this.$router.push(`/detail/${id}`)
      //编程式导航-name跳转(两种方式选任何一种既可)
      //this.$router.push({name:'Detail',params:{id:id}})
    },

    getActors(val){
      let newlist=val.map(item=>item.name)
      return newlist.join(' ')
    },

    ajaxSend(){
      let id=localStorage.getItem('cityId')
      axios({
        url:`https://m.maizuo.com/gateway?cityId=${id}&pageNum=${this.currentPage}&pageSize=10&type=1&k=1044289`,
        headers:{
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614697283756713108013057","bc":"110100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res=>{
        this.datalist=[...this.datalist,...res.data.data.films] 
        this.totalMessage=res.data.data.total
        this.loading=false
      })
    },

    loadMore(){
      this.loading=true;
      this.currentPage++
      if (this.datalist.length>=this.totalMessage) return
    
      this.ajaxSend()
    }

  },
  mounted(){
      this.ajaxSend()
    },

}
</script>

<style lang='scss' scoped>
ul{
  li{
    padding:10px;
    overflow:hidden;
    img{
      float:left;
      width:100px;
    }
  }
}
</style>