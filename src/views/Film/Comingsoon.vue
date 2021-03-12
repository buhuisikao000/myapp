<template>
  <div>
    <ul>
      <li v-for='data in $store.state.comingList' :key='data.filmId' @click='detailClick(data.isPresale,data.filmId)'>
        <img :src='data.poster'>
        <h3>{{data.name}}</h3>
        <p>观众评分&nbsp;{{ data.grade }}</p>
        <p>主演:&nbsp;{{ getActors(data.actors) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
  mounted(){
    if (this.$store.state.comingList.length===0){
      this.$store.dispatch('getComingList')
    }
  },

  methods:{
    detailClick(data,id){
      if (!data){
        MessageBox({
          title:'提示',
          message:'暂时没有排片,返回首页再看看',
          showCancelButton:'true'
        }).then(res=>{
          if (res==='confirm'){
            this.$router.push(`/film`)
          }
        })
      }
      this.$router.push(`/detail/${id}`)
    },
    getActors(val){
      let newlist=val.map(item=>item.name)
      return newlist.join(' ')
    },
  }
}
</script>

<style lang='scss' scoped>
li{
  padding:10px;
  overflow:hidden;
  margin-bottom:20px;
  img{
    width:100px;
    float:left;
  }
}
</style>