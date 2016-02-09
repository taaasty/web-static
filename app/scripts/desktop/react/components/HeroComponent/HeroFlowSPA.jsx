/*global i18n */
import React, { Component, PropTypes } from 'react';
import Hero from './Hero';
import RelationButton from '../common/RelationButtonSPA';
import HeroSettingsButton from './HeroSettingsButton';
import Spinner from '../../../../shared/react/components/common/Spinner';
import Routes from '../../../../shared/routes/routes';
import FlowManager from '../FlowManager';
import Popup from '../PopupComponent/Popup';
import PopupArea from '../PopupComponent/PopupArea';
import { Link } from 'react-router';
import uri from 'urijs';

class HeroFlow extends Component {
  state = { popup: false };
  componentWillMount() {
    document.body.className = 'layout--feed';
    this.props.FlowActions.getFlow(this.props.tlog.data.id);
  }
  componentWillReceiveProps(nextProps) {
    nextProps.FlowActions.getFlow(nextProps.tlog.data.id);
  }
  showSettings() {
    this.setState({ popup: true });
    document.body.classList.add('popup-enabled');
  }
  hideSettings() {
    this.setState({ popup: false });
    document.body.classList.remove('popup-enabled');
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
    const { popup } = this.state;
    const { FlowActions, flow, tlog } = this.props;
    const isFetching = flow.isFetching || !flow.data.id;
    const { design: { backgroundImageUrl }, slug, tlog_url } = tlog.data;
    const { flowpic: { original_url }, name, public_tlog_entries_count } = flow.data;

    return (
      <div>
        <Hero
          actions={isFetching ? <Spinner size={24} /> : this.renderActions()}
          backgroundUrl={original_url || backgroundImageUrl}
          text={this.text(public_tlog_entries_count)}
          title={<Link to={uri(tlog_url).path()}>{`#${name || slug}`}</Link>}
        />
        {popup &&
         <div className="popup-container">
           <PopupArea onClose={this.hideSettings.bind(this)}>
             <Popup
               className="popup--dark popup--flows"
               clue="manage-flow"
               onClose={this.hideSettings.bind(this)}
               title={i18n.t('manage_flow.header')}
               withBackground
             >
               <FlowManager FlowActions={FlowActions} flow={flow} />
             </Popup>
           </PopupArea>
         </div>
        }
      </div>
    );
  }
}

HeroFlow.propTypes = {
  FlowActions: PropTypes.object.isRequired,
  RelationshipActions: PropTypes.object.isRequired,
  flow: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
};

export default HeroFlow;
