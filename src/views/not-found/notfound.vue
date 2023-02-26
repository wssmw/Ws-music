<template>
  <div class="not-found">
    <div class="left"></div>
    <div class="center">
      <SearchThink @search='search' :content="content" @Clickcb="cb">
        <!-- {{ content }} -->
        <template v-for="item in content">
          <div class="item">{{ item }}</div>
        </template>
      </SearchThink>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import SearchThink from '../../base_ui/Search-Think.vue'
import { ref } from 'vue';
import router from '@/router';
export default {
  components: {
    SearchThink
  },
  setup() {
    const content = ref([])
    const search = (value) => {
      console.log("value:",value);
      console.log("search函数执行");
      content.value.push(1)
    }
    const cb = () =>{
      router.push('/main/recommend')
      console.log(1);
    }
    return {
      search,
      content,
      cb
    }
  }
}
</script>

<style lang="less" scoped>
.not-found {
  display: flex;

  .left {
    flex: 1;
  }

  .center {
    flex: 1;
    .item {
      width: 100%;
      background-color:red;
    }
  }

  .right {
    flex: 1;
  }
}
</style>
