/*global i18n */
import React, { PropTypes } from 'react';
import PeopleList from './PeopleList';

function PeopleRecommended({ isFetching, isPremium, people, showGetPremiumPopup }) {
  function handleGetInClick() {
    showGetPremiumPopup();
  }

  return (
    <div className="people-recommended__container">
      <div className="people-recommended__title">
        {i18n.t('people.recommended')}
        {!isPremium &&
         <span className="people-recommended__get-in" onClick={handleGetInClick}>
           {i18n.t('people.get_in')}
         </span>
        }
      </div>
      <PeopleList
        isFetching={isFetching}
        people={people}
        query={null}
      />
    </div>  
  );
}

PeopleRecommended.displayName = 'PeopleRecommended';

PeopleRecommended.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  people: PropTypes.array.isRequired,
  showGetPremiumPopup: PropTypes.func.isRequired,
};

PeopleRecommended.defaultProps = {
  isFetching: false,
  isPremium: false,
  people: [],
};

export default PeopleRecommended;
