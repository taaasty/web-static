/*global i18n, PopupActionCreators */
import React, { Component, PropTypes } from 'react';
import Hero from './Hero';
import PopupActionCreators from '../../actions/popup';
import RelationButton from '../common/RelationButtonSPA';
import HeroSettingsButton from './HeroSettingsButton';
import Routes from '../../../../shared/routes/routes';

class HeroFlow extends Component {
  showSettings() {
    const { FlowActions, flow } = this.props;
    PopupActionCreators.manageFlowSPA(flow, FlowActions);
  }
  renderWriteButton() {
    return (
      <a
        className="button button--small button--green"
        href={Routes.new_entry_url(this.props.flow.data.slug)}
        key="createEntryButton"
      >
        {i18n.t('buttons.hero_create_entry')}
      </a>
    );
  }
  renderRelationButton() {
    const { RelationshipActions, flow, tlog } = this.props;
    const { errorRelationship, isFetchingRelationship,
            data: { my_relationship: relState } } = tlog;
    const { id, is_privacy } = flow.data;
    
    return (
      <RelationButton
        RelationshipActions={RelationshipActions}
        error={errorRelationship}
        isFetching={isFetchingRelationship}
        key="relationButton"
        relState={relState}
        subjectId={id}
        subjectPrivacy={is_privacy}
      />
    );
  }
  renderSettingsButton() {
    return (
      <HeroSettingsButton
        key="settingsButton"
        onClick={this.showSettings.bind(this)}
      />
    );
  }
  text(count) {
    return count
      ?  i18n.t('hero.flow_entries_count', { count })
      :  null;
  }
  renderActions() {
    const { can_edit, can_write } = this.props.flow.data;
    const { my_relationship: relState } = this.props.tlog.data;

    return (
      <div>
        {can_write && this.renderWriteButton()}
        {relState  && this.renderRelationButton()}
        {can_edit && this.renderSettingsButton()}
      </div>
    );
  }
  render() {
    const { flowpic: { original_url }, name, public_tlog_entries_count, tlog_url } = this.props.flow.data;

    return (
      <Hero
        actions={this.renderActions()}
        backgroundUrl={original_url}
        text={this.text(public_tlog_entries_count)}
        title={<a href={tlog_url}>{`#${name}`}</a>}
      />
    );
  }
}

HeroFlow.propTypes = {
  FlowActions: PropTypes.object.isRequired,
  RelationshipActions: PropTypes.object.isRequired,
  flow: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  tlog: PropTypes.object.isRequired,
};

export default HeroFlow;
