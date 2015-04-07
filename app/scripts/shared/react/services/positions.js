import assign from 'react/lib/Object.assign';

let MOVE_OFFSET = 100,
    MIN_OFFSET = 50,
    STORAGE_PREFIX = 'positions:';

let PositionsService = {
  storage: window.localStorage,

  savePosition(key, position) {
    this.storage.setItem(this._positionKey(key), JSON.stringify(position));
  },

  restorePosition(key) {
    return JSON.parse(this.storage.getItem(this._positionKey(key)));
  },

  smartPosition(position) {
    let newPosition = assign({}, position),
        windowWidth = $(window).width(),
        windowHeight = $(window).height();

    if (newPosition.top > windowHeight - MIN_OFFSET) {
      newPosition.top = windowHeight - MOVE_OFFSET;
    }

    if (newPosition.top < 0) {
      newPosition.top = 0;
    }
    
    if (newPosition.left > windowWidth - MIN_OFFSET) {
      newPosition.left = windowWidth - MOVE_OFFSET;
    }

    if (newPosition.left < 0) {
      newPosition.left = 0;
    }

    return newPosition;
  },

  _positionKey(key) {
    return STORAGE_PREFIX + ':' + key;
  }
};

export default PositionsService;