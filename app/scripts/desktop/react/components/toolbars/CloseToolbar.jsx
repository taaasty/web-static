let CloseToolbar = React.createClass({
  mixins: [TouchMixin],

  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="toolbar toolbar--close" onClick={this.props.onClick}>
        <div className="toolbar__toggle">
          <i className="icon icon--cross" />
        </div>
      </div>
    );
  }
});

export default CloseToolbar;