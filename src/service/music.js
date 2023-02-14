import wsRequest from ".";

export function test(keyword){
  console.log(keyword);
  return wsRequest.get({
    url:"/search?keywords="+keyword,
  })
}
