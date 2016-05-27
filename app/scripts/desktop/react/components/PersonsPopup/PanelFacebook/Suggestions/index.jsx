import React, { createClass } from 'react';
import SuggestionsMixin from '../../SocialMixins/SuggestionsMixin';
import FacebookSuggestionsList from './List';
import FacebookSuggestionsEmpty from './Empty';

const FacebookSuggestions = createClass({
  displayName: 'FacebookSuggestions',
  mixins: [ SuggestionsMixin ],

  listComponent() {
    return FacebookSuggestionsList;
  },

  emptyComponent() {
    return FacebookSuggestionsEmpty;
  },
});

export default FacebookSuggestions;
