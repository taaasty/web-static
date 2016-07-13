/*global i18n */
import React from 'react';

function VkontakteSuggestionsEmpty() {
  return (
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text">
          {i18n.t('vkontakte_suggestions_empty')}
        </div>
      </div>
    </div>
  );
}

VkontakteSuggestionsEmpty.displayName = 'VkontakteSuggestionsEmpty';

export default VkontakteSuggestionsEmpty;
