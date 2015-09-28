import React, { createClass } from 'react';
import UserToolbarListItem from './UserToolbarListItem';

let UserToolbarGuestList = createClass({
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
          icon="icon--wave"
          title={i18n.t('feed_live')}
          url={Routes.live_feed_path()}
        />
        <UserToolbarListItem
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
  },
});

export default UserToolbarGuestList;
