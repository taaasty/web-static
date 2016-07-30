import React, { Component, PropTypes } from 'react';

class DropZone extends Component {
  componentWillMount() {
    const { onDragLeave, onDragOver, onDrop } = this.props;

    this.handleDragLeave = (ev) => {
      ev.preventDefault()

      if (typeof onDragLeave === 'function') {
        onDragLeave.call(null);
      }
    };

    this.handleDragOver = (ev) => {
      ev.preventDefault();

      if (typeof onDragOver === 'function') {
        onDragOver.call(null);
      }
    }

    this.handleDrop = (ev) => {
      const files = ev.dataTransfer.files;
      ev.preventDefault();

      if (typeof onDrop === 'function') {
        onDrop.call(null, files);
      }
    }
  }
  componentDidMount() {
    if (this.props.global) {
      document.addEventListener('dragover', this.handleDragOver, false);
      document.addEventListener('dragleave', this.handleDragLeave, false);
      document.addEventListener('drop', this.handleDrop, false);
    }
  }
  componentWillUnmount() {
    if (this.props.global) {
      document.removeEventListener('dragover', this.handleDragOver, false);
      document.removeEventListener('dragleave', this.handleDragLeave, false);
      document.removeEventListener('drop', this.handleDrop, false);
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

DropZone.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  global: PropTypes.bool,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
};

DropZone.defaultProps= {
  global: false,
};

export default DropZone;
