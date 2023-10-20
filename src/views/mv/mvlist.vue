<template>
    <div class="mv">
      <div class="itemlist">
        <template v-for="item in mvlist">
          <MvItem
            class="item"
            :itemData="item"
            @click="mvclick(item)"
          />
        </template>
      </div>
    </div>
  </template>

  <script>
  import { useRouter } from 'vue-router'
  import { computed } from '@vue/runtime-core'
  import { useStore } from 'vuex'
  import SongItem from '../../components/SongItem.vue'
import MvItem from '@/components/MvItem.vue'
  export default {
    components: {
    SongItem,
    MvItem
},
    setup() {
      const router = useRouter()
      const store = useStore()
      store.dispatch('mv/getMvListAction')
      const mvlist = computed(() => store.state.mv.mvlist.map(v=>({
        coverUrl:v.cover,
        title:v.name,
        durationms:v.duration,
        playTime:v.playCount,
        creator:[{userName:v.artistName}],
        id:v.id
      })))
      console.log(mvlist.value);
      const mvclick = (item) => {
        router.push({
            path:'/mv/mvplay',
            query:{
                id:item.id
            }
        })
      }
      return {
        mvlist,
        mvclick
      }
    }
  }
  </script>

  <style lang="less" scoped>
  .mv {
    height: 100%;
    width: 90%;
    margin: 20px auto;
    .itemlist {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      .item {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }
  </style>
