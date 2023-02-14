import {
  getSingerInfo,
  getSingerMv,
  getSingerAlbum,
  getSingerDesc,
} from "@/service/main/singer";

const SingerMoudle = {
  namespaced: true,
  state: {
    singerinfo: {},
    singermv: [],
    singerdesc: {},
    singeralbum: []
  },
  getters: {},
  mutations: {
    chanegSingerInfo(state, obj) {
      state.singerinfo = obj
    },
    chanegSingerMv(state, list) {
      state.singermv = list
    },
    chanegSingerDesc(state,s) {
      state.singerdesc = s
    },
    chanegSingerAlbum(state, list) {
      state.singeralbum = list
    },
  },
  actions: {
    async getSingerInfoAction({ commit }, id) {
      const singerinfo = await getSingerInfo(id)
      const singermv = await getSingerMv(id)
      const singeralbum = await getSingerAlbum(id)
      const singerdesc = await getSingerDesc(id)
      commit('chanegSingerInfo', singerinfo)
      commit('chanegSingerMv', singermv.mvs)
      commit('chanegSingerDesc', singerdesc)
      commit('chanegSingerAlbum', singeralbum.hotAlbums)
    }
  },
}
export default SingerMoudle
