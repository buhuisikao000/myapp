import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '@/views/Flim'
import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import Detail from '@/views/Detail'
import Nowplaying from '@/views/Film/Nowplaying'
import Comingsoon from '@/views/Film/Comingsoon'
import City from '@/views/City'


Vue.use(VueRouter)
//配置导航路由
const routes = [
  {
    path: '/film',
    name: 'Film',
    component: Film,
    // 二级路由,明确父子关系
    children:[
      {
        path:'/film/nowplaying',
        name: 'Nowplaying',
        component:Nowplaying,
      },
      { //可以写成 /film/comingsoon 或者 comingsoon, 
        //!!!但是千万不要写成 /comingsoon 
        path:'/film/comingsoon',
        name: 'Comingsoon',
        component:Comingsoon,
      },
      { //注意这个空字符串,解决了很多问题
        path:'',
        redirect:'/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: Cinema
  },
 
  {
    //动态路由,记得加冒号(:),动态匹配 
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/center',
    name: 'Center',
    component: Center
  },
  {
    path:'/city',
    name:City,
    component:City
  },
  { //路由重定向,(*)是通配符,表示上面的都不符合的时候,就执行下面的重定向
    path:'*',
    redirect:'/film'
  }
]

const router = new VueRouter({
  /*history模式,在地址栏不显示#,  hash模式显示#
      如: http://localhost:8080/film/nowplaying  history模式
          http://localhost:8080/#/film/nowplaying  hash模式

    +不过当用户直接在浏览器访问 http://localhost:8080/film/nowplaying
    由于找不到任何静态资源,就会返回404,

    +所以history模式需要后端提供支持:
      在服务端增加一个覆盖所有情况的候选资源:如果url匹配不到任何静态资源,
      返回同一个 index.html 页面,这个页面就是app依赖的页面
    
*/
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// const auth={
//   isLogin (){
//     return false
//   }
// }
//路由守卫:全局守卫 和 组件内部守卫(在组件内部设置)
//全局守卫,所有导航都会被"盘查" 
//from:从哪里来    to:到哪里去    next:我指定你去哪里
//所以next方法 才是导航最终要去到的地方
// router.beforeEach((to,from,next)=>{
//   if (to.path==='/center'){ //如果要去到用户才能到的指定页面
//     if (!auth.isLogin()){
//       next('/login')
//     } else {
//       next()
//     }
//   } else{
//     next()
//   }
// })



export default router
