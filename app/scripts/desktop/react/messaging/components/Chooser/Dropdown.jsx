/*global i18n */
import React, { Component, PropTypes } from 'react';
import Results from './Results';
import {
  setChooserQuery,
  resetChooserQuery,
  selectNext,
  selectPrev,
} from '../../actions/ChooserActions';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';

const emptyUser = Map();

class Dropdown extends Component {
  componentWillMount() {
    this.props.resetChooserQuery();
  }
  componentDidMount() {
    this.refs.input.focus();
  }
  componentWillUnmount() {
    this.props.resetChooserQuery();
  }
  handleSubmit(user) {
    const {
      onSubmit,
      resetChooserQuery,
    } = this.props;

    resetChooserQuery();
    onSubmit(user);
  }
  handleChange(ev) {
    this.props.setChooserQuery(ev.target.value || '');
  }
  handleKeyDown(ev) {
    const {
      resetChooserQuery,
      selectNext,
      selectPrev,
      selectedIndex,
      users,
    } = this.props;

    switch (ev.key) {
    case 'Enter':
      ev.preventDefault();
      if (users.count() > 0) {
        this.handleSubmit(users.get(selectedIndex));
      }
      break;
    case 'Escape':
      ev.preventDefault();
      resetChooserQuery();
      break;
    case 'ArrowUp':
      ev.preventDefault();
      selectPrev();
      break;
    case 'ArrowDown':
      ev.preventDefault();
      selectNext();
      break;
    }
  }
  render() {
    const {
      isFetching,
      query,
      selectedIndex,
      users,
    } = this.props;

    return (
      <div className="messages__chooser-dropdown">
        <div className="messages__chooser-input-wrapper">
          <span className="messages__chooser-input-icon">
            <i className="icon icon--magnifier" />
          </span>
          <input
            className="messages__chooser-input"
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            placeholder={i18n.t('new_thread_placeholder')}
            ref="input"
            type="text"
            value={query}
          />
        </div>
        {query &&
         <Results
           isFetching={isFetching}
           onSubmit={this.handleSubmit.bind(this)}
           query={query}
           selectedIndex={selectedIndex}
           users={users}
         />
        }
      </div>
    );
  }
}

Dropdown.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  resetChooserQuery: PropTypes.func.isRequired,
  selectNext: PropTypes.func.isRequired,
  selectPrev: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  setChooserQuery: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

export default connect(
  (state) => {
    const users = state.msg
      .chooser
      .get('users', List())
      .map((id) => state.entities.getIn(['tlog', String(id)], emptyUser));
    const selectedIndex = state.msg.chooser.get('selectedIndex', 0);
    const isFetching = state.msg.chooser.get('isFetching', false);
    const query = state.msg.chooser.get('query', '');

    return {
      isFetching,
      query,
      selectedIndex,
      users,
    };
  },
  {
    setChooserQuery,
    resetChooserQuery,
    selectNext,
    selectPrev,
  }
)(Dropdown);
