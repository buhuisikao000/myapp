<template>
  <div>
    <router-link tag='button' to='/city'>
    {{currentCity?currentCity:'选择城市'}}
    </router-link>
    <swiper :key='bannerList.length' ref='mybanner'>
      <li class='swiper-slide' v-for='data in bannerList' :key='data.bannerId'>
        <img :src='data.imgUrl'>
      </li>
    </swiper>
    <filmheader :class='isFixed?"fix":""'></filmheader>
    <router-view></router-view>
  </div>
</template>
<script>
import swiper from './Film/Swiper'
import axios from 'axios'
import filmheader from './Film/Filmheader'
import {Indicator} from 'mint-ui'

export default{
  data (){
    return {
      bannerList:[],
      isFixed:false,
      currentCity:''
    }
  },
  components:{
    swiper,
    filmheader
  },
  mounted(){
    Indicator.open({
      text:'加载中...',
      spinnerType:'fading-circle'
    })
    let id=localStorage.getItem('cityId')
    this.currentCity=localStorage.getItem('cityName')
    axios({
      url:`https://m.maizuo.com/gateway?type=2&cityId=${id}&k=1910379`,
      headers:{
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614697283756713108013057","bc":"110100"}',
        'X-Host': 'mall.cfg.common-banner' } 
    }).then(res=>{
      this.bannerList=res.data.data
      Indicator.close()
    })
    //务必记得在destroyed钩子中解绑监听事件
    window.onscroll=this.handleScroll;
  },
  destroyed(){
    window.onscroll=null
  },
  methods:{
    handleScroll(){
      let scrollTop=document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop>=this.$refs.mybanner.$el.offsetHeight){
        this.isFixed=true
      }  else{
        this.isFixed=false
      }
    }
  },
   
}
</script>
<style lang='scss' scoped>
.swiper-slide{
  img{
  width:100%;
  }
}

div{
  button{
    outline:none;
    border:none;
    border-radius: 12px;
    width:50px;
    height:30px;
    position:absolute;
    top:5px;
    left:5px;
    z-index:2;
    background-color:rgba(0, 0, 0, 0.3);
    color:#fff;
  }
}
</style>