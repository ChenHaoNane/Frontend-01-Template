const http = require('http')
const fs = require('fs')
const archiver = require('archiver')
const child_process = require('child_process')

let packname = 'package'
const options = {
  host: 'localhost',
  port: 8081,
  path: '/upload/?filename=' + 'package.zip',
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream',
  }
};
var archive = archiver('zip', {
  zlib: {level: 9}
})
archive.directory(packname, false)

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`)
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
});
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`)
})
archive.pipe(req)

archive.on('end', () => {
  req.end()
  child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.eea4ca882d79ee1b&redirect_uri=http%3A%2F%2Flocalhost%3A8081/auth&scope=read%3Auser&state=123abc`)
})
archive.finalize()