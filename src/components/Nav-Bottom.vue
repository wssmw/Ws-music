<template>
  <div class="play">
    <div class="slider-demo-block">
      <el-slider
        v-model="audioInfo.slidertime"
        :max="audioInfo.maxtime"
        @change="sliderChange"
        @input="inputSlider"
      />
    </div>

    <div class="bottom">
      <div class="left">
        <div class="left-content" v-if="ShowLeft">
          <img class="img" :src="musicUrl" />
          <div class="lyric">{{ audioInfo.playinglyric }}</div>
        </div>
        <div class="left-content" v-if="!ShowLeft">
          <div class="fav">
            <img class="img" src="../assets/img/爱心.png" alt="" />
            <img class="img" src="../assets/img/下载.png" alt="" />
            <img class="img" src="../assets/img/分享.png" alt="" />
          </div>
          <div class="time">
            {{ formatTimetoms(audioInfo.slidertime.toFixed(0)) }}/{{
              formatTimetoms(audioInfo.maxtime.toFixed(0))
            }}
          </div>
        </div>
      </div>
      <div class="center">
        <div class="prev" @click="prevMusic">
          <img class="img" src="../assets/icon/prev.png" alt="" />
        </div>
        <div class="pause" @click="playClick">
          <img
            class="img"
            v-if="audioInfo.isPlaying"
            src="../assets/icon/暂停播放.png"
            alt=""
          />
          <img
            class="img"
            v-if="!audioInfo.isPlaying"
            src="../assets/icon/播放2.png"
            alt=""
          />
        </div>
        <div class="next" @click="nextMusic">
          <img class="img" src="../assets/icon/next.png" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="list">
          <el-popover
            class="playmusiclist"
            placement="bottom"
            :width="400"
            trigger="click"
          >
            <div class="title">
              <div class="playmusiclist-left">
                <h2>播放列表</h2>
                <h5>共{{ totalMusic }}首歌</h5>
              </div>
              <div class="right"></div>
            </div>
            <el-scrollbar height="300px">
              <el-table
                :show-header="false"
                :data="tableData"
                style="width: 100%"
                @cell-click="musicplay"
                highlight-current-row
                :row-class-name="tableRowClassName"
              >
                <el-table-column prop="name" label="Name" />
                <el-table-column prop="singer" label="singer" />
                <el-table-column prop="time" label="time" width="70" />
              </el-table>
            </el-scrollbar>

            <template #reference>
              <img src="../assets/img/24gl-playlistMusic3.png" alt="" />
            </template>
          </el-popover>
        </div>
        <div class="order" @click="orderClick">
          <img
            v-if="orderIndex === 0"
            src="../assets/icon/23_顺序播放.png"
            alt=""
          />
          <img
            v-if="orderIndex === 1"
            src="../assets/icon/随机播放.png"
            alt=""
          />
          <img
            v-if="orderIndex === 2"
            src="../assets/icon/单曲循环.png"
            alt=""
          />
        </div>
        <div class="voice" @click="changemuted">
          <img v-if="!ismuted" src="../assets/icon/声音_实体.png" alt="" />
          <img v-if="ismuted" src="../assets/img/静音.png" alt="" />
        </div>
        <div class="slider-demo-block">
          <el-slider
            :max="1"
            :step="0.01"
            :show-tooltip="false"
            v-model="voiceIndex"
            @input="voiceChange"
          />
        </div>
        <div class="up" v-if="ShowLeft">
          <img src="../assets/icon/上移.png" @click="upshow" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { formatTimetoms, formatTime, getName } from '../utils/format'
export default {
  props: {
    audioInfo: {
      type: Object,
      default: {
        slidertime: 0,
        playinglyric: '',
        maxtime: 0,
        isPlaying: false
      }
    },
    ShowLeft: {
      type: Boolean,
      default: true
    }
  },
  emits: ['upShow', 'playClick', 'sliderChange'],
  setup(props, { emit }) {
    const store = useStore()
    const musicContent = computed(() => store.getters.musicContent)
    const orderIndex = computed(() => store.state.orderIndex)
    const musiclist = computed(() => store.state.musiclist)
    const voiceIndex = computed(() => store.state.voiceIndex)
    const ismuted = computed(() => store.state.ismuted)
    const listIndex = computed(() => store.state.listIndex)
    const musicUrl = ref('')
    const tableData = ref([])
    const totalMusic = ref(0)

    // :src="musicContent?.al.picUrl||musicContent?.artists[0].img1v1Url"
    watch(musicContent, (newValue) => {
      // console.log(newValue.al.picUrl);x
      if ('al' in newValue) {
        musicUrl.value = newValue.al.picUrl
        return
      } else if (newValue.album.artist) {
        musicUrl.value = newValue.album.artist.img1v1Url
      }
    })
    watch(musiclist, (newValue) => {
      tableData.value = []
      totalMusic.value = newValue?.length
      const arr = newValue
      for (let i = 0; i < arr.length; i++) {
        const s = {
          index: i + 1,
          name: arr[i].name,
          time: formatTime(arr[i].dt),
          singer: getName(arr[i].ar)
        }
        tableData.value.push(s)
      }
      console.log(tableData.value)
    })
    // 暂停开始函数
    const playClick = () => {
      emit('playClick')
      store.commit('changeIsPlaying')
    }
    const nextMusic = () => {
      store.dispatch('nextMusicAction')
    }
    const prevMusic = () => {
      store.dispatch('nextMusicAction', false)
    }

    const sliderChange = (value) => {
      console.log(1, value)
      emit('sliderChange', value)
    }
    const upshow = () => {
      emit('upShow')
    }

    const inputSlider = (value) => {
      console.log(value)
    }

    const orderClick = () => {
      if (orderIndex.value === 2) {
        store.commit('changeOrderIndex', 0)
      } else {
        const index = orderIndex.value + 1
        store.commit('changeOrderIndex', index)
      }
    }
    const voiceChange = (e) => {
      store.dispatch('changeVoiceIndexAction', e)
    }
    const changemuted = () => {
      store.dispatch('changeIsMutedAction')
    }
    const musicplay = (e) => {
      const musicContent = {
        index: e.index - 1,
        id: musiclist.value[e.index - 1].id
      }
      store.dispatch('changeMusicListAction', musicContent)
    }
    // 播放列表,正在播放高亮
    const tableRowClassName = ({ row, rowIndex }) => {
      if (rowIndex === listIndex.value) {
        console.log("该行被选中",rowIndex);
        return 'active'
      }
      return ''
    }
    return {
      musicContent,
      orderIndex,
      musicUrl,
      voiceIndex,
      ismuted,
      tableData,
      totalMusic,

      tableRowClassName,
      formatTime,
      playClick,
      nextMusic,
      prevMusic,
      sliderChange,
      upshow,
      inputSlider,
      orderClick,
      formatTimetoms,
      voiceChange,
      changemuted,
      musicplay
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .active {
  color: red;
}
.playmusiclist-left {
  margin-left: 10px;
}
.play {
  z-index: 9;
  background: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 25px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
  width: calc(100%);
  height: 60px;
  position: fixed;
  bottom: 0;
  .slider-demo-block {
    .el-slider {
      height: 6px;
    }
  }
  .bottom {
    margin-top: 10px;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    .left {
      flex: 1;
      margin-left: 80px;
      display: flex;
      align-items: center;
      justify-content: left;
      .left-content {
        display: flex;
        align-items: center;
        justify-content: left;
        .fav {
          height: 80%;
          display: flex;
          align-items: center;
          vertical-align: middle;
          color: black;
          .img {
            width: 25px;
            margin: 0 5px;
          }
        }
        .time {
          margin-left: 20px;
        }
        .img {
          width: 40px;
          border-radius: 10px;
        }
        .lyric {
          margin-left: 40px;
        }
      }
    }
    .center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .pause,
      .next,
      .prev {
        margin: 0 10px;
      }
      .prev .img {
        width: 20px;
      }
      .next .img {
        width: 20px;
      }
      .pause {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #bbb;
        .img {
          // margin-left: 5px;
          width: 25px;
        }
      }
    }
    .right {
      flex: 1;
      margin-right: 80px;
      display: flex;
      justify-content: right;
      align-items: center;
      & > div {
        margin: 0 3px;
        & > img {
          width: 70%;
        }
      }
      .slider-demo-block {
        width: 100px;
      }
    }
  }
}
</style>
