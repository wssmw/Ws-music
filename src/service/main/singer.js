import wsRequest from '@/service'

const SingerApi={
  SingerInfo:'/artists',
  SingerMv:'/artist/mv',
  SingerAlbum:'/artist/album',
  SingerDesc:'/artist/desc'
}

export function getSingerInfo(id) {
  return wsRequest.get({
    url: SingerApi.SingerInfo,
    params:{
      id
    }
  })
}
export function getSingerMv(id) {
  return wsRequest.get({
    url: SingerApi.SingerMv,
    params:{
      id
    }
  })
}
export function getSingerAlbum(id) {
  return wsRequest.get({
    url: SingerApi.SingerAlbum,
    params:{
      id
    }
  })
}
export function getSingerDesc(id) {
  return wsRequest.get({
    url: SingerApi.SingerDesc,
    params:{
      id
    }
  })
}
