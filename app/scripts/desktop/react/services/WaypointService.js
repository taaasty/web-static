/*global $ */

function WaypointService (selector, { cb, context=window }={}) {
  function trigger(data) {
    if (typeof cb === 'function') {
      cb(data);
    }
  }
  
  function attach() {
    $(selector).waypoint(function (dir) {
      const previous = this.previous();
      const $element = this.adapter.$element;

      if (dir === 'up' && previous) {
        const scrollTop = $(document).scrollTop();
        const $previous = previous.adapter.$element;
        const previousTop = $previous.offset().top;
        const previousBottom = previousTop + $previous.outerHeight(true);

        if (previousBottom >= scrollTop && scrollTop >= previousTop) {
          trigger({
            id: $previous.data('id'),
            time: $previous.data('time'),
          });
        }
      } else {
        trigger({
          id: $element.data('id'),
          time: $element.data('time'),
        });
      }
    }, { context });
    $(document).on('domChanged', refresh);
  }

  function detach() {
    const waypointContext = window.Waypoint.Context.findByElement(context);
    waypointContext.destroy();
    $(document).off('domChanged', refresh);
  }

  function refresh() {
    detach();
    attach();
  }

  attach();
  
  return ({
    attach,
    detach,
    refresh,
  });
}

export default WaypointService;
