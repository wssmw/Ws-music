<template>
  <div class="app" ello>
    <NavTitle/>
    <router-view></router-view>
    <!-- <div class="bottom"></div> -->
    <NavBottom
      @upShow="upShow"
      :audioInfo="audioInfo"
      @sliderChange="sliderChange"
    />
    <audio
      ref="audioRef"
      @timeupdate="timechange"
      @ended="endMusic"
      autoplay
      :muted="ismuted"
      :volume=voiceIndex
      :src="audioUrl"
    ></audio>
    <el-drawer
      v-model="drawer"
      :lock-scroll="true"
      size="100%"
      direction="btt"
      :with-header="false"
    >
      <ShowMusic
        @downShow="downshow"
        :audioInfo="audioInfo"
        @sliderChange="sliderChange"
      />
    </el-drawer>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, reactive, watch } from 'vue'

import NavTitle from './components/Nav-Title.vue'
import NavBottom from './components/Nav-Bottom.vue'
import ShowMusic from './components/ShowMusic.vue'

export default {
  components: {
    NavTitle,
    NavBottom,
    ShowMusic
  },
  setup() {
    const store = useStore()
    const currentIndex = ref(0)
    const drawer = ref(false)
    const audioUrl = computed(() => store.state.auidoUrl)
    const isPlaying = computed(() => store.state.isPlaying)
    const musiclyric = computed(() => store.state.lyric)
    const orderIndex=computed(()=>store.state.orderIndex)
    const voiceIndex=computed(()=>store.state.voiceIndex)
    const ismuted=computed(()=>store.state.ismuted)


    const audioInfo = reactive({
      slidertime: 0,
      playinglyric: '',
      maxtime: 0,
      isPlaying: isPlaying
    })
    const audioRef = ref()
    watch(orderIndex,(newValue)=>{
      if(newValue===2){
        // 循环播放
        audioRef.value.loop=true
      }else {
        audioRef.value.loop=false
      }
    })
    const upShow = () => {
      document.body.style.overflow = 'hidden'
      drawer.value = true
    }
    const downshow = () => {
      document.body.style.overflow = 'visible'
      drawer.value = false
    }
    const timechange = () => {
      audioInfo.maxtime = Number(audioRef.value.duration)

      audioInfo.slidertime = Number(audioRef.value.currentTime.toFixed(0))
      for (let i = 0; i < musiclyric.value.length; i++) {
        if (musiclyric.value[i].time > audioRef.value.currentTime * 1000) {
          if (i === 0) {
            audioInfo.playinglyric = musiclyric.value[i].text
            break
          }
          audioInfo.playinglyric = musiclyric.value[i - 1].text
          break
        }
      }
    }
    // 当进入mv页面,当前播放歌曲会暂停
    watch(isPlaying,(newValue)=>{
      console.log(newValue);
      if(!newValue){
        audioRef.value.pause()
      }else {
        audioRef.value.play()
      }
    })

    const sliderChange = (value) => {
      audioRef.value.currentTime = value
    }
    const endMusic = () => {
      store.dispatch('nextMusicAction')
    }
    return {
      currentIndex,
      audioRef,
      drawer,
      audioInfo,
      audioUrl,
      voiceIndex,
      ismuted,

      timechange,
      upShow,
      downshow,
      sliderChange,
      endMusic
    }
  }
}
</script>

<style lang="less" scoped>
.Z-Loading {
  z-index: 999999999999999999!important;
}
.app {
  min-width: 1260px;
  padding-bottom: 70px;
}
</style>
