<template>
  <div class="musicplaylist">
    <div class="dec">
      <div class="left">
        <img class="img" :src="musiclistdec.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div class="name">{{ musiclistdec.name }}</div>
        <div class="author">
          <img class="img" :src="musiclistdec.creator?.avatarUrl" alt="" />
          <div class="nickname">{{ musiclistdec.creator?.nickname }}</div>
          <div class="createtime">
            {{ getLocalTime(musiclistdec.createTime) }}
          </div>
        </div>
        <div class="button">
          <el-icon><VideoPlay /></el-icon>播放
        </div>
        <div class="tags" v-if="musiclistdec.tags">
          <span>标签:</span>
          <template v-for="item in musiclistdec.tags">
            <span class="item">{{ item }}</span>
          </template>
        </div>
        <text class="introduce">介绍:{{ musiclistdec.description }}</text>
      </div>
    </div>
    <div class="table">
      <div class="title">
        <div class="left">
          <div class="list">歌曲列表</div>
          <div class="num">{{ musiclistdec.trackCount }}首歌</div>
        </div>
        <div class="right">
          播放:<span>{{ musiclistdec.playCount }}</span
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
import { computed, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import { formatTime, getLocalTime, getName } from '../utils/format'
import WsTable from '@/base_ui/WsTable.vue'
import MusicList from './Music-List.vue'
export default {
  components: {
    MusicList,
    WsTable
  },
  props: {
    Width: {
      type: Number,
      default: 100
    },
    musicid: {
      type: String,
      default: 0
    }
  },
  setup(props) {
    const store = useStore()
    store.dispatch('playlist/getMusicListContentAction', props.musicid)
    const musiclistContent = computed(
      () => store.state.playlist.musiclistContent
    )
    const musiclistdec = computed(() => store.state.playlist.musiclistdec)
    const tableData = computed(() => {
      const itemData = musiclistContent.value.map((v, i) => ({
        index: i,
        name: v.name,
        time: formatTime(v.dt),
        singer: getName(v.ar),
        id:v.id
      }))
      return itemData
    })
    const musicplay = (e) =>{
      const musicdec = {
        index: e.index,
        id: e.id,
        list: toRaw(musiclistContent.value)
      }
      store.dispatch('getMusicListAction', musicdec)
    }
    const propColumn = [
      {
        type: 'index'
      },
      {
        prop: 'name',
        label: '歌曲标题'
      },
      {
        prop: 'time',
        label: '时长'
      },
      {
        prop: 'singer',
        label: '歌手'
      },
      {
        prop: 'singer',
        label: '专辑'
      }
    ]

    return {
      propColumn,
      musiclistdec,
      tableData,
      musiclistContent,
      musicplay,
      getLocalTime
    }
  }
}
</script>

<style lang="less" scoped>
.musicplaylist {
  margin: 40px;
  width: 100%;
  margin: 0 auto;
  .dec {
    display: flex;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
      .img {
        margin: 5px;
        padding: 2px;
        width: 210px;
      }
    }
    .right {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 20px;
        font-weight: normal;
      }
      .author {
        padding: 10px 0;
        display: flex;
        align-items: center;
        .img {
          width: 30px;
        }
        .nickname {
          font-size: 10px;
          margin-left: 10px;
          color: #0c73c2;
        }
        .createtime {
          font-size: 10px;
          margin-left: 10px;
          color: #999;
        }
      }
      .button {
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
      .tags {
        margin: 10px 0;
        font-size: 12px;
        color: #999;
        .item {
          margin: 0 10px;
          border: 1px solid #999;
          padding: 0 10px;
          border-radius: 20px;
        }
      }
      .introduce {
        width: 90%;
        font-size: 12px;
        overflow: hidden;
        color: #999;
        text-overflow: ellipsis;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: break-all;
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
      border-top: 2px solid #c20c0c;
    }
  }
}
</style>
