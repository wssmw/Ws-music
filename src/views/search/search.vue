<template>
  <div class="search">
    <div class="box">
      <el-autocomplete
        style="width: 400px"
        class="autocomplete"
        v-model="iptValue"
        :fetch-suggestions="selecthandle"
        :trigger-on-focus="false"
        @select="handleSelect"
        @keyup.enter="enterClick"
        placeholder="请输入搜索内容"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
        <template #default="scope">
          <div class="item" v-for="(item, index) in scope" :key="item.id">
            {{ item.name }}-{{ item.artists[0].name }}
          </div>
        </template>
      </el-autocomplete>
    </div>
    <!-- <div class="searchbox">
      <div class="searchipt">
        <input
          class="ipt"
          type="text"
          v-model="iptValue"
          ref="iptRef"
          @keyup.enter="enterClick"
          @input="iptInput"
          @focus="iptFocus"
          @focusout="iptFocusout"
        />
        <button class="btn" @click="enterClick">
          <el-icon><Search /></el-icon>
        </button>
      </div>
      <div v-if="iptValue.length>0&&isShowSearchThink" class="search-think">
        <div class="title">搜"{{ iptValue }}"相关的用户></div>
        <div class="song">
          <div class="left">单曲</div>
          <div class="right">
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!这里有问题 -->
    <!-- <template v-for="item in iptThink.songs">
              <div class="item">{{ item.name }}-{{ item.artists[0].name }}</div>
            </template>
          </div>
        </div>
        <div class="singer">
          <div class="left">歌手</div>
          <div class="right">
            <template v-for="item in iptThink.artists">
              <div class="item">{{ item.name }}</div>
            </template>
          </div>
        </div>
        <div class="album">
          <div class="left">专辑</div>
          <div class="right">
            <template v-for="item in iptThink.albums">
              <div class="item">{{ item.name }}-{{ item.artist.name }}</div>
            </template>
          </div>
        </div>
        <div class="musiclist">
          <div class="left">歌单</div>
          <div class="right">
            <template v-for="item in iptThink.playlists">
              <div class="item">{{ item.name }}</div>
            </template>
          </div>
        </div>
      </div>
    </div> -->

    <div class="title">
      搜索"{{ iptValue }}",找到{{ searchinfo.songCount }}首单曲.
    </div>
    <div class="content">
      <el-tabs class="tabs" type="border-card" stretch>
        <el-tab-pane class="songitem item" label="单曲">
          <el-table
            :data="tableData"
            style="width: 100%"
            @cell-click="musicplay"
          >
            <el-table-column width="40">
              <el-icon><VideoPlay /></el-icon>
            </el-table-column>
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="time" label="time" width="70" />
            <el-table-column prop="singer" label="singer" />
            <el-table-column prop="album" label="album" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane class="singeritem item" label="歌手"> 歌手</el-tab-pane>
        <el-tab-pane class="albumitem item" label="专辑"> 专辑</el-tab-pane>
        <el-tab-pane class="mvitem item" label="视频"> 视频</el-tab-pane>
        <el-tab-pane class="iyricitem item" label="歌词"> 歌词</el-tab-pane>
        <el-tab-pane class="listitem item" label="歌单"> 歌单</el-tab-pane>
        <el-tab-pane class="voiceitem item" label="声音主播"
          >声音主播
        </el-tab-pane>
        <el-tab-pane class="useritem item" label="用户"> 用户</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, toRaw } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MusicList from '../../components/Music-List.vue'
import { formatTime } from '../../utils/format'
import { debounce } from 'lodash'
export default {
  components: {
    MusicList
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const iptValue = ref(route.query.value)
    watch(route, (newValue) => {
      store.dispatch('search/getSearchInfoAction', route.query.value)
      iptValue.value = route.query.value
    })
    store.dispatch('search/getSearchInfoAction', iptValue.value)
    const searchinfo = computed(() => store.state.search.searchinfo)
    const iptRef = ref()
    const iptThink = computed(() => store.state.search.searchsuggest)
    console.log(iptThink.value)
    const isShowSearchThink = ref(false)
    const tableData = ref([])
    watch(searchinfo, (newValue) => {
      console.log('数据更新')
      tableData.value = []
      let arr = newValue?.songs
      for (let i = 0; i < arr.length; i++) {
        const s = {
          index: i + 1,
          name: arr[i].name,
          singer: arr[i].artists[0].name,
          time: formatTime(arr[i].duration),
          album: '<<' + arr[i].album.name + '>>'
        }
        tableData.value.push(s)
      }
    })
    // const enterClick = () => {
    //   iptRef.value.blur()
    //   isShowSearchThink.value = false
    //   store.dispatch('search/getSearchInfoAction', iptValue.value)
    // }
    const musicplay = (e) => {
      const musicContent = {
        index: e.index - 1,
        id: searchinfo.value.songs[0].id,
        list: searchinfo.value.songs
      }
      store.dispatch('getMusicListAction', musicContent)
    }
    const iptInput = debounce(async () => {
      store.dispatch('search/getSearchSuggestAction', iptValue.value)
      // console.log(1);
      // const res = await getSearchSuggest(iptValue.value||iptvalue.value)
      // console.log(res);
      // iptThink.value = res.result
    }, 1000)
    const iptFocus = () => {
      isShowSearchThink.value = true
    }
    const iptFocusout = () => {
      isShowSearchThink.value = false
    }
    // 按回车键跳转
    const enterClick = (item) => {
      store.dispatch('search/getSearchInfoAction', iptValue.value)
    }
    const selecthandle = async (a, cb) => {
      await store.dispatch('search/getSearchSuggestAction', iptValue.value)
      const iptThink = computed(() => store.state.search.searchsuggest)
      cb(iptThink.value.order.map((v) => toRaw(iptThink.value[v]))[0])
    }
    const handleSelect = (item) => {
      store.dispatch('search/getSearchInfoAction', item.name)
      iptValue.value = item.name
    }
    return {
      iptValue,
      searchinfo,
      tableData,
      iptThink,
      isShowSearchThink,
      iptRef,

      enterClick,
      musicplay,
      iptInput,
      iptFocus,
      iptFocusout,
      selecthandle,
      handleSelect
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 80%;
  padding-top: 20px;
  margin: 0 auto;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .box {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .title {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
  }
  .tabs {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    .item {
      width: 100%;
    }
  }
}
</style>
