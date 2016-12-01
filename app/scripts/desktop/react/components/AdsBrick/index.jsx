import React, { Component, PropTypes } from 'react';
import AdsBrick from './AdsBrick';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import {
  decomposeAdsId,
} from '../../actions/AdsActions';

class AdsBrickContainer extends Component {
  render() {
    const {
      ad,
    } = this.props;

    const content = ad.get('content', '');
    const height = ad.get('height');

    return (
      <AdsBrick
        content={content}
        height={height}
      />
    );
  }
}

AdsBrickContainer.propTypes = {
  ad: PropTypes.object.isRequired,
  adsId: PropTypes.string.isRequired,
};

AdsBrickContainer.defaultProps = {

};

export default connect(
  (state, { adsId }) => ({
    ad: state.entities.getIn(['ads', String(decomposeAdsId(adsId))], Map()),
  })
)(AdsBrickContainer);
