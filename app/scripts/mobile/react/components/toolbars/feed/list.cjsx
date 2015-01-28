ToolbarItem = require '../_item'
{ PropTypes } = React

FRIENDS_ITEM   = -> t 'feed_friends'
LIVE_ITEM      = -> t 'feed_live'
ANONYMOUS_ITEM = -> t 'feed_anonymous'
BEST_ITEM      = -> t 'feed_best'
PEOPLE_ITEM    = -> t 'feed_people'

FeedToolbarList = React.createClass
  displayName: 'FeedToolbarList'

  propTypes:
    user: PropTypes.object

  render: ->
    if @props.user?
      friends = <ToolbarItem
                    title={ PEOPLE_ITEM() }
                    href={ Routes.friends_feed_path() }
                    icon="icon--friends"
                    key="friends" />

    return <ul className="toolbar__popup-list">
             { friends }
             <ToolbarItem
                 title={ LIVE_ITEM() }
                 href={ Routes.live_feed_path() }
                 icon="icon--wave"
                 key="live" />
             <ToolbarItem
                 title={ BEST_ITEM() }
                 href={ Routes.best_feed_path() }
                 icon="icon--fire"
                 key="best" />
             <ToolbarItem
                 title={ ANONYMOUS_ITEM() }
                 href={ Routes.anonymous_feed_path() }
                 icon="icon--anonymous"
                 key="anonymous" />
             <ToolbarItem
                 title={ BEST_ITEM() }
                 href={ Routes.people_path() }
                 icon="icon--friends"
                 key="people" />
           </ul>

module.exports = FeedToolbarList