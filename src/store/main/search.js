import {
  getSearchSuggest,
  getSearchInfo,
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
    changeSearchSuggest(state,obj){
      state.searchsuggest=obj
    }
  },
  actions: {
    async getSearchInfoAction({ commit }, keywords) {
      console.log(keywords);
      const searchinfo = await getSearchInfo(keywords)
      console.log(searchinfo,'dasd');
      commit('changeSearchInfo',searchinfo.result)
      commit('changeIptValue',keywords)
    },
    async getSearchSuggestAction({ commit }, keywords) {
      const res = await getSearchSuggest(keywords)
      commit('changeSearchSuggest',res.result)
    }
  },
}
export default SingerMoudle
