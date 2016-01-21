/*global EventEmitter */
const CHANGE_EVENT = 'change';

class BaseStore extends EventEmitter {
  emitChange() {
    return this.emit(CHANGE_EVENT);
  }
  addChangeListener(cb) {
    return this.on(CHANGE_EVENT, cb);
  }
  removeChangeListener(cb) {
    return this.off(CHANGE_EVENT, cb);
  }
}

export default BaseStore;
