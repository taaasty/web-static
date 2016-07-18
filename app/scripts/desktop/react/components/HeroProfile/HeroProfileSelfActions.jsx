/*global i18n */
import React, { PropTypes } from 'react';
import HeroProfileSettingsButton from './HeroProfileSettingsButton';

function  HeroProfileSelfActions({ showSettingsPopup }) {
  return (
    <div className="hero__actions">
      <button className="button button--small button--outline">
        {i18n.t('buttons.actions.thats_you')}
      </button>
      <HeroProfileSettingsButton onClick={showSettingsPopup} />
    </div>
  );
}

HeroProfileSelfActions.propTypes = {
  showSettingsPopup: PropTypes.func.isRequired,
};

export default HeroProfileSelfActions;
