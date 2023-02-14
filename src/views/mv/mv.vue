<template>
  <div class="mv">
    <div class="itemlist">
      <template v-for="item in mvlist">
        <SongItem
          class="item"
          :imgurl="item.cover"
          :name="item.name"
          :playCount="item.playCount"
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
export default {
  components: {
    SongItem
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    store.dispatch('mv/getMvListAction')
    const mvlist = computed(() => store.state.mv.mvlist)
    const mvclick = (item) => {
      store.dispatch('mv/getMvInfoAction', item.id)
      router.push({
        path: '/mvplay'
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
  width: 90%;
  margin: 20px auto;
  .itemlist {
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
    .item {
      padding: 0 1%;
      width: 18%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
