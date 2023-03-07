<template>
  <div class="content">
    <div class="title" v-if="trackCount">
      <div class="left">
        <div class="list">歌曲列表</div>
        <div class="num">{{ trackCount }}首歌</div>
      </div>
      <div class="right">播放:{{ playCount }}次</div>
    </div>
    <div class="sub">
      <el-table :data="tableData" style="width: 100%" @cell-click="musicplay">
        <el-table-column width="40">
          <el-icon><VideoPlay /></el-icon>
        </el-table-column>
        <el-table-column prop="index" width="50" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="time" label="time" width="70" />
        <el-table-column prop="singer" label="singer" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref, watch ,computed} from 'vue'
import { useStore } from 'vuex'
import { formatTime, getName } from '../utils/format'
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {}
    },
    trackCount: {
      type: Number,
      ddefault: 0
    },
    playCount: {
      type: Number,
      ddefault: 0
    }
  },
  setup(props) {
    const store = useStore()

    const tableData = computed(()=>{
      let itemData = []
      const arr = props.itemData
      for (let i = 0; i < arr?.length; i++) {
      const s = {
        index: i + 1,
        name: arr[i].name,
        time: formatTime(arr[i].dt),
        singer: getName(arr[i].ar)
      }
      itemData.push(s)
    }
    return itemData
    })
    const musicplay = (e) => {
      const musicContent = {
        index: e.index - 1,
        id: props.itemData[e.index - 1].id,
        list: props.itemData
      }
      store.dispatch('getMusicListAction', musicContent)
    }
    return {
      tableData,
      musicplay
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 30px;
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
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-top: 2px solid red;
    .cell {
      text-align: center;
    }
  }
}
</style>
