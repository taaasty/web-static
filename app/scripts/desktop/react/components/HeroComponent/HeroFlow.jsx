/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ENTRY_PINNED_STATE, ENTRY_AWAITING_PAYMENT_STATE } from '../../constants/EntryConstants';
import { PIN_FLOW_ORDER } from '../../constants/OrderConstants';
import moment from 'moment';

import Hero from './Hero';
import RelationButton from '../common/RelationButtonSPA';
import HeroSettingsButton from './HeroSettingsButton';
import Spinner from '../../../../shared/react/components/common/Spinner';
import Routes from '../../../../shared/routes/routes';
import FlowManager from '../FlowManager';
import Popup from '../Popup';
import PopupArea from '../Popup/Area';
import { Link } from 'react-router';
import uri from 'urijs';

class HeroFlow extends Component {
  state = { popup: false };
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
      <Link
        className="button button--small button--green"
        key="createEntryButton"
        to={uri(Routes.new_entry_url(this.props.flow.data.slug)).path()}
      >
        {i18n.t('buttons.hero_create_entry')}
      </Link>
    );
  }
  renderRelationButton() {
    const { flow: { id, isPrivacy }, tlog: { myRelationship } } = this.props;
    
    return (
      <RelationButton
        error={errorRelationship}
        isFetching={!id}
        key="relationButton"
        relState={myRelationship}
        subjectId={id}
        subjectPrivacy={isPrivacy}
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
  renderPinFlowButton() {
    const { id, fixedState, fixedUpAt, fixedOrderId } = this.props.flow;
    const tillStr = fixedUpAt && moment(fixedUpAt).format('H:mm D MMMM');
    const [ buttonText, buttonUrl, buttonClass ] = fixedState === ENTRY_PINNED_STATE
            ? [ i18n.t('buttons.hero_flow.pinned', { date: tillStr }), Routes.orders(fixedOrderId), 'button--green' ]
            : fixedState === ENTRY_AWAITING_PAYMENT_STATE
              ? [ i18n.t('buttons.hero_flow.awaiting_payment'), Routes.orders(fixedOrderId), 'button--yellow' ]
              : [ i18n.t('buttons.hero_flow.pin_flow'), Routes.newFlowOrder(id, PIN_FLOW_ORDER), 'button--outline' ];
    const buttonClasses = classNames('button button--smass', buttonClass);

    return (
      <a
        className={buttonClasses}
        href={buttonUrl}
        key="pinFlowButton"
      >
        {buttonText}
      </a>
    );
  }
  text(count) {
    return count
      ?  i18n.t('hero.flow_entries_count', { count })
      :  null;
  }
  renderActions() {
    const { canEdit, canWrite } = this.props.flow;
    const { myRelationship } = this.props.tlog;

    return (
      <div>
        {canWrite && this.renderWriteButton()}
        {myRelationship  && this.renderRelationButton()}
        {canEdit && this.renderSettingsButton()}
        {canEdit && this.renderPinFlowButton()}
      </div>
    );
  }
  render() {
    const { popup } = this.state;
    const { flow, tlog } = this.props;
    const { design: { backgroundImageUrl }, slug, tlogUrl } = tlog;
    const { flowpic: { originalUrl }, name, publicTlogEntriesCount } = flow;

    return (
      <div className="hero__flow">
        <Hero
          actions={!flow.data.id ? <Spinner size={24} /> : this.renderActions()}
          backgroundUrl={originalUrl || backgroundImageUrl}
          text={this.text(publicTlogEntriesCount)}
          title={<Link to={uri(tlogUrl).path()}>{`#${name || slug}`}</Link>}
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
               <FlowManager flow={flow} />
             </Popup>
           </PopupArea>
         </div>
        }
      </div>
    );
  }
}

HeroFlow.propTypes = {
  flow: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    flow: state.flow,
    tlog: state.tlog,
  }),
  { getFlow }
)(HeroFlow);
