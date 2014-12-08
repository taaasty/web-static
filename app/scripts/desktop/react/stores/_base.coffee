CHANGE_EVENT = 'change'

class BaseStore extends EventEmitter

  emitChange:                 -> @emit CHANGE_EVENT
  addChangeListener:    (cb)  -> @on  CHANGE_EVENT, cb
  removeChangeListener: (cb)  -> @off CHANGE_EVENT, cb

module.exports = BaseStore