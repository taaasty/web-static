let EditorFlowButton = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <button className="button button--outline-grey post-flows-button">
        {this.props.title}
      </button>
    );
  }
});

export default EditorFlowButton;