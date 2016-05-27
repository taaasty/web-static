/*global i18n */
import React from 'react';

function FacebookSuggestionsEmpty() {
  return (
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text">
          {i18n.t('facebook_suggestions_empty')}
        </div>
      </div>
    </div>
  );
}

FacebookSuggestionsEmpty.displayName = 'FacebookSuggestionsEmpty';

export default FacebookSuggestionsEmpty;
