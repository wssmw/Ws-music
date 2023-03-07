<template>
  <div class="showmusic">
    <img
      class="bg-img"
      :src="musicContent?.al.picUrl"
    />
    <div class="bgcover"></div>
    <div class="title">
      <div class="right" @click="downshow">
        <el-icon><ArrowDownBold /></el-icon>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <img class="img" :src="musicContent?.al.picUrl" alt="" />
      </div>
      <div class="right">
        <div class="name">{{ musicContent?.name }}</div>
        <div class="singer">{{ musicContent?.ar[0].name }}</div>
        <div class="lyric" ref="lyricRef">
          <el-scrollbar ref="scrollbarRef" class="el-scrollbar">
            <div ref="lyriccontentRef" class="scrollbar-demo-item">
              <template v-for="(item, index) in lyric">
                <p :class="index === lyricisPlayindex ? 'active' : ''">
                  {{ item.text }}
                </p>
              </template>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="slider">
      <NavBottom
        :hasAudio="false"
        :audioInfo="audioInfo"
        @playClick="playClick"
        @sliderChange="sliderChange"
        :ShowLeft="false"
      />
    </div>
  </div>
</template>

<script>
import { computed, watch, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

import NavBottom from '../components/Nav-Bottom.vue'
export default {
  components: {
    NavBottom
  },
  props: {
    audioInfo: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['downShow', 'playClick', 'sliderChange'],
  setup(props, { emit }) {
    const store = useStore()
    const musicContent = computed(() => store.getters.musicContent)
    const lyric = computed(() => store.state.lyric)
    const scrollbarRef = ref()
    const lyricRef = ref()
    const lyriccontentRef = ref()
    const lyricisPlayindex = ref(0)
    const downshow = () => {
      emit('downShow')
    }
    const playClick = () => {
      emit('playClick')
    }
    const sliderChange = (value) => {
      emit('sliderChange', value)
    }
    console.log(lyricRef.value)
    let clientHeight = 0
    watch(
      () => props.audioInfo.slidertime,
      (newValue) => {
        for (let i = 0; i < lyric.value.length; i++) {
          if (newValue * 1000 < lyric.value[i].time) {
            lyricisPlayindex.value = i - 1
            const offsetTop = lyriccontentRef.value.children[i].offsetTop
            clientHeight = lyricRef.value.clientHeight
            const size = offsetTop - clientHeight / 2 - 21
            scrollbarRef.value.setScrollTop(size)
            break
          }
        }
      }
    )
    return {
      lyricisPlayindex,
      musicContent,
      lyric,
      scrollbarRef,
      lyricRef,
      lyriccontentRef,

      downshow,
      playClick,
      sliderChange
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  font-size: 20px;
  color: white;
}
.showmusic {
  position: relative;
  width: 80%;
  height: 100%;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
.bg-img,.bgcover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
.bgcover {
    background-color: rgba(0,0,0,.2);
    backdrop-filter: blur(20px);
}
  .title {
    z-index: 1;
    .right {
      display: flex;
      justify-content: right;
      padding: 10px 20px 0 0;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .content {
    margin-top: 20px;
    display: flex;
    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        z-index: 9;
        width: 70%;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    z-index: 9;

      .name {
        font-size: 20px;
      }
      .singer {
        margin-top: 10px;
      }
      .lyric {
        height: 270px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #ccc;
        padding-top: 20px;
        .el-scrollbar {
          height: 100%;
          .scrollbar-demo-item {
            text-align: center;
          }
        }
      }
    }
  }
  .slider {
    position: absolute;
    bottom: 0;
    transform: translateX(0px);
    height: 10px;
    width: 100%;
  }
}
</style>
