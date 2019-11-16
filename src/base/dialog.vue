<template>
  <!--根组件-->
  <transition name="dialog">
    <div class="mask" v-show="isShow">
      <div class="dialog-wrapper">
        <div class="content"><slot name="msg"></slot></div>
        <div class="btn">
          <span class="left" @click="clickLeft">{{leftText}}</span>
          <span class="right" @click="clickRight">{{rightText}}</span>
        </div>
      </div>
    </div>
  </transition>    
</template>

<script>
export default {
  props: {
    leftText: {
      type: String,
      default: "确定"
    },
    rightText: {
      type: String,
      default: "取消"
    }
  },
  data() {
    return {
      isShow: false,
      arrow: ''
    };
  },
  methods: {
    clickLeft() {
      this.hide();
      this.$emit("clickLeft");
      this.arrow = 'left';
    },
    clickRight() {
      this.hide();
      this.$emit("clickRight");
      this.arrow = 'right';
    },
    show() {
      this.isShow = true;
      return new Promise((resolve)=>{
        if(this.arrow==='left'){
          resolve('left');
        }else{
          resolve('right');
        }
      })
    },
    hide() {
      this.isShow = false;
    }
  }
};
</script>

<style scoped lang='scss'>
.dialog-enter-active {
  animation: bg-fade .3s;
  .dialog-wrapper{
    animation: zoom .3s;
  }
}
.dialog-leave-active{
  animation: bg-fade-out .3s;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
    display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}
.dialog-wrapper {
  position: absolute;
  min-width: 250px;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  background-color: #eee;
  border: solid 1px #ccc;
  border-radius: 10px;
  font-size: $font-size-mm;
  color: #333;
  box-sizing: border-box;

  .content {
    padding: 10px;
    text-align: center;
    line-height: 1.2;
    border-bottom: solid 1px #ccc;
    min-height: 45px;
    box-sizing: border-box;
  }
  .btn {
    display: flex;
    width: 100%;
    height: 35px;
    line-height: 35px;
    span {
      flex: 1;
      text-align: center;
      &:nth-child(1) {
        border-right: solid 1px #ccc;
      }
    }
  }
}
@keyframes bg-fade {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@keyframes bg-fade-out {
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
}
@keyframes zoom {
  0%{
    transform:scale(0)
  }
  50%{
    transform: scale(1.15)
  }
  100%{
    transform: scale(1);
  }
}
</style>
