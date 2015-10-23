import React, { Component, PropTypes } from 'react';
import BaseFeedPageBody from '../common/BaseFeedPageBody';
import FriendsLoadButtonContainer from './FriendsLoadButtonContainer';

class FriendsFeedPageBody extends Component {
  render() {
    const { entries_info: { limit }, locale } = this.props;

    return (
      <BaseFeedPageBody {...this.props}>
        <FriendsLoadButtonContainer limit={limit} locale={locale} />
      </BaseFeedPageBody>
    );
  }
}

FriendsFeedPageBody.propTypes = {
  entries_info: PropTypes.object,
  locale: PropTypes.string,
};

FriendsFeedPageBody.defaultProps = {
  entries_info: {},
};

export default FriendsFeedPageBody;
