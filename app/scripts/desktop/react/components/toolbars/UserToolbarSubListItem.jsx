let UserToolbarSubListItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  componentDidMount() {
    $(this.getDOMNode()).tooltip({
      title: this.props.title,
      placement: 'right',
      container: '.toolbar--main'
    });
  },

  componentWillUnmount() {
    $(this.getDOMNode()).tooltip('destroy');
  },

  render() {
    return (
      <li className="toolbar__subnav-item">
        <a href={this.props.url} className="toolbar__subnav-link">
          <i className={`icon ${this.props.icon}`} />
          <span className="toolbar__subnav-text">
            {this.props.title}
          </span>
        </a>
      </li>
    );
  }
});

export default UserToolbarSubListItem;