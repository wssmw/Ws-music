<template>
  <div class="myaside">
    <li
      class="singer"
      :class="[currentIndex === 0 ? 'active' : '']"
      @click="click(0)"
    >
      我的歌手
    </li>
    <li
      class="mv"
      :class="[currentIndex === 1 ? 'active' : '']"
      @click="click(1)"
    >
      我的视频
    </li>
    <el-collapse class="el-collapse">
      <el-collapse-item class="el-collapse-item" title="创建的歌单" name="1">
        <template v-for="(item, index) in mycreatelist">
          <div
            class="item"
            :class="[currentIndex === index + 2 ? 'active' : '']"
            @click="click(index + 2)"
          >
            <div class="left">
              <img class="img" :src="item.coverImgUrl" alt="" />
            </div>
            <div class="right">
              <div class="name">{{ item.name }}</div>
              <div class="decs">{{ item.trackCount }}首</div>
            </div>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item class="el-collapse-item" title="收藏的歌单" name="2">
        <template v-for="(item, index) in mycollectlist">
          <div
            class="item"
            :class="[currentIndex === index + 3 ? 'active' : '']"
            @click="click(index + 3)"
          >
            <div class="left">
              <img class="img" :src="item.coverImgUrl" alt="" />
            </div>
            <div class="right">
              <text class="name">{{ item.name }}</text>
              <text class="decs">
                {{ item.trackCount }}首 by {{ item.nickname }}
              </text>
            </div>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  emits: ['selectClick'],
  setup(props, { emit }) {
    const currentIndex = ref(0)
    const store = useStore()
    const mycreatelist = computed(() => store.state.my.mycreatelist)
    const mycollectlist = computed(() => store.state.my.mycollectlist)

    const click = (index) => {
      currentIndex.value = index
      emit('selectClick', index)
    }
    return {
      mycreatelist,
      mycollectlist,
      currentIndex,

      click
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  background-color: #eee !important;
}
.myaside {
  padding-top: 40px;
  .singer,
  .mv {
    &:hover {
      background-color: #eee;
    }
    height: 48px;
    font-size: 14px;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 0 30px;
    cursor: pointer;
  }
  .el-collapse {
    background-color: green;
    .el-collapse-item__wrap {
      height: 50px !important;
      .el-collapse-item__content {
        .item {
          &:hover {
            background-color: #eee;
          }
          cursor: pointer;
          padding: 5px 0;
          height: 40px;
          display: flex;
          .left {
            margin-left: 20px;
            width: 25%;
            .img {
              height: 100%;
            }
          }
          .right {
            width: 75%;
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            .name {
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .decs {
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>
