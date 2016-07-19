import React, { PropTypes } from 'react';
import SettingsAvatar from './SettingsAvatar';
import SettingsSlug from './SettingsSlug';
import SettingsTitle from './SettingsTitle';

function SettingsHeader({ handleSlugChange, handleTitleChange, handleUserpicChange, user }) {
  const { slug, title, design: { backgroundImageUrl } } = user;

  return (
    <div className="settings__header">
      <div
        className="settings__hero"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="settings__hero__overlay" />
        <div className="settings__hero__box">
          <SettingsAvatar handleUserpicChange={handleUserpicChange} user={user} />
          <SettingsSlug handleChange={handleSlugChange} slug={slug} />
          <SettingsTitle handleChange={handleTitleChange} title={title} />
        </div>
      </div>
    </div>
  );
}

SettingsHeader.propTypes = {
  handleSlugChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUserpicChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
  
export default SettingsHeader;
