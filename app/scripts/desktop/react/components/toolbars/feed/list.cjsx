ToolbarItem = require '../_item'
{ PropTypes } = React

FeedToolbarList = React.createClass

  propTypes:
    friendsUrl:   PropTypes.string
    liveUrl:      PropTypes.string.isRequired
    bestUrl:      PropTypes.string.isRequired
    anonymousUrl: PropTypes.string.isRequired

  render: ->
    if @props.friendsUrl
      friends = <ToolbarItem
                    title={ i18n.t('feed_friends') }
                    href={ this.props.friendsUrl }
                    icon="icon--friends"
                    key="friends" />

    return <ul className="toolbar__popup-list">
             { friends }
             <ToolbarItem
                 title={ i18n.t('feed_live') }
                 href={ this.props.liveUrl }
                 icon="icon--wave"
                 key="live" />
             <ToolbarItem
                 title={ i18n.t('feed_best') }
                 href={ this.props.bestUrl }
                 icon="icon--fire"
                 key="best" />
             <ToolbarItem
                 title={ i18n.t('feed_anonymous') }
                 href={ this.props.anonymousUrl }
                 icon="icon--anonymous"
                 key="anonymous" />
             <ToolbarItem
                 title={ i18n.t('feed_people') }
                 href={ Routes.people_path() }
                 icon="icon--friends"
                 key="people" />
           </ul>

module.exports = FeedToolbarList