###* @jsx React.DOM ###

PERSON_POPUP_TITLE = 'Управление подписками'
window.PersonsPopup = React.createClass
  mixins: [ReactUnmountMixin]

  getInitialState: ->
    items: {
            followings_count: null
            followers_count:  null
            guesses_count:    null
            blocked_count:    null
          }
    currentTab: 'followings'
    activities: 0

  componentDidMount: ->
    @loadSummaryData()

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
    console.log 'currentTab', @state.currentTab
    switch @state.currentTab
      when 'followings' then return PersonsPopup_FollowingsPanel()
      when 'followers'  then return PersonsPopup_FollowersPanel()
      when 'guesses'    then return PersonsPopup_GuessesPanel()
      when 'ignores'    then return PersonsPopup_IgnoresPanel()
      else console.error "Неизвестный тип отношений #{@state.currentTab}"


  loadSummaryData: ->
    @incrementActivities()
    xhr = $.ajax
      url: Routes.api.relationships_summary_url()
      success: (data) =>
        debugger
        @setState items: data
      error:   (data) ->
        TastyNotifyController.errorResponse data

    xhr.always @decrementActivities

  selectTab: (type) -> @setState currentTab: type

  incrementActivities: -> @setState activities: @state.activities+=1
  decrementActivities: -> @setState activities: @state.activities-=1

module.exports = PersonsPopup
