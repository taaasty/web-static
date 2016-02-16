/*global i18n */
import React, { Component } from 'react';
import GroupHeaderForm from './GroupHeaderForm';
import UserList from './UserList';
import FooterButton from '../FooterButton';
import GroupSettingsActions from '../../../actions/GroupSettingsActions';
import MessagesPopupActions from '../../../actions/MessagesPopupActions';
import GroupSettingsStore from '../../../stores/GroupSettingsStore';
import CurrentUserStore from '../../../../stores/current_user';
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
    const { isFetching, selectedIds, settings: { avatar, id, topic } } = this.state;

    if (!isFetching) {
      GroupSettingsActions.saveSettings({
        id,
        topic,
        avatar: avatar && avatar.file,
        ids: selectedIds.join(','),
      });
    }
  }
  handleClickEditUsers() {
    MessagesPopupActions.showGroupChooser();
  }
  render() {
    const { isFetching, selectedIds, settings } = this.state;
    const users = settings.users.filter((u) => selectedIds.indexOf(u.id) > -1);
    const adminId = settings.admin && settings.admin.id;
    const isAdmin = settings.id
            ? adminId === CurrentUserStore.getUserID()
            : true;
    const validParams = settings.topic.length && users.length;

    return (
      <div className="messages__section messages__section--group-settings">
        <GroupHeaderForm
          avatar={settings.avatar}
          disabled={!isAdmin}
          topic={settings.topic}
        />
        <div className="messages__group-list-container">
          <div className="messages__group-list-header">
            {settings.id
               ? i18n.t('messenger.group.user_count', { count: users.length })
               : i18n.t('messenger.group.user_list')
            }
          </div>
          {isAdmin &&
           <span
             className="button button--outline button--black"
             onClick={this.handleClickEditUsers}
           >
             {i18n.t('messenger.group.users_edit')}
           </span>
          }
        </div>
        <div className="messages__body">
          <div className="messages__friends-container">
            <UserList
              adminId={adminId}
              isAdmin={isAdmin}
              users={users}
            />
          </div>
        </div>
        <FooterButton
          disabled={!isAdmin || !validParams}
          onClick={this.handleSaveSettings.bind(this)}
          text={isFetching ? <Spinner size={24} /> : i18n.t('buttons.messenger.new_group_done')}
        />
      </div>
    );
  }
}

export default GroupSettings;
