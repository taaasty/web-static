HeroActions_DropdownMenuIgnoreItem = require './items/ignore'
HeroActions_DropdownMenuReportItem = require './items/report'
{ PropTypes } = React

IGNORED_STATUS = 'ignored'

module.exports = React.createClass
  displayName: 'HeroActions_DropdownMenu_Popup'

  propTypes:
    arrangement: PropTypes.string
    userId:      PropTypes.number.isRequired
    status:      PropTypes.string.isRequired

  getDefaultProps: ->
    arrangement: 'bottom'

  render: ->
    <div className={ 'hero__dropdown-popup __' + @props.arrangement }>
      { @_renderPopupList() }
    </div>

  _renderPopupList: ->
    if @props.status isnt IGNORED_STATUS
      ignoreItem = <HeroActions_DropdownMenuIgnoreItem userId={ @props.userId } />

    return <ul className="hero__dropdown-popup-list">
             { ignoreItem }
             <HeroActions_DropdownMenuReportItem userId={ @props.userId } />
           </ul>