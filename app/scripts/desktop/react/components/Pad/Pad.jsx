const OFFSET_TOP = 10,
      OFFSET_BOTTOM = 10;

let Pad = React.createClass({
  propTypes: {
    placement: React.PropTypes.string.isRequired,
    actSelector: React.PropTypes.string.isRequired
  },

  componentDidMount() {
    $(document).on('DOMMouseScroll mousewheel', this.calculatePositions);
    $(window).on('resize', this.calculatePositions);
    this.calculatePositions();
  },

  componentWillUnmount() {
    $(document).off('DOMMouseScroll mousewheel', this.calculatePositions);
    $(window).off('resize', this.calculatePositions);
  },

  render() {
    let children = React.Children.map(this.props.children, ((child) =>
      React.cloneElement(child, {onUpdate: this.calculatePositions})
    ));

    return (
      <div className="popup popup--notifications popup--dark front-layer">
        <div ref="arrow"
             className={`popup__arrow popup__arrow--${this.props.placement}`} />
        <div className="popup__content">
          <div className="popup__body">
            {children}
          </div>
        </div>
      </div>
    );
  },

  calculatePositions() {
    // TODO: Придумать альтернативный вариант позиционирования
    let actNode = document.querySelector(this.props.actSelector),
        padNode = this.getDOMNode(),
        arrowNode = this.refs.arrow.getDOMNode(),
        actRect = actNode.getBoundingClientRect(),
        padRect = padNode.getBoundingClientRect(),
        arrowRect = arrowNode.getBoundingClientRect(),
        viewHeight = getViewportWH().height;

    let padTop = parseInt(actRect.top + (actRect.height / 2) - padRect.height / 2);
    if (padTop < OFFSET_TOP) padTop = OFFSET_TOP;

    let arrowTop = parseInt((actRect.top - padTop + actRect.height / 2) - arrowRect.height / 2);

    if (arrowTop > OFFSET_TOP) {
      arrowNode.style.top = arrowTop + 'px';
      arrowNode.style.opacity = 1;
    } else {
      arrowNode.style.opacity = 0;
    }
    padNode.style.top = padTop + 'px';
  }
});

function getViewportWH() {
  let w = window,
      d = document,
      e = d.documentElement,
      g = document.body,
      x = w.innerWidth  || e.clientWidth  || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;

  return {
    height: y,
    width: x
  };
}

export default Pad;