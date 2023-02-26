<template>
  <div class="Ws-think">
    <div class="search">
      <el-icon class="icon"><Search /></el-icon>
      <input ref="iptRef" class="ipt" type="text" v-model="iptValue" placeholder="请输入内容" @input="iptInput"
        @keyup.enter="enterClick" @blur="iptFocusout" @focus="iptFocus">
    </div>
    <div class="searchThink" v-show="isShow&&iptValue">
      <slot>
        <template v-for="item in content.slice(0,10)">
          <div class="item">{{ item }}</div>
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { debounce } from 'lodash'
export default {
  props: ['content'],
  emits: ['search','Clickcb'],
  setup(props, { emit }) {
    const isShow = ref(false)
    const iptValue = ref('')
    const iptRef = ref()
    const iptInput = debounce((e) => {
      isShow.value = true
      emit("search",iptValue.value)
      console.log(iptValue.value);
    }, 400)
    const enterClick = () => {
      emit('Clickcb',iptValue.value)
      iptRef.value.blur()
      isShow.value = false
    }
    const iptFocusout = () => {
      isShow.value = false
    }
    const iptFocus = () => {
      isShow.value = true
    }
    return {
      iptRef,
      isShow,
      iptValue,

      iptInput,
      enterClick,
      iptFocusout,
      iptFocus
    }
  }
}
</script>
<!-- 输入框的高度和宽度，输入框默认内容,字体大小，颜色,联想框的大小 -->
<style lang="less" scoped>
.Ws-think {
  display: flex;
  flex-direction: column;
  align-items: center;

  .search {
      width: 200px;
      height: 40px;
      background-color: white;
      display: flex;
      align-items: center;
      border: 1px solid black;
      border-radius: 20px;
      margin-top: 10px;
      padding: 0 10px;
      .icon {
        font-size: 20px;
        margin-right: 5px;
        color: #242424;
      }
      .ipt {
        height: 80%;
        width: 100%;
        border: none;
        color: #9b9b9b;
        font-weight: 600;
        background-color: rgba(0, 0, 0, 0);
      }
      .ipt::-webkit-input-placeholder {
        color: #aaa;
      }
      .ipt:focus {
        outline: none;
      }
    }

  .searchThink {
    margin-top: 10px;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .item {
      width: 60%;
      padding:5px 20px;
      cursor:pointer;
    }
    .item:hover {
      background-color: red;
      color: blue;
    }
  }
}
</style>
