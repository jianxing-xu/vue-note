<template>
  <!--根组件-->
  <div class="header-wrapper">
    <div class="left" @click.stop="clickleft">
      <span :class="['iconfont',leftIcon]"></span>
      <span class="title">{{title}}</span>
    </div>
    <div class="right">
      <span class="iconfont mode" :class="modeIcon" @click="clickmode"></span>
      <span class="iconfont" :class="rightIcon" @click="clickright"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftIcon: {
      type: String,
      default: "iconmenu1153767easyiconnet"
    },
    rightIcon: {
      type: String,
      default: "iconeditor"
    },
    modeIcon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "便签"
    }
  },
  data () {
    return {

    }
  },
  methods: {
    clickleft () {
      this.$emit('clickleft');
    },
    clickright () {
      this.$emit('clickright');
    },
    clickmode () {
      this.$emit('clickmode');
    }
  }
};
</script>
<style scoped lang='scss'>
.header-wrapper{
  padding: 0 20px;
  box-sizing: border-box;
  font-size: $font-size-ll;
  color: $font-color-d;
  width: 100%;
  min-height: 68px;
  line-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .iconfont{
    font-size: $font-size-ll;
  }
  .title{
    padding-left:20px
  }
  .left{
    display: flex;
    align-items: center;
  }
  .right{
    .mode{
      padding-right: 15px;
    }
  }
}
</style>