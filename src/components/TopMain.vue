<template>
  <div class="topmain">
    <div class="dec">
      <div class="left">
        <img class="img" :src="musicContent.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div class="name">{{ musicContent.name }}</div>
        <div class="update">
          最近更新:{{ getLocalTime(musicContent.trackUpdateTime) }} (刚刚更新)
        </div>
        <div class="action">播放</div>
      </div>
    </div>
    <MusicList
      :itemData="musicContent.tracks"
      :playCount="musicContent.playCount"
      :trackCount="musicContent.trackCount"
    />
  </div>
</template>

<script>
import MusicList from './Music-List.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getLocalTime } from '../utils/format'
export default {
  props: {},
  components: {
    MusicList
  },
  setup() {
    const store = useStore()
    const musicContent = computed(() => store.state.musictop.musicContent)

    return {
      musicContent,
      getLocalTime
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
    flex: 1;

    padding: 2px;
    .img {
      padding: 1px;
      border: 1px solid black;
      width: 80%;
    }
  }
  .right {
    // margin-left: 20px;
    flex: 2;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    .name {
      margin-top: 20px;
      font-size: 30px;
      font-weight: 500;
    }
    .update {
      font-size: 10px;
      margin: 10px 0 20px 0;
    }
  }
}
</style>
