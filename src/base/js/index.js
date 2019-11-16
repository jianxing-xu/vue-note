import Vue from 'vue'
import TipTemp from './tip/tip.vue'


export const Tip = (function () {
  const defaults = {
    pos: 'bottom',
    msg: '',
    duration: 1
  }
  const myTip = Vue.extend(TipTemp);

  return function (opts){
    for(let attr in opts){
      defaults[attr] = opts[attr];
    }
    const tip = new myTip({
      el: document.createElement('div'),
      data () {
        return {
          posArr:[10,40,80],
          pos: defaults.pos,
          msg: defaults.msg,
          duration: defaults.duration
        }
      },
      computed:{
        topStyle () {
          return 'top:' + (this.pos==='bottom'?this.posArr[2]:this.pos==='middle'?this.posArr[1]:this.pos==='top'?this.posArr[0]:0)+'%';
        }
      },
      mounted() {
        setTimeout(()=>{
          document.body.removeChild(tip.$el);
        },this.duration*1000);
      },
    });
    document.body.appendChild(tip.$el);
  }
})()
