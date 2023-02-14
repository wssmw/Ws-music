import wsRequest from '@/service'

const MusicTopApi = {
  TopList: "toplist",
  MusicCopunt: '/playlist/detail'
}

export function getTopList() {
  return wsRequest.get({
    url: MusicTopApi.TopList,
  })
}
export function getmusicContent(id) {
  return wsRequest.get({
    url: MusicTopApi.MusicCopunt + '?id=' + id
  })
}
