class Timer {
  constructor(callback, delay) {
    let timerID, start, remaining = delay;

    this.pause = function() {
      window.clearTimeout(timerID);
      remaining -= new Date() - start;
    };

    this.resume = function() {
      start = new Date();
      window.clearTimeout(timerID);
      timerID = window.setTimeout(callback, remaining);
    };

    this.resume();
  }
}

export default Timer;