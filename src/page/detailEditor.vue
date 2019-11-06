<template>
  <!--根组件-->
    <div class="editor-wrapper">Editor....</div>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.editor-wrapper {
  width: 100%;
  height: 100vh;
  background-color: $bg-color;
  &.slide-enter,
  &.slide-leave-to {
    transform: translate(100%, 0);
  }
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.5s;
    position: absolute;
    top: 0;
  }
}
</style>