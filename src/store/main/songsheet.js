import { getMusicList, getMusicCatList } from '@/service/main/musiclist'

const SongSheetMoudle = {
  namespaced: true,
  state: {
    musiclist: [],
    catlist: {},
    total:0
  },
  getters: {
    options(state) {
      let s=state.catlist
      let res = [];
      for (const i in s.categories) {
        const a = {
          id: i,
          label: s.categories[i],
          options: [],
        };
        res.push(a);
      }
      let index = 0;
      for (let i = 0; i < s.sub?.length; i++) {
        index = 0;
        for (const a of res) {
          if (a.id == s.sub[i].category) {
            index = a.id;
            break
          }
        }
        const a = {
          label: s.sub[i].name,
          value: s.sub[i].name
        }
        res[index].options.push(a)
      }
      return res
    }

  },
  mutations: {
    changeMusicList(state, list) {
      state.musiclist = list
    },
    changeTotal(state, n) {
      state.total = n
    },
    changeCatList(state, list) {
      state.catlist = list
    }
  },
  actions: {
    async getMusicListAction({ commit }, {limit=40,offset=0,cat}) {
      const res = await getMusicList(cat,limit,offset)
      commit('changeTotal',res.total)
      commit('changeMusicList', res.playlists)
    },
    async getMusicCatListAction({ commit }) {
      const catlist = await getMusicCatList()
      commit('changeCatList', catlist)
    }
  },
}
export default SongSheetMoudle
