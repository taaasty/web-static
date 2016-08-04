/*global i18n */
import React, { PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import ConversationActions from '../../actions/ConversationActions';
import GroupSettingsActions from '../../actions/GroupSettingsActions';
import { browserHistory } from 'react-router';
import uri from 'urijs';

function UserActions({ adminId, isAdmin, user }) {
  function handleClickConversation() {
    ConversationActions.openConversation(user.id);
  }

  function redirectToTlog(ev) {
    ev.preventDefault();
    browserHistory.push({ pathname: uri(user.tlog_url).path() });
  }

  function handleClickRemoveUser() {
    GroupSettingsActions.unselectId(user.id);
  }

  return (
    <div className="messages__group-user-actions">
      <DropdownActions>
        <DropdownAction
          icon=""
          key="tlog"
          onClick={redirectToTlog}
          title={i18n.t('messenger.group.to_tlog')}
          url={user.tlog_url}
        />
        <DropdownAction
          icon=""
          key="conversation"
          onClick={handleClickConversation}
          title={i18n.t('messenger.group.conversation')}
        />
        {(isAdmin && adminId !== user.id) &&
           <DropdownAction
             icon=""
             key="remove"
             onClick={handleClickRemoveUser}
             title={i18n.t('messenger.group.remove_user')}
           />
         }
      </DropdownActions>
    </div>
  );
}

UserActions.displayName = 'UserActions';

UserActions.propTypes = {
  adminId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserActions;
