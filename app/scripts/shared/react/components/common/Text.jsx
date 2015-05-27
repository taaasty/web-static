let Text = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    withHTML: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      withHTML: false
    };
  },

  render() {
    if (this.props.withHTML) {
      return <span dangerouslySetInnerHTML={{__html: this.props.value}} />;
    } else {
      return <span>{this.props.value}</span>;
    }
  }
});

export default Text;