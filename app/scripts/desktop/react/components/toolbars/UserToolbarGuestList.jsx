import UserToolbarListItem from './UserToolbarListItem';

let UserToolbarGuestList = React.createClass({
  render() {
    return (
      <ul className="toolbar__nav">
        <UserToolbarListItem
            url={Routes.live_feed_path()}
            title={i18n.t('feed_live')}
            icon="icon--wave" />
        <UserToolbarListItem
            url={Routes.best_feed_path()}
            title={i18n.t('feed_best')}
            icon="icon--rating" />
        <UserToolbarListItem
            url={Routes.anonymous_feed_path()}
            title={i18n.t('feed_anonymous')}
            icon="icon--anonymous" />
      </ul>
    );
  }
});

export default UserToolbarGuestList;