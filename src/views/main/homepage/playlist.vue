<template>
  <div class="playlist">
    <MusicPlayList :Width="80" :musicid="musicListId"/>
  </div>
</template>

<script>
import MusicPlayList from '../../../components/MusicPlayList.vue'
import { useRoute } from 'vue-router'
export default {
  components: {
    MusicPlayList
  },
  setup() {
    const route=useRoute()
    const musicListId = route.query.id
    return {
      musicListId
    }
  }
}
</script>

<style lang="less" scoped>
.playlist {
  width: 80%;
  margin: 0 auto;
  padding:10px 0 ;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
}
</style>
