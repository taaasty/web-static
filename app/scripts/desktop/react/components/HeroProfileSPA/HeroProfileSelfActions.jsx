/*global i18n */
import React from 'react';
import HeroProfileSettingsButton from './HeroProfileSettingsButton';
import PopupActions from '../../actions/popup';

function  HeroProfileSelfActions() {
  return (
    <div className="hero__actions">
      <button className="button button--small button--outline">
        {i18n.t('buttons.actions.thats_you')}
      </button>
      <HeroProfileSettingsButton onClick={PopupActions.showSettings} />
    </div>
  );
}

HeroProfileSelfActions.propTypes = {
};

export default HeroProfileSelfActions;
