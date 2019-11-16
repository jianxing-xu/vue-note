<template>
  <!--根组件-->
  <transition name="menu">
    <div class="menu-wrapper" v-show="isShow">
      <ul>
        <li @click="clickItem(item.g)" v-for="(item, index) in items" :key="index">{{item.text}}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    clickItem(g) {
      this.$emit("clickItem", g);
      this.toggle();
    },
    toggle() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style scoped lang='scss'>
.menu-enter, .menu-leave-to {
  opacity: 0;
}
.menu-enter-active, .menu-leave-active{
  transition: opacity .2s;
}
.menu-wrapper {
  width: 150px;
  height: auto;
  border-radius: 5px;
  font-size: $font-size-mm;
  overflow: hidden;
  box-shadow: 0 0 10px 0px rgba($color: #000, $alpha: .2);
  background-color: $bg-color-d;
  li {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: solid 1px #ccc;
  }
}
</style>