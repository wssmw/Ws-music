<template>
  <div class="mvplay">
    <div class="box">
      <div class="left">
        <div class="title">{{ mvcontent.name }}</div>
        <video class="video" :src="mvurl" controls></video>
      </div>
      <div class="right">
        <div class="title">视频简介</div>
        <div class="createtime">发布时间:{{ mvcontent.publishTime }}</div>
        <div class="playcount">
          播放次数:{{ formatCount(mvcontent.playCount) }}次
        </div>
        <div class="dec">{{ mvcontent.desc }}</div>
      </div>
    </div>
    <div class="recommend">
      <div class="itemlist">
        <template v-for="item in mvrealation">
          <div class="item">
            <div class="box">
              <img class="img" :src="item.coverUrl" alt="" />
              <div class="playcount">{{ formatCount(item.durationms) }}</div>
              <div class="time">{{ formatTime(item.playTime) }}</div>
            </div>
            <div class="bottom">
              <div class="title">{{ item.title }}</div>
              <div class="author">by {{ item.creator[0].userName }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed} from '@vue/runtime-core'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import { formatCount, formatTime } from '../../utils/format'
export default {
  setup() {
    const store = useStore()
    const router=useRouter()
    const mvurl = computed(() => store.state.mv.mvurl)
    const mvcontent = computed(() => store.state.mv.mvcontent)
    const mvrealation = computed(() => store.state.mv.mvrealation)
    const mvitemClick=(item)=>{
      console.log(item.vid);
        store.dispatch('mv/getMvInfoAction', item.vid)
        router.push({
          path: '/mvplay'
        })
    }
    return {
      mvcontent,
      mvurl,
      mvrealation,

      formatCount,
      formatTime,
      mvitemClick
    }
  }
}
</script>

<style lang="less" scoped>
.mvplay {
  border-left: 1px solid black;
  border-right: 1px solid black;
  width: 75%;
  margin: 0 auto;
  .box {
    display: flex;

    .left {
      text-align: center;
      width: 650px;
      border-right: 1px solid #ccc;
      // background-color: red;
      .title {
        font-size: 40px;
        font-weight: 1000;
      }
      .video {
        width: 85%;
      }
    }
    .right {
      flex: 1;
      margin-left: 10px;
      .title {
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        font-size: 10px;
      }
      .createtime {
        margin-top: 10px;
      }
      .playcount {
      }
      .dec {
      }
    }
  }
  .recommend {
    margin-top: 20px;
    .itemlist {
      display: flex;
      flex-shrink: 0;
      flex-wrap: nowrap;
      .item {
        padding: 0 1%;
        width: 18%;
        .box {
          position: relative;
          .img {
            width: 100%;
          }
          .playcount {
            position: absolute;
            top: 0;
            right: 0;
            color: white;
          }
          .time {
            color: white;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
        .bottom {
          .title {
            white-space: nowrap; /*内容超宽后禁止换行显示*/
            overflow: hidden; /*超出部分隐藏*/
            text-overflow: ellipsis; /*文字超出部分以省略号显示*/
          }
        }
      }
    }
  }
}
</style>
