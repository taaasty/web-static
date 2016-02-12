/*global i18n */
import React, { Component } from 'react';
import GroupHeaderForm from './GroupHeaderForm';
import UserList from '../Chooser/UserList';
import FooterButton from '../FooterButton';
import GroupSettingsActions from '../../../actions/GroupSettingsActions';
import MessagesPopupActions from '../../../actions/MessagesPopupActions';
import GroupSettingsStore from '../../../stores/GroupSettingsStore';

class GroupSettings extends Component {
  state = GroupSettingsStore.getState();
  componentWillMount() {
    this.syncStateWithStore = () => this.setState();
    GroupSettingsStore.addChangeListener(this.syncStateWithStore);
  }
  componentWillUnmount() {
    GroupSettingsStore.removeChangeListener(this.syncStateWithStore);
  }
  handleSaveSettings() {
    GroupSettingsActions.saveSettings();
  }
  handleClickEditUsers() {
    MessagesPopupActions.showGroupChooser();
  }
  render() {
    const { disabled, selectedIds, settings } = this.state;
    const users = settings.users.filter((u) => selectedIds.indexOf(u.id) > -1);

    return (
      <div className="messages__section messages__section--group-settings">
        <div className="messages__body">
          <GroupHeaderForm />
          <div className="messages__group-list-container">
            <div className="messages__group-list-header">
              {i18n.t('Список участников')}
            </div>
            <span
              className="button button-white messages__group-edit-users"
              onClick={this.handleClickEditUsers}
            >
              {i18n.t('Изменить')}
            </span>
          </div>
          <div className="messages__friends-container">
            <UserList users={users} />
          </div>
        <FooterButton
      disabled={disabled}
      onClick={this.handleSaveSettings}
      text={i18n.t('buttons.messenger.new_group_next')} />
        </div>
      </div>
    );
  }
}

export default GroupSettings;
