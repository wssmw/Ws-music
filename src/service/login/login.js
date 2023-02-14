import wsRequest from '@/service'


const LoginApi = {
  LoginKey:'/login/qr/key',
  Base64:'/login/qr/create',
  LoginText:'/login/qr/check',
  UserMessage:'/login/status',
  ExitLogin:'/logout'
}

export function getloginkey(nowtime) {
  return wsRequest.get({
    url: LoginApi.LoginKey,
    params:{
      nowtime
    }
  })
}
export function getbase64(key) {
  return wsRequest.get({
    url: LoginApi.Base64,
    params:{
      key,
      qrimg:true
    }
  })
}
export function getlogintext(key,nowtime) {
  return wsRequest.get({
    url: LoginApi.LoginText,
    params:{
      key,
      nowtime
    }
  })
}
export function getUserMessage(cookie) {
  return wsRequest.get({
    url: LoginApi.UserMessage,
    params:{
      cookie
    }
  })
}
export function getExitLogin() {
  return wsRequest.get({
    url: LoginApi.ExitLogin,
  })
}

