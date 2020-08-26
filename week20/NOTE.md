# 每周总结可以写在这里

#### phantomjs

phantomjs 可以对网页进行测试 便于我们进行持续集成 UI测试

#### eslint

eslint 可以对我们的代码风格进行约束 统一格式的同时 减少不正确风格产生错误的可能性



step1 
https://github.com/login/oauth/authorize?client_id=Iv1.eea4ca882d79ee1b&redirect_uri=http%3A%2F%2Flocalhost%3A8000&scope=read%3Auser&state=123abc

step2
POST https://github.com/login/oauth/access_token

let code = "96c37fd72eab8e7b716d"
let state = "123abc"
let client_secret = "8d4387c43fcad48a777e43655db1aa7d2d91a7c1"
let client_id = "Iv1.eea4ca882d79ee1b"
let redirect_uri = "http%3A%2F%2Flocalhost%3A8000" 

let params= `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
console.log('params', params)
let xhr = new XMLHttpRequest;

xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true)
xhr.send(null)

xhr.addEventListener('readystatechange', function(event) {
  if (event.readystate === 4) {
    console.log(event.reponseText)
  }
}) 
 
access_token=8cce1be46cb2da63489f38015f5ab47ae525d7c3&expires_in=28800&refresh_token=r1.dd118ca0c3319beb6f75cd8b2e4e9a8a3bf0aeb1c46b8c602c0cc026a684c2394bede7179e2c5553&refresh_token_expires_in=15897600&scope=&token_type=bearer

{
  let xhr = new XMLHttpRequest;
  xhr.open("GET", `https://api.github.com/user`, true)
  xhr.setRequestHeader("Authorization", "token 8cce1be46cb2da63489f38015f5ab47ae525d7c3")
  xhr.send(null)
  xhr.addEventListener('readystatechange', function(event) {
    if (event.readystate === 4) {
      console.log(event.reponseText)
    }
  })
}