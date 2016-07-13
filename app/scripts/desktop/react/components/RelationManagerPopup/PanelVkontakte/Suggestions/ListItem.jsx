/*global FollowButton */
import React, { PropTypes } from 'react';
import PersonItem from '../../PersonItem';

function VkontakteSuggestionsItem({ suggestion }) {
  return (
    <PersonItem user={suggestion.user}>
      <FollowButton relationship={suggestion} />
    </PersonItem>
  );
}

VkontakteSuggestionsItem.propTypes = {
  suggestion: PropTypes.object.isRequired,
};

export default VkontakteSuggestionsItem;
