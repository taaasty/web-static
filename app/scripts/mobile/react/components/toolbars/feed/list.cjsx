ToolbarItem = require '../_item'
{ PropTypes } = React

FeedToolbarList = React.createClass
  displayName: 'FeedToolbarList'

  propTypes:
    user: PropTypes.object

  render: ->
    if @props.user?
      friends = <ToolbarItem
                    title={ i18n.t('feed_friends') }
                    href={ Routes.friends_feed_path() }
                    icon="icon--friends"
                    key="friends" />

    return <ul className="toolbar__popup-list">
             { friends }
             <ToolbarItem
                 title={ i18n.t('feed_live') }
                 href={ Routes.live_feed_path() }
                 icon="icon--wave"
                 key="live" />
             <ToolbarItem
                 title={ i18n.t('feed_best') }
                 href={ Routes.best_feed_path() }
                 icon="icon--fire"
                 key="best" />
             <ToolbarItem
                 title={ i18n.t('feed_anonymous') }
                 href={ Routes.anonymous_feed_path() }
                 icon="icon--anonymous"
                 key="anonymous" />
             <ToolbarItem
                 title={ i18n.t('feed_people') }
                 href={ Routes.people_path() }
                 icon="icon--friends"
                 key="people" />
           </ul>

module.exports = FeedToolbarList