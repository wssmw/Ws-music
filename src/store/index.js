import { createStore } from 'vuex'

import recommend from './main/recommend'
import musictop from './main/musictop'
import songsheet from './main/songsheet'
import playlist from './main/playlist'
import singer from './main/Singer'
import mv from './mv/mv'
import my from './my/my'
import search from './main/search'

import { getPlayMusic, getPlayMusicLyric } from '@/service/main/playmusic'

import { parseLyric } from '@/utils/parse-lyric'

// 音量变成静音之前的音量

export default createStore({
  state: {
    // 用户登录信息
    userinfo: {},
    // 音乐正在播放的index
    listIndex: 0,
    // 音乐的url
    auidoUrl: '',
    // 歌单
    musiclist: [],
    // 歌词
    lyric: '',
    // 是否正在播放
    isPlaying: false,
    // 当前播放的模式1.顺序播放2.随机播放3.循环播放
    orderIndex: 0,
    // 声音音量
    voiceIndex: 0.5,
    // 是否静音
    ismuted: false,
    // 变静音之前的音量
    x: 0
  },
  getters: {
    musicContent(state) {
      return state.musiclist[state.listIndex]
    }
  },
  mutations: {
    changeAudioUrl(state, url) {
      state.auidoUrl = url
    },
    changeIsPlaying(state) {
      state.isPlaying = !state.isPlaying
    },
    changeMusicList(state, list) {
      state.musiclist = list
    },
    changeListIndex(state, index) {
      state.listIndex = index
    },
    changeLyric(state, lyric) {
      state.lyric = lyric
    },
    changeUserInfo(state, object) {
      state.userinfo = object
    },
    changeOrderIndex(state, index) {
      state.orderIndex = index
    },
    changeVoiceIndex(state, n) {
      state.voiceIndex = n
    },
    changeIsMuted(state) {
      state.ismuted = !state.ismuted
    },
    changeX(state, n) {
      state.x = n
    }
  },
  actions: {
    async getMusicListAction({ state, commit }, { index, id, list }) {
      console.log(list,'list');
      const res = await getPlayMusic(id)
      const lyricRes = await getPlayMusicLyric(id)
      const lyric = parseLyric(lyricRes.lrc.lyric)
      commit('changeLyric', lyric)
      if (!state.isPlaying) {
        commit('changeIsPlaying')
      }
      commit('changeAudioUrl', res.data[0].url)
      commit('changeMusicList', list)
      commit('changeListIndex', index)
    },
    async changeMusicListAction({ state, commit }, { index, id }) {
      const res = await getPlayMusic(id)
      const lyricRes = await getPlayMusicLyric(id)
      const lyric = parseLyric(lyricRes.lrc.lyric)
      commit('changeLyric', lyric)
      if (!state.isPlaying) {
        commit('changeIsPlaying')
      }
      commit('changeAudioUrl', res.data[0].url)
      commit('changeListIndex', index)
    },
    async nextMusicAction({ state, commit }, isNext = true) {
      console.log(1)
      let id = 0
      if (isNext) {
        if (state.orderIndex === 0) {
          id = state.musiclist[state.listIndex + 1].id
          commit('changeListIndex', state.listIndex + 1)
        } else if (state.orderIndex === 1) {
          const index = Math.floor(Math.random() * state.musiclist.length)
          console.log(index)
          id = state.musiclist[index].id
          commit('changeListIndex', index)
        } else {
          id = state.musiclist[state.listIndex].id
          commit('changeListIndex', state.listIndex)
        }
      } else {
        id = state.musiclist[state.listIndex - 1].id
        commit('changeListIndex', state.listIndex - 1)
      }
      const res = await getPlayMusic(id)
      const lyricRes = await getPlayMusicLyric(id)
      const lyric = parseLyric(lyricRes.lrc.lyric)
      commit('changeAudioUrl', res.data[0].url)

      commit('changeLyric', lyric)
      if (!state.isPlaying) {
        commit('changeIsPlaying')
      }
    },
    changeVoiceIndexAction({ commit, state }, n) {
      if (state.ismuted || n === 0) {
        commit('changeIsMuted')
      }
      commit('changeVoiceIndex', n)
    },
    changeIsMutedAction({ commit, state }) {
      if (!state.ismuted) {
        commit('changeX', state.voiceIndex)
        commit('changeVoiceIndex', 0)
      } else {
        commit('changeVoiceIndex', state.x)
      }
      commit('changeIsMuted')
    }
  },
  modules: {
    recommend,
    musictop,
    songsheet,
    playlist,
    singer,
    my,
    mv,
    search
  }
})
