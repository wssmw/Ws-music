<template>
  <div class="playlist">
    <MusicPlayList :musicid="musicListId"/>
  </div>
</template>

<script>
import MusicPlayList from '../../components/MusicPlayList.vue'
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
  width: 980px;
  margin: 0 auto;
  padding:40px;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
}
</style>
