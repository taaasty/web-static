/*global AppStorage */
const TOP_OFFSET = 56;

const MOVE_OFFSET = 100;
const MIN_OFFSET = 50;
const STORAGE_PREFIX = 'positions:';

const PositionsService = {
  storage: AppStorage,

  savePosition(key, position) {
    this.storage.setItem(this._positionKey(key), JSON.stringify(position));
  },

  restorePosition(key) {
    return JSON.parse(this.storage.getItem(this._positionKey(key)));
  },

  smartPosition(position) {
    const newPosition = Object.assign({}, position);
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    if (newPosition.top > windowHeight - MIN_OFFSET) {
      newPosition.top = windowHeight - MOVE_OFFSET;
    }

    if (newPosition.top < TOP_OFFSET) {
      newPosition.top = TOP_OFFSET;
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
    return `${STORAGE_PREFIX}:${key}`;
  },
};

export default PositionsService;
