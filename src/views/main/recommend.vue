<template>
  <div>
    <Navbar :bannerList="bannerList" />
    <div class="recommend">
      <!-- 个性化推荐 -->
      <div class="myrecommend" v-if="userinfo">
        <SectionTitle title="个性化推荐" />
        <div class="itemlist">
          <div class="item" @click="dayrecommendClick">
            <div class="time">
              <div class="day-week">{{ week }}</div>
              <div class="day-date">{{ day }}</div>
            </div>
            <div class="desc">
              <div class="day-title">每日歌曲推荐</div>
              <div class="day-update">每天6:00更新</div>
            </div>
          </div>
          <template v-for="item in recommendresource">
            <SongItem class="item" :imgurl="item.picUrl" :name="item.name" :playCount="item.playcount"
              @click="playlistClick(item)" />
          </template>
        </div>
      </div>
      <!-- 热门推荐 -->
      <div class="hotrecommend">
        <SectionTitle title="推荐歌单" />
        <div class="itemlist">
          <template v-for="item in goodList">
            <SongItem class="item" :imgurl="item.picUrl" :name="item.name" :playCount="item.playCount"
              @click="playlistClick(item)" />
          </template>
        </div>
      </div>
      <!-- 新碟上架 -->
      <div class="newsong">
        <SectionTitle title="新碟推荐" />
        <NewSong :itemData="newSong" />
      </div>
      <!-- 推荐艺人 -->
      <div class="artists">
        <SectionTitle title="推荐艺人" />
        <div class="box">
          <template v-for="item in artists">
            <div class="content" @click="singerClick(item)">
              <div class="img">
                <img :src="item.picUrl" alt="" />
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import Navbar from '../../components/Navbar.vue'
import SongItem from '../../components/SongItem.vue'
import SectionTitle from '../../components/SectionTitle.vue'
import NewSong from '../../components/New-Song.vue'
import LocalCache from '../../utils/cache'
export default {
  comments: {
    Navbar,
    SongItem,
    SectionTitle,
    NewSong
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    //判断是否登录
    const userinfo = LocalCache.getCache('userinfo')
    store.dispatch('recommend/getBannerListAction')
    store.dispatch('recommend/getGoodListAction')
    store.dispatch('recommend/getNewSongAction')
    store.dispatch('recommend/getArtistsAction')
    store.dispatch('recommend/getRecommendSongsAction')
    store.dispatch('recommend/getRecommendResourceAction')
    const bannerList = computed(() => store.state.recommend.bannerList)
    const goodList = computed(() => store.state.recommend.goodList.slice(0, 8))
    const newSong = computed(() => store.state.recommend.newSong.slice(0, 10))
    const artists = computed(() => store.state.recommend.artists.slice(0, 6))
    const recommendresource = computed(() =>
      store.state.recommend.recommendresource.slice(0, 3)
    )
    function getWeekDate() {
      let nowData = new Date()
      let days = nowData.getDay()
      let weeks = new Array(
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      )
      let day = nowData.getDate()
      let week = weeks[days]
      return {
        day,
        week
      }
    }
    const { week, day } = getWeekDate()
    const playlistClick = (item) => {
      // store.dispatch('playlist/getMusicListContentAction', item.id)
      router.push({
        path: '/playlist',
        query: {
          id: item.id
        }
      })
    }
    const dayrecommendClick = () => {
      router.push('/main/dayrecommend')
    }
    const singerClick = (item) => {
      // store.dispatch('singer/getSingerInfoAction', item.id)
      router.push({
        path: '/singer',
        query: {
          value: item.id
        }
      })
    }
    return {
      week,
      day,
      bannerList,
      goodList,
      newSong,
      artists,
      recommendresource,
      userinfo,

      playlistClick,
      dayrecommendClick,
      singerClick
    }
  }
}
</script>

<style lang="less" scoped>
.recommend {
  width: 80%;
  margin: 0 auto;

  .hotrecommend,
  .myrecommend {
    .itemlist {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;

      .item {
        padding: 0 1%;
        margin: 20px 0;
        width: 23%;
        display: flex;
        flex-direction: column;

        .time {
          flex-grow: 1;
          display: flex;
          flex-direction: column;

          .day-week {
            flex: 1;
            background-color: green;
            font-size: 30px;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            display: flex;
            justify-content: center;
            // background-color: red;
          }

          .day-date {
            flex: 3;
            background-color: red;
            text-align: center;
            font-size: 120px;
            font-weight: 1000;
            border-end-end-radius: 20px;
            border-end-start-radius: 20px;
          }
        }

        .desc {
          margin-top: 8px;
          .day-title {
            margin-top: 10px;
            font-size: 16px;
            font-weight: 600;
          }
          .day-update {
            font-size: 14px;
          }
        }
      }
    }
  }

  .artists {
    .box {
      display: flex;

      .content {
        display: flex;
        margin: 0 10px;
        flex-direction: column;
        align-items: center;
        flex: 1;

        .img {
          border-radius: 50%;
          width: 100%;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .name {
          margin-top: 20px;
        }
      }
    }
  }
}</style>
