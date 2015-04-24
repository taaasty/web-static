const TYPE = 'success',
      TIMEOUT = 3000;

let Notify = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    timeout: React.PropTypes.number,
    onClose: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      type: TYPE,
      timeout: TIMEOUT
    };
  },

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps);
  },

  componentDidMount() {
    let $node = $(this.getDOMNode());
    $node.css({
      marginLeft: -($node.width() / 2)
    });
    // this.timeout = setTimeout(this.close, this.props.timeout);
  },

  componentWillUnmount() {
    // if (this.timeout != null) {
    //   clearTimeout(this.timeout);
    // }
  },

  close() {
    let $node = $(this.getDOMNode());
    $node.fadeOut('fast', this.props.onClose);
  },

  render() {
    return (
      <div className={`notice notice--${this.props.type}`} onClick={this.close}>
        <div className="notice__inner">
          {this.props.text}
        </div>
      </div>
    );
  }
});

export default Notify;