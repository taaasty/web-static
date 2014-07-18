###* @jsx React.DOM ###

PERSON_POPUP_TITLE = 'Управление подписками'

window.PersonsPopup = React.createClass
  mixins: [ReactUnmountMixin, ReactActivitiesMixin, RequesterMixin]

  getInitialState: ->
    items: {
            followings_count: null
            followers_count:  null
            guesses_count:    null
            blocked_count:    null
          }
    currentTab: 'followings'
    activities: 0

  componentDidMount: -> @loadSummaryData()

  componentWillUnmount: -> @abortActiveRequests()

  render: ->
    #return `<PopupLayout onClose={ this.unmount }>
              #<Popup title={this.props.title} className='popup--persons' activities={this.state.activities} onClose={this.unmount}>
                #<PersonsPopup_Menu items={ this.state.items } currentTab={ this.state.currentTab } onSelect={ this.selectTab } />
                #{ this.currentPanel() }
                #</Popup>
              #</PopupLayout>`
    return `<Popup title={PERSON_POPUP_TITLE} className='popup--persons' activities={this.state.activities} onClose={this.unmount}>
              <PersonsPopup_Menu items={ this.state.items } currentTab={ this.state.currentTab } onSelect={ this.selectTab } />
              { this.currentPanel() }
             </Popup>`

  currentPanel: ->
    switch @state.currentTab
      when 'followings' then return PersonsPopup_FollowingsPanel(activitiesHandler: @activitiesHandler())
      when 'followers'  then return PersonsPopup_FollowersPanel(activitiesHandler: @activitiesHandler())
      when 'guesses'    then return PersonsPopup_GuessesPanel(activitiesHandler: @activitiesHandler())
      when 'ignores'    then return PersonsPopup_IgnoresPanel(activitiesHandler: @activitiesHandler())
      else console.error "Неизвестный тип отношений #{@state.currentTab}"

  loadSummaryData: ->
    @activitiesHandler().increment()
    @createRequest(
      url:     Routes.api.relationships_summary_url()
      success: (data) => @setState items: data
      error:   (data) -> TastyNotifyController.errorResponse data
      ).done => @activitiesHandler().decrement()

  selectTab: (type) -> @setState currentTab: type

module.exports = PersonsPopup
