import React, { PropTypes } from 'react';
import UserAvatar from '../UserAvatar/new';

const HERO_AVATAR_SIZE = 110;
const HERO_AVATAR_SIZE_OPEN = 200;

function HeroProfileAvatar({ onClick, isOpen, user }) {
  return (
    <a href={user.get('tlogUrl')} onClick={onClick}>
      <div className="hero__avatar">
        <UserAvatar
          size={isOpen ? HERO_AVATAR_SIZE_OPEN : HERO_AVATAR_SIZE}
          user={user.toJS()}
        />
      </div>
    </a>
  );
}

HeroProfileAvatar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default HeroProfileAvatar;
