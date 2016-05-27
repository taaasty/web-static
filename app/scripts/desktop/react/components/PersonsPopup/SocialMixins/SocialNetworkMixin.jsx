/*global i18n, RelationshipsStore, ComponentManipulationsMixin */
import React from 'react';
import ConnectStoreMixin from '../../../../../shared/react/mixins/connectStore';

const ERROR_STATE   = 'error';
const LOADED_STATE  = 'loaded';
const LOADING_STATE = 'loading';

const SocialNetworkPanelMixin = {
  mixins: [ ConnectStoreMixin(RelationshipsStore), ComponentManipulationsMixin ],

  getInitialState() {
    return {
      currentState: LOADED_STATE,
    };
  },

  componentWillMount() {
    if (this.isAuthorized) {
      this.loadPanelData();
    }
  },

  activateLoadingState() {
    this.safeUpdateState({ currentState: LOADING_STATE });
  },

  activateLoadedState() {
    this.safeUpdateState({ currentState: LOADED_STATE });
  },

  activateErrorState() {
    this.safeUpdateState({ currentState: ERROR_STATE });
  },

  renderMessage(message) {
    return (
      <div className="grid-full">
        <div className="grid-full__middle">
          <div className="popup__text">
            {message}
          </div>
        </div>
      </div>
    );
  },

  _renderContent(state) {
    switch (state) {
    case ERROR_STATE:
      return this.renderMessage(i18n.t('persons_popup_error'));
    case LOADING_STATE:
      return this.renderMessage(i18n.t('persons_popup_loading'));
    case LOADED_STATE:
      return this.renderContent();
    default:
      console.warn(`Unknown state of ${this._currentElement.type.displayName} component", state`);
      return <noscript />;
    }
  },

  render() {
    return (
      <div className="tabs-panel">
        {this._renderContent(this.state.currentState)}
      </div>
    );
  },
};

export default SocialNetworkPanelMixin;
