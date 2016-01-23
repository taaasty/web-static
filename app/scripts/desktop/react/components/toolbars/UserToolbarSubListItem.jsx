let UserToolbarSubListItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  componentDidMount() {
    $(this.refs.link).tooltip({
      title: this.props.title,
      placement: 'right',
      container: '.toolbar--main'
    });
  },

  componentWillUnmount() {
    $(this.refs.link).tooltip('destroy');
  },

  render() {
    return (
      <li className="toolbar__subnav-item">
        <a ref="link"
           className="toolbar__subnav-link"
           onTouchTap={this.handleClick}>
          <i className={`icon ${this.props.icon}`} />
          <span className="toolbar__subnav-text">
            {this.props.title}
          </span>
        </a>
      </li>
    );
  },

  handleClick() {
    // When we tap on iOS, at first time triggers hover event, and only after
    // second tap we finally make the click. In this case we listen tap event,
    // and force execution underlying event at the moment
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    } else if (!this.props.children) {
      // Unless list item has children, make redirect, otherwise allow trigger hover
      // event, which open subnav list
      window.location = this.props.url;
    }
  }
});

export default UserToolbarSubListItem;
