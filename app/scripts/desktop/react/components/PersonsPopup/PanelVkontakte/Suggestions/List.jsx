import React, { createClass } from 'react';
import SuggestionListMixin from '../../SocialMixins/SuggestionListMixin';
import ListItem from './ListItem';
import SubscribeAllButton from './SubscribeAllButton';

const VkontakteSuggestionsList = createClass({
  displayName: 'VkontakteSuggestionsList',
  mixins: [ SuggestionListMixin ],

  listItem() {
    return ListItem;
  },

  subscribeAllButton() {
    return SubscribeAllButton;
  },
});

export default VkontakteSuggestionsList;
