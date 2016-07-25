/*global $ */
import React, { Component, PropTypes } from 'react';

class DesignSettingsRange extends Component {
  state = { value: this.props.value };
  componentDidMount() {
    const { from, to, step, value } = this.props;

    $(this.refs.range).slider({
      min: from,
      max: to,
      step: step,
      range: 'min',
      value: value,
      animate: true,
      slide: this.handleSlide.bind(this),
    });
  }
  componentWillUnmount() {
    $(this.refs.range).slider('destroy');
  }
  handleSlide(ev, ui) {
    this.setState({ value: ui.value });
    this.props.onChange(ui.value);
  }
  render() {
    return (
      <span>
        <span className="form-range ds-absolute-left ds-fadein-down" ref="range">
          <input className="form-range__input" type="text" />
        </span>
        <span className="form-range-value">
          {(this.state.value * 100).toFixed() + '%'}
        </span>
      </span>
    );
  }
}

DesignSettingsRange.propTypes = {
  from: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  to: PropTypes.number,
  value: PropTypes.number.isRequired,
};

DesignSettingsRange.defaultProps = {
  from: 0,
  to: 1,
  step: 0.01,
};

export default DesignSettingsRange;
