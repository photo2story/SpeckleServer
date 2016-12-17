'use strict'
const winston = require('winston')
const chalk   = require('chalk')
const radioTower = require('./RadioTower')

module.exports = function ( ws ) {
  let parent = ws
  return { 
    'alive'() {
      winston.debug('received alive message from socket', parent.sessionId)
      parent.alive = true
      parent.missedPingsCount = 0
    },
    'join-stream'( args ) {
      // console.log(args)
      radioTower.join( args, parent )
    },
    'volatile-message' ( args ) {
      // console.log(args)
      winston.debug('received volatile message from socket', parent.sessionId)
      let message = { eventName: 'volatile-message', args: args }
      radioTower.broadcast( ws.room, message, ws.sessionId )
    }
  }
}