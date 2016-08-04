import React, { PropTypes } from 'react';
import UserAvatar from '../UserAvatar';

function SettingsAvatar({ handleUserpicChange, user }) {
  return (
    <div className="settings__hero__avatar">
      <UserAvatar
        size={110}
        user={user}
      />
      <span className="settings__hero__avatar-overlay">
        <input
          accept="image/*"
          className="form-upload__input"
          name="file"
          onChange={handleUserpicChange}
          type="file"
        />
        <span className="form-upload form-upload--icon">
          <span className="form-upload__text">
            <i className="icon icon--pencil" />
          </span>
        </span>
      </span>
    </div>
  );
}

SettingsAvatar.propTypes = {
  handleUserpicChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default SettingsAvatar;
