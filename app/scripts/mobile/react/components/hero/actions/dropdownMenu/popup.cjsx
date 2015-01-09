RelationshipsStore                 = require '../../../../stores/relationships'
ConnectStoreMixin                  = require '../../../../mixins/connectStore'
DropdownMenuMixin                  = require '../../../../mixins/dropdownMenu'
HeroActions_DropdownMenuIgnoreItem = require './items/ignore'
HeroActions_DropdownMenuReportItem = require './items/report'
{ PropTypes } = React

IGNORED_STATUS = 'ignored'

module.exports = React.createClass
  displayName: 'HeroActions_DropdownMenu_Popup'
  mixins: [ConnectStoreMixin(RelationshipsStore), DropdownMenuMixin]

  propTypes:
    arrangement: PropTypes.string
    visible:     PropTypes.bool.isRequired
    userId:      PropTypes.number.isRequired
    status:      PropTypes.string.isRequired
    onClose:     PropTypes.func.isRequired

  getDefaultProps: ->
    arrangement: 'bottom'

  render: ->
    <div className={ @getPopupClasses('hero__dropdown-popup __' + @props.arrangement) }>
      { @_renderPopupList() }
    </div>

  _renderPopupList: ->
    if @state.status isnt IGNORED_STATUS
      ignoreItem = <HeroActions_DropdownMenuIgnoreItem
                       userId={ @props.userId }
                       onIgnore={ @props.onClose } />

    return <ul className="hero__dropdown-popup-list">
             { ignoreItem }
             <HeroActions_DropdownMenuReportItem
                 userId={ @props.userId }
                 onReport={ @props.onClose } />
           </ul>

  getStateFromStore: ->
    status: RelationshipsStore.getStatus(@props.userId) || @props.status