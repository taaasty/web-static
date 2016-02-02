/*global i18n */
import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import UserToolbarListItem from './UserToolbarListItem';

class UserToolbarGuestList {
  render() {
    return (
      <ul className="toolbar__nav">
        <UserToolbarListItem
          icon="icon--hash"
          label="new"
          labelClassName="toolbar__label--new"
          title={i18n.t('toolbar_flows_item')}
          url={Routes.flows()}
        />
        <UserToolbarListItem
          badgeClassName="messages-badge"
          badgeCount={this.props.unreadLiveCount}
          icon="icon--wave"
          title={i18n.t('feed_live')}
          url={Routes.live_feed_path()}
        />
        <UserToolbarListItem
          badgeClassName="messages-badge"
          badgeCount={this.props.unreadBestCount}
          icon="icon--fire"
          title={i18n.t('feed_best')}
          url={Routes.best_feed_path()}
        />
        <UserToolbarListItem
          icon="icon--people"
          title={i18n.t('feed_people')}
          url={Routes.people_path()}
        />
        <UserToolbarListItem
          icon="icon--anonymous"
          title={i18n.t('feed_anonymous')}
          url={Routes.anonymous_feed_path()}
        />
      </ul>
    );
  }
}

UserToolbarGuestList.propTypes = {
  unreadBestCount: PropTypes.number.isRequired,
  unreadLiveCount: PropTypes.number.isRequired,
};

export default UserToolbarGuestList;
