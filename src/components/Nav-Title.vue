<template>
  <div class="title">
    <div class="left" @click="tohome">
      <el-icon>
        <Mic />
      </el-icon>
      我的音乐
    </div>
    <div class="center">
      <router-link active-class="active" class="index" to="/main"
        ><el-icon> <House /> </el-icon>首页</router-link
      >
      <router-link active-class="active" class="find" to="/mv"
        ><el-icon> <VideoPlay /> </el-icon>MV</router-link
      >
      <router-link active-class="active" class="music" to="/my"
        ><el-icon> <Avatar /> </el-icon>我的音乐</router-link
      >
    </div>
    <div class="right">
      <el-autocomplete
        class="autocomplete"
        v-model="inputValue"
        :fetch-suggestions="selecthandle"
        :trigger-on-focus="false"
        :fit-input-width="true"
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
      <div class="avatar">
        <div class="avatarlogin">
          <div v-if="!isLogin" @click="loginClick">登录</div>
          <div class="content" v-else>
            <el-dropdown>
              <span class="el-dropdown-link">
                <img class="img" :src="userInfo?.profile?.avatarUrl" alt="" />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>我的主页</el-dropdown-item>
                  <el-dropdown-item>我的消息</el-dropdown-item>
                  <el-dropdown-item>我的等级</el-dropdown-item>
                  <el-dropdown-item>个人设置</el-dropdown-item>
                  <el-dropdown-item>实名认证</el-dropdown-item>
                  <el-dropdown-item @click="exitClick">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="login" v-if="isActive">
        <div class="login-box">
          <div class="title">请扫码</div>
          <img class="qrcode" :src="imgUrl" />
          <div class="cancle" @click="cancleLogin">x</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getbase64,
  getloginkey,
  getlogintext,
  getUserMessage,
  getExitLogin
} from '../service/login/login'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, toRaw } from 'vue'
import LocalCache from '../utils/cache'
import { useStore } from 'vuex'
export default {
  setup() {
    const isActive = ref(false)
    const isLogin = ref(false)
    const iptRef = ref()
    const imgUrl = ref('')
    const userInfo = computed(() => store.state.userinfo)
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    let check = null
    const tohome = () => {
      router.push('/main/recommend')
    }
    // 判断是否登录
    const judgeLogin = () => {
      const userinfo = LocalCache.getCache('userinfo')
      if (userinfo) {
        store.commit('changeUserInfo', userinfo)
        isLogin.value = true
      }
    }
    judgeLogin()
    const loginClick = async () => {
      document.body.style.overflow = 'hidden'
      let nowtime = Date.now()
      isActive.value = true
      const res = await getloginkey(nowtime)
      const key = res.data.unikey
      const res1 = await getbase64(key)
      imgUrl.value = res1.data.qrimg
      check = setInterval(async (res) => {
        let nowtime2 = new Date().getTime()
        const res3 = await getlogintext(key, nowtime2)
        if (res3.code == 800) {
          clearInterval(check)
        }
        if (res3.code == 803) {
          console.log('账号登录')
          clearInterval(check)
          isLogin.value = true
          isActive.value = false
          const cookie = res3.cookie
          LocalCache.setCache('cookie', cookie)
          const res4 = await getUserMessage(cookie)
          LocalCache.setCache('userinfo', res4.data)
          store.commit('changeUserInfo', res4.data)
          router.go(0)
        }
      }, 3000)
    }
    // 取消登录
    const cancleLogin = () => {
      document.body.style.overflow = 'visible'
      clearInterval(check)
      isActive.value = false
    }
    // 退出
    const exitClick = async () => {
      const res = await getExitLogin()
      store.commit('changeUserInfo', '')
      LocalCache.deleteCache('userinfo')
      LocalCache.deleteCache('cookie')
      isLogin.value = false
      router.go(0)
    }
    const inputValue = ref('')

    // 按回车键跳转
    const enterClick = (item) => {
      router.push({
        path: '/search',
        query: {
          value: inputValue.value
        }
      })
    }
    const selecthandle = async (a, cb) => {
      await store.dispatch('search/getSearchSuggestAction', inputValue.value)
      const iptThink = computed(() => store.state.search.searchsuggest)
      cb(iptThink.value.order.map((v) => toRaw(iptThink.value[v]))[0])
    }
    const handleSelect = (item) => {
      router.push({
        path: '/search',
        query: {
          value: item.name
        }
      })

    }
    return {
      tohome,
      isActive,
      imgUrl,
      isLogin,
      userInfo,
      iptRef,
      inputValue,

      loginClick,
      cancleLogin,
      exitClick,
      enterClick,
      selecthandle,
      handleSelect
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  border-radius: 20px;
  background-color: black;
}

.title {
  display: flex;
  background-color: #242424;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  font-size: 25px;
  font-weight: 800;
  color: #fff;

  .left {
    color: #ccc;
    margin-left: 10%;
    display: flex;
    align-items: center;
    cursor: pointer;
    .el-icon {
      margin-right: 10px;
    }
  }

  .center {
    display: flex;

    .index,
    .music,
    .find {
      color: #ccc;
      margin: 0 30px;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon {
        margin-right: 10px;
      }
      &:hover {
        border-radius: 20px;
        background-color: #000;
      }
    }
  }

  .right {
    // width: 100px;
    position: relative;
    display: flex;
    margin-right: 10%;
    align-items: center;
    .autocomplete {
      width: 200px;
      .item {
        width: 200px;
      }
    }
    .search {
      .search-think {
        font-size: 12px;
        width: 250px;
        background-color: #fff;
        color: black;
        position: absolute;
        border-radius: 10px;
        z-index: 99;
        top: 100%;
        overflow: hidden;

        .title {
          height: 40px;
          font-size: 5px;
          color: black;
          padding-left: 10px;
          background-color: #ccc;
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
          color: #000;
          font-weight: normal;
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
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;

          .item {
            margin: 5px 10px;
          }
        }
      }
    }

    // .search {
    //   width: 158px;
    //   height: 30px;
    //   background-color: white;
    //   display: flex;
    //   align-items: center;
    //   border: 1px solid black;
    //   border-radius: 20px;
    //   padding: 0 10px;

    //   .icon {
    //     font-size: 20px;
    //     margin-right: 5px;
    //     color: #242424;
    //   }

    //   .ipt {
    //     height: 80%;
    //     width: 100%;
    //     border: none;
    //     color: #9b9b9b;
    //     font-weight: 600;
    //     background-color: rgba(0, 0, 0, 0);
    //   }

    //   .ipt::-webkit-input-placeholder {
    //     color: #aaa;
    //   }

    //   .ipt:focus {
    //     outline: none;
    //   }
    // }

    .avatar {
      width: 40px;
      display: flex;
      align-items: center;
      margin-left: 10px;
      font-size: 20px;
      color: #666;
      cursor: pointer;

      .avatarlogin {
        .content {
          .img {
            width: 100%;
            border-radius: 50%;
          }
        }
      }
    }

    .login {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;

      .login-box {
        position: relative;
        width: 400px;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 20px;

        .title {
          height: 40px;
          background-color: white;
          color: #566270;
        }

        .qrcode {
          width: 50%;
        }

        .cancle {
          color: black;
          position: absolute;
          right: 20px;
          top: 0;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
