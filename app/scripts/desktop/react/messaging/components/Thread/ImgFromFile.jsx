import React, { Component, PropTypes } from 'react';
import { createObjectURL, revokeObjectURL } from '../../../../../shared/helpers/browser';

class ImgFromFile extends Component {
  componentDidMount() {
    this.image = new Image();
    this.image.onload = (ev) => {
      const container = this.refs.container;
      if (container instanceof HTMLElement) {
        this.image.style.width = `${ev.target.width}px`;
        this.image.style.height = `${ev.target.height}px`;
        container.appendChild(this.image);
      }
    };
    this.imageSrc = createObjectURL(this.props.file);
    this.image.src = this.imageSrc;
  }
  componentWillUnmount() {
    revokeObjectURL(this.imageSrc);
  }
  render() {
    return <div ref="container" />;
  }
}

ImgFromFile.propTypes = {
  file: PropTypes.object.isRequired,
};

export default ImgFromFile;
