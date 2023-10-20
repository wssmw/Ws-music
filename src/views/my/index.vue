<template>
  <div class="my">
    <el-container class="content" v-if="userinfo != undefined">
      <el-aside class="aside" width="230px">
        <MyAside @selectClick="selectindexHandle" />
      </el-aside>
      <el-container class="main">
        <MyMain :itemData="itemData" :selectindex="selectIndex" />
      </el-container>
    </el-container>
    <div class="nologin" v-else>
      <div class="left">
        <img src="../../assets/img/noLogin.png" alt="" />
      </div>
      <div class="right">
        <div class="first">登录网易云音乐</div>
        <div class="secend">查看并管理你收藏的私房音乐</div>
        <div class="third">方便地随时随地收听</div>
        <el-button class="btn">立即登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import MyAside from './components/MyAside.vue'
import MyMain from './components/MyMain.vue'

import LocalCache from '../../utils/cache'

export default {
  components: {
    MyAside,
    MyMain
  },
  setup() {
    const store = useStore()

    const userinfo = LocalCache.getCache('userinfo')
    if (userinfo) {
      store.dispatch('my/getMyInfoAction', userinfo.account.id)
    }
    const mysinger = computed(() => store.state.my.mysinger)
    const mymv = computed(() => store.state.my.mymv)
    const mycreatelist = computed(() => store.state.my.mycreatelist)
    const mycollectlist = computed(() => store.state.my.mycollectlist)
    console.log(mycreatelist);
    const selectIndex = ref(0)
    const itemData = ref()
    const selectindexHandle = (index) => {
      const l = mycreatelist.value.length
      selectIndex.value = index
      if (index === 0) {
        itemData.value = mysinger.value
      } else if (index === 1) {
        itemData.value = mymv.value
      } else if (index < l + 2) {
        itemData.value = mycreatelist.value[index - 2]
      } else {
        itemData.value = mycollectlist.value[index - l - 2]
      }
    }
    const abc = () => {
      watch(mysinger, (newValue) => {
        itemData.value = newValue
      })
    }
    abc()
    return {
      mysinger,
      mymv,
      mycreatelist,
      mycollectlist,
      selectIndex,
      itemData,
      userinfo,

      selectindexHandle
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  background-color: #eee;
  .content {
    width: 980px;
    min-height: 600px;
    margin: 0 auto;
    background-color: white;
  }
  .aside {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .main {
    padding: 30px;
    border-right: 1px solid #ccc;
  }
  .nologin {
    display: flex;
    width: 980px;
    min-height: 500px;
    margin: 0 auto;
    background-color: white;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 400px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-self: center;
      align-items: start;
      .first {
        font-size: 30px;
        font-weight: 600;
        margin: 10px 0;
        margin-top: 160px;
      }
      .secend,.third {
        margin: 10px 0;
      }
      .btn {
        margin-top: 20px;
        width: 160px;
        height: 40px;
      }
    }
  }
}
</style>
