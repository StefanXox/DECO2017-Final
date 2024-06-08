<template>
   <div style="background-color: #f3f3f3;padding: 1px 0px;">
    <div class="calendar" v-if="!isPhPage">
        <div class="createBox">
            <p>Click in the calendar to create training plan</p>
            <div class="addBtn" @click="openAddEvent()">Create new plans</div>
            <div class="create_type">
                <div class="type_item" data-i="1">Fitness & Gym</div>
                <div class="type_item" data-i="2">Yoga</div>
                <div class="type_item" data-i="3">Mindfulness</div>
                <div class="type_item" data-i="4">Gymnastics</div>
            </div>
        </div>
        <div class="calendarBox">
            <el-calendar>
                <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <div @click="() => showEventDialog(date)" style="overflow: hidden;position: relative;height: 140px;">
                        <p style="text-align: right;" :class="data.isSelected ? 'is-selected' : ''">
                        {{ parseInt(data.day.split('-').pop()) }}
                        </p>
                        <template v-for="(value, key) in showEvent.calMarks">
                            <template v-if="data.day == key">
                                <div v-for="(item, index) in value" :key="item.id" class="planItem" :data-t="item.category + 1" :data-i="index" :style="`top: ${70 + 10 * index}px;z-index: ${999 - index};`" >{{ item.time }} min</div>
                            </template>
                        </template>
                    </div>  
                </template>
            </el-calendar>
        </div>
    </div>
    <div class="calendarPh" v-if="isPhPage">
        <p class="cphTitle">MY SCHEDULE</p>
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
                <div class="c_td" v-for="(item, index) in calData" :key="index" :class="`${item.class} ${item.img != undefined ? 'eveted' : ''}`" :style="`background: url(${calPhImgArr[item.img]}) 0px 0px no-repeat;`">{{ item.day }}</div>
            </div>
        </div>
        <hr>
        <div style="padding: 0px 10px;">
            <div class="showEventCard" v-if="showEvent.data.length > 0">
                <div class="eventCard" v-for="item in showEvent.data" :key="item.id">
                    <div class="eventImg" :style="`background: url(${categoryOptions[item.category].img}) 0px 0px no-repeat;`">
                        <div class="doca"></div><div class="docb"></div><div class="docc"></div><div class="docd"></div>
                    </div>
                    <div class="eventInfo">
                        <div class="eventName">{{ item.name }}</div>
                        <div class="eventType"><i class="el-icon-discount"></i> {{ categoryOptions[item.category].label }} - {{ partment[item.partId].label }} - {{ item.quantitative }}(g)</div>
                        <div class="eventTime"><i class="el-icon-date"></i> {{item.time}}min · {{ formatDate(item.date) }}</div>
                    </div>
                    <div style="width: 100%;text-align: right">
                        <div>
                            <el-button icon="el-icon-edit" type="success" @click="editPlan(item)"></el-button>
                            <el-button icon="el-icon-delete" type="danger" @click="removePlan(item)"></el-button>
                        </div>
                    </div>
                </div>
            </div>
            <el-empty description="No Plans" v-if="showEvent.data.length <= 0"></el-empty>
        </div>
        <div class="eventImg addEvent" @click="openAddEvent()">
            <div class="doca"></div><div class="docb"></div><div class="docc"></div><div class="docd"></div>
            PLAN NOW
         </div>
    </div>
    <el-dialog :title="showEvent.title" :visible="showEvent.open && !isPhPage" width="1190px" @close="closeEventDialog">
        <div class="showEventCard" v-if="showEvent.data.length > 0">
            <div class="eventCard" v-for="item in showEvent.data" :key="item.id">
                <div class="eventImg" :style="`background: url(${categoryOptions[item.category].img}) 0px 0px no-repeat;`">
                    <div class="doca"></div><div class="docb"></div><div class="docc"></div><div class="docd"></div>
                </div>
                <div class="eventInfo">
                    <div class="eventName">{{ item.name }}</div>
                    <div class="eventType"><i class="el-icon-discount"></i> {{ categoryOptions[item.category].label }} - {{ partment[item.partId].label }} - {{ item.quantitative }}(g)</div>
                    <div class="eventTime"><i class="el-icon-date"></i> {{item.time}}min · {{ formatDate(item.date) }}</div>
                </div>
                <div style="width: 100%;text-align: right">
                    <div>
                        <el-button icon="el-icon-edit" type="success" @click="editPlan(item)">edit</el-button>
                        <el-button icon="el-icon-delete" type="danger" @click="removePlan(item)">delete</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-empty description="No Plans" v-if="showEvent.data.length <= 0"></el-empty>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeEventDialog">CLOSE</el-button>
            <el-button type="primary" @click="openAddEvent">PLAN NOW</el-button>
        </span>
    </el-dialog>
    <el-dialog :title="addEvent.title" :visible="addEvent.open" :width="addEvent.width"  @close="closeAddEvent">
        <el-form ref="form" :model="addEvent.form" label-position="top" :rules="rules">
            <el-form-item label="Date" prop="date">
                <el-date-picker
                    v-model="addEvent.form.date"
                    type="date"
                    placeholder="Select Date"
                    value-format="yyyy-MM-dd"
                    />
            </el-form-item>
            <el-form-item label="Plan name" prop="name">
                <el-input placeholder="input plan name" v-model="addEvent.form.name" />
            </el-form-item>
            <el-form-item label="Select category" prop="category">
                <el-select style="width: 100%;" placeholder="select category" v-model="addEvent.form.category">
                    <el-option v-for="item in categoryOptions" :key="item.value" :value="item.value" :label="item.label" />
                </el-select>
            </el-form-item>
            <el-form-item label="Plan duration" prop="time">
                <el-input placeholder="input plan duration" v-model="addEvent.form.time">
                    <template slot="append">min</template>
                </el-input>
            </el-form-item>
            <el-form-item label="Select partment" prop="partId">
                <el-select style="width: 100%;" placeholder="select partment" v-model="addEvent.form.partId">
                    <el-option v-for="item in partment" :key="item.value" :value="item.value" :label="item.label" />
                </el-select>
            </el-form-item>
            <el-form-item label="Plan quantitative" prop="quantitative">
                <el-input placeholder="input plan quantitative" v-model="addEvent.form.quantitative">
                    <template slot="append">g</template>
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeAddEvent">CANCEL</el-button>
            <el-button type="primary" @click="pushEvent">EXPLORE</el-button>
        </span>
    </el-dialog>
   </div>
</template>
<script>
const toDay = (e) => {
    const date = e ? new Date(e) : new Date();
    return `${date.getFullYear()}-`+(`00${date.getMonth() + 1}`).slice(-2)+`-${('00'+date.getDate()).slice(-2)}`
}
const fImage = require('@/assets/f_type.png');
const yImage = require('@/assets/y_type.png');
const mImage = require('@/assets/m_type.png');
const gImage = require('@/assets/g_type.png');
const fPimage = require('@/assets/Pattern1.png');
const yPimage = require('@/assets/Pattern2.png');
const mPimage = require('@/assets/Pattern3.png');
const gPimage = require('@/assets/Pattern4.png');
const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const initPlan = {
    id: null,
    date: null,
    name: null,
    category: null,
    time: null,
    partId: null,
    quantitative: null
}
export default {
   name: 'CalendarPage',
   components: {
     
   },
   mixins: [],
   props: {
     
   },
   data() {
     return {
       calDate: toDay(),
       calData: [],
       calPhImgArr: [fPimage, yPimage, mPimage, gPimage],
       calDataDate: undefined,
       categoryOptions: [
        {label: 'Fitness & Gym', value: 0, img: fImage},
        {label: 'Yoga', value: 1, img: yImage},
        {label: 'Mindfulness', value: 2, img: mImage},
        {label: 'Gymnastics', value: 3, img: gImage},
       ],
       partment: [
        {label: 'chest', value: 0},
        {label: 'shoulder', value: 1},
        {label: 'back', value: 2},
        {label: 'buttocks', value: 3},
        {label: 'leg', value: 4},
        {label: 'biceps', value: 5},
        {label: 'triceps', value: 6}
       ],
       showEvent: {
        open: false,
        date: undefined,
        title: 'Plans',
        data: [],
        calMarks: []
       },
       addEvent: {
        open: false,
        title: 'Add Plan',
        form: {...initPlan},
        width: '600px'
       },
       rules: {
        name: [ { required: true, message: "Please input name", trigger: "blur" }],
        category: [ { required: true, message: "Please select category", trigger: "blur" }],
        time: [ {required: true, message: "Please input time", trigger: "blur" },
            {pattern: /^\d+$/, message: "Please input number", trigger: "blur" }],
        partId: [{ required: true, message: "Please select partment", trigger: "blur" }],
        quantitative: [{required: true, message: "Please input quantitative", trigger: "blur" },
            {pattern: /^\d+$/, message: "Please input number", trigger: "blur" }],
        date: [{ required: true, message: "Please select date", trigger: "blur" }]
       },
       isPhPage: false,
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
    this.changeDialogWidth()
     window.onresize = () => {
        this.changeDialogWidth()
     }
    this.showEvent.data = this.$store.getters.plans;
    this.showEvent.calMarks = this.$store.getters.planObj;
    this.initCalendar()
    console.log(this.showEvent.data)
   },
   methods: {
    // calendar
    initCalendar(setDate) {
        const _data = [];
        let date = new Date(setDate ? setDate : this.calDate);
        date.setDate(1);
        const beforN = date.getDay() == 0 ? 7 : date.getDay();
        date.setDate(0);
        const beforStart = date.getDate();
        for(let a = 0; a < beforN - 1; a++){
            _data.push({day: beforStart -a, class: 'disD'})
        }
        
        date = new Date(setDate ? setDate : this.calDate);
        // last day of the month
        date.setMonth(date.getMonth() + 1, 0)
        const currentN = date.getDate();
        const _year = date.getFullYear();
        const _month = ('00' + (date.getMonth() + 1)).slice(-2)
        for(let a = 1; a <= currentN; a++) {
            let _imgIndex = undefined;
            let _date = _year+'-'+_month+'-'+('00'+a).slice(-2);
            if(this.showEvent.calMarks[_date] && this.showEvent.calMarks[_date].length > 0) {
                _imgIndex = parseInt(this.showEvent.calMarks[_date][0].category)
            }
            _data.push({day: a, class: 'currD', img: _imgIndex})
        }
        const afterN = 7 - (date.getDay() == 0 ? 7 : date.getDay());
        for(let a =1; a <= afterN; a++) {
            _data.push({day: a, class: 'disD'})
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
    changeDialogWidth() {
        const num = document.body.clientWidth
        if(parseInt(num) <= 1300 && this.addEvent.width == '600px') {
            this.addEvent.width = '95%';
            this.showEvent.data = this.$store.getters.plans;
            this.isPhPage = true;
        }else if(parseInt(num) > 1300 && this.addEvent.width == '95%'){
            this.addEvent.width = '600px';
            this.showEvent.data = [];
            this.isPhPage = false;
        }
    },
    formatDate(date) {
        const m = parseInt(date.split('-')[1]) - 1;
        const d = date.split('-').pop();
        return `${Months[m]} ${d}`
    },
    calMonthsTxt() {
        const date = new Date(this.calDataDate);
        const m = date.getMonth();
        return date.getFullYear() + ' ' + Months[m]
    },
    // plan list
    showEventDialog(e) {
        const date = toDay(e);
        this.showEvent.open = true;
        this.showEvent.date = date;
        this.showEvent.data = this.showEvent.calMarks[date] ? this.showEvent.calMarks[date] : [];
        this.addEvent.form.date = date;
    },
    // turn off list
    closeEventDialog() {
        this.showEvent.open = false;
        this.date = undefined;
        this.showEvent.data = [];
    },
    // cancel adding plan
    closeAddEvent() {
        this.addEvent.open = false;
        this.resrt();
        this.$refs.form.clearValidate();
    },
    openAddEvent() {
        this.closeEventDialog();
        this.addEvent.open = true;
        this.addEvent.title = 'Add Plan'
    },
    resrt() {
        this.addEvent.form = {
           ...initPlan
        }
    },
    pushEvent() {
        this.$refs.form.validate(e => {
            if(e) {
                let isEdit = false;
                if(this.addEvent.form.id) {
                    isEdit = true;
                }else {
                    isEdit = false;
                    this.addEvent.form.id = Date.now();
                }
                if(!this.addEvent.form.date) this.addEvent.form.date = toDay();
                isEdit ? this.$store.commit('editPlan', this.addEvent.form) : this.$store.commit('addPlan', this.addEvent.form);
                this.closeAddEvent();
                this.showEvent.data = this.$store.getters.plans;
                this.showEvent.calMarks = this.$store.getters.planObj;
                console.log(this.$store.getters.plans)
            }
            
        })
    },
    editPlan(item) {
        this.closeEventDialog();
        this.addEvent.open = true;
        this.addEvent.title = 'Edit Plan';
        this.addEvent.form = {...item};
    },
    removePlan(item) {
        this.$store.commit('removePlan', item)
        this.showEvent.data = this.$store.getters.plans;
        this.showEvent.calMarks = this.$store.getters.planObj;
    }
   }
};
</script>
<style lang='css' scoped>
::v-deep .el-calendar-table .el-calendar-day{
    height: 150px;
}
::v-depp .el-button--mini{font-size: 20px;}
::v-deep .el-calendar__title{font-size: 20px;}
.calendar{
    max-width: 1500px;
    margin: 50px auto;
    display: flex;
    flex-direction: row;
}
.createBox{width: 240px;padding: 30px;background-color: #fff;height: 400px;}
.calendarBox{width: calc(100% - 350px);margin-left: 50px;}
.createBox>p{color: #777e90;font-size: 17px;line-height: 30px;margin-bottom: 30px;}
.addBtn{padding: 20px;background-color: #4ba06c;color: #fff;font-size: 16px;position: relative;border-radius: 10px;margin-bottom: 30px;cursor: pointer;}
.addBtn:hover{background-color: #4ba06cb2;}
.addBtn::after{content: "＋";position: absolute;right: 10px;font-size: 40px;top: 2px;}
.create_type{display: flex;flex-direction: column;}
.type_item{padding-left: 20px;font-size: 16px;line-height: 20px;margin-bottom: 20px;position: relative;}
.type_item::after{position: absolute;content: " ";width: 10px;height: 10px;background-color: red;border-radius: 50%;left: 0px;top: calc(50% - 5px);}
.type_item[data-i='1']::after{background-color: #64d26f;}
.type_item[data-i='2']::after{background-color: #5564d7;}
.type_item[data-i='3']::after{background-color: #f1be5b;}
.type_item[data-i='4']::after{background-color: #e04b43;}

.planItem{position: absolute;top: 70px;background-color: #5564d7;width: calc(100% - 27px);padding: 5px;color: #fff;border-radius: 10px;padding-left: 20px;border: 1px solid #fff;}
.planItem::after{width: 8px;height: 8px;position: absolute;content: " ";left: 5px;top: 12px;background-color: #fff;border-radius: 50%;}
.planItem[data-t='1']{background-color: #48a151fd;}
.planItem[data-t='2']{background-color: #5260c9;}
.planItem[data-t='3']{background-color: #c29d54;}
.planItem[data-t='4']{background-color: #ca4e47;}
.planItem[data-i='0']{z-index: 999;}
.showEventCard{display: flex;flex-direction: row;flex-wrap: wrap;}
.eventCard{width: 500px;display: flex;flex-direction: row;border: 3px solid #111;padding: 20px;border-radius: 10px;margin-right: 20px;margin-bottom: 20px;flex-wrap: wrap;}
.eventImg{height: 130px;width: 90px;margin-right: 20px;background-position: center !important;background-size: 100% auto !important;position: relative;}
.eventImg>div{position: absolute;height: 15px;width: 15px;border-radius: 50%;background-color: #fff;}
.doca{top: -6px;left: -6px;}
.docb{top: -6px;right: -6px;}
.docc{bottom: -6px;left: -6px;}
.docd{bottom: -6px;right: -6px;}
.eventInfo{width: calc(100% - 150px);}
.eventName{font-size: 25px;line-height: 40px;margin-bottom: 20px;color: #111;}
.eventType,.eventTime{font-size: 20px;margin-bottom: 10px;color: #111;}
.calendarPh{background-color: #fff;}
.cphTitle{font-size: 30px;line-height: 50px;padding: 0px 10px;}
.calendarBoxPh{}
.c_line{display: flex;flex-direction: row;justify-content: space-between;flex-wrap: wrap;}
.c_action{margin-bottom: 20px;}
.c_action>div{font-size: 16px;line-height: 40px;}
.c_th{width: 13vw;text-align:center;color: #8991a4;}
.c_td{width: 13vw;text-align: center;height: 13vw;line-height: 13vw;}
.c_td.disD{color: #aaa;}
.c_td{background-size: 10vw 10vw !important;background-position: center !important;}
.eveted{color: #fff;}
.addEvent{width: 90%;background-color: #000;color: #fff;padding: 20px 0px;text-align: center;height: auto;margin: 20px auto;margin: 20px auto;}
@media screen and (max-width: 1300px){
.showEventCard{justify-content: space-between;}
.eventCard{margin: 20px auto;}
.eventName{font-size: 14px;line-height: 24px;font-weight: bold;}
.eventTime,.eventType{font-size: 12px;}
.c_th{text-align:center;color: #8991a4;font-size: 12px;}
.c_td{text-align: center;height: 10vw;line-height: 10vw;font-size: 12px;}
}
</style>