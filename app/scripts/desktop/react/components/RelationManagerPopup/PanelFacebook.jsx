/*global  */
import React, { createClass } from 'react';
import Suggestions from './Suggestions';
import FacebookSignIn from './FacebookSignIn';

const PanelFacebook = createClass({
  isAuthorized() {
    return CurrentUserStore.hasFacebookAuth();
  },

  renderContent() {
    const { suggestions, suggestionsCount } = this.state;

    return this.isAuthorized()
      ? <Suggestions suggestions={suggestions} suggestionsCount={suggestionsCount} />
      : <FacebookSignIn />;


    return (
      <div className="persons-headline">
        {this.renderSubscribeAllButton()}
        <div className="persons-headline__left">
          {this.getSuggestionsCountMessage()}
        </div>
      </div>
      <ul className="persons">
        {this.renderSuggestionsList()}
      </ul>
    )
  },
});

export default PanelFacebook;


/*
empty message

          {i18n.t('facebook_suggestions_empty')}
-------------------------
list item

    <PersonItem user={suggestion.user}>
      <FollowButton relationship={suggestion} />
    </PersonItem>
-------------------------
subscribe all button

      <button className="manage-persons-button" onClick={this.subscribeAll}>
        {i18n.t('facebook_subscribe_all_button')}
      </button>

subscribe all request

      url: ApiRoutes.suggestions_facebook(),
      method: 'POST',
-------------------------



*/
