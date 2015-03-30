import classSet from 'react/lib/cx';
var { PropTypes } = React;

let EditorTypeSwitcherItem = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onClick: PropTypes.func
  },

  componentDidMount() {
    $(this.getDOMNode()).tooltip();
  },

  componentWillUnmount() {
    $(this.getDOMNode()).tooltip('destroy');
  },

  render() {
    var itemClasses = classSet({
      'button': true,
      'button--circle': true,
      'state--disable': this.props.loading,
      'state--active' : this.props.active
    });

    return (
      <button title={this.props.title}
              className={itemClasses}
              onClick={this.handleClick}>
        <i className={`icon ${this.props.icon}`} />
      </button>
    )
  },

  handleClick() {
    if (!(this.props.loading && this.props.active)) {
      if (this.props.onClick && typeof this.props.onClick === 'function') {
        this.props.onClick();
      }      
    }
  }
});

export default EditorTypeSwitcherItem;