import React, { PropTypes } from 'react';
import Avatar from '../../../../../shared/react/components/common/AvatarCamelCase';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryRepostTargetItem({ onSelect, target: { name, tlogUrl, flowpic, userpic } }) {
  function handleClick(ev) {
    ev.preventDefault();
    onSelect();
  }

  return (
    <article className="user__item">
      <Link
        className="user__link"
        onClick={handleClick}
        title={name}
        to={uri(tlogUrl).path()}
      >
        <span className="user__avatar">
          <Avatar
            size={40}
            userpic={flowpic || userpic}
          />
        </span>
        <span className="user__desc">
          <span className="user__name">
            {name}
          </span>
        </span>
      </Link>
    </article>
  );
}

EntryRepostTargetItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
  target: PropTypes.object.isRequired,
};

export default EntryRepostTargetItem;
