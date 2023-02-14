import wsRequest from '@/service'

const LoginApi={
  MusicList:"/top/playlist",
  MusicCatList:'/playlist/catlist'
}

export function getMusicList(cat,limit,offset) {
  return wsRequest.get({
    url: LoginApi.MusicList,
    params:{
      cat,
      limit,
      offset
    }
  })
}
export function getMusicCatList() {
  return wsRequest.get({
    url: LoginApi.MusicCatList,
  })
}
