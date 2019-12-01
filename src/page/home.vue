<template>
  <!--根组件-->
  <div class="home-wrapper" @touchmove="clearTime($event)">
    <SideBar ref="sidebar" @clickGroup="back" />
    <Header
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
      :modeIcon="modeIcon"
      @clickleft="leftBar"
      @clickright="newEditor"
      @clickmode="changeMode"
    />
    <template>
      <transition-group name="list" tag="ul" class="list" v-if="mode==='column'">
        <li
          v-for="(note) in filterNotes"
          :key="note.tid"
          @touchstart="showDelete($event,note)"
          @touchend="clearTime($event)"
        >
          <Item @clickItem="clickItem(note)" :note="note" />
        </li>
      </transition-group>
    </template>
    <template>
      <div class="pubu" v-if="mode==='pubu'">
        <ul class="left" ref="left">
          <li
            v-for="(note) in leftData"
            :key="note.tid"
            @touchstart="showDelete($event,note)"
            @touchend="clearTime($event)"
          >
            <Item @clickItem="clickItem(note)" :note="note" />
          </li>
        </ul>
        <ul class="right" ref="right">
          <li
            v-for="(note) in rightData"
            :key="note.tid"
            @touchstart="showDelete($event,note)"
            @touchend="clearTime($event)"
          >
            <Item @clickItem="clickItem(note)" :note="note" />
          </li>
        </ul>
      </div>
    </template>
    <transition name="slide">
      <router-view @back="back"></router-view>
    </transition>
    <Dialog ref="dialog" @clickLeft="deleteOk">
      <p slot="msg">确认删除？</p>
    </Dialog>
    <div class="nothing" v-show="!(filterNotes.length)">
      <h3>暂无此类便签</h3>
      <h4>请点击右上角创建便签</h4>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Item from "@/components/item.vue";
import Dialog from "@/base/dialog.vue";
import SideBar from "@/components/sideBar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      leftIcon: "iconmenu1153767easyiconnet",
      rightIcon: "iconeditor",
      modeIcon: "iconzhuanhuan",
      mode: "column",
      leftData: [],
      rightData: [],
      long: null,
      deleteNote: null
    };
  },
  computed: {
    ...mapGetters(["noteList", "filterNotes"])
  },
  methods: {
    clickItem(note) {
      this.$router.push({
        name: "detail",
        params: { tid: note.tid },
        query: { sta: 1 }
      });
    },
    showDelete(e,note) {
      this.startPos = e.touches[0].pageY;
      clearTimeout(this.long);
      this.long = setTimeout(() => {
        this.$refs.dialog.show();
        this.deleteNote = note;
      }, 1000);
    },
    clearTime(e) {
      let moveY = e.touches[0] && e.touches[0].pageY || 0;
      if(Math.abs(this.startPos - moveY) < 20) {
        return ;
      }
      if(this.long){
        clearTimeout(this.long);
      }
    },
    changeMode() {
      this.mode = this.mode === "pubu" ? "column" : "pubu";
      if (this.mode === "pubu") {
        this.updaeWaterfull();
      }
    },
    deleteOk() {
      this.controlNoteList({ note: this.deleteNote, sta: 2 });
      if (this.mode === "pubu") {
        this.updaeWaterfull();
      }
    },
    leftBar() {
      this.$refs.sidebar.show();
    },
    async updaeWaterfull() {
      if (this.mode === "column") {
        return;
      }
      this.leftData = [];
      this.rightData = [];
      await setTimeout(async () => {
        let len = this.filterNotes.length;
        for (let i = 0; i < len; i++) {
          await this.$nextTick(() => {
            let h1 = this.$refs.left.clientHeight;
            let h2 = this.$refs.right.clientHeight;
            if (h1 <= h2) {
              this.leftData.push(this.filterNotes[i]);
            } else {
              this.rightData.push(this.filterNotes[i]);
            }
          });
        }
      }, 0);
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
    },

    ...mapActions(["controlNoteList"])
  },

  mounted() {
    this.updaeWaterfull();
  },
  components: {
    Header,
    Item,
    Dialog,
    SideBar
  }
};
</script>

<style scoped lang='scss'>
.home-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  .nothing {
    text-align: center;
    line-height: 1.5;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: $font-size-mm;
  }
  .list-enter,
  .list-leave-to {
    transform: translate3d(30%, 0, 0);
    opacity: 0;
  }
  .list-enter-active,
  .list-leave-active {
    width: 100%;
    transition: all 0.2s ease-in;
  }
  .list-leave-active {
    position: absolute;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate(100%, 0);
    position: absolute;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.2s ease;
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
    position: relative;
    & > li {
      list-style: none;
      transition: all 0.4s;
    }
    width: 100%;
    position: absolute;
    top: 68px;
    bottom: 0;
    overflow: auto;
  }
}
</style>