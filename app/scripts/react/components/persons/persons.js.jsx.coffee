###* @jsx React.DOM ###

window.Persons = Persons = React.createClass

  propTypes:
    tabs: React.PropTypes.array.isRequired
    tabsData: React.PropTypes.object.isRequired

  getInitialState: ->
    tabs:    null
    tabName: @props.tabs[0].type

  componentDidMount: ->
    @getSummaryData()

  getSummaryData: (tlogId) ->
    $.ajax
      url: Routes.api.relationships_summary_url()
      success: (calendar) =>
        console.log arguments
      error: (data) =>
        console.log arguments
        TastyNotifyController.errorResponse data

  updateTabName: (type) ->
    @setState tabName: type

  render: ->
    that = @
    panelData = @props.tabsData[@state.tabName]

    return `<div className="popup popup--persons popup--dark" style={{ display: 'block', top: '30px', left: '36%'}}>
              <PopupHeader title={ this.props.title }></PopupHeader>
              <div className="popup__body">
                <PersonsTabs tabs={ this.props.tabs }
                             tabName={ this.state.tabName }
                             onClick={ this.updateTabName }></PersonsTabs>
                <PersonsTabPanel data={ panelData }></PersonsTabPanel>
              </div>
            </div>`

module.exports = Persons