import wsRequest from '@/service'

const SearchApi={
  SearchSuggest:'/search/suggest',
  SearchInfo:'/search'
}

export function getSearchSuggest(keywords) {
  return wsRequest.get({
    url: SearchApi.SearchSuggest,
    params:{
      keywords
    }
  })
}
export function getSearchInfo(keywords) {
  return wsRequest.get({
    url: SearchApi.SearchInfo,
    params:{
      keywords
    }
  })
}
