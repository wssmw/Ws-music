<template>
  <div class="singer">
    <div class="top">
      <div class="left">
        <img class="img" :src="singerinfo.artist?.picUrl" alt="" />
      </div>
      <div class="right">
        <div class="name">
          <div class="bigname">{{ singerinfo.artist?.name }}</div>
          <div class="smallname">
            {{ singerinfo.artist?.alias[0] }}; {{ singerinfo.artist?.alias[1] }}
          </div>
        </div>
        <div class="desc">
          单曲数:{{ singerinfo.artist?.musicSize }} &nbsp 专辑数:{{
            singerinfo.artist?.albumSize
          }}
          &nbsp MV数:{{ singerinfo.artist?.mvSize }}
        </div>
      </div>
    </div>
    <el-tabs class="tabs" type="border-card">
      <el-tab-pane class="tabsitem" label="热门作品">
        <MusicList :itemData="singerinfo.hotSongs" />
      </el-tab-pane>
      <el-tab-pane class="albumitem" label="所有专辑">
        <div class="itemlist">
          <template v-for="item in singeralbum">
            <AlbumItem
              :artist="item.artists[0].name"
              :name="item.name"
              :picUrl="item.picUrl"
              class="item"
            />
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane class="mvitem" label="相关MV">
        <div class="itemlist">
          <template v-for="item in singermv">
            <SongItem
              class="item"
              :imgurl="item.imgurl"
              :name="item.name"
              :playCount="item.playCount"
              @click="mvclick(item)"
            />
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane class="descitem" label="艺人介绍">
        <div class="abstract">
          <div class="title">个人简介</div>
          <div class="content">{{ singerdesc.briefDesc }}</div>
        </div>
        <template v-for="item in singerdesc.introduction">
          <div class="item">
            <div class="title">
              {{ item.ti }}
            </div>
            <div class="content">
              {{ item.txt }}
            </div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRouter,useRoute } from 'vue-router'

import { useStore } from 'vuex'
import MusicList from '../../../components/Music-List.vue'
import SongItem from '../../../components/SongItem.vue'
import AlbumItem from '../../../components/AlbumItem.vue'
export default {
  components: {
    MusicList,
    SongItem,
    AlbumItem
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const singerid=route.query.value
    store.dispatch('singer/getSingerInfoAction', singerid)
    const singerinfo = computed(() => store.state.singer.singerinfo)
    const singermv = computed(() => store.state.singer.singermv)
    const singerdesc = computed(() => store.state.singer.singerdesc)
    const singeralbum = computed(() => store.state.singer.singeralbum)
    const mvclick = (item) => {
      store.dispatch('mv/getMvInfoAction', item.id)
      router.push({
        path: '/mvplay'
      })
      console.log(item)
    }
    return {
      singerinfo,
      singermv,
      singerdesc,
      singeralbum,

      mvclick
    }
  }
}
</script>

<style lang="less" scoped>
.singer {
  width: 80%;
  margin: 0 auto;
  background-color: red;
  height: 1000px;
  .top {
    display: flex;
    .left {
      margin: 20px;
      width: 200px;
      .img {
        width: 100%;
        border-radius: 20px;
      }
    }
    .right {
      margin-top: 20px;
      flex: 1;
      .name {
        .bigname {
          font-size: 40px;
          font-weight: 800;
        }
        .smallname {
          margin-top: 10px;
        }
      }
      .desc {
        margin-top: 10px;
      }
    }
  }
  .tabs {
    .mvitem {
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
    .descitem {
      .title {
        font-size: 20px;
        font-weight: 800;
      }
    }
    .albumitem {
      .itemlist {
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        .item {
          width: 20%;
        }
      }
    }
  }
}
</style>
