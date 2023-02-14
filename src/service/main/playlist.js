import wsRequest from '@/service'

const PlayListApi = {
  MusicContent: '/playlist/track/all',
  MusicListDec:'/playlist/detail'
}

export function getMusicListContent(id) {
  return wsRequest.get({
    url: PlayListApi.MusicContent+'?id='+id,
  })
}
export function getMusicListDec(id) {
  return wsRequest.get({
    url: PlayListApi.MusicListDec+'?id='+id,
  })
}
