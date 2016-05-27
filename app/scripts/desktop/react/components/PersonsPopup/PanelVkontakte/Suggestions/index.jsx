import React, { createClass } from 'react';
import SuggestionsMixin from '../../SocialMixins/SuggestionsMixin';
import List from './List';
import Empty from './Empty';

const VkontakteSuggestions = createClass({
  displayName: 'VkontakteSuggestions',
  mixins: [ SuggestionsMixin ],

  listComponent() {
    return List;
  },
  
  emptyComponent() {
    return Empty;
  },
});

export default VkontakteSuggestions;
