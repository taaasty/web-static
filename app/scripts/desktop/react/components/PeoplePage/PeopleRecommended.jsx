/*global i18n */
import React, { PropTypes } from 'react';
import PeopleList from './PeopleList';
import PopupActions from '../../actions/PopupActions';

function PeopleRecommended({ isFetching, isPremium, people }) {
  function handleGetInClick(ev) {
    PopupActions.showGetPremiumPopup();
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
};

PeopleRecommended.defaultProps = {
  isFetching: false,
  isPremium: false,
  people: [],
};

export default PeopleRecommended;
