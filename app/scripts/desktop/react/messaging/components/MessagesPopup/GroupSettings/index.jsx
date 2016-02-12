/*global i18n */
import React, { Component } from 'react';
import GroupHeaderForm from './GroupHeaderForm';
import UserList from '../Chooser/UserList';
import FooterButton from '../FooterButton';
import GroupSettingsActions from '../../../actions/GroupSettingsActions';
import MessagesPopupActions from '../../../actions/MessagesPopupActions';
import GroupSettingsStore from '../../../stores/GroupSettingsStore';
import Spinner from '../../../../../../shared/react/components/common/Spinner';

class GroupSettings extends Component {
  state = GroupSettingsStore.getState();
  componentWillMount() {
    this.syncStateWithStore = () => this.setState(GroupSettingsStore.getState());
    GroupSettingsStore.addChangeListener(this.syncStateWithStore);
  }
  componentWillUnmount() {
    GroupSettingsStore.removeChangeListener(this.syncStateWithStore);
  }
  handleSaveSettings() {
    if (!this.state.isFetching) {
      GroupSettingsActions.saveSettings(this.state.settings);
    }
  }
  handleClickEditUsers() {
    MessagesPopupActions.showGroupChooser();
  }
  render() {
    const { isFetching, selectedIds, settings } = this.state;
    const users = settings.users.filter((u) => selectedIds.indexOf(u.id) > -1);
    const validParams = settings.topic.length && users.length;

    return (
      <div className="messages__section messages__section--group-settings">
        <GroupHeaderForm avatar={settings.avatar} topic={settings.topic} />
        <div className="messages__group-list-container">
          <div className="messages__group-list-header">
            {i18n.t('Список участников')}
          </div>
          <span
            className="button button--outline button--black"
            onClick={this.handleClickEditUsers}
          >
            {i18n.t('Изменить')}
          </span>
        </div>
        <div className="messages__body">
          <div className="messages__friends-container">
            <UserList users={users} />
          </div>
        </div>
        <FooterButton
          disabled={!validParams}
          onClick={this.handleSaveSettings.bind(this)}
          text={isFetching ? <Spinner size={24} /> : i18n.t('buttons.messenger.new_group_done')}
        />
      </div>
    );
  }
}

export default GroupSettings;