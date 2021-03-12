<template>
  <ul> 
    <router-link to='/film/nowplaying' tag='li' activeClass='myactive'>正在热映</router-link>
    <router-link to='/film/comingsoon' tag='li' activeClass='myactive'>即将上映</router-link> 
  </ul>
</template>


<style lang='scss' scoped>
ul{
    display:flex;
    width:100%;
    height:50px;
    background:#fff;
    li{
        line-height: 50px;
        text-align: center;
        flex: 1;
    }
    .myactive{
        color: orange;
        border-bottom: 2px solid orange;
    }
}
.fix{
position:fixed;
top: 0;
left:0;
}
</style>