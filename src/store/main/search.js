import {
  getSearchSuggest,
  getSearchInfo
} from "@/service/main/search";

const SingerMoudle = {
  namespaced: true,
  state: {
    searchsuggest:{},
    searchinfo:{},
    iptValue:''
  },
  getters: {},
  mutations: {
    changeSearchInfo(state, obj) {
      state.searchinfo = obj
    },
    changeIptValue(state, s) {
      state.iptValue = s
    },
  },
  actions: {
    async getSearchInfoAction({ commit }, keywords) {
      const searchinfo = await getSearchInfo(keywords)
<<<<<<< HEAD
=======
      console.log(searchinfo,'dasd');
>>>>>>> 25a2ef9 (完善)
      commit('changeSearchInfo',searchinfo.result)
      commit('changeIptValue',keywords)
    }
  },
}
export default SingerMoudle
