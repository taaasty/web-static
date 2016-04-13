ToolbarItem = require '../_item'
{ PropTypes } = React

FeedToolbarList = React.createClass
  displayName: 'FeedToolbarList'

  propTypes:
    user: PropTypes.object

  render: ->
    return (
      <ul className="toolbar__popup-list">
        { this.props.user != null &&
          <ToolbarItem
            title={ i18n.t('feed.friends') }
            href={ Routes.friends_feed_path() }
            icon="icon--friends"
            key="friends"
          />
        }
        <ToolbarItem
          title={i18n.t('feed.flows')}
          href={Routes.flows_path()}
          icon="icon--hash"
          key="flows"
        />
        <ToolbarItem
          title={ i18n.t('feed.live') }
          href={ Routes.live_feed_path() }
          icon="icon--wave"
          key="live"
        />
        <ToolbarItem
          title={ i18n.t('feed.best') }
          href={ Routes.best_feed_path() }
          icon="icon--fire"
          key="best"
        />
        <ToolbarItem
          title={ i18n.t('feed.people') }
          href={ Routes.people_path() }
          icon="icon--people"
          key="people"
        />
        <ToolbarItem
          title={ i18n.t('feed.anonymous') }
          href={ Routes.live_anonymous_feed_path() }
          icon="icon--anonymous"
          key="anonymous"
        />
      </ul>
    );

module.exports = FeedToolbarList
