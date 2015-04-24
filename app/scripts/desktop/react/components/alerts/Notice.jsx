import Timer from '../../entities/Timer';

const TYPE = 'success',
      TIMEOUT = 3000;

let Notice = React.createClass({
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

  componentDidMount() {
    this.calculateStyles();
    this.timer = new Timer(this.close, this.props.timeout);
  },

  componentDidUpdate() {
    this.calculateStyles();
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
    node.style.marginLeft = `${(node.offsetWidth / 2) * -1}px`;
  },

  close() {
    let $node = $(this.getDOMNode());
    $node.fadeOut('fast', this.props.onClose);
  },

  pause() {
    if (this.timer != null) {
      this.timer.pause();
    }
  },

  resume() {
    if (this.timer != null) {
      this.timer.resume();
    }
  }
});

export default Notice;