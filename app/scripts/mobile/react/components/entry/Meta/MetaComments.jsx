let EntryMetaComments = React.createClass({
  propTypes: {
    commentsCount: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="meta-comments" onClick={this.handleClick}>
        {this.props.commentsCount}
      </div>
    );
  },

  handleClick() {
    this.props.onClick();
  }
});

export default EntryMetaComments;