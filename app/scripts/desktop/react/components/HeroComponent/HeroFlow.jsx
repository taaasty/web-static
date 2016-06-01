/*global i18n */
import React, { createClass } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import PopupActionCreators from '../../actions/PopupActions';
import Hero from './Hero';
import RelationButton from '../common/RelationButton';
import HeroSettingsButton from './HeroSettingsButton';
import HeroSubscriptionsButton from './HeroSubscriptionsButton';
import HeroDesignSettingsButton from './HeroDesignSettingsButton';

let HeroFlow = createClass({
  propTypes: {
    flow: ProjectTypes.flow.isRequired,
    relationship: ProjectTypes.relationship,
  },

  getInitialState() {
    const { flow, relationship } = this.props;

    return {
      flow: flow,
      relState: relationship && relationship.state,
    };
  },

  showSettings() {
    PopupActionCreators.manageFlow(this.state.flow, this.updateFlow);
  },

  updateFlow(flow) {
    this.setState({ flow });
  },

  updateRelState(relState) {
    this.setState({ relState });
  },

  getText(count) {
    return count
      ?  i18n.t('hero.flow_entries_count', { count })
      :  null;
  },

  getActions() {
    return [
      this.renderWriteButton(),
      this.renderRelationButton(),
      this.renderSettingsButton(),
    ];
  },

  renderWriteButton() {
    if (this.state.flow.can_write) {
      return (
        <a
          className="button button--small button--green"
          href={Routes.new_entry_url(this.state.flow.slug)}
          key="createEntryButton"
        >
          {i18n.t('buttons.hero_create_entry')}
        </a>
      );
    }
  },

  renderRelationButton() {
    if (this.props.relationship) {
      return (
        <RelationButton
          key="relationButton"
          objectID={CurrentUserStore.getUserID()}
          onStateChange={this.updateRelState}
          relState={this.state.relState}
          subjectID={this.state.flow.id}
          subjectPrivacy={this.state.flow.is_privacy}
        />
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

  render() {
    const { flowpic: { original_url }, name, public_tlog_entries_count, tlog_url } = this.state.flow;
    return (
      <Hero
        actions={this.getActions()}
        backgroundUrl={original_url}
        text={this.getText(public_tlog_entries_count)}
        title={<a href={tlog_url}>{`#${name}`}</a>}
      />
    );
  },
});

export default HeroFlow;
