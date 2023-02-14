<template>
  <div class="content">
    <div class="bigtitle">
      每日歌曲推荐
    </div>
    <div class="title">
      <div class="left">
        <div class="list">歌曲列表</div>
        <div class="num">{{ recommendsongs.dailySongs?.length }}首歌</div>
      </div>
    </div>
    <div class="sub">
      <el-table :data="tableData" style="width: 100%" @cell-click="musicplay">
        <el-table-column>
          <el-icon><VideoPlay /></el-icon>
        </el-table-column>
        <el-table-column prop="index" label="index" width="80" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="time" label="time" width="180" />
        <el-table-column prop="singer" label="singer" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { formatTime } from '../../../utils/format'
import { computed, ref} from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const recommendsongs = computed(() => store.state.recommend.recommendsongs)
    const tableData = ref([])
    let arr = recommendsongs.value.dailySongs

    for (let i = 0; i < arr?.length; i++) {
      const s = {
        index: i + 1,
        name: arr[i].name,
        time: formatTime(arr[i].dt),
        singer: arr[i].ar[0].name
      }
      tableData.value.push(s)
    }
    const musicplay = (e) => {
      const musicContent = {
        index: e.index - 1,
        id: recommendsongs.value.dailySongs[e.index - 1].id,
        list: recommendsongs.value.dailySongs
      }
      store.dispatch('getMusicListAction', musicContent)
    }
    return {
      recommendsongs,
      tableData,
      musicplay
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  .bigtitle{
    padding: 10px;
    background-color: red;
    font-size: 60px;
    text-align: center;
}
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .list {
        font-size: 30px;
      }
      .num {
        margin-left: 40px;
      }
    }
  }
  .sub {
    width: 100%;
    height: 100%;
    background-color: green;
    .cell {
      text-align: center;
    }
  }
}
</style>
