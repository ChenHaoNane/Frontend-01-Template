const net = require('net')

class TrunkedBodyParser {
    constructor() {
      this.WAITING_LENGTH = 0
      this.WAITING_LENGTH_LINE_END = 1
      this.READING_TRUNK = 2
      this.WAITING_CONTENT_ENDR = 3
      this.WAITING_CONTENT_ENDN = 4

      this.isFinished = false
      this.length = 0
      this.content = []
      this.current = this.WAITING_LENGTH
    }

    receiveChar(char) {
      if (this.isFinished) return
      switch (this.current) {
        case this.WAITING_LENGTH: {
          if (char === '\r') {
            if (this.length === 0) {
              this.isFinished = true
            }
            this.current = this.WAITING_LENGTH_LINE_END
          } else {
            this.length *= 10
            this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
          }
          break
        }
        case this.WAITING_LENGTH_LINE_END: {
          if (char === '\n') {
            this.current = this.READING_TRUNK
          }
          break
        }
        case this.READING_TRUNK: {
          this.content.push(char)
          this.length--
          if (this.length === 0) {
            this.current = this.WAITING_CONTENT_ENDR
          }
          break
        }
        case this.WAITING_CONTENT_ENDR: {
          this.current = this.WAITING_CONTENT_ENDN
          break
        }
        case this.WAITING_CONTENT_ENDN: {
          this.current = this.WAITING_LENGTH
          break
        }
      }
    }
}

class ResponseParser {
  constructor() {
    this.WAITINGSTATUSLINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_ENDR = 5
    this.WAITING_HEADER_LINE_ENDN = 6
    this.WAITING_HEADER_BLOCK_END = 7
    this.WAITING_BODY = 8

    this.current = this.WAITINGSTATUSLINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = null
  }

  recevie(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i))
    }
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) (\w+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  receiveChar(char) {

    switch(this.current) {
      case this.WAITINGSTATUSLINE: {
        if (char === '\r') {
          this.current = this.WAITING_STATUS_LINE_END
        } else {
          this.statusLine += char
        }
        break
      }
      case this.WAITING_STATUS_LINE_END: {
        if (char === '\n') {
          this.current = this.WAITING_HEADER_NAME
        }
        break
      }
      case this.WAITING_HEADER_NAME: {
        if (char === ':') {
          this.current = this.WAITING_HEADER_SPACE
        } else {
          this.headerName += char
        }
        break
      }
      case this.WAITING_HEADER_SPACE: {
        if (char === ' ') {
          this.current = this.WAITING_HEADER_VALUE
        }
        break
      }
      case this.WAITING_HEADER_VALUE: {
        if (char === '\r') {
          this.current = this.WAITING_HEADER_LINE_ENDR
          this.headers[this.headerName] = this.headerValue
          this.headerName = ''
          this.headerValue = ''
        } else {
          this.headerValue += char
        }
        break
      }
      case this.WAITING_HEADER_LINE_ENDR: {
        if (char === '\n') {
          this.current = this.WAITING_HEADER_LINE_ENDN
        }
        break
      }
      case this.WAITING_HEADER_LINE_ENDN: {
        if (char === '\r') {
          this.current = this.WAITING_HEADER_BLOCK_END
        } else {
          this.current = this.WAITING_HEADER_NAME
          this.headerName += char
        }
        break
      }
      case this.WAITING_HEADER_BLOCK_END: {
        if (char === '\n') {
          this.current = this.WAITING_BODY
          if (this.headers['Transfer-Encoding'] === 'chunked') {
            this.bodyParser = new TrunkedBodyParser()
          }
        }
        break
      }
      case this.WAITING_BODY: {
        this.bodyParser.receiveChar(char)
        break
      }
    }
  }
}

class Request {
  // method, url = host + port + path
  // body: k/v
  // headers

  constructor(options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.port = options.port || 80
    this.path = options.path || '/'
    this.body = options.body || {}
    this.headers = options.headers || {}

    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map((key) => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }
    this.headers['Content-Length'] = this.bodyText.length

  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map((key) => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
  }

  send(connection) {
    const parser = new ResponseParser()
    return new Promise((resolve, reject) => {
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }
  
      connection.on('data', (data) => {
        parser.recevie(data.toString())
        if (parser.isFinished) {
          resolve(parser.response)
        }
        connection.end()
      })
  
      connection.on('error', (error) => {
        reject(err)
        connection.end()
      })
    })
  }

}

void async function() {
  let request = new Request({
    method: "POST",
    host: '127.0.0.1',
    port: 8088,
    path: '/',
    headers: {
      aaaa: 1
    },
    body: {
      name: 'haonan'
    }
  })
  let data = await request.send()
  console.log('data', data)
}()

class Response {
  
}

