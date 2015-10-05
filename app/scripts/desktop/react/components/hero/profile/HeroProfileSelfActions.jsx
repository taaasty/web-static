/*global i18n */
import React from 'react';
import HeroProfile_SettingsButton from './buttons/Settings';
import PopupActions from '../../../actions/popup';

class HeroProfileSelfActions {
  showSettings() {
    PopupActions.showSettings();
  }
  render() {
    return (
      <div className="hero__actions">
        <button className="button button--small button--outline">
          {i18n.t('buttons.actions.thats_you')}
        </button>
        <HeroProfile_SettingsButton onClick={this.showSettings} />
      </div>
    );
  }
}

HeroProfileSelfActions.propTypes = {
};

export default HeroProfileSelfActions;
