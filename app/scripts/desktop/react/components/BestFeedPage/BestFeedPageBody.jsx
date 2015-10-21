import React, { Component, PropTypes } from 'react';
import BaseFeedPageBody from '../common/BaseFeedPageBody';
import BestLoadButtonContainer from './BestLoadButtonContainer';

class BestFeedPageBody extends Component {
  render() {
    const { entries_info: { limit }, locale } = this.props;

    return (
      <BaseFeedPageBody {...this.props}>
        <BestLoadButtonContainer limit={limit} locale={locale} />
      </BaseFeedPageBody>
    );
  }
}

BestFeedPageBody.propTypes = {
  entries_info: PropTypes.object,
  locale: PropTypes.string,
};

BestFeedPageBody.defaultProps = {
  entries_info: {},
};

export default BestFeedPageBody;
