import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const createLesson = () => {
  const list = []
  for(let i = 0; i < 100; i++) {
    const _data = {
      palyNum: parseInt(Math.random() * 3000),
      userNum: parseInt(Math.random() * 1000 + 4),
      lessonType: parseInt(Math.random() * 4 + 1),
      style: parseInt(Math.random() * 3 + 1),
      times: parseInt(Math.random() * 4),
      difficulty: parseInt(Math.random() * 3 + 1),
      intensity: parseInt(Math.random() * 3 + 1),
      bg: parseInt(Math.random() * 10),
      userPic: parseInt(Math.random() * 4),
      lessonName: 'Exercises Class' + (i + 1),
      isVideo: Math.random() >= 0.5 ? true : false,
      lessonUser: 'User' + String.fromCharCode(65+(Math.ceil(Math.random() * 25))),
      id: i
    }
    list.push(_data)
  }
  return list;
}

const lessonsData = createLesson();

let localPlan = window.localStorage.getItem('plan');
if(!localPlan) localPlan = [];
else localPlan = JSON.parse(localPlan);

export default new Vuex.Store({
  state: {
    plans: localPlan,
    lessons: lessonsData
  },
  getters: {
    plans: state => state.plans,
    lessons: state => state.lessons,
    planObj: ({plans}) => {
      const obj = {};
      plans.map(i => {
        if(!obj[i.date]) {
          obj[i.date] = [];
        }
        obj[i.date].push(i);
      })
      return obj
    }
  },
  mutations: {
    addPlan({plans}, plan) {
      plans.push(plan);
      this.commit('savePlan')
    },
    editPlan({plans}, plan) {
      const index = plans.findIndex(i => i.id == plan.id);
      plans.splice(index, 1, plan);
      this.commit('savePlan')
    },
    removePlan({plans}, plan) {
      const index = plans.findIndex(i => i.id == plan.id);
      plans.splice(index, 1)
      this.commit('savePlan')
    },
    savePlan({plans}) {
      console.log(plans);
      localStorage.setItem('plan', JSON.stringify(plans))
    }
  },
  actions: {
  },
  modules: {
  }
})