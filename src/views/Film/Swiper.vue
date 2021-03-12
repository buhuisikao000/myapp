<template>
    <div class="swiper-container filmswiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
//上面仅仅引入了swiper.js文件,我们还需要引入swiper.css文件
import 'swiper/swiper.min.css'

export default{
    mounted(){
        new Swiper('.filmswiper', {
            loop: true, 
        })
    }
}
</script>

<style lang='scss' scoped>
.swiper-container{
    height:150px;
    width:100%;
}
</style>