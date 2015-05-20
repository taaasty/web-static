import Hero from './Hero';
import FollowButton from '../common/FollowButton';
import HeroSettingsButton from './HeroSettingsButton';
import HeroSubscriptionsButton from './HeroSubscriptionsButton';
import HeroDesignSettingsButton from './HeroDesignSettingsButton';

let HeroFlow = React.createClass({
  propTypes: {
    tlog: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      design: React.PropTypes.object.isRequired,
      is_privacy: React.PropTypes.bool.isRequired,
      total_entries_count: React.PropTypes.number.isRequired
    }).isRequired,
    relState: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <Hero backgroundUrl={this.props.tlog.design.backgroundImageUrl}
            title={'#' + this.props.tlog.name}
            text={i18n.t('hero.flow_entries_count', {count: this.props.tlog.total_entries_count})}
            actions={this.getActions()} />
    );
  },

  getActions() {
    return [
      <a href={Routes.new_entry_url(this.props.tlog.slug)}
         className="button button--small button--green"
         key="createEntryButton">
        {i18n.t('buttons.hero_create_entry')}
      </a>,
      <FollowButton {...this.props} key="followButton" />,
      <HeroDesignSettingsButton onClick={this.showDesignSettings} key="designSettingsButton" />,
      <HeroSubscriptionsButton onClick={this.showSubscriptions} key="subscriptionsButton" />,
      <HeroSettingsButton onClick={this.showSettings} key="settingsButton" />
    ];
  },

  showDesignSettings() {
    console.log('Показываем настройки дизайна потока', this.props.tlog);
  },

  showSettings() {
    console.log('Показываем настройки потока', this.props.tlog);
  },

  showSubscriptions() {
    console.log('Показываем управление подписками потока', this.props.tlog);
  }
});

export default HeroFlow;