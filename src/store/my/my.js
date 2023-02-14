import { getMusicList, getCollectMv, getUserList } from "@/service/my/my"
const MyMoudle = {
  namespaced: true,
  state: {
    mysinger: [],
    mymv: [],
    mycreatelist: [],
    mycollectlist: [],
  },
  getters: {},
  mutations: {
    changeMySinger(state, list) {
      state.mysinger = list
    },
    changeMyMv(state, list) {
      state.mymv = list
    },
    changeMyCollectList(state, list) {
      state.mycollectlist = list
    },
    changeMyCreateList(state, list) {
      state.mycreatelist = list
    }
  },
  actions: {
    async getMyInfoAction({ commit }, uid) {
      const singer = await getMusicList()
      const mv = await getCollectMv()
      const createlist = await getUserList(uid)
      const list = createlist.playlist
      let mycollectlist = [], mycreatelist = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].creator.userId === uid) {
          mycreatelist.push(list[i])
        } else {
          mycollectlist.push(list[i])
        }
      }
      commit('changeMySinger', singer.data)
      commit('changeMyMv', mv.data)
      commit('changeMyCollectList', mycollectlist)
      commit('changeMyCreateList', mycreatelist)
    }
  }
}
export default MyMoudle
