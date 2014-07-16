###* @jsx React.DOM ###

window.Persons = Persons = React.createClass

  propTypes:
    tabsData: React.PropTypes.object.isRequired

  getInitialState: ->
    tabs:      null
    tabName:   'followings'
    isLoading: 1

  updateTabName: (type) ->
    @setState tabName: type

  render: ->
    that = @
    panelData = @props.tabsData[@state.tabName]

    return `<div className="popup popup--persons popup--dark" style={{ display: 'block', top: '30px', left: '36%'}}>
              <PopupHeader title={ this.props.title }
                           isLoading={ this.state.isLoading }></PopupHeader>
              <div className="popup__body">
                <PersonsTabs tabName={ this.state.tabName }
                             onClick={ this.updateTabName }></PersonsTabs>
                <PersonsTabPanel data={ panelData }></PersonsTabPanel>
              </div>
            </div>`

module.exports = Persons