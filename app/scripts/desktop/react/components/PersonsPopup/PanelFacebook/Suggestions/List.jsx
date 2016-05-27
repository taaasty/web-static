import React, { createClass } from 'react';
import SuggestionListMixin from '../../SocialMixins/SuggestionListMixin';
import FacebookSuggestionsItem from './ListItem';
import FacebookSubscribeAllButton from './SubscribeAllButton';

const FacebookSuggestionsList = createClass({
  displayName: 'FacebookSuggestionsList',
  mixins: [ SuggestionListMixin ],

  listItem() {
    return FacebookSuggestionsItem;
  },
  
  subscribeAllButton() {
    return FacebookSubscribeAllButton;
  },
});

export default FacebookSuggestionsList;
