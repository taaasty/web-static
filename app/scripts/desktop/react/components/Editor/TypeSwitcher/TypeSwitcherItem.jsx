import classnames from 'classnames';

let EditorTypeSwitcherItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func
  },

  componentDidMount() {
    $(this.getDOMNode()).tooltip();
  },

  componentWillUnmount() {
    $(this.getDOMNode()).tooltip('destroy');
  },

  render() {
    let itemClasses = classnames('button', 'button--circle', {
      'state--disable': this.props.loading,
      'state--active' : this.props.active
    });

    return (
      <button
          title={this.props.title}
          className={itemClasses}
          onClick={this.handleClick}>
        <i className={`icon ${this.props.icon}`} />
      </button>
    );
  },

  handleClick() {
    if (this.props.active) { return; }
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }
});

export default EditorTypeSwitcherItem;