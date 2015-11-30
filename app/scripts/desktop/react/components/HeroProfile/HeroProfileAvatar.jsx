import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import UserAvatar from '../avatars/UserAvatar';

const HERO_AVATAR_SIZE = 220;

class HeroProfileAvatar {
  render() {
    const { onClick, user } = this.props;

    return (
      <a
      href={user.tlog_url}
      onClick={onClick}
      >
        <div className="hero__avatar">
          <UserAvatar
            size={HERO_AVATAR_SIZE}
            user={user}
          />
        </div>
      </a>
    );
  }
}

HeroProfileAvatar.propTypes = {
  onClick: PropTypes.func.isRequired,
  user: ProjectTypes.heroUser.isRequired,
};

export default HeroProfileAvatar;
