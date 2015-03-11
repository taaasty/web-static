UserToolbarListItem = require './list/item'
{ PropTypes } = React

UserToolbarAdditionalList = React.createClass
  displayName: 'UserToolbarAdditionalList'

  propTypes:
    user: PropTypes.object.isRequired
    searchTitleI18nKey: PropTypes.string.isRequired
    onSettingsItemClick: PropTypes.func.isRequired
    onSearchItemClick: PropTypes.func.isRequired

  render: ->
    <ul className="toolbar__nav toolbar__nav--bottom">
      <UserToolbarListItem
          title={ i18n.t('searchbox_titles.' + @props.searchTitleI18nKey) }
          icon="icon--magnifier"
          onClick={ @props.onSearchItemClick } />
      <UserToolbarListItem
          title={ i18n.t('toolbar_settings_item') }
          icon="icon--cogwheel"
          href={ Routes.userSettings(@props.user.slug) }
          onClick={ @props.onSettingsItemClick } />
      <UserToolbarListItem
          title={ i18n.t('toolbar_logout_item') }
          icon="icon--logout"
          href={ Routes.logout_path(@props.user.slug) } />
    </ul>

module.exports = UserToolbarAdditionalList