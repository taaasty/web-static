import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import UserAvatar from '../avatars/UserAvatar';

const HERO_AVATAR_SIZE = 110;
const HERO_AVATAR_SIZE_OPEN = 200;

function HeroProfileAvatar({ onClick, isOpen, user }) {
  return (
    <a href={user.tlog_url} onClick={onClick}>
      <div className="hero__avatar">
        <UserAvatar
          size={isOpen ? HERO_AVATAR_SIZE_OPEN : HERO_AVATAR_SIZE}
          user={user}
        />
      </div>
    </a>
  );
}

HeroProfileAvatar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  user: ProjectTypes.heroUser.isRequired,
};

export default HeroProfileAvatar;
