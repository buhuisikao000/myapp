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
//import 'swiper/swiper.scss'

export default{
    props:['imgNum','myclass'],
    mounted(){
        new Swiper(`.${this.myclass}`, {
            slidesPerView: 4,
            spaceBetween: 10,
            freeMode: true,
        })
    }
}
</script>

<style lang='scss' scoped>
.swiper-container{
    height:100%;
    img{
        width:100%;
    }
}
</style>