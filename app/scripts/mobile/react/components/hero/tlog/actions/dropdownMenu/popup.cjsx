classnames = require 'classnames'
RelationshipsStore                 = require '../../../../../stores/relationships'
ConnectStoreMixin                      = require '../../../../../../../shared/react/mixins/connectStore'
DropdownMenuMixin                      = require '../../../../../mixins/dropdownMenu'
HeroTlogActions_DropdownMenuIgnoreItem = require './items/ignore'
HeroTlogActions_DropdownMenuReportItem = require './items/report'
{ PropTypes } = React

IGNORED_STATUS = 'ignored'

HeroTlogActions_DropdownMenu_Popup = React.createClass
  displayName: 'HeroTlogActions_DropdownMenu_Popup'
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
    popupClasses = classnames('hero__dropdown-popup __' + @props.arrangement, {
      '__top': @state.top
      '__right': @state.right
    })

    return (
      <div className={popupClasses}>
        {@_renderPopupList()}
      </div>
    )

  _renderPopupList: ->
    if @state.status isnt IGNORED_STATUS
      ignoreItem = <HeroTlogActions_DropdownMenuIgnoreItem
                       userId={ @props.userId }
                       onIgnore={ @props.onClose } />

    return <ul className="hero__dropdown-popup-list">
             { ignoreItem }
             <HeroTlogActions_DropdownMenuReportItem
                 userId={ @props.userId }
                 onReport={ @props.onClose } />
           </ul>

  getStateFromStore: ->
    status: RelationshipsStore.getStatus(@props.userId) || @props.status

module.exports = HeroTlogActions_DropdownMenu_Popup