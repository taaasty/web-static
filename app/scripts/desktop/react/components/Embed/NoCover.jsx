/*global $ */
import React, { Component, PropTypes } from 'react';

class EmbedNoCover extends Component {
  componentDidMount() {
    const $container = $(this.refs.container);
    const $iframe = $container.find('iframe');

    $container.height($iframe.height());
  }
  render() {
    const {
      embedHtml,
      frameWidth: width,
      frameHeight: height,
    } = this.props;

    return (
      <figure
        className="video video-without-cover"
        dangerouslySetInnerHTML={{ __html: embedHtml || '' }}
        ref="container"
        style={{ width, height }}
      />
    );
  }
}

EmbedNoCover.propTypes = {
  embedHtml: PropTypes.string.isRequired,
  frameHeight: PropTypes.number.isRequired,
  frameWidth: PropTypes.number.isRequired,
};

export default EmbedNoCover;
