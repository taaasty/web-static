let TlogOwnEmptyPage = React.createClass({
  propTypes: {
    userSlug: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="text-content text-content--main">
        <h2>{i18n.t('tlog.welcome', {userSlug: this.props.userSlug})}</h2>
        <p>{i18n.t('tlog.welcome_tasty')}</p>
        <p>{i18n.t('tlog.ready_for')} <a href={Routes.new_entry_url(this.props.userSlug)}>{i18n.t('tlog.for_new_entry')}</a>.</p>
        <p>{i18n.t('tlog.list_of_options')}:</p>
          <ul>
            <li>{i18n.t('tlog.setting_up_design')} <a href={Routes.userDesignSettings(this.props.userSlug)}>{i18n.t('tlog.design_here')}</a></li>
            <li>{i18n.t('tlog.setting_up_settings')} <a href={Routes.userSettings(this.props.userSlug)}>{i18n.t('tlog.settings_here')}</a></li>
            <li>{i18n.t('tlog.read_live_feed')} <a href={Routes.live_feed_path()}>{i18n.t('tlog.live_feed')}</a>.</li>
          </ul>
        <p>{i18n.t('tlog.ask_question')}</p>
      </div>
    );
  }
});

export default TlogOwnEmptyPage;