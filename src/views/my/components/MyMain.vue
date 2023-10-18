<template>
  <div class="mymain">
    <div class="singer" v-if="selectindex === 0">
      <div class="title">我的歌手</div>
      <template v-for="item in itemData">
        <div class="item" @click="GoToSinger(item)">
          <div class="left">
            <img class="img" :src="item.picUrl" alt="" />
          </div>
          <div class="right">
            <div class="top">{{ item.name }}</div>
            <div class="bottom">
              {{ item.albumSize }}个专辑 {{ item.mvSize }}个MV
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="mv" v-else-if="selectindex === 1">
      <div class="title">我的视频</div>
      <div class="content">
        <template v-for="item in itemData">
          <div class="item" @click="gotoMv(item)">
            <img class="img" :src="item.coverUrl" alt="" />
            <div class="dec">{{ item.title }}</div>
            <div class="author">by{{ item.creator[0].userName }}</div>
            <div class="time">{{ formatTime(item.durationms) }}</div>
            <div class="playcount">
              <el-icon><VideoCamera /></el-icon>{{ formatCount(item.playTime) }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="musiclist" v-if="selectindex > 1">
      <MusicPlayList/>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { formatCount, formatTime } from '../../../utils/format'
import MusicPlayList from '../../../components/MusicPlayList.vue'
export default {
  components: {
    MusicPlayList
  },
  props: {
    itemData: {
      type: Object,
      default: () => {}
    },
    selectindex: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const store=useStore()
    const id = ref(0)
    const itemData=ref()
    const router = useRouter()
      watch(
        () => props.itemData,
        (newValue) => {
          if (newValue.id) {
            store.dispatch('playlist/getMusicListContentAction',newValue.id)
          }
          itemData.value=newValue
        }
      )
      const gotoMv = (id) =>{
        console.log(id);
      }
      const GoToSinger = (item ) =>{
        router.push({
        path: '/main/singer',
        query: {
          value: item.id
        }
      })
      }
    return {
      itemData,
      id,
      formatCount,
      formatTime,
      gotoMv,
      GoToSinger
    }
  }
}
</script>

<style lang="less" scoped>
.mymain {
  width: 100%;
  margin-top: 20px;
  .singer {
    .title {
      width: 100%;
      font-size: 30px;
      font-weight: 800;
      border-bottom: 2px solid red;
      margin-bottom: 20px;
    }
    .item {
      height: 70px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #aaa;
      .left {
        width: 50px;
        .img {
          width: 100%;
        }
      }
      .right {
        margin-left: 10px;
        .top {
          font-size: 16px;
          font-weight: 700;
        }
        .bottom {
          margin-top: 10px;
          font-size: 10px;
        }
      }
    }
  }
  .mv {
    .title {
      width: 100%;
      font-size: 30px;
      font-weight: 800;
      border-bottom: 2px solid red;
      margin-bottom: 20px;
    }
    .content {
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;

      .item {
        position: relative;
        width: 23%;
        margin: 0 1%;
        .img {
          width: 100%;
        }
        .dec {
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .author {
          font-size: 10px;
        }
        .time {
          color: white;
          position: absolute;
          bottom: 40px;
          left: 2px;
        }
        .playcount {
          position: absolute;
          color: white;
          top: 0;
          right: 0%;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
