<template>
  <div class="search">
    <div class="searchbox">
      <div class="searchipt">
        <input
          class="ipt"
          type="text"
          v-model="iptvalue"
          @keyup.enter="enterClick"
          @input="iptInput"
<<<<<<< HEAD
=======
          @focus="iptFocus"
          @focusout="iptFocusout"
>>>>>>> 25a2ef9 (完善)
        />
        <button class="btn" @click="enterClick">
          <el-icon><Search /></el-icon>
        </button>
      </div>
<<<<<<< HEAD
      <div v-if="iptvalue.length" class="search-think">
        <div class="title">搜"{{ iptValue }}"相关的用户></div>
=======
      <div v-if="iptvalue.length&&isShowSearchThink" class="search-think">
        <div class="title">搜"{{ iptvalue }}"相关的用户></div>
>>>>>>> 25a2ef9 (完善)
        <div class="song">
          <div class="left">单曲</div>
          <div class="right">
            <template v-for="item in iptThink.songs">
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
    </div>

    <div class="title">
      搜索"{{ iptvalue }}",找到{{ searchinfo.songCount }}首单曲.
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
<<<<<<< HEAD
          >生意主播
=======
          >声音主播
>>>>>>> 25a2ef9 (完善)
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
import { getSearchSuggest } from '../../service/main/search'
export default {
  components: {
    MusicList
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const searchinfo = computed(() => store.state.search.searchinfo)
    const iptValue = route.query.value
    const iptvalue = ref('')
    const iptThink = ref({})
<<<<<<< HEAD
=======
    const isShowSearchThink=ref(false)
>>>>>>> 25a2ef9 (完善)
    iptvalue.value = iptValue
    const tableData = ref([])
    watch(searchinfo, (newValue) => {
      tableData.value = []
      console.log(newValue)
      let arr = newValue.songs
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
    const enterClick = () => {
      store.dispatch('search/getSearchInfoAction', iptvalue.value)
    }
    const musicplay = (e) => {
<<<<<<< HEAD
      console.log(searchinfo.value.songs[0].id)
      console.log(e)
=======
>>>>>>> 25a2ef9 (完善)
      const musicContent = {
        index: e.index - 1,
        id: searchinfo.value.songs[0].id,
        list: searchinfo.value.songs
      }
<<<<<<< HEAD
      console.log(musicContent)
      store.dispatch('getMusicListAction', musicContent)
    }
    const iptInput = debounce(async () => {
      console.log(iptValue.value)
      const res = await getSearchSuggest(iptValue.value)
      console.log(res)
      iptThink.value = res.result
      console.log(iptThink.value)
    }, 1000)
=======
      store.dispatch('getMusicListAction', musicContent)
    }
    const iptInput = debounce(async () => {
      console.log(1);
      const res = await getSearchSuggest(iptValue.value||iptvalue.value)
      console.log(res);
      iptThink.value = res.result
    }, 1000)
    const iptFocus=()=>{
      isShowSearchThink.value=true
    }
    const iptFocusout=()=>{
      isShowSearchThink.value=false
    }
>>>>>>> 25a2ef9 (完善)
    return {
      iptvalue,
      searchinfo,
      tableData,
      iptThink,
<<<<<<< HEAD

      enterClick,
      musicplay,
      iptInput
=======
      isShowSearchThink,

      enterClick,
      musicplay,
      iptInput,
      iptFocus,
iptFocusout
>>>>>>> 25a2ef9 (完善)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 80%;
  margin: 0 auto;
  border-left: 1px solid black;
  border-right: 1px solid black;
  .searchbox {
    position: relative;
    .searchipt {
      overflow: hidden;
      width: 50%;
      height: 40px;
      margin: 10px auto;
      // background-color: red;
      border: 1px solid black;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .ipt {
        margin-left: 20px;
        height: 80%;
        width: 90%;
        border: none;
      }
      .ipt:focus {
        outline: none;
      }
      .btn {
        width: 40px;
        border: none;
        height: 100%;
        border-left: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
    }
    .search-think {
      font-size: 5px;
      width: 460px;
      background-color: red;
      color: black;
      position: absolute;
      border-radius: 10px;
      z-index: 99;
      top: 110%;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      .title {
        width: 100%;
        height: 40px;
        font-size: 5px;
        color: black;
        padding-left: 10px;
        background-color: #ccc;
        margin: 0px;
        line-height: 40px;
      }
      .song,
      .singer,
      .album,
      .musiclist {
        display: flex;
      }
      .singer .left,
      .album .left,
      .musiclist .left,
      .song .left {
        flex: 1;
        display: flex;
        align-items: start;
        margin-top: 5px;
      }
      .singer .right,
      .album .right,
      .musiclist .right,
      .song .right {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        flex: 3;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: start;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        .item {
          margin: 5px 10px;
        }
      }
    }
  }
  .title {
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
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
