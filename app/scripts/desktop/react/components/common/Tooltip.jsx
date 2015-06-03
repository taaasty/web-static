let Tooltip = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    placement: React.PropTypes.string,
    container: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      placement: 'top',
      container: 'body'
    };
  },

  componentDidMount() {
    $(this.getDOMNode()).tooltip({
      placement: this.props.placement,
      container: this.props.container
    });
  },

  componentWillUnmount() {
    $(this.getDOMNode()).tooltip('destroy');
  },

  render() {
    return (
      <span title={this.props.title}>
        {this.props.children}
      </span>
    );
  }
});

export default Tooltip;