<template>
  <div class="musiclist">
    <el-backtop :right="40" :bottom="100" />
    <div class="title">
      <div class="select">
        <span> {{ value }}</span>
        <el-select v-model="value" placeholder="Select" @change="selectClick" class="selectoption">
          <el-option-group class="group" v-for="group in options" :key="group.label" :label="group.label">
            <div class="groupitem">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
            </div>
          </el-option-group>
        </el-select>
      </div>
      <!-- <button>全部</button> -->
    </div>
    <ul class="infinite-list" style="overflow: auto" infinite-scroll-distance="0">
      <li v-for="item in musiclist" class="item">
        <SongItem :imgurl="item.coverImgUrl" :name="item.name" :playCount="item.playCount"
          @click="playlistClick(item)" />
      </li>
    </ul>
    <div class="pagination">
      <el-pagination background :page-size="limit" :pager-count="9" layout="prev, pager, next" :total="total"
        @current-change="pageChange" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SongItem from '../../../components/SongItem.vue'
export default {
  components: {
    SongItem
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const limit = ref(40)
    const value = ref('全部')

    store.dispatch('musiclist/getMusicListAction', limit.value)
    store.dispatch('musiclist/getMusicCatListAction')
    const musiclist = computed(() => store.state.musiclist.musiclist)
    const total = computed(() => store.state.musiclist.total)
    const options = computed(() => store.getters['musiclist/options'])

    const selectClick = (e) => {
      const s = {
        limit: limit.value,
        cat: e
      }
      store.dispatch('musiclist/getMusicListAction', s)
    }
    const pageChange = (e) => {
      const s = {
        limit: limit.value,
        offset: limit.value * e
      }
      store.dispatch('musiclist/getMusicListAction', s)
      console.log('cahnge', e)
    }
    const playlistClick = (item) => {
      // store.dispatch('playlist/getMusicListContentAction', item.id)
      router.push({
        path: '/main/playlist',
        query: {
          value: item.id
        }
      })
    }
    return {
      options,
      musiclist,
      value,
      options,
      limit,
      total,

      selectClick,
      pageChange,
      playlistClick
    }
  }
}
</script>

<style lang="less" scoped>
.group {
  font-size: 20px;
  display: flex;

  .groupitem {
    max-width: 500px;
    display: flex;
    flex-wrap: wrap;
  }
}

.musiclist {
  width: 75%;
  margin: 0 auto;
  padding: 0 40px;
  border-left: 1px solid black;
  border-right: 1px solid black;

  .title {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;

    .select {
      margin-left: 10px;
      display: flex;
      align-items: center;

      .selectoption {
        max-width: 100px;
        margin-left: 10px;
      }
    }

    .btn {}
  }

  .infinite-list {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    padding: 0 0;

    .item {
      width: 23%;
      margin: 10px 0;
      padding: 0 1%;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
