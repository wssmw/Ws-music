import wsRequest from '@/service'

const PlayMusicApi={
  PlayMusic:'/song/url',
  PlayMusicLyrric:'lyric'
}

export function getPlayMusic(id) {
  return wsRequest.get({
    url: PlayMusicApi.PlayMusic+'?id='+id,
  })
}

export function getPlayMusicLyric(id) {
  return wsRequest.get({
    url: PlayMusicApi.PlayMusicLyrric+'?id='+id,
  })
}

