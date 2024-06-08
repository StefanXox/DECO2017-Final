<template>
    <div>
      <div class="firView out_view">
         <div class="titleBox content_view">
             <div>
                 <h1>Find a training program to achieve your goals</h1>
                 <p>Or Build your own perfect workout plans with our exercise library</p>
             </div>            
         </div>
      </div>
      <div class="secView out_view" style="background-color: #f4f5f6;">
         <div class="programBox content_view showForPc">
             <div class="p_box">
                 <div class="p_l_box">
                     <p>explore fitness program</p>
                     <div class="p_l_ul">
                         <div class="p_l_ul_item" v-for="(item ,index) in programMenusData" :key="index" @click="getToPath(item.path)">
                             <img class="p_l_ul_item_icon" :src="item.icon" alt="">
                             <p>{{ item.name }}</p>
                             <img class="p_l_ul_item_arrow" :src="arrow" alt="">
                         </div> 
                     </div>
                 </div>
                 <div class="p_r_box">
                     <div class="p_r_win">
                         <div class="p_r_win_item">
                             <img :src="desktop" />
                         </div>
                         <button>Start Training</button>
                     </div>
                 </div>
             </div>
         </div>
         <div class="programBoxPh showForPh">
             <p>explore fitness program</p>
             <el-carousel ref="carousel" trigger="click" height="800px" :autoplay="false" indicator-position="none" arrow="never">
                 <el-carousel-item v-for="(item ,index) in programMenusData" :key="index">
                     <div class="carolItem">
                         <img class="p_l_ul_item_icon" :src="item.icon" alt="">
                         <p>{{ item.name }}</p>
                         <div class="p_r_win_item">
                             <img :src="desktop" />
                         </div>
                         <button>Start Training</button>
                     </div>
 
                 </el-carousel-item>
             </el-carousel>
         </div>
     </div>
     <div class="thrBox out_view">
         <div class="fitBox content_view">
             <div class="fit_l">
                 <h1 class="fit_T">Simple fitness experience for everyone.</h1>
                 <p class="fit_t">Track your workouts, get better results, and be the best version of you. Less thinking, more lifting.</p>
                 <button class="fit_b">Download App</button>
             </div>
             <div class="fit_r">
                 <img :src="fitimg" alt="">
             </div>
         </div>
     </div>
    </div>
 </template>
 <script>
 const icon1 = require('@/assets/p_icon-1.png');
 const icon2 = require('@/assets/p_icon-2.png');
 const icon3 = require('@/assets/p_icon-3.png');
 const arrow = require('@/assets/p_arrow.png');
 const desktop = require('@/assets/p_desktop.png');
 const fitimg = require('@/assets/fit_img.png')
 export default {
    name: 'indexPage',
    components: {
      
    },
    mixins: [],
    props: {
      
    },
    data() {
      return {
        arrow,desktop,fitimg,
        programMenusData: [
         {name: 'Workout Calendar', path: '/calendar', icon: icon1, image: desktop},
         {name: 'Exercise Library', path: '/library', icon: icon2, image: desktop},
         {name: 'Progress Tracker', path: '/tracker', icon: icon3, image: desktop},
        ]
      }
    },
    computed: {
      
    },
    watch: {
      
    },
    mounted() {
     let startX = undefined;
     let endX = undefined;
     let that = this;
      this.$refs.carousel.$el.addEventListener('touchstart', function(e) {
         startX = e.changedTouches[0].pageX
      })
      this.$refs.carousel.$el.addEventListener('touchmove', function(e) {
         endX = e.changedTouches[0].pageX
      })
      this.$refs.carousel.$el.addEventListener('touchend', function() {
         if (endX == 0 || startX - endX == 0) {
             startX = undefined;
             endX = undefined;
             return
         }
         if (startX - endX > 0) {
             startX = undefined;
             endX = undefined;
             that.$refs.carousel.next()
             return
         }
         if (startX - endX < 0) {
             startX = undefined;
             endX = undefined;
             that.$refs.carousel.prev()
             return
         }
      })
    },
    methods: {
      
        getToPath(path) {
        this.$router.push(path)
    }
    }
 };
 </script>
 <style lang='css' scoped>
 .titleBox{
     background-color: #e6e8ec;
     display: flex;
     border-radius: 20px;
 }
 .titleBox>div{
     margin: auto;
     width: 100%;
     padding: 130px 70px;
 }
 .titleBox p{
     text-align: center;
     font-size: 25px;
 }
 .titleBox h1{
     text-align: center;
     margin: 0px auto;
     font-size: 60px;
 }
 .secView{
     margin: 50px 0;
     padding: 100px 0px;
 }
 .programBox{
     background-color: #fff;
     border-radius: 20px;
 }
 .p_box{
     padding: 50px;
     display: flex;
     flex-direction: row;
 }
 .p_l_box{
     width: 40%;
 }
 .p_l_box>p{
     font-size: 20px;
     font-weight: bold;
     color: #777e90;
     margin-bottom: 30px;margin-left: 20px;
 }
 .p_l_ul{
     display: flex;
     flex-direction: column;
 }
 .p_l_ul_item{
     display: flex;
     flex-direction: row;
     width: 90%;
     padding-right: 10%;
     margin: 20px 0px;
     transition: 1s;
     padding: 20px;
     border-radius: 10px;
     cursor: pointer;
 }
 .p_l_ul_item:hover{
     background-color: #f4f5f6;
 }
 .p_l_ul_item_icon{
     width: 50px;height: 50px;
     margin-right: 30px;
 }
 .p_l_ul_item>p{width: calc(100% - 100px);font-size: 25px;font-weight: bold;margin: 0;line-height: 50px;}
 .p_l_ul_item_arrow{width: 20px;height: 20px;margin: auto;}
 .p_r_box{width: 40%;padding: 0px 10%;}
 .p_r_win_item{width: 100%;text-align: center;}
 .p_r_win_item>img{width: 100%;max-height: 450px;}
 .p_r_win>button, .carolItem>button, .fit_b{display: block;background-color: #ff592c;color: #fff;font-size: 30px;font-weight: bold;padding: 15px 20px;border-radius: 30px;border: none;margin: 0 auto;}
 .programBoxPh>p{
     font-size: 30px;text-align: center;color: #777e90;font-weight: bold;
 }
 .carolItem{
     width: 84%;
     background-color: #fff;
     margin: 0px 8%;
     border-radius: 20px;
     padding: 20px 0;
     padding-bottom: 100px;
 }
 .carolItem>.p_l_ul_item_icon{margin: 20px auto;display: block;width: 80px;height: 80px;}
 .carolItem>p{text-align: center;font-size: 30px;font-weight: bold;}
 .carolItem>.p_r_win_item{
     width: 90%;margin: 0px 5%;height: auto;
 }
 .fitBox{display: flex;flex-direction: row;flex-wrap: wrap;padding: 100px 0px;padding-bottom: 200px;}
 .fit_l{margin: auto 0px;width: 40%;margin-right: 10%;}
 .fit_T{font-size: 60px;font-weight: bolder;}
 .fit_t{font-size: 20px;line-height: 40px;color: #777e90;}
 .fit_b{margin: 40px 0px 0px 0px;}
 .fit_r{width: 50%;}
 .fit_r>img{width: 100%;height: auto;}
 @media screen and (max-width: 1300px) {
     .titleBox>div{padding: 30px 20px;}
     .titleBox h1{font-size: 40px;}
     .titleBox p{font-size: 16px;}
     .p_r_win>button, .carolItem>button, .fit_b{font-size: 20px;}
     .fit_l, .fit_r{width: 100%;word-break: break;}
     .fit_T{font-size: 50px;}
     .fit_b{margin: 30px auto;}
     .fit_l{margin-bottom: 70px;}
 }
 </style>