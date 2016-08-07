import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {
  MSG_POPUP_STATE_CONVERSATIONS,
  MSG_POPUP_STATE_CREATE_NEW,
  MSG_POPUP_STATE_THREAD,
  MSG_POPUP_STATE_GROUP_SETTINGS,
  MSG_POPUP_STATE_GROUP_CHOOSER,
  initPopup,
  historyBack,
} from '../../actions/MessagesPopupActions';
import BackButton from './BackButton';
//import Thread from '../Thread';
import CreateNewConversation from '../CreateNewConversation';
import Conversations from '../Conversations';
//import GroupSettings from '../GroupSettings';
//import GroupChooser from '../GroupChooser';
import PopupTitle from './PopupTitle';
import Popup from '../../../components/Popup';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';

const emptyHistory = List();
const emptyState = Map();

class MessagesPopup extends Component {
  componentWillMount() {
    this.props.initPopup();
  }
  renderTitle() {
    const {
      conversation,
      popupState,
    } = this.props;

    return (
      <PopupTitle
        conversation={conversation}
        state={popupState}
      />
    );
  }
  renderContents() {
    const {
      popupState,
    } = this.props;

    switch(popupState) {
    case MSG_POPUP_STATE_CONVERSATIONS:
      return <Conversations key="conversations" />;
    case MSG_POPUP_STATE_CREATE_NEW:
      return <CreateNewConversation key="newConversation" />;
    case MSG_POPUP_STATE_THREAD:
      return <Thread key="thread" />;
    case MSG_POPUP_STATE_GROUP_SETTINGS:
      return <GroupSettings key="groupSettings" />;
    case MSG_POPUP_STATE_GROUP_CHOOSER:
      return <GroupChooser key="groupChooser" />;
    }
  }
  render() {
    const {
      historyBack,
      popupState,
     } = this.props;
    const popupClasses = classNames({
      'popup--messages': true,
      'popup--light': true,
      '--thread': popupState === MSG_POPUP_STATE_THREAD,
    });

    return (
      <Popup
        className={popupClasses}
        clue="messages"
        draggable
        onClose={this.props.onClose}
        position={{ top: 30, left: 30 }}
        title={this.renderTitle()}
      >
        <div className="messages">
          {popupState !== MSG_POPUP_STATE_CONVERSATIONS &&
           <BackButton onClick={historyBack} />
          }
          {this.renderContents()}
        </div>
      </Popup>
    );
  }
}

MessagesPopup.propTypes = {
  conversation: PropTypes.object.isRequired,
  historyBack: PropTypes.func.isRequired,
  initPopup: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  popupState: PropTypes.string.isRequired,
};

export default connect(
  (state) => {
    const lastState = state.msg
      .messagesPopup
      .get('history', emptyHistory)
      .last() || emptyState;

    return {
      conversation: state.entities
        .getIn([ 'conversation', String(lastState.get('conversationId'))], Map()),
      popupState: lastState.get('state'),
    };
  },
  {
    historyBack,
    initPopup,
  }
)(MessagesPopup);
