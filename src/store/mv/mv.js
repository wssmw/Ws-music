import { getMvContent, getMvList, getMvUrl,getMvRelation } from "@/service/mv/mv"

const MvMoudle = {
  namespaced: true,
  state: {
    mvlist:[],
    mvcontent:{},
    mvurl:'',
    mvrealation:[]
  },
  getters: {},
  mutations: {
    changeMvList(state,list){
      state.mvlist=list
    },
    changeMvContent(state,obj){
      state.mvcontent=obj
    },
    changeMvUrl(state,s){
      state.mvurl=s
    },
    changeMvRealation(state,list){
      state.mvrealation=list
    }
  },
  actions: {
    async getMvListAction({commit}){
      const res=await getMvList()
      commit('changeMvList',res.data)
    },
    async getMvInfoAction({commit},id){
      const mvurl=await getMvUrl(id)
      const mvcontent=await getMvContent(id)
      const mvrelation=await getMvRelation(id)
      commit('changeMvContent',mvcontent.data)
      commit('changeMvUrl',mvurl.data.url)
      commit('changeMvRealation',mvrelation.data)
    }
  }
}
export default MvMoudle
