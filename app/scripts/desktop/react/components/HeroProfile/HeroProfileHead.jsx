import React from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import { Link } from 'react-router';
import uri from 'urijs';

function HeroProfileHead({ user: { slug, title, tlog_url } }) {
  function renderSlug() {
    return window.SPA
      ? <Link to={uri(tlog_url).path()}>{slug}</Link>
      : <a href={tlog_url}>{slug}</a>;
  }

  return (
    <div className="hero__head">
      <div className="hero__mask" />
      <div className="hero__title">
        <span>
          {renderSlug()}
        </span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: title || '' }} />
      </div>
    </div>
  );
}

HeroProfileHead.propTypes = {
  user: ProjectTypes.heroUser.isRequired,
};

export default HeroProfileHead;
