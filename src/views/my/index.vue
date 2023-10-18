<template>
  <div class="my">
    <el-container class="content">
      <el-aside class="aside" width="230px">
        <MyAside @selectClick="selectindexHandle" />
      </el-aside>
      <el-container class="main">
        <MyMain :itemData="itemData" :selectindex="selectIndex" />
      </el-container>
    </el-container>
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
    store.dispatch('my/getMyInfoAction', userinfo.account.id)
    const mysinger = computed(() => store.state.my.mysinger)
    const mymv = computed(() => store.state.my.mymv)
    const mycreatelist = computed(() => store.state.my.mycreatelist)
    const mycollectlist = computed(() => store.state.my.mycollectlist)

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
    border-right: 1px solid #ccc;
  }
}
</style>
