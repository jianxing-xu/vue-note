import Vue from 'vue'

Vue.directive('focus',{
  updated(el) {
    el.focus();
  },
})