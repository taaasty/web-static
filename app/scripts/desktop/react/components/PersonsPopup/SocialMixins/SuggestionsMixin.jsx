import React, { PropTypes } from 'react';

const SuggestionsMixin = {
  propTypes: {
    suggestions: PropTypes.array,
    suggestionsCount: PropTypes.number,
  },

  hasSuggestions() {
    return this.props.suggestionsCount > 0;
  },

  render() {
    const { suggestions, suggestionsCount } = this.props;
    const ListComponent = this.listComponent();
    const EmptyComponent = this.emptyComponent();

    return this.hasSuggestions()
      ? <ListComponent suggestions={suggestions} suggestionsCount={suggestionsCount} />
      : <EmptyComponent />;
  },
};

export default SuggestionsMixin;
