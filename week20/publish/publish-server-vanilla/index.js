const http = require('http')
const https = require('https')
const fs = require('fs')
const unzip = require('unzipper')

const server = http.createServer((req, res) => {
  console.log('req', req.url)
  if (req.url.match(/^\/auth/))
    return auth(req, res)
  else if (req.url.match(/^\/upload/))
    return upload(req, res)
  else {
    res.writeHead(200, { 'Content-Type': 'text/plain'})
    res.end('okay1')
  }
})

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1]
  let state = "123abc"
  let client_secret = "8d4387c43fcad48a777e43655db1aa7d2d91a7c1"
  let client_id = "Iv1.eea4ca882d79ee1b"
  let redirect_uri = encodeURIComponent("http://localhost:8081/auth")
   
  let params= `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`

  let options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  }
  const request = https.request(options, (response) => {
    response.on('data', (d) => {
      process.stdout.write(d.toString())
      console.log('d.toString()', d.toString())
      let result = d.toString().match(/access_token=([^&]+)/)
      if (result) {
        let token = result[1]
        console.log(token)
        res.writeHead(200,
          {
            'access_token': token,
            'Content-Type': 'text/plain',
          }
        )
        res.end('okay1')
      } else {
        res.writeHead(200,
          {
            'Content-Type': 'text/plain',
          }
        )
        res.end('error')
      }
    })
  })
  request.on('error', (e) => {
    console.error(e)
  })
  request.end();

  
}

function upload(req, res) {
  let writeStream = unzip.Extract({ path: '../publish-server/public'})
  req.on('data', trunk => {
    writeStream.write(trunk)
  })
  req.on('end', trunk => {
    writeStream.end(trunk)
  })
}

server.listen(8081)