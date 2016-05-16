/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ENTRY_PINNED_STATE, ENTRY_AWAITING_PAYMENT_STATE } from '../../constants/EntryConstants';
import { PIN_FLOW_ORDER } from '../../constants/OrderConstants';
import moment from 'moment';

import Hero from './Hero';
import RelationButton from '../RelationButton';
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
        to={uri(Routes.new_entry_url(this.props.flow.get('slug'))).path()}
      >
        {i18n.t('buttons.hero_create_entry')}
      </Link>
    );
  }
  renderRelationButton() {
    const { flow, tlog } = this.props;
    
    return (
      <RelationButton
        key="relationButton"
        relId={tlog.get('myRelationshipObject')}
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
    const { flow } = this.props;
    const fixedUpAt = flow.get('fixedUpAt');
    const fixedState = flow.get('fixedState');
    const fixedOrderId = flow.get('fixedOrderId');
    const tillStr = fixedUpAt && moment(fixedUpAt).format('H:mm D MMMM');
    const [ buttonText, buttonUrl, buttonClass ] = fixedState === ENTRY_PINNED_STATE
            ? [ i18n.t('buttons.hero_flow.pinned', { date: tillStr }), Routes.orders(fixedOrderId), 'button--green' ]
            : fixedState === ENTRY_AWAITING_PAYMENT_STATE
              ? [ i18n.t('buttons.hero_flow.awaiting_payment'), Routes.orders(fixedOrderId), 'button--yellow' ]
              : [ i18n.t('buttons.hero_flow.pin_flow'), Routes.newFlowOrder(flow.get('id'), PIN_FLOW_ORDER), 'button--outline' ];
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
    const { flow, tlog } = this.props;
    const canEdit = flow.get('canEdit');
    const canWrite = flow.get('canWrite');
    const myRelationship = tlog.get('myRelationship');

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
    const flowId = flow.get('id');
    const backgroundUrl = flow.getIn(
      [ 'flowpic', 'originalUrl' ],
      tlog.getIn([ 'design', 'backgroundImageUrl' ])
    );

    return (
      <div className="hero__flow">
        <Hero
          actions={!flowId ? <Spinner size={24} /> : this.renderActions()}
          backgroundUrl={backgroundUrl}
          text={this.text(flow.get('publicTlogEntriesCount'))}
          title={<Link to={uri(tlog.get('tlogUrl')).path()}>{`#${flow.get('name') || tlog.get('slug')}`}</Link>}
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
               <FlowManager flowId={flowId} />
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
