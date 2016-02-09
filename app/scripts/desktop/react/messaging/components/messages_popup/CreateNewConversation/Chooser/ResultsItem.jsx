import React, { PropTypes } from 'react';
import classnames from 'classnames';
import UserAvatar from '../../../../../components/UserAvatar';

function ResultsItem({ onClick, predictedUser, selected }) {
  const itemClasses = classnames({
    'messages__chooser-result': true,
    'state--active': selected,
  });

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    onClick(predictedUser.id);
  }

  return (
    <div className={itemClasses} onClick={handleClick}>
      <div className="messages__person">
        <div className="messages__person-avatar">
          <UserAvatar size={35} user={predictedUser} />
        </div>
        <div className="messages__person-name">
          {predictedUser.slug}
        </div>
      </div>
    </div>
  );
}

ResultsItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  predictedUser: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default ResultsItem;
