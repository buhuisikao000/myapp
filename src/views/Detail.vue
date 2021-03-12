<template>
  <!-- v-if解决提前渲染问题,在数据回来之前就会渲染 -->
  <div v-if='flimInfo'>

    <div class="coverImg">
      <img :src='flimInfo.poster'>
      <div class='coverInfo active'>
        <h2>{{flimInfo.name}}</h2>
        <h3>{{flimInfo.category}}</h3>
        <p>{{flimInfo.synopsis}}</p>
      </div>
     
    </div>

    <div class='avatar'>
      <h3>演职人员</h3>
      <swiper :key='flimInfo.actors.length' imgNum='4' class='avatarSwiper' myclass='avatarSwiper'>
        <li v-for='(data,index) in flimInfo.actors' :key='index' class='swiper-slide'>
         <img :src='data.avatarAddress'>
         <p>{{ data.name }}</p>
         <p>{{ data.role }}</p>
        </li>
      </swiper>
    </div>

    <div class='photo'>
      <h3>剧照</h3>
      <swiper :key='flimInfo.photos.length' imgNum='3' class='photoSwiper' myclass='photoSwiper'>
        <li v-for='(data,index) in flimInfo.photos' :key='index' class='swiper-slide'>
         <img :src='data'>
        </li>
      </swiper>
    </div>
    

    
  </div>
</template>
<script>
import axios from 'axios'
import swiper from './Detail/DetailSwiper'
//import bus from '@/bus/bus.js'
export default{
    data(){
      return{
        flimInfo:null
      }
    },

    beforeMount(){
      //切忌不要用这种方法直接修改 state里面的状态,一定要通过mutations
      //this.$store.state.isTabbarShow=false

      //commit就是提交请求给mutation, 第一个参数是 mutation的名字,第二个参数传值
      this.$store.commit('hideTabbar',false)

    },
    
    mounted(){
        axios({
          url:`https://m.maizuo.com/gateway?filmId=${this.$route.params.id}&k=2300226`,
          headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614697283756713108013057","bc":"110100"}',
            'X-Host': 'mall.film-ticket.film.info'
          }
        }).then(res=>{
          this.flimInfo=res.data.data.film
          console.log(res.data.data.film)
        })
    },

    
    destroyed(){
      this.$store.commit('hideTabbar',true)
    },


    components:{
      swiper
    }
}
</script>

<style lang='scss' scoped>
.coverImg{
  width:100%;
  height:350px;
  overflow:hidden;
  position:relative;
  margin-bottom:20px;
  img{
    width:100%;
    transform: translateY(-30%);
  }
  .coverInfo{
    position:absolute;
    background:#fff;
    width:100%;
    bottom:0px;
    z-index:1;
  }
  .active{
    height:150px;
  }
}

.avatar,
.photo{
  background:#fff;
  height:170px;
  padding:10px;
  margin-bottom:20px;
  overflow:hidden;
}
.photo{
  h3{
    padding:20px 0;
  }
}
p{
  padding:5px;
  font-size:15px;
}
</style>