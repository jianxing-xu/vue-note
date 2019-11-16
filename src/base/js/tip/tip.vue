<template>
  <!--根组件-->
  <transition name="tip">
    <div class="wrapper" :style="topStyle">{{msg}}</div>
  </transition>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba($color: #000000, $alpha: 0.6);
  color: #fef;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: $font-size-m;
  z-index: 4;
  &.tip-enter,
  &.tip-leave-to {
    opacity: 0;
  }
  &.tip-enter-active,
  &.tip-leave-active {
    transition: all .3s;
  }
  //transition: opacity .5s;
}
</style>