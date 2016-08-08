/*global i18n */
import React, { PropTypes } from 'react';
import GroupHeaderForm from './GroupHeaderForm';
import UserList from './UserList';
import FooterButton from '../MessagesPopup/FooterButton';
import Spinner from '../../../../../shared/react/components/common/Spinner';
import {
  saveGroupSettings,
} from '../../actions/GroupSettingsActions';
import {
  closeGroupSettings,
  showGroupChooser,
} from '../../actions/MessagesPopupActions';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';

const emptyUser = Map();

function GroupSettings(props) {
  const {
    admin,
    avatar,
    closeGroupSettings,
    conversationId,
    isAdmin,
    isFetching,
    isValidParams,
    saveGroupSettings,
    showGroupChooser,
    selected,
    topic,
    users,
  } = props;

  function handleSaveSettings() {
    if (!isFetching) {
      saveGroupSettings({
        id: conversationId,
        topic,
        avatar: avatar && avatar.file,
        ids: selected.join(','),
      })
      .then(closeGroupSettings);
    }
  }

  return (
    <div className="messages__section messages__section--group-settings">
      <GroupHeaderForm
        avatar={avatar}
        disabled={!isAdmin}
        topic={topic}
      />
      <div className="messages__group-list-container">
        <div className="messages__group-list-header">
          {conversationId
             ? i18n.t('messenger.group.user_count', { count: users.count() })
             : i18n.t('messenger.group.user_list')
          }
        </div>
        {isAdmin &&
         <span
           className="button button--outline button--black"
           onClick={showGroupChooser}
         >
           {i18n.t('messenger.group.users_edit')}
         </span>
        }
      </div>
      <div className="messages__body">
        <div className="messages__friends-container">
          <UserList
            admin={admin}
            isAdmin={isAdmin}
            users={users}
          />
        </div>
      </div>
      <FooterButton
        disabled={!isAdmin || !isValidParams}
        onClick={handleSaveSettings}
        text={isFetching ? <Spinner size={24} /> : i18n.t('buttons.messenger.new_group_done')}
      />
    </div>
  );
}

GroupSettings.propTypes = {
  admin: PropTypes.object.isRequired,
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  closeGroupSettings: PropTypes.func.isRequired,
  conversationId: PropTypes.number,
  isAdmin: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isValidParams: PropTypes.bool.isRequired,
  saveGroupSettings: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  showGroupChooser: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
};

export default connect(
  (state) => {
    const conversationId = state.msg
      .groupSettings
      .getIn(['data', 'id']);
    const topic = state.msg
      .groupSettings
      .getIn(['data', 'topic'], '');
    const avatar = state.msg
      .groupSettings
      .getIn(['data', 'avatar']);
    const selected = state.msg
      .groupSettings
      .get('selected', List());
    const isFetching = state.msg
      .groupSettings
      .get('isFetching', false);
    const users = state.msg
      .groupSettings
      .getIn(['data', 'users'], List())
      .filter((id) => selected.includes(id))
      .map((id) => state.entities.getIn(['tlog', String(id)], emptyUser));
    const adminId = state.msg.groupSettings.getIn(['data', 'admin']);
    const admin = state.entities
      .getIn(['tlog', adminId && String(adminId)], emptyUser);
    const isAdmin = adminId === state.currentUser.data.id;
    const isValidParams = topic && users.count() > 0;

    return {
      admin,
      avatar,
      conversationId,
      isAdmin,
      isFetching,
      isValidParams,
      selected,
      topic,
      users,
    };
  },
  {
    closeGroupSettings,
    saveGroupSettings,
    showGroupChooser,
  }
)(GroupSettings);
