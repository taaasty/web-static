###* @jsx React.DOM ###

window.PersonsPopup = PersonsPopup = React.createClass

  getDefaultProps: ->
    title: 'Управление подписками'

  getInitialState: ->
    tabs: {
            followings_count: 0
            followers_count: 0
            guesses_count: 0
            blocked_count: 0
          }
    tabName: 'followings'
    activities: 2

  componentDidMount: -> @getSummaryData()

  getSummaryData: (tlogId) ->
    $.ajax
      url: Routes.api.relationships_summary_url()
      success: (data) =>
        @setState tabs: data, activities: --@state.activities
      error: (data) =>
        @setState(activities: --@state.activities)
        TastyNotifyController.errorResponse data

  updateTabName: (type) -> @setState tabName: type

  decrementActivities: -> @setState activities: --@state.activities

  render: ->
    switch @state.tabName
      when 'followings' then tabPanel = `<FollowingsTabPanel onReady={ this.decrementActivities }></FollowingsTabPanel>`
      when 'followers'  then tabPanel = `<FollowersTabPanel onReady={ this.decrementActivities }></FollowersTabPanel>`
      when 'guesses'    then tabPanel = `<GuessesTabPanel onReady={ this.decrementActivities }></GuessesTabPanel>`
      when 'blocked'    then tabPanel = `<BlockedTabPanel onReady={ this.decrementActivities }></BlockedTabPanel>`
      else console.warn "Неизвестный тип отношений #{@state.tabName}"

    return `<div className="popup popup--persons popup--dark" style={{ display: 'block', top: '30px', left: '36%'}}>
              <PopupHeader title={ this.props.title }
                           activities={ this.state.activities }></PopupHeader>
              <div className="popup__body">
                <PersonsPopupTabs tabs={ this.state.tabs }
                                  tabName={ this.state.tabName }
                                  onClick={ this.updateTabName }></PersonsPopupTabs>
                { tabPanel }
              </div>
            </div>`

module.exports = PersonsPopup