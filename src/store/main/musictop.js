import { getTopList,getmusicContent } from "@/service/main/musicTop"


const MusicTopMoudle = {
  namespaced: true,
  state:{
    // 各种排行榜
    musicList:[],
    // 具体排行榜的内容
    musicContent:{
    }
  },
  mutations: {
    changeMusicList(state,list){
      state.musicList=list
    },
    changeMusicContent(state,list){
      state.musicContent=list
    }
  },
  getters: {

  },
  actions: {
    async getMusicListAction({commit}){
      const res=await getTopList()
      commit('changeMusicList',res.list)
    },
    async getMusicContentAction({commit},payload){
      const res=await getmusicContent(payload)
      commit('changeMusicContent',res.playlist)
    }
  }
}
export default MusicTopMoudle
