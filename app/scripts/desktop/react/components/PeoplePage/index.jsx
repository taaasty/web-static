import React, { Component, PropTypes } from 'react';

class PeoplePage extends Component {
  
}

PeoplePage.displayName = 'PeoplePage';

PeoplePage.propTypes = {
  PeopleActions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
};

export default PeoplePage;
