/*global i18n */
import React, { Component, PropTypes } from 'react';
import ResultsItem from './ResultsItem';
import Spinner from '../../../../../shared/react/components/common/Spinner';

class Results extends Component {
  renderContents() {
    const {
      isFetching,
      onSubmit,
      query,
      selectedIndex,
      users,
    } = this.props;

    if (isFetching) {
      return (
        <div className="messages__chooser-empty">
          <Spinner size={24} />
        </div>
      );
    } else if (users.count() === 0) {
      if (query.length > 0) {
        return (
          <div className="messages__chooser-empty">
            {i18n.t('new_thread_unknown_user')}
          </div>
        )
      } else {
        return null;
      }
    } else {
      return users.map((user, i) => (
        <ResultsItem
          key={user.get('id')}
          onClick={onSubmit}
          selected={selectedIndex === i}
          user={user}
        />
      )).valueSeq();
    }
  }
  render() {
    return (
      <div className="messages__chooser-results">
        {this.renderContents()}
      </div>
    );
  }
}

Results.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  users: PropTypes.object.isRequired,
};

export default Results;
