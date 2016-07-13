/*global i18n, ga */
import React, {PropTypes, Component} from 'react';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormStaffs from '../FlowForm/FlowFormStaffs';
import PopupArea from '../Popup/Area';
import Popup from '../Popup';
import { connect } from 'react-redux';
import { createFlow } from '../../actions/FlowActions';
import {
  flowCreatorSet,
  flowCreatorReset,
  flowCreatorAddStaff,
  flowCreatorRemoveStaff,
} from '../../actions/FlowCreatorActions';
import TastyLockingAlertController from '../../controllers/TastyLockingAlertController';

const defaultRole = 'moderator';

class FlowCreatorPopup extends Component {
  componentWillUnmount() {
    this.props.flowCreatorReset();
  }
  createFlow() {
    const { name, title, flowpic, staffs, createFlow } = this.props;

    createFlow({
      name,
      title,
      flowpic,
      staffIds: staffs.map((s) => s.getIn([ 'user', 'id' ])).toArray(),
    })
      .then((flow) => {
        function redirect() {
          TastyLockingAlertController.show({
            message: i18n.t('create_flow.create_success'),
            action() {
              window.location = flow.tlog_url;
            },
          });
        }

        if (window.ga) {
          ga('send', 'event', 'UX', 'CreateFlow', flow.name, {
            hitCallback: redirect,
          });
        } else {
          redirect();
        }
      });
  }
  handleUserChoose(user) {
    const { currentUserId, flowCreatorAddStaff } = this.props;

    if (user.get('id') !== currentUserId) {
      flowCreatorAddStaff(user, defaultRole);
    }
  }
  render() {
    const { name, title, staffs, flowCreatorSet,
            flowCreatorRemoveStaff, onClose, staffsLimit } = this.props;
    const flowpic = {
      originalUrl: '//taaasty.com/images/hero-cover.jpg',
    };

    return (
      <PopupArea onClose={onClose}>
        <Popup
          className="popup--dark popup--flows"
          clue="create-flow"
          onClose={onClose}
          title={i18n.t('create_flow.header')}
          withBackground
        >
          <div className="flow-form">
            <div className="flow-form__header">
              <FlowFormHero
                flowpic={flowpic}
                name={name}
                onFlowCreate={this.createFlow.bind(this)}
                onNameChange={flowCreatorSet.bind(null, 'name')}
                onPicFileChange={flowCreatorSet.bind(null, 'flowpic')}
                onTitleChange={flowCreatorSet.bind(null, 'title')}
                title={title}
              />
            </div>
            <div className="flow-form__body">
              <div className="flow-form__item">
                <div className="flow-form__left">
                  <FlowFormChooser
                    limitReached={staffsLimit === staffs.count()}
                    onChoose={this.handleUserChoose.bind(this)}
                  />
                </div>
                <FlowFormStaffs
                  canChangeRole={false}
                  onDelete={flowCreatorRemoveStaff}
                  staffs={staffs}
                />
              </div>
            </div>
          </div>
        </Popup>
      </PopupArea>
    );
  }
}

FlowCreatorPopup.propTypes = {
  createFlow: PropTypes.func.isRequired,
  currentUserId: PropTypes.number.isRequired,
  flowCreatorAddStaff: PropTypes.func.isRequired,
  flowCreatorRemoveStaff: PropTypes.func.isRequired,
  flowCreatorReset: PropTypes.func.isRequired,
  flowCreatorSet: PropTypes.func.isRequired,
  flowpic: PropTypes.object,
  name: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  staffs: PropTypes.object.isRequired,
  staffsLimit: PropTypes.number,
  title: PropTypes.string,
};

FlowCreatorPopup.defaultProps = {
  staffsLimit: 5,
};

export default connect(
  (state, ownProps) => {
    const { flowCreator } = state;

    return {
      ...ownProps,
      currentUserId: state.currentUser.data.id,
      name: flowCreator.get('name'),
      title: flowCreator.get('title'),
      flowpic: flowCreator.get('flowpic'),
      staffs: flowCreator.get('staffs'),
    };
  },
  { createFlow, flowCreatorSet, flowCreatorReset,
    flowCreatorAddStaff, flowCreatorRemoveStaff }
)(FlowCreatorPopup);
