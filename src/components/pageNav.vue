<template>
    <div class="outBox">
     <div class="navLine">
         <div class="logoBox" @click="getToPath('/')">
             <img :src="require('@/assets/logo.png')" />
             Start Training
         </div>
         <div class="menuBox">
             <transition-group name="menu" style="position: relative;" >
                 <div :key="1" v-show="!isShowMenu" class="menuTxt">User</div>
                 <div :key="2" v-show="!isShowMenu" class="menuImg menuShow" :style="`background: url(${menuIcon}) 0px 0px no-repeat;`" @click="showMenu"></div>
                 <div :key="3" v-show="isShowMenu" class="menuImg menuHide" :style="`background: url(${closeIcon}) 0px 0px no-repeat;`" @click="closeMenu"></div>
             </transition-group>
         </div>
         <div class="menuList" :data-show="isShowMenu">
             <div class="menuItem"  v-for="(item, index) in menus" :key="index" @click="getToPath(item.path)">
                 {{ item.name }}
             </div>
         </div>
     </div>
    </div>
 </template>
 <script>
 const menuIcon = require('@/assets/menu.png');
 const closeIcon = require('@/assets/close.png');
 export default {
    name: 'pageNav',
    components: {
 },
    mixins: [],
    props: {
      
    },
    data() {
      return {
        menuIcon,closeIcon,
        isShowMenu: false,
        menus: [
         {name: 'Workout Calendar', path: '/calendar'},
         {name: 'Workout Log', path: '/'},
         {name: 'Exercise Library', path: '/library'},
         {name: 'Progress Tracker', path: '/tracker'},
        ]
      }
    },
    computed: {
      
    },
    watch: {
      
    },
    mounted() {
      
    },
    methods: {
     showMenu() {
         this.isShowMenu = true;
     },
     closeMenu() {
         this.isShowMenu = false;
     },
     getToPath(path) {
         this.closeMenu()
         if(this.$router.history.current.path == path) return 0
         this.$router.push(path)
     }
    }
 };
 </script>
 <style lang='css' scoped>
 .outBox{
     height: 150px;
     width: 100%;
     background-color: #fff;
     display: flex;
 }
 .navLine{
     display: flex;
     flex-direction: row;
     width: 100%;
     max-width: 1200px;
     justify-content: space-between;
     padding: 0px 50px;
     margin: auto;
     position: relative;
 }
 .logoBox{
     font-size: 30px;
     line-height: 40px;
 }
 .logoBox>img{
     widows: 40px;
     height: 40px;
     float: left;
     margin-right: 20px;
 }
 .menuBox{
     display: flex;
     flex-direction: row;
     margin: auto 0;
     width: 166px;
     height: 42px;
     overflow: hidden;
 }
 .menuBox div{
     margin-left: 20px;
     font-size: 20px;
     line-height: 40px;
 }
 .menuTxt{
     border: 1px solid #ccc;
     border-radius: 20px;
     padding: 0px 20px;
     position: absolute;
     width: 40px;
     text-align: center;
     top: 0px;
     height: 39px;
 }
 .menuImg{
     width: 40px;
     height: 40px;
     background-size: 32px 32px !important;
     background-position: center !important;
     position: absolute;
     left: 100px;
 }
 .menuHide{
     right: 0px;
 }
 .menu-move,
 .menu-enter-active {
   transition: 0.5s linear;
 }
 .menu-enter, .menu-leave-to{
     opacity: 0;
     transform: translate(-100vw, -60px);
 }
 .menuList{
     position: absolute;
     width: calc(100% - 40px);
     top: 100%;
     padding: 20px;
     background-color: #fffffffd;
     transition: 0.5s;
     height: 0px;
     overflow: hidden;
     left: 0px;
     z-index: 1999;
 }
 .menuList[data-show = true]{
     height: 340px;
 }
 .menuItem{
     text-align: center;
     margin: 20px 0px;
     font-size: 30px;
     font-weight: bold;
     color: #777e90;
     text-decoration: none;
     cursor: pointer;
 }
 @media screen and (max-width: 1300px){
     .logoBox{font-size: 20px;line-height: 40px;}
     .logoBox>img{width: 20px;height: 20px;margin: 10px 5px;}
     .menuBox div{margin: 0;}
     .menuTxt{font-size: 14px;padding: 0px 10px;width: 40px;border: none;margin-left: 0px;}
     .menuBox{width: 100px;}
     .menuImg{margin-left: 10px;}
     .navLine{padding: 0;}
     .menuImg{left: 60px;}
 }   
 </style>