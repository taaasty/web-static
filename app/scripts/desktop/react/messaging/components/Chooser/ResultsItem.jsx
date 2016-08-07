import React, { PropTypes } from 'react';
import classnames from 'classnames';
import UserAvatar from '../../../components/UserAvatar';
import UserSlug from '../../../components/UserSlug';

function ResultsItem({ onClick, user, selected }) {
  const itemClasses = classnames({
    'messages__chooser-result': true,
    'state--active': selected,
  });

  function handleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    onClick(user);
  }

  return (
    <div className={itemClasses} onClick={handleClick}>
      <div className="messages__person">
        <div className="messages__person-avatar">
          <UserAvatar size={35} user={user.toJS()} />
        </div>
        <div className="messages__person-name">
          <UserSlug user={user} />
        </div>
      </div>
    </div>
  );
}

ResultsItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default ResultsItem;
