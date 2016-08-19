/*global $ */
import React, { Component, PropTypes } from 'react';

class EmbedWithCover extends Component {
  play() {
    const $embed = $(this.refs.embedContainer);
    const $container = $(this.refs.container);

    $embed.show().append(this.props.embedHtml);
    $embed.width('100%');
    $embed.height('100%');

    const $iframe = $embed.find('iframe');

    $iframe.attr({width: $embed.data('width') || $embed.width()});
    $iframe.attr({height: $embed.data('height') || $embed.height()});

    $embed.height($iframe.height());
    $container.height($iframe.height());
  }
  render() {
    const {
      coverImageUrl,
      frameWidth: width,
      frameHeight: height,
    } = this.props;
    const coverStyle = {backgroundImage: `url('${coverImageUrl}')`};

    return (
      <figure
        className="video"
        ref="container"
        style={{ width, height }}
      >
        <div className="video__cover" style={coverStyle}>
          <div className="video__overlay" onClick={this.play.bind(this)} />
          <div className="video__embed" ref="embedContainer" />
        </div>
      </figure>
    );
  }
}

EmbedWithCover.propTypes = {
  coverImageUrl: PropTypes.string.isRequired,
  embedHtml: PropTypes.string.isRequired,
  frameHeight: PropTypes.number.isRequired,
  frameWidth: PropTypes.number.isRequired,
};

export default EmbedWithCover;
