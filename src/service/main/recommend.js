import wsRequest from '@/service'

const RecommendApi={
  Banners:"/banner",
  GoodList:'/personalized',
  NewSong:'/top/album',
  Artists:'/top/artists',
  RecommendSongs:'/recommend/songs',
  RecommendResource:'/recommend/resource'
}

export function getBanners() {
  return wsRequest.get({
    url: RecommendApi.Banners,
  })
}
export function getGoodList(){
  return wsRequest.get({
    url:RecommendApi.GoodList
  })
}
export function getNewSong(){
  return wsRequest.get({
    url:RecommendApi.NewSong
  })
}
export function getArtists(){
  return wsRequest.get({
    url:RecommendApi.Artists
  })
}
export function getRecommendSongs(){
  return wsRequest.get({
    url:RecommendApi.RecommendSongs
  })
}
export function getRecommendResource(){
  return wsRequest.get({
    url:RecommendApi.RecommendResource
  })
}
