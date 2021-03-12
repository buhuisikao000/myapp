import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //这就是一个公共空间,用来一些存放自定义的共享状态
    isTabbarShow:true,
    comingList:[],
    currentCity:'重庆',
    cities:[]
  },
  mutations: {//可以自己去了解mutation的常量设计风格
    hideTabbar(state,data){
      //**唯一修改状态的地方 */
      // console.log('commited')
      state.isTabbarShow=data
    },
    comingListMutation(state,data){
      state.comingList=data
    },
    getCityMutation(state,data){
      state.cities=data
    },
    setCityMutation(state,data){
      state.currentCity=data
    }
  },
  actions: {
    //异步处理
    getComingList(store){
      axios({
        url:'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=3121981',
        headers:{
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614697283756713108013057","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
      }).then(res=>{
        store.commit('comingListMutation',res.data.data.films)
      })
    },

    getCity(store){
      axios({
        url:'https://m.maizuo.com/gateway?k=6964002',
      headers:{
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614697283756713108013057","bc":"500100"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
      }).then(res=>{
        let letterArr=[]
          for (let i=65;i<91;i++){
              letterArr.push(String.fromCharCode(i))
            }  
         let newlist=[]
         for (let j=0;j<letterArr.length;j++){
             let arr=res.data.data.cities.filter(item=>item.pinyin.substring(0,1)===letterArr[j].toLowerCase())
             if (arr.length>0){
                 newlist.push({
                     index:letterArr[j],
                     list:arr
                 })
             }
         }
        store.commit('getCityMutation',newlist)  
      })
    }
  },
  modules: {
  },
  getters:{
    //当有特殊需求的时候,对信息进行筛选,外部要拿通过 $store.getters.topTenList
    topTenList(state){
      return state.comingList.filter((item,index)=>index<1)
    }
  }
})
