<template>
  <div class="playlist">
<<<<<<< HEAD
    <MusicPlayList :Width="80"/>
=======
    <MusicPlayList :Width="80" :musicid="musicListId"/>
>>>>>>> 25a2ef9 (完善)
  </div>
</template>

<script>
import MusicPlayList from '../../../components/MusicPlayList.vue'
<<<<<<< HEAD
=======
import { useRoute } from 'vue-router'
>>>>>>> 25a2ef9 (完善)
export default {
  components: {
    MusicPlayList
  },
  setup() {
<<<<<<< HEAD
    return {
=======
    const route=useRoute()
    const musicListId = route.query.value
    return {
      musicListId
>>>>>>> 25a2ef9 (完善)
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
