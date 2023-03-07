import wsRequest from '@/service'

const MvApi = {
  MvList: "/mv/all",
  MvContent:'/mv/detail',
  MvUrl:'/mv/url',
  MvRelation:'/related/allvideo'
}

export function getMvList() {
  return wsRequest.get({
    url: MvApi.MvList
  })
}
export function getMvContent(mvid) {
  console.log(mvid);
  return wsRequest.get({
    url: MvApi.MvContent,
    params:{
      mvid
    }
  })
}
export function getMvUrl(id) {
  return wsRequest.get({
    url: MvApi.MvUrl,
    params:{
      id
    }
  })
}
export function getMvRelation(id) {
  return wsRequest.get({
    url: MvApi.MvRelation,
    params:{
      id
    }
  })
}
