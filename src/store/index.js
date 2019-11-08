import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/assets/js/storage'
import {add,mdy,remo} from '@/assets/js/model'
const key = '__note__'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    noteList: storage.get(key)
  },
  getters: {
    noteList: state => state.noteList
  },
  mutations: {
    setNoteList (state,list) {
      state.noteList = list;
    }
  },
  actions: {
    controlNoteList ({commit},{note,sta}) {
      let list;
      switch(sta) {
        case 0:
          list = add(note);
          break;
        case 1:
          list = mdy(note);
          break;
        case 2:
          list = remo(note);
          break;
        default: break;
      }
      commit('setNoteList',list);
    }
  },
  modules: {
  }
})
