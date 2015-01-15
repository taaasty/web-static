#TODO: i18n
FOLLOWINGS = 'Вы подписаны'
FOLLOWERS  = 'Подписчики'
REQUESTED  = 'Заявки'
GUESSED    = 'Рекомендации'
IGNORED    = 'Заблокированы'
VKONTAKTE  = 'Вконтакте'
FACEBOOK   = 'Facebook'

window.PersonsPopup_Menu = React.createClass
  displayName: 'PersonsPopup_Menu'
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
      requestedMenuItem = <PersonsPopup_MenuItem
                              isActive={ @props.currentTab == 'requested' }
                              totalCount={ @state.requestedTotalCount }
                              title={ REQUESTED }
                              onClick={ @props.onSelect.bind(null, 'requested') } />

    return <nav className="tabs-nav tabs-nav--white">
             <ul className="tabs-nav__list">
               <PersonsPopup_MenuItem 
                   isActive={ @props.currentTab == 'followings' }
                   totalCount={ @state.followingsTotalCount }
                   title={ FOLLOWINGS }
                   onClick={ @props.onSelect.bind(null, 'followings') } />

               <PersonsPopup_MenuItem
                   isActive={ @props.currentTab == 'followers' }
                   totalCount={ @state.followersTotalCount }
                   title={ FOLLOWERS }
                   onClick={ @props.onSelect.bind(null, 'followers') } />

               { requestedMenuItem }

               <PersonsPopup_MenuItem
                   isActive={ @props.currentTab == 'ignored' }
                   totalCount={ @state.ignoredTotalCount }
                   title={ IGNORED }
                   onClick={ @props.onSelect.bind(null, 'ignored') } />

               <PersonsPopup_MenuItem
                   isActive={ @props.currentTab == 'vkontakte' }
                   title={ VKONTAKTE }
                   onClick={ @props.onSelect.bind(null, 'vkontakte') } />

               <PersonsPopup_MenuItem
                   isActive={ @props.currentTab == 'facebook' }
                   title={ FACEBOOK }
                   onClick={ @props.onSelect.bind(null, 'facebook') } />
             </ul>
           </nav>

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
    requestedTotalCount:  RelationshipsStore.getRequestedTotalCount()

  onStoreChange: ->
    @setState @getStateFromStore()