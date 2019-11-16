<template>
  <div id="app">
        <router-view></router-view>
  </div>
</template>
<script>
import storage from '@/assets/js/storage'
import {mapMutations} from 'vuex'
export default {
  methods:{
    ...mapMutations(['setGroups']),
    initGroups(){
      let gs = storage.get('__group__');
      let groups = gs.length ? gs : storage.set('__group__',['全部','工作','生活']);
      this.setGroups(groups);
    }
  },
  mounted(){
    this.initGroups();  
  }
};
</script>
<style lang="scss">
@import url("./assets/css/index.scss");
#app {
  width: 100%;
  height: 100%;
  background-color: $bg-color;
  
}
</style>
