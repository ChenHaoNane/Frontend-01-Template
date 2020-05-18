const http = require('http')

const server = http.createServer((req, res) => {
  console.log('req', req)
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(
`<html maaa=a >
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
body div img{
    width:30px;
    background-color: #ff1111;
}
div#roseonly.haha1.haha2 {
    font-size: 20px;
}

div#roseonly.haha1.haha2.haha3 {
    font-size: 30px;
}
div#roseonly.haha1.haha2.haha3 {
    font-size: 32px;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
        <div id="roseonly" class="haha1 haha2 haha3">haha</div>
    </div>
</body>
</html>`)
})

server.listen(8088)