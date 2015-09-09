import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import PopupActionCreators from '../../actions/popup';
import Hero from './Hero';
import FollowButton from '../common/FollowButton';
import HeroSettingsButton from './HeroSettingsButton';
import HeroSubscriptionsButton from './HeroSubscriptionsButton';
import HeroDesignSettingsButton from './HeroDesignSettingsButton';

let HeroFlow = React.createClass({
  propTypes: {
    flow: ProjectTypes.flow.isRequired,
    relationship: ProjectTypes.relationship,
  },

  getInitialState() {
    return {
      flow: this.props.flow
    }
  },

  render() {
    return (
      <Hero backgroundUrl={this.state.flow.flowpic.original_url}
            title={'#' + this.state.flow.name}
            text={i18n.t('hero.flow_entries_count', {count: this.state.flow.public_tlog_entries_count})}
            actions={this.getActions()} />
    );
  },

  getActions() {
    return [
      this.renderWriteButton(),
      this.renderFollowButton(),
      this.renderSettingsButton()
    ];
  },

  renderWriteButton() {
    if (this.state.flow.can_write) {
      return (
        <a href={Routes.new_entry_url(this.state.flow.slug)}
           className="button button--small button--green"
           key="createEntryButton">
          {i18n.t('buttons.hero_create_entry')}
        </a>
      );
    }
  },

  renderFollowButton() {
    if (this.props.relationship) {
      return (
        <FollowButton
            objectID={CurrentUserStore.getUserID()}
            subjectID={this.state.flow.id}
            subjectPrivacy={this.state.flow.is_privacy}
            relState={this.props.relationship.state}
            key="followButton" />
      );
    }
  },

  renderSettingsButton() {
    if (this.state.flow.can_edit) {
      return (
        <HeroSettingsButton onClick={this.showSettings} key="settingsButton" />
      );
    }
  },

  showSettings() {
    PopupActionCreators.manageFlow(this.state.flow, this.updateFlow);
  },

  updateFlow(flow) {
    this.setState({flow});
  }
});

export default HeroFlow;
