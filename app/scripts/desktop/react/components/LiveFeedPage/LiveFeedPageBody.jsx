import React, { Component, PropTypes } from 'react';
import BaseFeedPageBody from '../common/BaseFeedPageBody';
import LiveLoadButtonContainer from './LiveLoadButtonContainer';

class LiveFeedPageBody extends Component {
  render() {
    const { entries_info: { limit }, locale } = this.props;

    return (
      <BaseFeedPageBody {...this.props}>
        <LiveLoadButtonContainer limit={limit} locale={locale} />
      </BaseFeedPageBody>
    );
  }
}

LiveFeedPageBody.propTypes = {
  entries_info: PropTypes.object,
  locale: PropTypes.string,
};

LiveFeedPageBody.defaultProps = {
  entries_info: {},
};

export default LiveFeedPageBody;
