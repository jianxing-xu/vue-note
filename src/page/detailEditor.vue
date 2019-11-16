<template>
  <!--根组件-->
  <div class="editor-wrapper">
    <Header
      @clickleft="prev"
      @clickright="showmenu"
      :title="''"
      :leftIcon="'iconprev'"
      rightIcon="iconmenu"
    />
    <div class="content">
      <input v-focus v-model="title" type="text" class="title" placeholder="标题" />
      <div class="info">
        <div>
          <span class="time">{{(note && (note.time) || Date.now()) | format("hh:mm") }} |</span>
          <span class="count">{{fontCount}}字</span>
        </div>
        <div class="group">
          <select v-model="group">
            <option :selected="group===g?group==g:group=='全部'" :value="g" v-for="(g, index) in groups" :key="index">{{g}}</option>
          </select>
          <i class="iconfont iconlower-triangle1"></i>
        </div>
      </div>
      <div class="rich-text">
        <div
          id="editor-text"
          class="text"
          @input="textInput"
          contenteditable
          v-html="note && note.innerT"
        ></div>
        <div class="control" @click="changeStyle">
          <span data-command="insertOrderedList" class="iconfont iconordered-list"></span>
          <span data-command="insertUnorderedList" class="iconfont iconwuxu"></span>
          <span data-command="bold" class="iconfont iconjiacu1"></span>
          <span data-command="italic" class="iconfont iconxieti"></span>
          <span data-command="underline" class="iconfont iconziyuan"></span>
          <span data-command="justifyLeft" class="iconfont iconduiqi-copy-copy"></span>
          <span data-command="justifyCenter" class="iconfont icondingduiqi"></span>
          <span data-command="justifyRight" class="iconfont iconduiqi-copy"></span>
          <input type="color" @change="changeStyle" data-command="foreColor" />
        </div>
      </div>
    </div>
    <Dialog />
    <div class="menu-pos">
      <Menu ref="menu" @clickItem="clickItem" :items="[{text:'置顶',g:'top'},{text:'删除',g:'del'}]" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import { newNote } from "@/assets/js/model";
import Menu from "@/base/menu.vue";
import Dialog from "@/base/dialog.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      fontCount: 0,
      title: "",
      group: '',
      sta: 0, //0 新建   1修改  2删除  3置顶切换
      note: {},
      color: "",
      isRfresh: false
    };
  },  
  computed: {
    ...mapGetters(["noteList","groups"])
  },

  methods: {
    changeGroup(e){
      this.group = e.target.value;
      console.log(e.target.value);
      //this.controlNoteList({note:this.note, sta: 4, group: this.group || "全部"});
    },
    clickItem(g) {
      if (g === "del") {
        if(this.sta === 0){
          return;
        }
        this.controlNoteList({ note: this.note, sta: 2 });
      }
      if(g === 'top') {
        console.log('toTop')
        this.controlNoteList({note: this.note, sta: 3});
      }
      this.$router.back();
    },
    showmenu() {
      this.$refs.menu.toggle();
    },
    textInput() {
      this.fontCount = this.editorDom && this.editorDom.innerText.length;
    },
    prev() {
      this.$router.back();
    },
    changeStyle(e) {
      let dataset = { ...e.target.dataset };
      let { command } = dataset;
      let value = e.target.value;
      document.execCommand(command, false, value || null);
    },
    _check() {
      let sta = this.$route.query.sta;
      this.sta = sta;
    },
    _getCurrent() {
      this.note = this.noteList.find(item => {
        return item.tid === this.tid;
      });
      this.title = this.note && this.note.title;
      this.group = this.note && this.note.group;
      if (!this.note && this.tid !== 0) {
        this.isRfresh = true;
        this.$router.back();
        return;
      }
      this.fontCount = (this.note && this.note.innerT.length) || 0;
    },

    ...mapActions(["controlNoteList","controlGroups"])
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isRfresh) {
      this.$emit("back");
    } else {
      window.location.reload();
    }
    
    let tid = this.sta == 1 ? this.note && this.note.tid : Date.now();
    let note = newNote({
      tid,
      title: this.title,
      group: this.group || "全部",
      innerT: this.editorDom.innerHTML,
      normalPos: this.sta === 0 ? this.noteList.length : this.note.normalPos,
    });
    if (!this.fontCount && (!this.title || this.title.trim()==="") && this.sta === 0) {
      next();
      return;
    }
    this.controlNoteList({ note, sta: this.sta });
    next();
  },
  mounted() {
    this.editorDom = document.getElementById("editor-text");
    this._check();
    this.tid = this.$route.params.tid || 0;
    if(this.tid===0){
      return;
    }
    this._getCurrent();
  },
  components: {
    Header,
    Dialog,
    Menu
  }
};
</script>

<style scoped lang='scss'>
.editor-wrapper {
  background-color: $bg-color-d;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  .content {
    width: 100%;
    position: absolute;
    top: 68px;
    bottom: 0;
    box-sizing: border-box;
    .rich-text {
      position: fixed;
      top: 150px;
      bottom: 0;
      width: 100%;
      font-weight: 100;
      .control {
        width: 100%;
        position: fixed;
        height: 38px;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        align-items: center;
        border-radius: 10px;
        span {
          padding: 10px;
        }
        input {
          width: 16px;
          height: 16px;
          border: 0;
          padding: 10px;
          background-color: #fff;
        }
      }
      .text {
        -webkit-user-select: none;
        font-size: $font-size-mm;
        padding: 0 27px;
        outline: none;
        border: none;
        width: 100%;
        box-sizing: border-box;
        line-height: 1.4;
        letter-spacing: 0.5px;
        position: absolute;
        top: 0;
        bottom: 48px;
        overflow: auto;
        &:empty::before {
          content: "说点啥好的呢？";
          color: #ccc;
        }
      }
    }
    .info {
      padding: 0 20px;
      height: 48px;
      line-height: 48px;
      color: $font-color-l;
      font-size: $font-size;
      display: flex;
      justify-content: space-between;
      select{
        background-color:transparent;
        outline: none;
        border: none;
        appearance:none;
        padding: 1px 2px;
        font-size: $font-size;
      }
      
    }
    .title {
      padding: 0 20px;
      width: 100%;
      box-sizing: border-box;
      height: 35px;
      font-size: 28px;
      background-color: $bg-color-d;
      color: #000;
      font-weight: 550;
    }
  }
  .menu-pos {
    position: absolute;
    top: 68px;
    right: 30px;
  }
}
</style>