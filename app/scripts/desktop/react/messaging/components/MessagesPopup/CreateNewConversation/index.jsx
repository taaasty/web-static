/*global i18n */
import React, { Component } from 'react';
import LoadingMessage from '../LoadingMessage';
import Chooser from './Chooser';
import ConversationActions from '../../../actions/ConversationActions';

const PROCESS_STATE = 'process';
const CHOOSER_STATE = 'chooser';

class CreateNewConversation extends Component {
  state = { currentState: CHOOSER_STATE };
  componentWillMount() {
    
  }
  activateProcessState() {
    this.setState({ currentState: PROCESS_STATE });
  }
  activateChooserState() {
    this.setState({ currentState: CHOOSER_STATE });
  }
  postNewConversation(recipientId) {
    this.activateProcessState();

    ConversationActions.postNewConversation({
      recipientId: recipientId,
      error: this.activateChooserState.bind(this),
    });
  }
  render() {
    return (
      <div className="messages__section messages__section--recipients">
        <div className="messages__body">
          {this.state.currentState === PROCESS_STATE
           ? <LoadingMessage content={i18n.t('new_thread_process')} />
           : <Chooser onSubmit={this.postNewConversation.bind(this)} />
          }
        </div>
      </div>
    );
  }
}

export default CreateNewConversation;
