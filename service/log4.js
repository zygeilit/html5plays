
var log4js = require('log4js')

log4js.configure({
  'appenders': {
    'access': {
      'type': 'file',
      'filename': '.logs/access.log',
      'pattern': '-yyyy-MM-dd.log',
      'maxLogSize': 102400
    },
    'service-invocation-chain': {
      'type': 'file',
      'filename': '.logs/service-invocation-chain.log',
      'pattern': '-yyyy-MM-dd.log',
      'maxLogSize': 102400
    },
    'http': {
      'type': 'file',
      'filename': '.logs/http.log',
      'pattern': '-yyyy-MM-dd.log',
      'maxLogSize': 204800
    }
  },
  'categories': {
    'default': {
      'appenders': ['access'],
      'level': 'info'
    },
    'trace': {
      'appenders': ['service-invocation-chain', 'http'],
      'level': 'trace'
    }
  }
})

module.exports = {
  log4js
}
