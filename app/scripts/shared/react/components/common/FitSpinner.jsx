import React, { PropTypes } from 'react';
import Spinner from './Spinner';

class FitSpinner {
  fitSize(size) {
    const knownSizes = [8, 14, 24, 30, 70];
    const lesserSizes = knownSizes.filter((s) => s <= (size - 4)); // -4px for padding

    return lesserSizes[lesserSizes.length - 1];
  }
  render() {
    return <Spinner size={this.fitSize(this.props.size)} />;
  }
}

FitSpinner.propTypes = {
  size: PropTypes.number,
}

export default FitSpinner;
