/*global i18n */
import React, { Component, PropTypes } from 'react';
import LoadingMessage from '../MessagesPopup/LoadingMessage';
import Chooser from '../Chooser';
import FooterButton from '../MessagesPopup/FooterButton';
import {
  postNewConversation,
} from '../../actions/ConversationsActions';
import {
  showGroupChooser,
  showThread,
} from '../../actions/MessagesPopupActions';
import {
  RELS_BY_FRIEND,
  getRelsByFriend,
} from '../../../actions/RelsActions';
import {
  REL_FRIEND_STATE,
} from '../../../actions/RelationshipActions';
import { connect } from 'react-redux';
import { Map } from 'immutable';

const emptyRels = Map();
const emptyUser = Map();

class CreateNewConversation extends Component {
  componentWillMount() {
    this.props.getMyRelsByFriend();
  }
  postNewConversation(user) {
    const { postNewConversation, showThread } = this.props;

    postNewConversation(user.get('id'))
      .then(({ response }) => {
        showThread(response.result);
      });
  }
  newGroupChat() {
    this.props.showGroupChooser();
  }
  render() {
    const { isFetching, isFetchingRels, users } = this.props;

    return (
      <div className="messages__section messages__section--recipients">
          {isFetching
           ? <LoadingMessage content={i18n.t('new_thread_process')} />
           : <Chooser
               isFetching={isFetchingRels}
               onClickUser={this.postNewConversation.bind(this)}
               onSubmit={this.postNewConversation.bind(this)}
               selectState={false}
               users={users}
             />
          }
          <FooterButton
            onClick={this.newGroupChat.bind(this)}
            text={i18n.t('buttons.messenger.new_group_chat')}
          />
      </div>
    );
  }
}

CreateNewConversation.propTypes = {
  getMyRelsByFriend: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingRels: PropTypes.bool.isRequired,
  postNewConversation: PropTypes.func.isRequired,
  showGroupChooser: PropTypes.func.isRequired,
  showThread: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

export default connect(
  (state) => {
    const currentUserId = state.currentUser.data.id;
    const isFetching = state.msg.conversations.get('isFetchingNewConversation', false);
    const isFetchingRels = state.rels.getIn([RELS_BY_FRIEND, 'isFetching'], false);
    const users = state.entities
      .get('rel', emptyRels)
      .filter((r) => r.get('userId') === currentUserId && r.get('state') === REL_FRIEND_STATE)
      .map((r) => state.entities.getIn(['tlog', String(r.get('readerId'))], emptyUser));

    return {
      currentUserId,
      isFetching,
      isFetchingRels,
      users,
    }
  },
  {
    getRelsByFriend,
    postNewConversation,
    showGroupChooser,
    showThread,
  },
  (stateProps, dispatchProps) => Object.assign(
    {},
    stateProps,
    dispatchProps,
    {
      getMyRelsByFriend: dispatchProps.getRelsByFriend.bind(null, stateProps.currentUserId),
    }
  )
)(CreateNewConversation);
