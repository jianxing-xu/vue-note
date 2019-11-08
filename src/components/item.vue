<template>
  <!--根组件-->
  <div class="item-wrapper" @click="clickItem">
    <h2 class="title">{{note.title}}</h2>
    <div class="content" v-html="note.innerT">
      <!-- content -->
    </div>
    <div class="info">11月6日 20:22</div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    clickItem() {
      this.$emit("clickItem");
    }
  }
};
</script>

<style scoped lang='scss'>
.item-wrapper {
  font-size: $font-size-mm;
  width: 95%;
  margin: 10px auto;
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  color: $font-color;
  overflow: hidden;
  box-sizing: border-box;
  .content {
    max-height: 125px;
    overflow: hidden;
    max-height: 125px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
  .title {
    line-height: 2;
    color: $font-color-d;
    font-size: $font-size-l;
  }
  .info {
    color: $font-color-ll;
    font-size: $font-size;
    line-height: 3;
  }
}
</style>