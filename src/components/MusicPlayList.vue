<template>
  <div class="musicplaylist" :style="{width:Width+'%'}">
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
          <button>播放</button>
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
    <MusicList
      :itemData="musiclistContent"
      :trackCount="musiclistdec.trackCount"
      :playCount="musiclistdec.playCount"
    />
  </div>
</template>

<script>
import { computed,   ref } from 'vue'
import { useStore } from 'vuex'
import { getLocalTime } from '../utils/format'

import MusicList from './Music-List.vue'
export default {
  components: {
    MusicList
  },
  props: {
    Width:{
      type:Number,
      default:100
<<<<<<< HEAD
    }
  },
  setup(props) {
    const store = useStore()
    const tableData = ref([])
=======
    },
    musicid:{
      type:String,
      default:0
    }
  },
  setup(props) {
    console.log(props.musicid)
    const store = useStore()
    const tableData = ref([])
    store.dispatch('playlist/getMusicListContentAction', props.musicid  )
>>>>>>> 25a2ef9 (完善)
    const musiclistContent = computed(
      () => store.state.playlist.musiclistContent
    )
    const musiclistdec = computed(() => store.state.playlist.musiclistdec)
    return {
      musiclistdec,
      tableData,
      musiclistContent,
      getLocalTime
    }
  }
}
</script>

<style lang="less" scoped>
.musicplaylist {
  width: 100%;
  margin: 0 auto;
  .dec {
    display: flex;
    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        border: 1px solid black;
        padding: 2px;
        width: 60%;
      }
    }
    .right {
      flex: 2;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 20px;
        font-weight: 800;
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
          color: blue;
        }
        .createtime {
          font-size: 10px;
          margin-left: 10px;
        }
      }
      .button {
      }
      .tags {
        margin: 10px 0;
        font-size: 12px;
        .item {
          margin: 0 10px;
          border: 1px solid black;
          padding: 3px;
          border-radius: 20px;
        }
      }
      .introduce {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: break-all;
      }
    }
  }
}
</style>
