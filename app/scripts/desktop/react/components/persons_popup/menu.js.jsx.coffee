###* @jsx React.DOM ###

#TODO: Вынести состояния в константы, а тексты в i18n
FOLLOWINGS = 'Вы подписаны'
FOLLOWERS  = 'Подписчики'
REQUESTED  = 'Заявки'
GUESSED    = 'Рекомендации'
IGNORED    = 'Заблокированы'

window.PersonsPopup_Menu = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    user:       React.PropTypes.object.isRequired
    currentTab: React.PropTypes.string.isRequired
    onSelect:   React.PropTypes.func.isRequired

  getInitialState: ->
    @getStateFromStore()

  componentWillMount: ->
    @loadSummary() unless @isSummaryLoaded()

  componentDidMount: ->
    RelationshipsStore.addSummaryChangeListener @onStoreChange

  componentWillUnmount: ->
    RelationshipsStore.removeSummaryChangeListener @onStoreChange

  render: ->
    if @isProfilePrivate()
      requestedMenuItem = `<PersonsPopup_MenuItem
                              isActive={ this.props.currentTab == 'requested' }
                              totalCount={ this.state.requestedTotalCount }
                              title={ REQUESTED }
                              onClick={ this.props.onSelect.bind(null, 'requested') } />`

    return `<nav className="tabs-nav tabs-nav--white">
              <ul className="tabs-nav__list">
                <PersonsPopup_MenuItem 
                    isActive={ this.props.currentTab == "followings" }
                    totalCount={ this.state.followingsTotalCount }
                    title={ FOLLOWINGS }
                    onClick={ this.props.onSelect.bind(null, 'followings') } />

                <PersonsPopup_MenuItem
                    isActive={ this.props.currentTab == "followers" }
                    totalCount={ this.state.followersTotalCount }
                    title={ FOLLOWERS }
                    onClick={ this.props.onSelect.bind(null, 'followers') } />

                { requestedMenuItem }

                <PersonsPopup_MenuItem
                    isActive={ this.props.currentTab == "ignored" }
                    totalCount={ this.state.ignoredTotalCount }
                    title={ IGNORED }
                    onClick={ this.props.onSelect.bind(null, 'ignored') } />
              </ul>
            </nav>`

    # Temporarily exclude guesses tab
    # <PersonsPopup_MenuItem isActive={ this.props.currentTab == "guesses" }
    #                    totalCount={ this.state.guessesTotalCount }
    #                    title={ GUESSES }
    #                    onClick={ onSelect.bind(this, 'guesses') } />

  isProfilePrivate: -> @props.user.is_privacy is true
  isSummaryLoaded:  -> RelationshipsStore.isSummaryLoaded()

  loadSummary: ->
    @createRequest
      url: ApiRoutes.relationships_summary_url()
      success: (summary) ->
        RelationshipsDispatcher.handleServerAction {
          type: 'summaryLoaded'
          summary: summary
        }
      error: (data) ->
        TastyNotifyController.errorResponse data

  getStateFromStore: ->
    followersTotalCount:  RelationshipsStore.getFollowersTotalCount()
    followingsTotalCount: RelationshipsStore.getFollowingsTotalCount()
    guessedTotalCount:    RelationshipsStore.getGuessedTotalCount()
    ignoredTotalCount:    RelationshipsStore.getIgnoredTotalCount()
    requestedTotalCount:   RelationshipsStore.getRequestedTotalCount()

  onStoreChange: ->
    @setState @getStateFromStore()