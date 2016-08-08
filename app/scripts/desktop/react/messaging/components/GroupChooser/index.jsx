/*global i18n */
import React, { PropTypes } from 'react';
import Chooser from '../Chooser';
import FooterButton from '../MessagesPopup/FooterButton';
import {
  showGroupSettings,
} from '../../actions/MessagesPopupActions';
import {
  addGroupUser,
  toggleSelectedUser,
} from '../../actions/GroupSettingsActions';
import { connect } from 'react-redux';
import { Map, OrderedSet } from 'immutable';

const emptySet = OrderedSet();
const emptyUser = Map();

function GroupChooser(props) {
  const {
    addGroupUser,
    selected,
    showGroupSettings,
    toggleSelectedUser,
    users,
  } = props;

  return (
    <div className="messages__section messages__section--group-chooser">
      <Chooser
        isFetching={false}
        onClickUser={toggleSelectedUser}
        onSubmit={addGroupUser}
        selectState
        selected={selected}
        users={users}
      />
      <FooterButton
        disabled={selected.count() === 0}
        onClick={showGroupSettings}
        text={i18n.t('buttons.messenger.new_group_next')}
      />
    </div>
  );
}

GroupChooser.propTypes = {
  addGroupUser: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  showGroupSettings: PropTypes.func.isRequired,
  toggleSelectedUser: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,

}

export default connect(
  (state) => {
    const selected = state
      .msg
      .groupSettings
      .get('selected', emptySet);
    const users = state
      .msg
      .groupSettings
      .getIn(['data', 'users'], emptySet)
      .map((id) => state.entities.getIn(['tlog', String(id)], emptyUser));

    return {
      selected,
      users,
    }
  },
  {
    addGroupUser,
    showGroupSettings,
    toggleSelectedUser,
  }
)(GroupChooser);
