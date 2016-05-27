/*global FollowButton */
import React, { PropTypes } from 'react';
import PersonItem from '../../PersonItem';

function FacebookSuggestionsItem({ suggestion }) {
  return (
    <PersonItem user={suggestion.user}>
      <FollowButton relationship={suggestion} />
    </PersonItem>
  );
}

FacebookSuggestionsItem.propTypes = {
  suggestion: PropTypes.object.isRequired,
};

export default FacebookSuggestionsItem;
