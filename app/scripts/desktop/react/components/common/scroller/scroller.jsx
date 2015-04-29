let Scroller = React.createClass({
  propTypes: {
    customScroller: React.PropTypes.bool,
    className: React.PropTypes.string,
    onScroll: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      customScroller: true
    };
  },

  componentDidMount() {
    let scroller = this.getDOMNode();
    let scrollerPane = this.refs.scrollerPane.getDOMNode();

    $(scrollerPane).on('DOMMouseScroll mousewheel', this.handleMouseWheel);

    if (this.props.customScroller) {
      this.scroller = $(scroller).baron({
        scroller: '.scroller__pane',
        bar: '.scroller__bar',
        track: '.scroller__track',
        barOnCls: 'scroller--tracked',
        pause: 0
      });
    }
  },

  componentDidUpdate() {
    if (this.scroller) {
      this.scroller.update();
    }
  },

  componentWillUnmount() {
    let scrollerPane = this.refs.scrollerPane.getDOMNode();

    $(scrollerPane).off('DOMMouseScroll mousewheel', this.handleMouseWheel);

    if (this.scroller) {
      this.scroller.dispose();
      this.scroller = null;
    }
  },

  render() {
    let scrollerClasses = ['scroller', 'scroller--dark', this.props.className].join(' ');

    return (
      <div className={scrollerClasses} onScroll={this.handleScroll}>
        <div ref="scrollerPane" className="scroller__pane">
          {this.props.children}
        </div>
        <div className="scroller__track">
          <div className="scroller__bar" />
        </div>
      </div>
    );
  },

  handleMouseWheel(e) {
    let el = e.currentTarget,
        scrollTop = el.scrollTop,
        scrollHeight = el.scrollHeight,
        height = $(el).height(),
        delta = (e.type === 'DOMMouseScroll' ? e.originalEvent.detail * -40 : e.originalEvent.wheelDelta),
        up = delta > 0;

    function prevent() {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
      return false;
    }

    if (!up && -delta > scrollHeight - height - scrollTop) {
      $(el).scrollTop(scrollHeight);
      return prevent();
    } else if (up && delta > scrollTop) {
      $(el).scrollTop(0);
      return prevent();
    }
  },

  handleScroll(e) {
    if (this.props.onScroll) {
      this.props.onScroll(e);
    }
  }
});

export default Scroller;