import { getMusicListContent, getMusicListDec } from '@/service/main/playlist'

const PlayListMoudle = {
  namespaced: true,
  state: {
    musiclistContent: [],
    musiclistdec: {}
  },
  getters: {},
  mutations: {
    chanegMusicListContent(state, list) {
      state.musiclistContent = list
    },
    chanegMusicListDec(state, object) {
      state.musiclistdec = object
    }
  },
  actions: {
    async getMusicListContentAction({ commit }, id) {
      const res = await getMusicListContent(id)
      const listdec = await getMusicListDec(id)
      commit('chanegMusicListContent', res.songs)
      commit('chanegMusicListDec', listdec.playlist)
    }
  },
}
export default PlayListMoudle
