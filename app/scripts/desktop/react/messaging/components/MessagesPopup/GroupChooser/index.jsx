/*global i18n */
import React, { Component } from 'react';
import Chooser from '../Chooser';
import FooterButton from '../FooterButton';
import GroupSettingsStore from '../../../stores/GroupSettingsStore';
import GroupSettingsActions from '../../../actions/GroupSettingsActions';
import MessagesPopupActions from '../../../actions/MessagesPopupActions';

class GroupChooser extends Component {
  state = GroupSettingsStore.getState();
  componentWillMount() {
    this.syncStateWithStore = () => this.setState(GroupSettingsStore.getState());
    GroupSettingsStore.addChangeListener(this.syncStateWithStore);
  }
  componentWillUnmount() {
    GroupSettingsStore.removeChangeListener(this.syncStateWithStore);
  }
  handleSubmit(user) {
    GroupSettingsActions.addUser(user);
  }
  handleClickUser({ id }) {
    GroupSettingsActions.toggleSelectedId(id);
  }
  handleClickChooserButton() {
    MessagesPopupActions.showGroupSettings();
  }
  render() {
    const { selectedIds, settings: { users } } = this.state;

    return (
      <div className="messages__section messages__section--group-chooser">
        <Chooser
          onClickUser={this.handleClickUser}
          onSubmit={this.handleSubmit}
          selectState
          selectedIds={selectedIds}
          users={users}
        />
        <FooterButton
          disabled={!selectedIds.length}
          onClick={this.handleClickChooserButton}
          text={i18n.t('buttons.messenger.new_group_next')}
        />
      </div>
    );
  }
}

export default GroupChooser;
