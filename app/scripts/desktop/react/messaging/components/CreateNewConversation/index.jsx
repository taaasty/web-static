/*global $, i18n, NoticeService */
import React, { Component } from 'react';
import LoadingMessage from '../MessagesPopup/LoadingMessage';
import Chooser from '../Chooser';
import FooterButton from '../MessagesPopup/FooterButton';
import ConversationActions from '../../actions/ConversationActions';
import MessagesPopupActions from '../../actions/MessagesPopupActions';
import ApiRoutes from '../../../../../shared/routes/api';

const PROCESS_STATE = 'process';
const CHOOSER_STATE = 'chooser';

class CreateNewConversation extends Component {
  state = {
    currentState: CHOOSER_STATE,
    loading: false,
    users: [],
  };
  componentWillMount() {
    this.mounted = true;

    this.setState({ loading: true });
    $.ajax({ url: ApiRoutes.relationships_by_url('friend') })
      .done(({ relationships }) => {
        if (this.mounted) {
          this.setState({ users: relationships.map((r) => r.reader) });
        }
      })
      .fail((error) => NoticeService.errorResponse(error))
      .then(() => {
        if (this.mounted) {
          this.setState({ loading: false });
        }
      });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  activateProcessState() {
    this.setState({ currentState: PROCESS_STATE });
  }
  activateChooserState() {
    this.setState({ currentState: CHOOSER_STATE });
  }
  postNewConversation({ id }) {
    this.activateProcessState();

    ConversationActions.postNewConversation({
      recipientId: id,
      error: this.activateChooserState.bind(this),
    });
  }
  newGroupChat() {
    MessagesPopupActions.openGroupChooser({ users: this.state.users });
  }
  render() {
    const { currentState, loading, users } = this.state;

    return (
      <div className="messages__section messages__section--recipients">
          {currentState === PROCESS_STATE
           ? <LoadingMessage content={i18n.t('new_thread_process')} />
           : <Chooser
               loading={loading}
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

export default CreateNewConversation;
