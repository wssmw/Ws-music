<template>
  <div class="common-layout">
    <el-container class="section">
      <el-aside class="topasider" width="240px">
        <TopAside @click="itemClick" :itemData="musiclist" />
      </el-aside>
      <el-main class="main">
        <TopMain/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import TopAside from './components/TopAside.vue'
import TopMain from './components/TopMain.vue'
export default {
  components: {
    TopAside,
    TopMain
  },
  setup() {
    const store = useStore()
    store.dispatch('musictop/getMusicListAction')

    const musiclist = computed(() => store.state.musictop.musicList)
    // 切换右边的内容的点击事件
    const itemClick = (index) => {
      store.dispatch('musictop/getMusicContentAction', index)
    }
    itemClick(19723756)
    return {
      musiclist,
      itemClick
    }
  }
}
</script>

<style lang="less" scoped>
.common-layout {
  width: 75%;
  margin: 0 auto;
}
.section {
  border: 2px solid #d3d3d3;
}
.main {
  padding: 40px;
  border-left: 2px solid #d3d3d3;
}
</style>
