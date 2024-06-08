<template>
  <div style="background-color: #f7f7f7;">
    <div class="userBox">
      <div class="userInfo">
        <div class="userPic">
          <img :src="avatar" alt="">
          <p>Dariana Hammes</p>
          <span>IFBB pro</span>
        </div>
        <div class="userProcess">
          <div class="prcessLine">
            <p><i class="el-icon-date"></i>&emsp13;&emsp13;&emsp13;Time</p>
            <p>{{allDays}} days</p>
          </div>
          <div class="prcessLine">
            <p><i class="el-icon-time"></i>&emsp13;&emsp13;&emsp13;Average duration</p>
            <p>{{avgTimes}} minutes</p>
          </div>
          <div class="prcessLine">
            <p><i class="el-icon-c-scale-to-original"></i>&emsp13;&emsp13;&emsp13;Difficulty</p>
            <p class="Difficulty">ADVANCED</p>
          </div>
          <div class="prcessLine">
            <p><i class="el-icon-set-up"></i>&emsp13;&emsp13;&emsp13;Training sessions</p>
            <p>{{ allPlans }} Times</p>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar">
      <div class="calendarForPc">
        <div class="calendarBox">
          <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{date, data}">
              <div style="overflow: hidden;position: relative;height: 140px;">
                <p style="text-align: right;" :class="data.isSelected ? 'is-selected' : ''">
                  {{ parseInt(data.day.split('-').pop()) }}
                </p>
                <template v-for="(value, key) in showEvent.calMarks">
                  <template v-if="data.day == key">
                    <div v-for="(item, index) in value" :key="item.id" class="planItem" :data-t="item.category + 1"
                      :data-i="index" :style="`top: ${70 + 10 * index}px;z-index: ${999 - index};`">{{ item.time }} min
                    </div>
                  </template>
                </template>
              </div>
            </template>
          </el-calendar>
        </div>
      </div>
      <div class="calendarForPh">
        <div class="calendarBoxPh">
          <div class="c_line c_action">
            <el-button @click="preMonth()" type="text" icon="el-icon-arrow-left" />
            <div>{{ calMonthsTxt() }}</div>
            <el-button @click="nextMonth()" type="text" icon="el-icon-arrow-right" />
          </div>
          <div class="c_line">
            <div class="c_th">MON</div>
            <div class="c_th">TUE</div>
            <div class="c_th">WED</div>
            <div class="c_th">THU</div>
            <div class="c_th">FRI</div>
            <div class="c_th">SAT</div>
            <div class="c_th">SUN</div>
          </div>
          <div class="c_line">
            <div class="c_td" v-for="(item, index) in calData" :key="index"
              :class="`${item.class} ${item.img != undefined ? 'eveted' : ''}`"
              :style="`background: url(${calPhImgArr[item.img]}) 0px 0px no-repeat;`">{{ item.day }}</div>
          </div>
        </div>
      </div>
      <div class="weekDataBox">
        <div class="weekDate">
          <el-date-picker
            v-model="selectForWeekFir"
            type="week"
            format="yyyy Week WW"
            placeholder="Select week"
            :picker-options="{
              firstDayOfWeek: 1
            }"
            >
          </el-date-picker>
        </div>
        <div class="weekRange">Data From {{ weekRangeForFir('selectForWeekFir', 's') + ' To ' + weekRangeForFir('selectForWeekFir', 'e')}}</div>
        <img class="weekImg" :src="humanImage" alt="">
      </div>
      <div class="weekDataBox weekCahrt">
        <p class="weekDataBoxTitle">Distribution of Part Groups</p>
        <div class="weekDataBoxTime">
          <div class="weekDate">
            <el-date-picker
              v-model="selectForWeekSec"
              type="week"
              format="yyyy Week WW"
              placeholder="Select week"
              :picker-options="{
                firstDayOfWeek: 1
              }"
              @change="selectWeek('selectForWeekSec', 1)"
              >
            </el-date-picker>
          </div>
          <div class="weekRange weekRangeChart">Data From {{ weekRangeForFir('selectForWeekSec', 's') + ' To ' + weekRangeForFir('selectForWeekSec', 'e')}}</div>
        </div>
        <div class="echartBox">
          <div id="echartFir"></div>
        </div>
      </div>
      <div class="weekDataBox weekCahrt">
        <p class="weekDataBoxTitle">Training Duration</p>
        <div class="weekDataBoxTime">
          <div class="weekDate">
            <el-date-picker
              v-model="selectForWeekThr"
              type="week"
              format="yyyy Week WW"
              placeholder="Select week"
              :picker-options="{
                firstDayOfWeek: 1
              }"
              @change="selectWeek('selectForWeekThr', 2)"
              >
            </el-date-picker>
          </div>
          <div class="weekRange weekRangeChart">Data From {{ weekRangeForFir('selectForWeekThr', 's') + ' To ' + weekRangeForFir('selectForWeekThr', 'e')}}</div>
        </div>
        <div class="echartBox">
          <div id="echartSec"></div>
        </div>
      </div>
      <div class="weekDataBox weekCahrt">
        <p class="weekDataBoxTitle">Quantitative</p>
        <div class="weekDataBoxTime">
          <div class="weekDate">
            <el-date-picker
              v-model="selectForWeekFor"
              type="week"
              format="yyyy Week WW"
              placeholder="Select week"
              :picker-options="{
                firstDayOfWeek: 1
              }"
              @change="selectWeek('selectForWeekFor', 3)"
              >
            </el-date-picker>
          </div>
          <div class="weekDate">
            <el-select style="width: 100%;" placeholder="select partment" v-model="partId" @change="selectWeek('selectForWeekFor', 3)" clearable>
                <el-option v-for="item in partment" :key="item.value" :value="item.value" :label="item.label"/>
            </el-select>
          </div>
          <div class="weekRange weekRangeChart">Data From {{ weekRangeForFir('selectForWeekFor', 'm') + ' To ' + weekRangeForFir('selectForWeekFor', 'e')}}</div>
        </div>
        
        <div class="echartBox">
          <div id="echartThr"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { graphic } from "echarts";
const toDay = (e) => {
  const date = e ? new Date(e) : new Date();
  return `${date.getFullYear()}-` + (`00${date.getMonth() + 1}`).slice(-2) + `-${('00' + date.getDate()).slice(-2)}`
}
// 返回所在星期的周二日期
const returnThisWeekDate = () => {
  const date = new Date();
  let day = date.getDay();
  let diff = date.getDate() - day + (day === 0 ? -7 : 0) + 2;
  date.setDate(diff)
  return date;
}

const fPimage = require('@/assets/Pattern1.png');
const yPimage = require('@/assets/Pattern2.png');
const mPimage = require('@/assets/Pattern3.png');
const gPimage = require('@/assets/Pattern4.png');
const humanImage = require('@/assets/human.png');
const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const categoryOptions = [
  {label: 'Fitness & Gym', value: 0},
  {label: 'Yoga', value: 1},
  {label: 'Mindfulness', value: 2},
  {label: 'Gymnastics', value: 3},
]

export default {
  name: 'trackVue',
  data() {
    return {
      humanImage,
      partment: [
        {label: 'chest', value: 0},
        {label: 'shoulder', value: 1},
        {label: 'back', value: 2},
        {label: 'buttocks', value: 3},
        {label: 'leg', value: 4},
        {label: 'biceps', value: 5},
        {label: 'triceps', value: 6}
       ],
      avatar: require('@/assets/avatar.jpg'),
      calDate: toDay(),
      calData: [],
      calPhImgArr: [fPimage, yPimage, mPimage, gPimage],
      showEvent: {
        open: false,
        date: undefined,
        title: 'Plans',
        data: [],
        calMarks: []
      },
      selectForWeekFir: returnThisWeekDate(),
      selectForWeekSec: returnThisWeekDate(),
      selectForWeekThr: returnThisWeekDate(),
      selectForWeekFor: returnThisWeekDate(),
      chartDomFir: undefined,
      chartDomSec: undefined,
      chartDomThe: undefined,
      partId: undefined,
      plans: this.$store.getters.plans,
      allDays: undefined, // 总时长（天）
      avgTimes: undefined, // 平均时长 （分钟）
      allPlans: undefined, // 总计划数
    }

  },
  mounted() {
    this.showEvent.data = this.$store.getters.plans;
    this.showEvent.calMarks = this.$store.getters.planObj;
    this.allPlans = this.showEvent.data.length;
    let _allDay = 0;
    for(let key in this.showEvent.calMarks) {
      _allDay ++;
    }
    let _allMinutes = 0;
    for(let i =0; i < this.showEvent.data.length; i++) {
      _allMinutes += parseInt(this.showEvent.data[i].time);
    }
    this.allDays = _allDay;
    this.avgTimes = Math.round(_allMinutes / this.allDays);
    this.initCalendar();
    this.drawForCahrt()
  },
  methods: {
    selectWeek(key, chartIndex) {
      if( !this.weekRangeForFir(key, 'st') || !this.weekRangeForFir(key, 'et') ) {
        return 0;
      }
      const start = parseInt((this.weekRangeForFir(key, 'st')).replace(/-/g, ''));
      const end = parseInt((this.weekRangeForFir(key, 'ee')).replace(/-/g, ''));
      const _data = []
      if(chartIndex == 1) {
        let _plans = [];
        for(let key in this.showEvent.calMarks) {
          let keyTime = parseInt(key.replace(/-/g, ''));
          if(keyTime >= start && keyTime <= end) {
            _plans = _plans.concat(this.showEvent.calMarks[key])
          }
        }
        const _obj = {}
        _plans.map(i => {
          if(_obj[i.category]) {
            _obj[i.category] += 1;
          }else {
            _obj[i.category] = 1;
          }
        })
        for(let key in _obj) {
          _data.push({
            name: categoryOptions[key].label,
            value: _obj[key]
          })
        }
        this.drawForFirCahrt(_data);
        console.log(_data)
      }else if(chartIndex == 2) {
        const Keys = this.weekRangeForFir(key, 'weekD')
        const lastPlans = [];
        const nextPlans = [];
        Keys.forEach((value, index) => {
          const _arr = this.showEvent.calMarks[value];
          let _time = 0;
          if(_arr) {
            console.log(_arr)
            _arr.map(i => _time += parseInt(i.time))
          }
          if(index < 7) {
            lastPlans.push(_time)
          }else {
            nextPlans.push(_time)
          }
        })
        _data.push(lastPlans);
        _data.push(nextPlans);
        this.drawForSecCahrt(_data);
        console.log(_data)
      }else if(chartIndex == 3) {
        const Keys = this.weekRangeForFir(key, 'weekD')
        const _plans = []
        for(let i = 7; i < Keys.length; i++) {
          const _arr = this.showEvent.calMarks[Keys[i]];
          let _q = 0;
          if(_arr) {
            _arr.map(a => {
              if(![undefined, null, ''].includes(this.partId) && a.partId == this.partId) {
                _q += parseInt(a.quantitative);
              }else if([undefined, null, ''].includes(this.partId)){
                _q += parseInt(a.quantitative);
              }
            })
          }
          _plans.push(_q)
        }
        this.drawForThrCahrt(_plans)
        console.log(_plans)
      }
    },
    drawForFirCahrt(data) {
      let chartDomFir = this.$echarts.init(document.getElementById('echartFir'));
      let option = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          show: false
        },
        color: ['#64d26f', '#5564d7', '#f1be5b'],
        legend: {
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['65%', '95%'],
            center: ['50%', '50%'],
            startAngle: 230,
            endAngle: 310,
            labelLine: {
              show: false
            },
            label: {
              show: true,
              position: 'center',
              formatter: () => ` {a|${data.length}} \n{b|Group}`,
              fontSize: 50,
              rich: {
                a: {
                  fontWeight: 'bolder',
                  fontSize: 40
                },
                b: {
                  color: '#333',
                  fontSize: 30
                }
              }
            },
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: data,
          }
        ]
      }
      chartDomFir.setOption(option);
    },
    drawForSecCahrt(data) {
      let chartDomSec = this.$echarts.init(document.getElementById('echartSec'));
      let optionSec = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        legend: {
          data: ['Last Week', 'This Week'],
          bottom: '1%',
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Last Week',
            data: data[0],
            type: 'bar',
            stack: '1',
            itemStyle: {
              borderRadius: 5,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#9586fb" },
                { offset: 1, color: "#5036ff" },
              ]),
            },
          },
          {
            name: 'This Week',
            data: data[1],
            type: 'bar',
            z: -30,
            stack: document.body.clientWidth <= 768 ? '1' : '2',
            itemStyle: {
              borderRadius: 5,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#5dd8d0" },
                { offset: 1, color: "#00ffba" },
              ]),
            },
          }
        ]
      }
      chartDomSec.setOption(optionSec);
    },
    drawForThrCahrt(data) {
      let chartDomThr = this.$echarts.init(document.getElementById('echartThr'));
      let optionThr = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Quantitative'],
          bottom: '1%',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true,
        },
        toolbox: {
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Quantitative',
            type: 'line',
            stack: 'Total',
            data: data,
            areaStyle: {
              color: new graphic.LinearGradient(0,0,0,1,
                  [
                    {offset: 0,color: "rgba(96,252,170,.5)",},
                    {offset: 1,color: "rgba(96,252,170,0)",},
                  ],
                  false
                ),
            },
            lineStyle: {
              color: '#a8b400'
            },
            itemStyle: {
              color: '#8dc149'
            }
          },
        ]
      }
      chartDomThr.setOption(optionThr);
    },
    drawForCahrt() {
      this.selectWeek('selectForWeekSec', 1);
      this.selectWeek('selectForWeekThr', 2);
      this.selectWeek('selectForWeekFor', 3);
      
      
      
      // window.addEventListener("resize", () => {
  
      //   chartDomFir.resize();
      //   chartDomSec.resize();
      //   chartDomThr.resize();
      // });
    },
    weekRangeForFir(key, okey) {
      if(!this[key]) {
        const obj = {s: 'N/A', e: 'N/A'}
        return obj[okey]
      }
      const forteenKeys = [];
      const date = new Date(this[key])
      const day = date.getDay();
      let diff = date.getDate() - day + (day === 0 ? -7 : 0) + 1 - 7;
      date.setDate(diff);
      forteenKeys.push(toDay(date.getTime()))
      if(okey === 'weekD') {
        for(let i = 0; i < 13; i++) {
          date.setDate(date.getDate() + 1);
          forteenKeys.push(toDay(date.getTime()))
        }
        return forteenKeys;
      }
      const lastDay = Months[date.getMonth()] + date.getDate();
      const lastTinme = toDay(date.getTime())
      date.setDate(date.getDate() + 6);
      const lastEtime = toDay(date.getTime())
      date.setDate(date.getDate() + 1);
      const midDay = Months[date.getMonth()] + date.getDate();
      const nextTinme = toDay(date.getTime())
      date.setDate(date.getDate() + 6);
      const nextDay = Months[date.getMonth()] + date.getDate();
      const nextEinme = toDay(date.getTime())
      const obj = {s: lastDay, m: midDay, e: nextDay, st: lastTinme, se: lastEtime, et: nextTinme, ee: nextEinme};
      return obj[okey]
    },
    initCalendar(setDate) {
      const _data = [];
      let date = new Date(setDate ? setDate : this.calDate);
      date.setDate(1);
      const beforN = date.getDay() == 0 ? 7 : date.getDay();
      date.setDate(0);
      const beforStart = date.getDate();
      for (let a = 0; a < beforN - 1; a++) {
        _data.push({ day: beforStart - a, class: 'disD' })
      }

      date = new Date(setDate ? setDate : this.calDate);
      // 获取当月最后一天
      date.setMonth(date.getMonth() + 1, 0)
      const currentN = date.getDate();
      const _year = date.getFullYear();
      const _month = ('00' + (date.getMonth() + 1)).slice(-2)
      for (let a = 1; a <= currentN; a++) {
        let _imgIndex = undefined;
        let _date = _year + '-' + _month + '-' + ('00' + a).slice(-2);
        if (this.showEvent.calMarks[_date] && this.showEvent.calMarks[_date].length > 0) {
          _imgIndex = parseInt(this.showEvent.calMarks[_date][0].category)
        }
        _data.push({ day: a, class: 'currD', img: _imgIndex })
      }
      const afterN = 7 - (date.getDay() == 0 ? 7 : date.getDay());
      for (let a = 1; a <= afterN; a++) {
        _data.push({ day: a, class: 'disD' })
      }
      date.setDate(1)
      this.calDataDate = date;
      this.calData = _data;
    },
    preMonth() {
      const date = new Date(this.calDataDate);
      date.setMonth(date.getMonth() - 1);
      this.initCalendar(date);
    },
    nextMonth() {
      const date = new Date(this.calDataDate);
      date.setMonth(date.getMonth() + 1);
      console.log(date)
      this.initCalendar(date);
    },
    calMonthsTxt() {
      const date = new Date(this.calDataDate);
      const m = date.getMonth();
      return date.getFullYear() + ' ' + Months[m]
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-table .el-calendar-day {
  height: 150px;
}

::v-depp .el-button--mini {
  font-size: 20px;
}

::v-deep .el-calendar__title {
  font-size: 20px;
}

::v-deep .el-calendar__header {
  padding: 25px;
}
.echartBox{width: 98%;max-width: 600px;margin: 20px auto}
.echartBox>div{width: 100%;height: 500px;}
.userBox {
  width: 100%;
  padding: 40px 0px 80px;
  background-color: #fff;
}
.weekDataBox{
  padding: 80px 0px;
  text-align: center;
  .weekDataBoxTitle{
    margin: 0px 0px 20px 0px;
    color: #000;
    font-weight: bold;
    text-align: left;
    font-size: 30px;
    padding-left: 40px;
  }
}
.weekCahrt{max-width: 1180px;height: auto;margin: 60px auto;background-color: #fff;border-radius: 20px;box-shadow: 0px 0px 20px 1px #717171;}
.weekDate{width: 230px;margin: 10px auto;}
.weekRange{font-weight: bold;letter-spacing: 3px;margin-top: 30px;margin: 20px auto;text-align: center}
.weekRangeChart{text-align: right;padding-right: 20px}
.weekDataBoxTime{
  display: flex;flex-direction: row;flex-wrap: wrap;
  .weekDate{}
  .weekRangeChart{width: 300px;color: #585858}
}
.weekImg{
  width: 90%;
  max-width: 800px;
  height: auto;
  margin: 50px auto;
}
.userInfo {
  max-width: 900px;
  margin: 20px auto;
  width: 96%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  .userPic {
    width: 39%;
    margin-right: 1%;
    border: 1px solid #ccc;
    border-radius: 20px;
    text-align: center;

    img {
      width: 128px;
      height: 128px;
      object-fit: contain;
      border-radius: 50%;
      margin: 20px auto 20px;
    }

    p {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
      margin-bottom: 10px;
    }

    span {
      font-size: 16px;
      color: #999;
      display: block;
      margin-bottom: 30px;
    }
  }

  .userProcess {
    width: calc(55% - 10px);
    padding-top: 30px;

    .prcessLine {
      color: #666;
      overflow: hidden;
      height: auto;
      font-size: 16px;
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      flex-direction: row;

      p {
        margin: 0;
        width: 50%;

        &:first-child {
          text-align: left
        }

        &:last-child {
          text-align: right;
          color: #111;
          font-weight: bold;
        }
      }

      .Difficulty {
        color: #fe6d46 !important;
      }
    }
  }
}

.planItem {
  position: absolute;
  top: 70px;
  background-color: #5564d7;
  width: calc(100% - 27px);
  padding: 5px;
  color: #fff;
  border-radius: 10px;
  padding-left: 20px;
  border: 1px solid #fff;
}

.planItem::after {
  width: 8px;
  height: 8px;
  position: absolute;
  content: " ";
  left: 5px;
  top: 12px;
  background-color: #fff;
  border-radius: 50%;
}

.planItem[data-t='1'] {
  background-color: #48a151fd;
}

.planItem[data-t='2'] {
  background-color: #5260c9;
}

.planItem[data-t='3'] {
  background-color: #c29d54;
}

.planItem[data-t='4'] {
  background-color: #ca4e47;
}

.planItem[data-i='0'] {
  z-index: 999;
}

.calendarBox {
  max-width: 1200px;
  margin: 30px auto;
  display: block;
}

.calendarBoxPh {
  font-weight: bold;
  margin: 80px auto;
  display: none
}

.c_line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.c_action {
  margin-bottom: 20px;
}

.c_action>div {
  font-size: 16px;
  line-height: 40px;
}

.c_th {
  width: 13vw;
  text-align: center;
  color: #8991a4;
}

.c_td {
  width: 13vw;
  text-align: center;
  height: 13vw;
  line-height: 13vw;
}

.c_td.disD {
  color: #aaa;
}

.c_td {
  background-size: 10vw 10vw !important;
  background-position: center !important;
}

.eveted {
  color: #fff;
}

.addEvent {
  width: 90%;
  background-color: #000;
  color: #fff;
  padding: 20px 0px;
  text-align: center;
  height: auto;
  margin: 20px auto;
}

@media screen and (max-width: 1300px) {
  .userBox {
    padding: 20px 0px;
  }

  .userInfo {
    .userPic {
      width: 100%;
      margin: 10px 0px;
    }

    .userProcess {
      width: 100%;

      .prcessLine {
        font-size: 12px;
      }
    }
  }

  .calendarBox {
    display: none;
  }

  .calendarBoxPh {
    display: block
  }
}
</style>