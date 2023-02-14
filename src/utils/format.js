
// 对count进行格式化
function formatCount(count) {
  count = Number(count)
  if (count >= 100000000) {
    return (count / 100000000).toFixed(1) + "亿"
  } else if (count >= 10000) {
    return (count / 10000).toFixed(1) + "万"
  } else {
    return count
  }
}

// 2 -> 02
// 24 -> 24
function padLeft(time) {
  time = time + ""
  return ("00" + time).slice(time.length)
}

// 对time进行格式化
// 100 -> 01:40
function formatTime(time) {
  // 0.将毫秒转成秒
  time = time / 1000

  // 1.获取时间
  var minute = Math.floor(time / 60)
  var second = Math.floor(time) % 60

  // 2.拼接字符串
  return padLeft(minute) + ":" + padLeft(second)
}
function getLocalTime(n) {
  return new Date(parseInt(n)).toLocaleString().replace(/:\d{1,2}$/,' ');
}
function getName(arr){
  let res=''
  for(let i=0;i<arr.length;i++){
    res+=arr[i].name
  }
  return res
}
function getSingerderc(s){
  console.log(s);
  return s.split('\n')
}

function formatTimetoms(s){
  let  m=Math.floor(s/60)
  let b=s%60
  m=m>=10?m:'0'+m
  b=b>=10?b:'0'+b
  return m+":"+b
}
// 必须导出后, 才能被其他地方调用: 必须使用CommonJS导出
module.exports = {
  formatCount,
  formatTime,
  getLocalTime,
  getName,
  getSingerderc,
  formatTimetoms
}
