import React, { PropTypes } from 'react';

class TlogPagePrivate {
  render() {
    return (
      <div className="content-info">
        <div className="content-info__icon">
          <i className="icon icon--lock" />
        </div>
        <p className="content-info__text">
          {this.props.text}
        </p>
      </div>
    );
  }
}

TlogPagePrivate.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TlogPagePrivate;
