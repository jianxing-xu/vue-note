<template>
  <!--根组件-->
  <div class="home-wrapper">
    <Header :leftIcon="leftIcon" :rightIcon="rightIcon" />
    <template>
      <ul class="list" v-if="mode=='column'">
        <li v-for="(item, index) in 5" :key="index">
          <Item @clickItem="clickItem" />
        </li>
      </ul>
    </template>
    <template v-if="mode=='pubu'">
      <div class="pubu">
        <ul class="left">
          <li>
            <Item @clickItem="clickItem" />
          </li>
          <li>
            <Item @clickItem="clickItem" />
          </li>
          <li>
            <Item @clickItem="clickItem" />
          </li>
          <li>
            <Item @clickItem="clickItem" />
          </li>
          <li>
            <Item @clickItem="clickItem" />
          </li>

        </ul>
        <ul class="right">
          <li>
            <Item @clickItem="clickItem" />
          </li>
          <li>
            <Item @clickItem="clickItem" />
          </li>
          <li>
            <Item @clickItem="clickItem" />
          </li>
          <li>
            <Item @clickItem="clickItem" />
          </li>
          <li>
            <Item @clickItem="clickItem" />
          </li>

        </ul>
      </div>
    </template>
    <transition name="slide">
      <router-view></router-view>
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
      rightIcon: "iconeditor",
      mode: "pubu",
      leftData: [],
      rightData: []
    };
  },
  methods: {
    clickItem() {
      this.$router.push({
        name: "detail",
        params: { id: 1 }
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
.home-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  .slide-enter,
  .slide-leave-to {
    transform: translate(0, 10%);
    opacity: 0;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
    position: absolute;
    top: 0;
  }
  .pubu {
    padding: 0 5px;
    width: 100%;
    position: absolute;
    top: 68px;
    bottom: 0;
    overflow: auto;
    display: flex;
    box-sizing: border-box;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        box-sizing: border-box;
        width: 100%;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        box-sizing: border-box;
        width: 100%;
      }
    }
  }
  .list {
    position: absolute;
    top: 68px;
    bottom: 0;
    overflow: auto;
  }
}
</style>