/*global i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getFlow }  from '../../actions/FlowActions';
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
  componentWillMount() {
    const { author: { is_flow }, id } = this.props.tlog.data;

    if (is_flow) {
      this.props.getFlow(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { author: { is_flow }, id } = nextProps.tlog.data;

    if (is_flow) {
      nextProps.getFlow(id);
    }
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
    const { flow, tlog } = this.props;
    const { errorRelationship, isFetchingRelationship,
            data: { my_relationship: relState } } = tlog;
    const { id, is_privacy } = flow.data;
    
    return (
      <RelationButton
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
  renderPinFlowButton() {
    const { id, fixed_state, fixed_up_at, fixed_order_id } = this.props.flow.data;
    const tillStr = fixed_up_at && moment(fixed_up_at).format('H:mm D MMMM');
    const [ buttonText, buttonUrl, buttonClass ] = fixed_state === ENTRY_PINNED_STATE
            ? [ i18n.t('buttons.hero_flow.pinned', { date: tillStr }), Routes.orders(fixed_order_id), 'button--green' ]
            : fixed_state === ENTRY_AWAITING_PAYMENT_STATE
              ? [ i18n.t('buttons.hero_flow.awaiting_payment'), Routes.orders(fixed_order_id), 'button--yellow' ]
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
    const { can_edit, can_write } = this.props.flow.data;
    const { my_relationship: relState } = this.props.tlog.data;

    return (
      <div>
        {can_write && this.renderWriteButton()}
        {relState  && this.renderRelationButton()}
        {can_edit && this.renderSettingsButton()}
        {can_edit && this.renderPinFlowButton()}
      </div>
    );
  }
  render() {
    const { popup } = this.state;
    const { flow, tlog } = this.props;
    const isFetching = flow.isFetching || !flow.data.id;
    const { design: { backgroundImageUrl }, slug, tlog_url } = tlog.data;
    const { flowpic: { original_url }, name, public_tlog_entries_count } = flow.data;

    return (
      <div className="hero__flow">
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
  getFlow: PropTypes.func.isRequired,
  tlog: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    flow: state.flow,
    tlog: state.tlog,
  }),
  { getFlow }
)(HeroFlow);
