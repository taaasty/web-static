/*global CurrentUserStore, RequesterMixin, RelationshipsStore, RelationshipsDispatcher */
import React, { createClass } from 'react';
import NoticeService from '../../../services/Notice';
import ApiRoutes from '../../../../../shared/routes/api';
import SocialNetworkMixin from '../SocialMixins/SocialNetworkMixin';
import Suggestions from './Suggestions';
import FacebookSignIn from './FacebookSignIn';

const PanelFacebook = createClass({
  displayName: 'PanelFacebook',
  mixins: [ SocialNetworkMixin, RequesterMixin ],

  getStateFromStore() {
    return {
      suggestions: RelationshipsStore.getFacebookSuggestions(),
      suggestionsCount: RelationshipsStore.getFacebookSuggestionsTotalCount(),
    };
  },

  isAuthorized() {
    return CurrentUserStore.hasFacebookAuth();
  },

  loadPanelData() {
    this.activateLoadingState();

    this.createRequest({
      url: ApiRoutes.suggestions_facebook(),
      success: (suggestions) => {
        return RelationshipsDispatcher.handleServerAction({
          type: 'suggestionsLoaded',
          source: 'facebook',
          suggestions: suggestions,
        });
      },
      error: (data) => {
        this.activateErrorState();
        NoticeService.errorResponse(data);
      },
      complete: () => {
        this.activateLoadedState();
      },
    });
  },

  renderContent() {
    const { suggestions, suggestionsCount } = this.state;

    return this.isAuthorized()
      ? <Suggestions suggestions={suggestions} suggestionsCount={suggestionsCount} />
      : <FacebookSignIn />;
  },
});

export default PanelFacebook;
