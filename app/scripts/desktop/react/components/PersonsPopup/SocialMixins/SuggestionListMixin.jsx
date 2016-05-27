/*global i18n, ReactGrammarMixin, ScrollerMixin */
import React, { PropTypes } from 'react';

const SuggestionListMixin = {
  mixins: [ ReactGrammarMixin, ScrollerMixin ],

  propTypes: {
    suggestions: PropTypes.array.isRequired,
    suggestionsCount: PropTypes.number.isRequired,
  },

  renderSuggestionsList() {
    const ListItem = this.listItem();

    return this.props.suggestions.map((suggestion) => (
        <ListItem key={suggestion.user.id} suggestion={suggestion} />
    ));
  },

  renderSubscribeAllButton() {
    const SubscribeAllButton = this.subscribeAllButton();

    return this.props.suggestions.length > 1
      ? (
        <div className="persons-headline__right">
          <SubscribeAllButton />
        </div>
      )
      : <noscript />;
  },

  getSuggestionsCountMessage() {
    return i18n.t('suggestions_found', { count: this.props.suggestionsCount });
  },

  render() {
    return (
      <div className="scroller scroller--persons" ref="scroller">
        <div className="scroller__pane js-scroller-pane">
          <div className="persons-headline">
            {this.renderSubscribeAllButton()}
            <div className="persons-headline__left">
              {this.getSuggestionsCountMessage()}
            </div>
          </div>
          <ul className="persons">
            {this.renderSuggestionsList()}
          </ul>
        </div>
        <div className="scroller__track js-scroller-track">
          <div className="scroller__bar js-scroller-bar" />
        </div>
      </div>
    );
  },
};

export default SuggestionListMixin;
