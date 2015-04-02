let EditorLayout = React.createClass({
  propTypes: {
    loading: React.PropTypes.bool.isRequired,
    backUrl: React.PropTypes.string
  },

  render() {
    return (
      <div>
        {this.renderBackButton()}
        {this.props.children}
      </div>
    );
  },

  renderBackButton() {
    if (this.props.loading) { return; }
    return <a className="back-button" onClick={this.handleClick} />
  },

  handleClick() {
    this.props.backUrl ? location.href = this.props.backUrl : history.back()
  }
})

export default EditorLayout;