function CustomWaypointService (selector, { cb, context=window}={}) {
  function trigger(data) {
    if (typeof cb === 'function') {
      cb(data);
    }
  }

  let bounds;
  let boundsIndex = [];
  let lastPageYOffset = -Infinity;

  function getBounds(selector, context) {
    const c = context === window ? document : context;
    const nodeList = c.querySelectorAll(selector);
    if (!nodeList.length) {
      return {};
    }

    const nodeArr = [].slice.call(nodeList);
    let prevEl = null;
    return nodeArr.reduce((acc, el) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.pageYOffset;
      if (acc[String(top)]) {
        return acc;
      } else {
        acc[String(top)] = el;
        el.previousWaypoint = prevEl;
        prevEl = el;
        return acc;
      }
    }, {});
  }

  function checkBounds(ev) {
    const pageYOffset = window.pageYOffset;
    let affIndexes = void 0;
    let el = void 0;

    if (pageYOffset > lastPageYOffset) { //direction down
      affIndexes = boundsIndex.filter((el) => ((lastPageYOffset <= el) && (el <= pageYOffset)));
      if (affIndexes.length) {
        el = bounds[String(affIndexes[affIndexes.length - 1])];
      }
    } else { //direction up
      affIndexes = boundsIndex.filter((el) => ((pageYOffset <= el) && (el <= lastPageYOffset)));
      if (affIndexes.length) {
        const t = bounds[String(affIndexes[0])];
        el = t.previousWaypoint;
      }
    }

    lastPageYOffset = pageYOffset;

    if (el) {
      trigger({
        id: el.getAttribute('data-id'),
        time: el.getAttribute('data-time'),
      });
    }
  }

  function calcData() {
    bounds = getBounds(selector, context);
    boundsIndex = Object.keys(bounds).map(Number).sort();
  }

  function attach() {
    calcData();
    context.addEventListener('scroll', checkBounds, false);
  }

  function detach() {
    context.removeEventListener('scroll', checkBounds, false);
  }

  function refresh() {
    calcData();
  }

  return ({
    attach,
    detach,
    refresh,
  });
}

export default CustomWaypointService;
