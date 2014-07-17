###* @jsx React.DOM ###

window.PersonsPopup = PersonsPopup = React.createClass

  mixins: [ReactUnmountMixin]

  getDefaultProps: ->
    title: 'Управление подписками'

  getInitialState: ->
    items: {
            followings_count: 0
            followers_count: 0
            guesses_count: 0
            blocked_count: 0
          }
    tabName: 'followings'
    activities: 2

  componentWillMount: -> Mousetrap.bind 'esc', @close

  componentDidMount: -> @getSummaryData()

  componentWillUnmount: -> Mousetrap.unbind 'esc', @close

  getSummaryData: (tlogId) ->
    $.ajax
      url: Routes.api.relationships_summary_url()
      success: (data) =>
        @setState items: data, activities: --@state.activities
      error: (data) =>
        @setState(activities: --@state.activities)
        TastyNotifyController.errorResponse data

  updateTabName: (type) -> @setState tabName: type

  decrementActivities: -> @setState activities: --@state.activities

  close: -> @unmount()

  render: ->
    switch @state.tabName
      when 'followings' then tabPanel = `<PersonsPopup_FollowingsPanel onReady={ this.decrementActivities }></PersonsPopup_FollowingsPanel>`
      when 'followers'  then tabPanel = `<PersonsPopup_FollowersPanel onReady={ this.decrementActivities }></PersonsPopup_FollowersPanel>`
      when 'guesses'    then tabPanel = `<PersonsPopup_GuessesPanel onReady={ this.decrementActivities }></PersonsPopup_GuessesPanel>`
      # when 'blocked'    then tabPanel = `<BlockedTabPanel onReady={ this.decrementActivities }></BlockedTabPanel>`
      else console.warn "Неизвестный тип отношений #{@state.tabName}"

    return `<div className="popup popup--persons popup--dark" style={{ display: 'block', top: '30px', left: '36%'}}>
              <PopupHeader title={ this.props.title }
                           activities={ this.state.activities }
                           handleClose={ this.close }></PopupHeader>
              <div className="popup__body">
                <PersonsPopup_Menu items={ this.state.items }
                                   tabName={ this.state.tabName }
                                   onClick={ this.updateTabName }></PersonsPopup_Menu>
                { tabPanel }
              </div>
            </div>`

module.exports = PersonsPopup