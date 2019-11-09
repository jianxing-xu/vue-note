<template>
  <!--根组件-->
  <div class="home-wrapper">
    <Header
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
      :modeIcon="modeIcon"
      @clickleft="leftBar"
      @clickright="newEditor"
      @clickmode="changeMode"
    />
    <template>
      <transition-group name="list" tag="ul" class="list" v-if="mode=='column'">
        <li v-for="(note) in noteList" :key="note.tid">
          <Item @clickItem="clickItem(note)" :note="note" />
        </li>
      </transition-group>
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
      modeIcon: "iconzhuanhuan",
      mode: "pubu",
      leftData: [],
      rightData: []
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
    changeMode() {
      this.mode = this.mode === "pubu" ? "column" : "pubu";
      if (this.mode === "pubu") {
        this.updaeWaterfull();
      }
    },
    leftBar() {},
    async updaeWaterfull() {
      if (this.mode === "column") {
        console.log("column模式");
        return;
      }
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
    this.updaeWaterfull();
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
  .list-enter,
  .list-leave-to {
    transform: translate3d(30%, 0, 0);
    opacity: 0;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease-in;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate(100%, 0);
    position: absolute;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s ease;
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
      li {
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
    & > li {
      list-style: none;
    }
    li {
      transition: all 1s;
    }
    width: 100%;
    position: absolute;
    top: 68px;
    bottom: 0;
    overflow: auto;
  }
}
</style>