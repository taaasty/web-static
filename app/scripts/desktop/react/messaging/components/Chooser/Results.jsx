/*global i18n, RequesterMixin, NoticeService */
import React, { createClass, PropTypes } from 'react';
import ApiRoutes from '../../../../../shared/routes/api';
import ResultsItem from './ResultsItem';

const LOADING_STATE = 'loadingState';
const LOADED_STATE = 'loadedState';
const EMPTY_STATE = 'emptyState';

const Results = createClass({
  propTypes: {
    onSubmit: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  },
  mixins: [RequesterMixin],

  getInitialState() {
    return {
      currentState: LOADING_STATE,
      predictedUsers: [],
      selectedUserIndex: 0,
    };
  },

  componentDidMount() {
    this.loadPredictions(this.props.query);
  },

  componentWillReceiveProps({ query }) {
    if (this.props.query !== query) {
      this.loadPredictions(query);
    }
  },

  activateEmptyState() {
    this.setState({ currentState: EMPTY_STATE });
  },

  activateLoadedState() {
    this.setState({ currentState: LOADED_STATE });
  },

  selectPreviousResult() {
    this._moveHighlight(-1);
  },

  selectNextResult() {
    this._moveHighlight(1);
  },

  loadPredictions(query) {
    if (this.req) {
      this.removeActiveRequest(this.req);
      this.req.abort();
    }

    this.req = this.createRequest({
      url: ApiRoutes.users_predict(),
      method: 'GET',
      data: { query },
      success: (predictedUsers) => {
        this.setState({ predictedUsers });

        if (predictedUsers.length === 0) {
          this.activateEmptyState();
        } else {
          this.activateLoadedState();
        }
      },
      error(errMsg) {
        NoticeService.errorResponse(errMsg);
      },
    });
  },

  getSelectedUser() {
    return this.state.predictedUsers[this.state.selectedUserIndex];
  },

  _moveHighlight(delta) {
    const usersCount = this.state.predictedUsers.length;
    const userIndex  = this.state.selectedUserIndex;

    if (usersCount > 0) {
      if ((userIndex > 0 && delta < 0) || (userIndex < usersCount - 1 && delta > 0)) {
        this.setState({ selectedUserIndex: userIndex + delta });
      }
    }
  },

  renderResults() {
    const { predictedUsers, selectedUserIndex } = this.state;

    return predictedUsers.map((predictedUser, i) => (
      <ResultsItem
        key={predictedUser.id}
        onClick={this.props.onSubmit}
        predictedUser={predictedUser}
        selected={selectedUserIndex === i}
      />
    ));
  },

  render() {
    const { currentState } = this.state;

    return (
      <div className="messages__chooser-results">
        {currentState === LOADED_STATE
         ? this.renderResults()
         : currentState === EMPTY_STATE
           ? <div className="messages__chooser-empty">
               {i18n.t('new_thread_unknown_user')}
             </div>
           : <noscript />
        }
      </div>
    );
  },
});

export default Results;
