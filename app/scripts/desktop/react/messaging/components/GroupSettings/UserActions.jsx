/*global i18n */
import React, { PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import DropdownActionSPA from '../../../components/common/DropdownActionSPA';

function UserActions(props) {
  const {
    admin,
    isAdmin,
    openConversation,
    unselectUser,
    user,
  } = props;
  const adminId = admin.get('id');
  const userId = user.get('id');
  const tlogUrl = user.get('tlogUrl');

  function handleClickConversation() {
    openConversation(userId);
  }

  function handleClickRemoveUser() {
    unselectUser(user);
  }

  return (
    <div className="messages__group-user-actions">
      <DropdownActions>
        <DropdownActionSPA
          icon=""
          key="tlog"
          title={i18n.t('messenger.group.to_tlog')}
          url={tlogUrl}
        />
        <DropdownAction
          icon=""
          key="conversation"
          onClick={handleClickConversation}
          title={i18n.t('messenger.group.conversation')}
        />
        {(isAdmin && adminId !== userId) &&
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
  admin: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  openConversation: PropTypes.func.isRequired,
  unselectUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserActions;
