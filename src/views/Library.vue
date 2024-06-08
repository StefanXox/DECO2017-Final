<template>
    <div>
      <div class="LIbraryBox">
        <div class="libraryInput">
          <input placeholder="Find A Clss" maxlength="30" v-model="params.keyword"/>
        <el-button icon="el-icon-search" type="primary" size="medium" round style="background-color: #ff592c;font-size: 20px;" @click="handelQuanry"></el-button>
      </div>
      <el-row :gutter="20">
        <el-col>
          <div class="topActionLine">
            <el-select v-model="params.type" @change="handelQuanry">
              <el-option v-for="item in selectOptions.type" :key="item.value" :value="item.value" :label="item.label" />
            </el-select>
            <div class="lessonLine" v-if="!isPhone" @change="handelQuanry">
              <div class="selectLT" v-for="item in selectOptions.lessonType.slice(1)" :key="item.value" :selected="params.lessonType == item.value" @click="setParamlessonType(item.value)">{{ item.label }}</div>
            </div>
            <div v-if="!isPhone">
              <el-button round type="primary" @click="clearFilter">Fliter <i class="el-icon-close"></i></el-button>
            </div>
          </div>
        </el-col>
        <hr>
        <el-col>
          <el-form label-position="top" inline style="display: flex;flex-direction: row;justify-content: space-between;flex-wrap: wrap;">
            <el-form-item label="STYLE" v-if="isPhone">
              <el-select v-model="params.lessonType" @change="handelQuanry">
                <el-option v-for="item in selectOptions.lessonType" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
            <el-form-item label="STYLE">
              <el-select v-model="params.style" @change="handelQuanry">
                <el-option v-for="item in selectOptions.style" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
            <el-form-item label="TIME OF times">
              <el-select v-model="params.times" @change="handelQuanry">
                <el-option v-for="item in selectOptions.times" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
            <el-form-item label="DIFFICULTY">
              <el-select v-model="params.difficulty" @change="handelQuanry">
                <el-option v-for="item in selectOptions.difficulty" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
            <el-form-item label="INTENSITY">
              <el-select v-model="params.intensity" @change="handelQuanry">
                <el-option v-for="item in selectOptions.intensity" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-form>
          <el-button v-if="isPhone" style="width: 200px;" round type="primary" @click="clearFilter">Fliter <i class="el-icon-close"></i></el-button>
        </el-col>
      </el-row>
      <div class="lessons">
        <template v-if="result.length > 0">
          <div class="lessonCard" v-for="item in result" :key="item.id">
            <div class="lessonPic" :style="`background: url(${bgArr[item.bg]}) 0px 0px no-repeat #c6cbcf;`">
              <div class="lessonType" :style="`background-color: ${selectOptions.lessonType[item.lessonType].color};`">{{ selectOptions.lessonType[item.lessonType].label }}</div>
              <img v-show="item.isVideo ? true : false" :src="play" class="palyImg" alt="">
            </div>
            <div class="lessonInfo">
              <div class="lessonILine">
                <div class="userA" :style="`background: url(${userArr[item.userPic]}) 0px 0px no-repeat #c6cbcf;`"></div>
                <div class="Lname">
                  <span>{{selectOptions.style[item.style].label}} {{selectOptions.intensity[item.intensity].label}}</span>
                  <br>
                  <span>{{selectOptions.times[item.times].label}}</span>
                </div>
                <div class="Lkind" :style="`border-color: ${selectOptions.difficulty[item.difficulty].color};color: ${selectOptions.difficulty[item.difficulty].color};`">
                  {{ selectOptions.difficulty[item.difficulty].label }}
                </div>
              </div>
              <div class="lessonILine">
                <div class="palynum" :style="`background: url(${playN}) 0px 0px no-repeat ;`">{{ item.palyNum }}</div>
                <div class="playuser" :style="`background: url(${joinN}) 0px 0px no-repeat ;`">{{ item.userNum }}</div>
              </div>
            </div>
          </div>
        </template>
          <el-empty v-if="result.length <= 0" :image-size="250" description="No Lessons" style="width: 50%;height: auto;margin: 20px auto;"></el-empty>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { isPhoneWidth } from '@/utils/isPhoneWidth';
const bg1 = require('@/assets/01.png');
const bg2 = require('@/assets/02.png');
const bg3 = require('@/assets/03.png');
const bg4 = require('@/assets/04.png');
const bg5 = require('@/assets/05.png');
const bg6 = require('@/assets/06.png');
const bg7 = require('@/assets/07.png');
const bg8 = require('@/assets/08.png');
const bg9 = require('@/assets/09.png');
const bg10 = require('@/assets/10.png');
const c1 = require('@/assets/c1.png');
const c2 = require('@/assets/c2.png');
const c3 = require('@/assets/c3.png');
const c4 = require('@/assets/c4.png');
const joinN = require('@/assets/lessonJoin.png');
const playN = require('@/assets/lessonPlayNum.png');
const play = require('@/assets/lessonPlay.png');
const selectOptions = {
  type: [
    {label: 'Newest', value: 1},
    {label: 'Most Viewed', value: 2},
    {label: 'Most Engaged', value: 3},
  ],
  lessonType: [
  {label: 'ALL', value: 0},
    {label: 'Fitness & Gym', value: 1, color: '#64d26f'},
    {label: 'Yoga', value: 2, color: '#5564d7'},
    {label: 'Mindfulness', value: 3, color: '#f1be5b'},
    {label: 'Gymnastics', value: 4, color: '#e04b43'},
  ],
  style: [
    {label: 'All Styles', value: 0},
    {label: 'Ab Workouts', value: 1},
    {label: 'Waist Exercises', value: 2},
    {label: 'Leg Exercises', value: 3},
  ],
  times: [
    {label: 'All Day', value: 0},
    {label: 'Monning', value: 1},
    {label: 'Afternoon', value: 2},
    {label: 'Before Bedtime', value: 3},
  ],
  difficulty: [
    {label: 'ALL', value: 0},
    {label: 'BEGINNER', value: 1, color: '#45b26b'},
    {label: 'INTERMEDIATE', value: 2, color: '#9757d7'},
    {label: 'ADVANCED', value: 3, color: '#fe6d46'},
  ],
  intensity: [
  {label: 'ALL', value: 0},
  {label: 'Level 1', value: 1},
  {label: 'Level 2', value: 2},
  {label: 'Level 3', value: 3},
  ]
}
const initParams = {
  type: 1,
  lessonType: 0,
  style: 0,
  times: 0,
  difficulty: 0,
  intensity: 0,
  keyword: ''
}
    export default {
      name: 'LIbrary',
      data() {
        return {
        bgArr: [bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8,bg9,bg10],
        userArr: [c1,c2,c3,c4],
        joinN,playN,play,
        isPhone: false,
        selectOptions,
        params: {
          ...initParams
        },
        list: [],
        result: []
      }
    },
    computed: {
      colSpan() {
        return this.isPhone ? 24 : 12
      }
      },
      mounted() {
      this.isPhone = isPhoneWidth();
      window.onresize = () => {
        this.isPhone = isPhoneWidth();
      }
      this.list = this.$store.getters.lessons;
      this.result = this.list;
    },
    methods: {
      setParamlessonType(i) {
        this.params.lessonType = i;
        this.handelQuanry()
      },
      clearFilter() {
        this.params = {
          ...initParams
        }
        this.handelQuanry()
      },
      handelQuanry() {
        console.log(this.params)
        const {type,lessonType,style,times,difficulty,intensity,keyword}  = this.params;
        this.result = this.list.filter(i => {
          if(lessonType) {
            if(i.lessonType != lessonType) return false;
          }
          if(style) {
            if(i.style != style) return false;
          }
          if(times) {
            if(i.times != times) return false;
          }
          if(difficulty) {
            if(i.difficulty != difficulty) return false;
          }
          if(intensity) {
            if(i.intensity != intensity) return false;
          }
          if(keyword) {
            const name = this.selectOptions.style[i.style].label + ' ' + this.selectOptions.intensity[i.intensity].label;
            if(!name.includes(keyword)) return false;
          }
          return true
        })
        let key = ''
        if(type == 1) key = 'id'
        else if(type == 2) key = 'palyNum'
        else if(type == 3) key = 'userNum'
        this.result.sort((a, b) => {
          return b[key] - a[key]
        })
      }
    }
    }
  </script>
  
  <style lang="css" scoped>
  ::v-deep .el-form--inline .el-form-item__label{
  font-weight: bold;
  color: #aaa;
  padding-bottom: 0px;
}
  .LIbraryBox{
    max-width: 1500px;
    padding: 10px;
    margin: 0 auto;
  }
  .libraryInput{
    display: flex;
    flex-direction: row;
    border: 1px solid #ccc;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    justify-content: space-between;
    overflow: hidden;
  }
  .libraryInput>input{
    flex: 1;
    border: none;
    padding: 0px 20px;
    font-size: 20px;
    line-height: 38px;
    outline: none;
    margin: 0px 20px;
  }
  .colMargin{
  margin: 20px 0px;
}
.topActionLine{
  margin: 20px 0px;
  display: flex;flex-direction: row;justify-content: space-between;
}
.lessonLine{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.selectLT{
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  line-height: 30px;
  margin: auto 10px;
  color: #353945;
  padding: 5px 15px;
  border-radius: 20px;
}
.selectLT[selected='selected']{
  background-color: #353945;
  color: #fff;
}
.lessons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.lessonCard{
  max-width: 480px;
  width: 100%;
  margin: 20px auto;
  overflow: hidden;
}
.lessonPic{
  border-radius: 20px;
  width: 100%;
  height: 400px;
  background-size: 120% auto !important;
  background-position: center !important;
  position: relative;
}
.lessonType{
  position: absolute;
  left: 15px;
  top: 15px;
  padding: 5px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
.lessonInfo{
  margin-top: 20px;
}
.lessonILine{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.lessonILine:first-child{
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.userA{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: 120% auto !important;
  background-position: center !important;
  margin-right: 20px;
}
.Lname{
  width: 250px;
  overflow: hidden;
  word-break: keep-all;
  text-overflow: ellipsis;
}
.Lname>span:first-child{
  font-size: 20px;
  line-height: 30px;
  font-weight: bold;
}
.Lname>span:last-child{
  font-size: 16px;
  line-height: 30px;
  color: #888;
}
.Lkind{
  border: 5px solid indianred;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  padding: 0px 5px;
  border-radius: 10px;
  font-weight: bold;
}
.palyImg{
  position: absolute;
  width: 20%;
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.palynum, .playuser{
  padding: 0px 30px;
  font-size: 20px;
  line-height: 30px;
  background-size: 25px auto !important;
  background-position: left center !important;
}
.playuser{
  
}
@media screen and (max-width: 1300px) {
  .libraryInput>input{
    padding: 0px;
    width: calc(100% - 100px);
  }
  .lessonPic{
    height: 200px;
  }
  .Lname{
    width: 200px;
  }
  .Lkind{
    margin-top: 20px;
  }
}
  </style>