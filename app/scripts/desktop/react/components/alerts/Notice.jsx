import Timer from '../../entities/Timer';

let Notice = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    timeout: React.PropTypes.number.isRequired,
    onClose: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.calculateStyles();
    this.timer = new Timer(this.close, this.props.timeout);
  },

  componentWillUnmount() {
    this.pause();
  },

  render() {
    return (
      <div className={`notice notice--${this.props.type}`}
           onClick={this.close}
           onMouseEnter={this.pause}
           onMouseLeave={this.resume}>
        <div className="notice__inner">
          {this.props.text}
        </div>
      </div>
    );
  },

  calculateStyles() {
    let node = this.getDOMNode();
    node.style.marginLeft = `${node.offsetWidth / -2}px`;
  },

  close() {
    let $node = $(this.getDOMNode());
    $node.fadeOut('fast', this.props.onClose);
  },

  pause() {
    this.timer.pause();
  },

  resume() {
    this.timer.resume();
  }
});

export default Notice;