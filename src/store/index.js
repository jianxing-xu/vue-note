import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/assets/js/storage'
import {add,mdy,remo,toggleToTop} from '@/assets/js/model'
import { addGroup, deleteGroup, rename } from '../assets/js/model'
const key = '__note__'
const gKey = '__group__'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    noteList: storage.get(key),
    groups: storage.get(gKey),
    nowGroup: '全部'
  },
  getters: {
    noteList: state => state.noteList,
    groups: state => state.groups,
    nowGroup: state => state.nowGroup,
    filterNotes (state) {
      let now = [];
      if(state.nowGroup==="全部"){
        return state.noteList;
      }
      state.noteList.forEach(note => {
        if(note.group === state.nowGroup){
          now.unshift(note);
        }
      });
      return now;
    }
  },
  mutations: {
    setNoteList (state,list) {
      state.noteList = list;
    },
    setGroups (state,gs) {
      state.groups = gs;
    },
    setNowGroup (state,nowGroup) {
      state.nowGroup = nowGroup;
    }
  },
  actions: {
    controlGroups ({commit},{group,sta,newName}) {
      let g;
      switch(sta){
        case 0:
          g = addGroup(group);
          break;
        case 1:
          g = deleteGroup(group);
          break;
        case 2:
          g = rename(group,newName); 
          break;
        default:break;
      }
      commit('setGroups',g);
    },
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
        case 3:
          list = toggleToTop(note);
          break;
        default: break;
      }
      commit('setNoteList',list);
    }
  },
  modules: {
  }
})
