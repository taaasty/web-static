/*global RequesterMixin, CurrentUserStore, RelationshipsDispatcher, RelationshipsStore */
import React, { createClass } from 'react';
import ApiRoutes from '../../../../../shared/routes/api';
import NoticeService from '../../../services/Notice';
import SocialNetworkMixin from '../SocialMixins/SocialNetworkMixin';
import Suggestions from './Suggestions';
import VkontakteSignIn from './VkontakteSignIn';

const PanelVkontakte = createClass({
  displayName: 'PanelVkontakte',
  mixins: [ SocialNetworkMixin, RequesterMixin ],

  getStateFromStore() {
    return {
      suggestions: RelationshipsStore.getVkontakteSuggestions(),
      suggestionsCount: RelationshipsStore.getVkontakteSuggestionsTotalCount(),
    };
  },

  isAuthorized() {
    return CurrentUserStore.hasVkontakteAuth();
  },

  loadPanelData() {
    this.activateLoadingState();

    this.createRequest({
      url: ApiRoutes.suggestions_vkontakte(),
      success: (suggestions) => {
        RelationshipsDispatcher.handleServerAction({
          type: 'suggestionsLoaded',
          source: 'vkontakte',
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
      : <VkontakteSignIn />;
  },
});

export default PanelVkontakte;
