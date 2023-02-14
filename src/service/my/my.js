import wsRequest from '@/service'

const MyApi = {
  MusicList: "/artist/sublist",
  LoginStatu:"/login/status",
  CollectMv:'/mv/sublist',
  UserList:'/user/playlist'
}

export function getLoginStatu() {
  return wsRequest.get({
    url: MyApi.LoginStatu
  })
}

export function getMusicList() {
  return wsRequest.get({
    url: MyApi.MusicList
  })
}
export function getCollectMv() {
  return wsRequest.get({
    url: MyApi.CollectMv
  })
}
export function getUserList(uid) {
  return wsRequest.get({
    url: MyApi.UserList,
    params:{
      uid
    }
  })
}
