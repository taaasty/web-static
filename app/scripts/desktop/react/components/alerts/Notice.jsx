/*global $ */
import React, { Component, PropTypes } from 'react';
import Timer from '../../entities/Timer';

class Notice extends Component {
  componentDidMount() {
    this.calculateStyles();
    this.timer = new Timer(this.close.bind(this), this.props.timeout);
  }
  componentWillUnmount() {
    this.pause();
  }
  calculateStyles() {
    const node = this.refs.container;
    node.style.marginLeft = `${node.offsetWidth / -2}px`;
  }
  close() {
    let $node = $(this.refs.container);
    $node.fadeOut('fast', this.props.onClose);
  }
  pause() {
    this.timer.pause();
  }
  resume() {
    this.timer.resume();
  }
  render() {
    const { text, type } = this.props;
    return (
      <div
        className={`notice notice--${type}`}
        onClick={this.close.bind(this)}
        onMouseEnter={this.pause.bind(this)}
        onMouseLeave={this.resume.bind(this)}
        ref="container"
      >
        <div className="notice__inner">
          {text}
        </div>
      </div>
    );
  }
}

Notice.propTypes = {
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notice;
