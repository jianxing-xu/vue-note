<template>
  <!--根组件-->
    <div class="home-wrapper">
      <Header :leftIcon="leftIcon" :rightIcon="rightIcon" />
      <ul class="list">
        <li v-for="(item, index) in 5" :key="index">
          <Item @clickItem="clickItem" />
        </li>
      </ul>
      <transition name="slide">
        <router-view name="editor"></router-view> 
      </transition>
    </div>
</template>

<script>
import Header from "@/components/header.vue";
import Item from "@/components/item.vue";
export default {
  data() {
    return {
      leftIcon: "iconmenu1153767easyiconnet",
      rightIcon: "iconeditor"
    };
  },
  methods: {
    clickItem() {
      this.$router.push({
        path: '/editor',
        name: 'editor',
      });
    }
  },
  components: {
    Header,
    Item
  }
};
</script>

<style scoped lang='scss'>
.slide-enter,
.slide-leave-to {
  transform: translate(-100%, 0);
}
.slide-enter-active,
.slide-leave-active {
  transition: all .5s;
  position: absolute;
  top: 0;
}
.home-wrapper {
  width: 100%;
  .list {
    position: absolute;
    top: 68px;
    bottom: 0;
    overflow: auto;
  }
}
</style>