import React, { PropTypes } from 'react';
import Spinner from './Spinner';

const FitSpinner = ({ size }) => {
  function fitSize(size) {
    const knownSizes = [8, 14, 24, 30, 70];
    const lesserSizes = knownSizes.filter((s) => s <= (size - 4)); // -4px for padding

    return lesserSizes[lesserSizes.length - 1];
  }

  return <Spinner size={fitSize(size)} />;
}

FitSpinner.propTypes = {
  size: PropTypes.number,
}

export default FitSpinner;
