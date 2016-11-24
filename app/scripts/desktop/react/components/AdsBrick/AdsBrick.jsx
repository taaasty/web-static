import React, { Component, PropTypes } from 'react';

class AdsBrick extends Component {
  render() {
    const {
      content,
      height,
    } = this.props;

    return (
      <article className="brick">
        <div className="brick__body--ads">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={height ? { height: `${height}px` } : {}}
          />
        </div>
      </article>
    );
  }
}

AdsBrick.propTypes = {
  content: PropTypes.string.isRequired,
  height: PropTypes.number,
};

AdsBrick.defaultProps = {

};

export default AdsBrick;
