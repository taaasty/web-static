import React, { PropTypes } from 'react';

function Text({ value, withHTML }) {
  return withHTML
    ? <span dangerouslySetInnerHTML={{__html: value}} />
    : <span>{value}</span>;
}

Text.propTypes = {
  value: PropTypes.string.isRequired,
  withHTML: PropTypes.bool,
};

Text.defaultProps = {
  withHTML: false,
};

export default Text;
