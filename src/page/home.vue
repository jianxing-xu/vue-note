<template>
  <!--根组件-->
  <div class="home-wrapper">
    <Header
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
      @clickleft="leftBar"
      @clickright="newEditor"
    />
    <template>
      <ul class="list" v-if="mode=='column'">
        <li v-for="(item, index) in 5" :key="index">
          <Item @clickItem="clickItem" />
        </li>
      </ul>
    </template>
    <template v-if="mode=='pubu'">
      <div class="pubu">
        <ul class="left" ref="left">
          <li v-for="(note) in leftData" :key="note.tid">
            <Item @clickItem="clickItem(note)" :note="note" />
          </li>
        </ul>
        <ul class="right" ref="right">
          <li v-for="(note) in rightData" :key="note.tid">
            <Item @clickItem="clickItem(note)" :note="note" />
          </li>
        </ul>
      </div>
    </template>
    <transition name="slide">
      <router-view @back="back"></router-view>
    </transition>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Item from "@/components/item.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      leftIcon: "iconmenu1153767easyiconnet",
      rightIcon: "iconeditor",
      mode: "pubu",
      leftData: [],
      rightData: [],
    };
  },
  computed: {
    ...mapGetters(["noteList"])
  },
  methods: {
    clickItem(note) {
      this.$router.push({
        name: "detail",
        params: { tid: note.tid },
        query: { sta: 1 }
      });
    },
    leftBar() {},
    async updaeWaterfull() {
      this.leftData = [];
      this.rightData = [];
      for (let i = 0; i < this.noteList.length; i++) {
        await this.$nextTick(() => {
          let h1 = this.$refs.left.clientHeight;
          let h2 = this.$refs.right.clientHeight;
          if (h1 <= h2) {
            this.leftData.push(this.noteList[i]);
          } else {
            this.rightData.push(this.noteList[i]);
          }
        });
      }
    },
    newEditor() {
      this.$router.push({
        name: "detail",
        params: { tid: 0 },
        query: { sta: 0 }
      });
    },
    back() {
      this.updaeWaterfull();
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.updaeWaterfull();
    });
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
    padding: 0 2px;
    width: 100%;
    position: absolute;
    top: 68px;
    bottom: 0;
    overflow: auto;
    display: flex;
    box-sizing: border-box;
    .left {
      height: auto;
      width: 50%;
      position: absolute;
      box-sizing: border-box;
      li {
        box-sizing: border-box;
        width: 100%;
      }
    }
    .right {
      li{
        list-style: none;
      }
      height: auto;
      position: absolute;
      width: 50%;
      right: 0;
      box-sizing: border-box;
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