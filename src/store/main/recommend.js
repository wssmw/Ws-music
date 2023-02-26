import {
  getBanners, getGoodList, getNewSong, getArtists, getRecommendSongs,
  getRecommendResource
} from '@/service/main/recommend'

const RecommendMoudle = {
  namespaced: true,
  state: {
    // 轮播图数据
    bannerList: [],
    // 精品歌单数据
    goodList: [],
    // 新歌推荐
    newSong: [],
    // 推荐艺人
    artists: [],
    // 每日推荐歌曲
    recommendsongs: [],
    // 每日推荐歌单
    recommendresource: []
  },
  mutations: {
    changeBannerList(state, list) {
      state.bannerList = list
    },
    changeGoodList(state, list) {
      state.goodList = list
    },
    changeNewSong(state, list) {
      state.newSong = list
    },
    changeArtists(state, list) {
      state.artists = list
    },
    changeRecommendSongs(state, list) {
      state.recommendsongs = list
    },
    changeRecommendResource(state, list) {
      state.recommendresource = list
    },
  },
  getters: {

  },
  actions: {
    async getBannerListAction({ commit }) {
      const banners = await getBanners()
      commit('changeBannerList', banners.banners)
    },
    async getGoodListAction({ commit }) {
      const goodList = await getGoodList()
      commit('changeGoodList', goodList.result)
    },
    async getNewSongAction({ commit }) {
      const newSong = await getNewSong()
      commit('changeNewSong', newSong.weekData)
    },
    async getArtistsAction({ commit }) {
      const artists = await getArtists()
      commit('changeArtists', artists.artists)
    },
    async getRecommendSongsAction({ commit }) {
      const recommendsongs = await getRecommendSongs()
      commit('changeRecommendSongs', recommendsongs.data)
    },
    async getRecommendResourceAction({ commit }) {
      const recommendresource = await getRecommendResource()
      console.log(recommendresource);
      commit('changeRecommendResource', recommendresource.recommend)
    }
  }

}
export default RecommendMoudle
