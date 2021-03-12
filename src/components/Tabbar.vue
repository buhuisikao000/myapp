<template>
  <nav>
    <ul>
    <!-- 
    路由声明式导航: router-link 标签对
      to="/film"  表示被点击的时候,添加的路由地址,会自动添加#, 变成#/film(hash值)
      tag='li' 很方便的一个属性,我说你是什么标签,你就是什么标签
      activeClass='myactive' 指定你的类名,方便添加样式
    -->
      <router-link to="/film" tag='li' activeClass='myactive'>
        <i class='iconfont'>&#xe6fa;film</i>
      </router-link>
      <router-link to="/cinema" tag='li' activeClass='myactive'>
        <i class='iconfont'>&#xe702;cinema</i>
      </router-link>
      <router-link to="/center" tag='li' activeClass='myactive'>
        <i class='iconfont'>&#xe6fe;center</i>
      </router-link>
    </ul>
  </nav>
</template>


<style lang='scss' scoped>
    .myactive{
        color:orange;
    }
    nav{
      position:fixed;
      bottom:0px;
      left:0px;
      width:100%;
      height:50px;
      background:#ddd;
      z-index:999;
      ul{
        display:flex;
        li{
          flex:1;
          text-align:center;
          line-height:50px;
        }
      }
    }
</style>