<template>
  <!--根组件-->
  <transition name="side">
    <div class="sidebar-wrapper" v-show="isShow">
      <div class="mask" @click="hide"></div>
      <div class="main">
        <div class="user">
          <img
            class="avatar"
            src="https://infinityicon.infinitynewtab.com/user-share-icon/a23b4cf17327527ae66aad5d13f059da.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim"
          />
          <span class="text">许旭旭</span>
        </div>
        <div class="group-header">
          <span>便签分组</span>
          <span @click.stop="editorGroup">编辑</span>
        </div>
        <ul class="group">
          <li @click="clickGroup(group)" v-for="(group, index) in groups" :key="index">
            <span class="check" :class="atvClass(index,group)"></span>
            <div class="info">
              <span class="group-name">{{group}}</span>
              <span class="count">{{group==="全部"?noteList.length:groupCount(group)}}条</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      isShow: false,
      colors: [],
    };
  },
  computed: {
    ...mapGetters(["noteList", "groups","nowGroup"])
  },
  methods: {
    editorGroup () {
      this.$router.push({
        name: 'groupEditor',
      });
    },
    atvClass (i,group) {
      if(this.nowGroup==="全部") {
        return i===0?'active':'';
      }
      return group===this.nowGroup ? 'active' : '';
    },
    groupCount(group) {
      let i = 0;
      this.noteList.forEach(note => {
        if(note.group===group){
          i++;
        }
      })
      return i;
    },
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    clickGroup(group) {
      this.setNowGroup(group);
      this.$emit("clickGroup");
      this.hide();
    }

    ,...mapMutations(['setNowGroup'])
  }
};
</script>

<style scoped lang='scss'>
.sidebar-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
  font-size: $font-size-mm;
  &.side-enter,
  &.side-leave-to {
    .mask {
      transition: all 0.2s;
      opacity: 0;
    }
    opacity: 0;
    .main {
      transform: translate3d(-10%, 0, 0);
      transition: all 0.2s;
    }
  }
  &.side-enter-active,
  &.side-leave-active {
    transition: all 0.2s;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.4);
  }
  .main {
    width: 80%;
    height: 100%;
    background-color: $bg-color;
    position: absolute;
    padding: 0 20px;
    box-sizing: border-box;
    .group {
      width: 100%;
      position: absolute;
      top: 200px;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      overflow: auto;
      box-sizing: border-box;
      li {
        width: px2rem(120);
        height: px2rem(120);
        background-color: #fff;
        border-radius: 10px;  
        display: flex;
        align-items: center;
        margin: 10px 10px 10px 10px;
        .info {
          flex: 1;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          .count {
            font-size: $font-size;
            line-height: 1.5;
            color: $font-color-l;
          }
        }
        .check {
          margin-left: 10px;
          display: inline-block;
          width: 13px;
          height: 13px;
          border: solid 1px tomato;
          box-sizing: border-box;
          border-radius: 100%;
          position: relative;
        }
        .active{
          background-color: tomato;
        }
      }
    }
    .group-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 48px;
      line-height: 48px;
    }
    .user {
      height: 150px;
      width: 30%;
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: flex-end;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 100%;
      }
      .text {
        padding: 15px 0;
      }
    }
  }
}
</style>