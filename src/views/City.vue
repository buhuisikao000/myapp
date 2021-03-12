<template>
    <div>
        <mt-index-list>
            <mt-index-section :index="data.index" v-for='data in $store.state.cities' :key='data.index'>
            <!-- 这里的结构是经过改造的, mt-cell不支持点击事件,所以我们再外面套一层div标签-->
                <div v-for='city in data.list' :key='city.cityId' @click='handleClick(city.cityId,city.name)'>
                    <mt-cell :title="city.name"></mt-cell>
                </div>
            </mt-index-section>    
        </mt-index-list>
    </div>
</template>

<script>
export default{
  mounted(){
        if (this.$store.state.cities.length===0){
            this.$store.dispatch('getCity')
        } 
  },
  
  methods:{
      handleClick(id,name){ 
        //把信息存到localstorge中,因为信息在store中刷新之后就没了,而localstorage中永久存储
        localStorage.setItem('cityId',id)
        localStorage.setItem('cityName',name)
        console.log(id,name)
        this.$store.commit('setCityMutation',name)
        this.$router.push('/film')
        
      }
  }

}
</script>