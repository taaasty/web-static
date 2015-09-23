import React, { findDOMNode, PropTypes } from 'react';
import BrowserHelpers from '../../../../../../shared/helpers/browser';

class ThreadFormMediaPreviewImage {
  componentDidMount() {
    this.image = new Image();
    this.image.onload = () => {
      const container = findDOMNode(this.refs.container);
      if (container instanceof HTMLElement) {
        container.appendChild(this.image);
      }
    };
    this.imageSrc = BrowserHelpers.createObjectURL(this.props.image);
    this.image.src = this.imageSrc;
  }
  componentWillUnmount() {
    BrowserHelpers.revokeObjectURL(this.imageSrc);
  }
  render() {
    return (<div ref="container" />);
  }
}

ThreadFormMediaPreviewImage.propTypes = {
  image: PropTypes.object.isRequired,
}

export default ThreadFormMediaPreviewImage;
