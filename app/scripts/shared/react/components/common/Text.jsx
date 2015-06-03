import StringHelpers from '../../../helpers/string';

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
    let value = StringHelpers.cleanWordPaste(this.props.value);

    if (this.props.withHTML) {
      return <span dangerouslySetInnerHTML={{__html: value}} />;
    } else {
      return <span>{value}</span>;
    }
  }
});

export default Text;