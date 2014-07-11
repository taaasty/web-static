###* @jsx React.DOM ###

window.Persons = Persons = React.createClass

  propTypes:
    tabs: React.PropTypes.array.isRequired
    tabsData: React.PropTypes.object.isRequired

  getInitialState: ->
    activeType: @props.tabs[0].type

  updateActiveType: (type) ->
    unless type == @state.activeType
      @setState activeType: type

  render: ->
    that = @
    panelData = @props.tabsData[@state.activeType]

    return `<div className="popup popup--persons popup--dark" style={{ display: 'block', top: '30px', left: '36%'}}>
              <PopupHeader title={ this.props.title }></PopupHeader>
              <div className="popup__body">
                <PersonsTabs onClick={ this.updateActiveType } activeType={ this.state.activeType } tabs={ this.props.tabs }></PersonsTabs>
                <PersonsTabPanel data={ panelData }></PersonsTabPanel>
              </div>
            </div>`

module.exports = Persons