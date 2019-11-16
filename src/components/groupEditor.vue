<template>
  <!--根组件-->
  <div class="gr-edi">
    <Dialog ref="dialog" @clickLeft="addGroup" @clickRight="cancel">
      <input
        class="dialog-input"
        :placeholder="isRename?'重命名':'新建分组'"
        v-model="newName"
        type="text"
        slot="msg"
      />
    </Dialog>
    <Header
      @clicktext="newGruop"
      @clickleft="$router.back()"
      leftIcon="iconprev"
      title="编辑分组"
      rightText="新建分组"
    />
    <ul class="group-list">
      <li v-for="(g, index) in nGroups" :key="index">
        <div class="name" @click="rename(g)">{{g}}</div>
        <label :for="g" class="right">
          <input :id="g" :value="g" type="checkbox" v-model="selectArr" />
          <span></span>
        </label>
      </li>
    </ul>
    <div class="delete" :class="{'on': selectArr.length}" @click="deleteGroup">
      <i :disabled="selectArr.length" class="iconfont iconDeleteItemCCAndM"></i>
    </div>
    <div class="nothing" v-show="!(groups.length-1)">
      <h3>暂无分组</h3>
      <h4>请点击右上角创建分组</h4>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Dialog from "@/base/dialog.vue";
import { Tip } from "@/base/js/index.js";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      newName: "",
      selectArr: [],
      isRename: false,
      oldGroup: null
    };
  },
  computed: {
    ...mapGetters(["groups"]),
    nGroups() {
      let gs = [...this.groups];
      gs.shift();
      return gs;
    }
  },
  methods: {
    rename(g) {
      this.isRename = true;
      this.oldGroup = g;
      this.newGruop();
    },
    cancel() {
      setTimeout(() => {
        this.isRename = false;
      }, 200);
    },
    newGruop() {
      this.$refs.dialog.show();
    },
    addGroup() {
      if (!this.newName.trim()) {
        Tip({
          pos: "bottom",
          msg: "为空哦",
          duration: 1
        });
        return;
      }
      let i = this.groups.some(item => {
        return this.newName.trim() === item;
      });
      if (i) {
        Tip({
          pos: "bottom",
          msg: "名字重复",
          duration: 1
        });
        this.newName = "";
        return;
      }
      if (!this.isRename) {
        this.controlGroups({ group: this.newName, sta: 0 });
        console.log("newName");
      } else {
        console.log("rename:" + this.oldGroup + " => " + this.newName);
        this.controlGroups({
          group: this.oldGroup,
          sta: 2,
          newName: this.newName
        });
      }
      this.isRename = false;
      this.newName = "";
    },
    deleteGroup() {
      if (!this.selectArr.length) {
        return;
      }
      this.controlGroups({ group: this.selectArr, sta: 1 });
      this.selectArr = [];
    },

    ...mapActions(["controlGroups"])
  },
  components: {
    Header,
    Dialog
  }
};
</script>

<style scoped lang='scss'>
.gr-edi {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: $bg-color;
  font-size: $font-size-mm;
  .nothing{
    text-align: center;
    line-height: 1.5;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .delete {
    display: flex;
    width: 100%;
    height: 48px;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    border-top: solid 1px tomato;
    &.on {
      .iconfont {
        color: tomato;
      }
    }
    .iconfont {
      transition: all 0.4s;
      font-weight: bolder;
    }
  }
  .dialog-input {
    margin: 10px 0;
    background-color: #eee;
    border-bottom: solid 1px tomato;
  }
  .group-list {
    width: 100%;
    position: absolute;
    top: 80px;
    box-sizing: border-box;
    li {
      &:active {
        color: tomato;
      }
      transition: all 0.2s;
      padding: 0 20px;
      height: 58;
      line-height: 58px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        flex: 1;
      }
      .right {
        border: solid 2px #999;
        border-radius: 100%;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        input {
          visibility: hidden;
          &:checked + span {
            opacity: 1;
          }
        }
        span {
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: tomato;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          border-radius: 100%;
          opacity: 0;
          transition: opacity 0.2s;
        }
      }
    }
  }
}
</style>