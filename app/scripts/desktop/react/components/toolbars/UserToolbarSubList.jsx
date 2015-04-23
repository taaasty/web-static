let UserToolbarSubList = React.createClass({
  propTypes: {
    opened: React.PropTypes.bool
  },

  componentDidUpdate(prevProps) {
    let $subNav = $(this.getDOMNode());

    if (prevProps.opened !== this.props.opened) {
      if (this.props.opened) {
        $subNav.stop().slideDown(300);
      } else {
        $subNav.stop().slideUp(300);
      }
    }
  },

  render() {
    return (
      <ul className="toolbar__subnav">
        {this.props.children}
      </ul>
    );
  }
});

export default UserToolbarSubList;