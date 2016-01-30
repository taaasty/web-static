import React from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';

function HeroProfileHead({ user }) {
  return (
    <div className="hero__head">
      <div className="hero__mask" />
      <div className="hero__title">
        <span>
          <a href={user.tlog_url}>
            {user.slug}
          </a>
        </span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: user.title || '' }} />
      </div>
    </div>
  );
}

HeroProfileHead.propTypes = {
  user: ProjectTypes.heroUser.isRequired,
};

export default HeroProfileHead;
