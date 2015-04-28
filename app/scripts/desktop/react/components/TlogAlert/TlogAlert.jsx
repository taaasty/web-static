let TlogAlert = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="alert">
        <div className="alert__text">
          {this.props.text}
        </div>
      </div>
    );
  }
});

export default TlogAlert;