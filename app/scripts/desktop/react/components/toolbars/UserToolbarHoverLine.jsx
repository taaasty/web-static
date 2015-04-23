let UserToolbarHoverLine = React.createClass({
  propTypes: {
    onMouseEnter: React.PropTypes.func.isRequired
  },

  render() {
    return <div className="toolbar__hover-line" onMouseEnter={this.props.onMouseEnter} />
  }
});

export default UserToolbarHoverLine;