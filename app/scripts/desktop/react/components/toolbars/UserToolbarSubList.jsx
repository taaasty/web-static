let UserToolbarSubList = React.createClass({
  propTypes: {
    opened: React.PropTypes.bool
  },

  shouldComponentUpdate(nextProps) {
    return this.opened !== nextProps.opened ? true : false;
  },

  componentDidUpdate(prevProps) {
    let $subNav = $(this.refs.container);
    // Mousewheel events for Pads arrows recalculation
    if (this.props.opened) {
      $subNav.stop().slideDown(300, function() {
        $(document).trigger('mousewheel');
      });
    } else {
      $subNav.stop().slideUp(300, function() {
        $(document).trigger('mousewheel');
      });
    }
  },

  render() {
    return (
      <ul className="toolbar__subnav" ref="container">
        {this.props.children}
      </ul>
    );
  }
});

export default UserToolbarSubList;
