import UserToolbarListItem from './UserToolbarListItem';

let UserToolbarAdditionalList = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    searchTitleI18nKey: React.PropTypes.string.isRequired,
    onSettingsClick: React.PropTypes.func.isRequired,
    onSearchClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <ul className="toolbar__nav toolbar__nav--bottom">
        <UserToolbarListItem
            title={i18n.t(`searchbox_titles.${this.props.searchTitleI18nKey}`)}
            icon="icon--magnifier"
            onClick={this.props.onSearchClick} />
        <UserToolbarListItem
            url={Routes.userSettings(this.props.user.slug)}
            title={i18n.t('toolbar_settings_item')}
            icon="icon--cogwheel"
            onClick={this.props.onSettingsClick} />
        <UserToolbarListItem
            url={Routes.logout_path(this.props.user.slug)}
            title={ i18n.t('toolbar_logout_item') }
            icon="icon--logout" />
      </ul>
    );
  }
});

export default UserToolbarAdditionalList;