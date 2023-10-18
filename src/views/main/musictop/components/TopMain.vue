<template>
  <div class="topmain">
    <div class="dec">
      <div class="left">
        <img class="img" :src="musicContent.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div class="name">{{ musicContent.name }}</div>
        <div class="update">
          <el-icon><Clock /></el-icon> 最近更新:{{
            getLocalTime(musicContent.trackUpdateTime)
          }}
          (刚刚更新)
        </div>
        <div class="action">
          <el-icon><VideoPlay /></el-icon>播放
        </div>
      </div>
    </div>
    <div class="table">
      <div class="title">
        <div class="left">
          <div class="list">歌曲列表</div>
          <div class="num">{{ musicContent.trackCount }}首歌</div>
        </div>
        <div class="right">
          播放:<span>{{ musicContent.playCount }}</span
          >次
        </div>
      </div>
      <div class="table-main">
        <WsTable
          :propColumn="propColumn"
          :tableData="tableData"
          :cellClick="musicplay"
        ></WsTable>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { formatTime, getLocalTime, getName } from '../../../../utils/format'
import WsTable from '@/base_ui/WsTable.vue'
export default {
  props: {},
  components: {
    WsTable
  },
  setup() {
    const propColumn = [
      {
        type: 'index'
      },
      {
        prop: 'name',
        label: '标题'
      },
      {
        prop: 'time',
        label: '时长'
      },
      {
        prop: 'singer',
        label: '歌手'
      }
    ]
    const store = useStore()
    const musicContent = computed(() => store.state.musictop.musicContent)
    const tableData = computed(() => {
      let itemData = []
      console.log(musicContent)
      const arr = musicContent.value.tracks
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
      propColumn,
      musicContent,
      getLocalTime,
      musicplay
    }
  }
}
</script>

<style lang="less" scoped>
.topmain {
  // background-color: pink;
}
.dec {
  display: flex;
  .left {
    border: 1px solid black;
    .img {
      margin: 4px;
      padding: 1px;
      width: 150px;
    }
  }
  .right {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    .name {
      margin-top: 20px;
      font-size: 20px;
      font-weight: 500;
    }
    .update {
      font-size: 12px;
      color: #666;
      margin: 10px 0 20px 0;
    }
    .action {
      margin-top: 10px;
      width: 80px;
      padding: 5px;
      display: flex;
      align-items: center;
      color: white;
      border: 1px solid black;
      border-radius: 2px;
      background-color: #1352a3;
      cursor: pointer;
      &:hover {
        background-color: rgba(13, 52, 66, 0.3);
      }
      .el-icon {
        margin: 0 5px;
      }
    }
  }
}
.table {
  margin-top: 40px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    .left {
      display: flex;
      align-items: center;
      .list {
        font-size: 20px;
      }
      .num {
        margin-left: 20px;
        color: #666;
      }
    }
    .right {
      span {
        color: #c20c0c;
        font-weight: bold;
      }
    }
  }
  .table-main {
    margin-top: 10px;
    border: 1px solid #d3d3d3;
    border-top:  2px solid #c20c0c;
  }
}
</style>
