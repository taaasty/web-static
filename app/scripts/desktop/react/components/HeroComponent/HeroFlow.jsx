import PopupActionCreators from '../../actions/popup';
import Hero from './Hero';
import FollowButton from '../common/FollowButton';
import HeroSettingsButton from './HeroSettingsButton';
import HeroSubscriptionsButton from './HeroSubscriptionsButton';
import HeroDesignSettingsButton from './HeroDesignSettingsButton';

let HeroFlow = React.createClass({
  propTypes: {
    flow: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      design: React.PropTypes.object.isRequired,
      is_privacy: React.PropTypes.bool.isRequired,
      entries_count: React.PropTypes.number.isRequired
    }).isRequired,
    relationship: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <Hero backgroundUrl={this.props.flow.flowpic.original_url}
            title={'#' + this.props.flow.name}
            text={i18n.t('hero.flow_entries_count', {count: this.props.flow.entries_count})}
            actions={this.getActions()} />
    );
  },

  getActions() {
    return [
      <a href={Routes.new_entry_url(this.props.flow.slug)}
         className="button button--small button--green"
         key="createEntryButton">
        {i18n.t('buttons.hero_create_entry')}
      </a>,
      <FollowButton
          relState={this.props.relationship.state}
          tlog={this.props.flow}
          key="followButton" />,
      <HeroSettingsButton onClick={this.showSettings} key="settingsButton" />
    ];
  },

  showDesignSettings() {
    console.log('Показываем настройки дизайна потока', this.props.flow);
  },

  showSettings() {
    PopupActionCreators.manageFlow(this.props.flow);
  },

  showSubscriptions() {
    console.log('Показываем управление подписками потока', this.props.flow);
  }
});

export default HeroFlow;