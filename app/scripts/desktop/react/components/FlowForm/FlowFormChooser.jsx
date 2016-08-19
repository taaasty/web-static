import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {
  predictFlowUsers,
  resetFlowUsers,
  selectNextFlowUser,
  selectPrevFlowUser,
} from '../../actions/FlowUsersActions';
import FlowFormChooserResults from './FlowFormChooserResults';
import FlowFormChooserButton from './FlowFormChooserButton';
import Spinner from '../../../../shared/react/components/common/Spinner';
import { connect } from 'react-redux';
import { Map } from 'immutable';

const emptyUser = Map();

class FlowFormChooser extends Component {
  state = {
    open: false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.limitReached && this.props.limitReached != nextProps.limitReached) {
      this.setState({ open: false });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.open && prevState.open != this.state.open) {
      this.refs.field.focus();
    }
  }
  chooseResult(result) {
    const { onChoose, resetFlowUsers } = this.props;

    this.setState({ open: false });
    onChoose(result);
    resetFlowUsers();
  }
  handleButtonClick() {
    if (!this.props.limitReached) {
      this.setState({ open: true });
    }
  }
  handleFieldChange(ev) {
    const { predictFlowUsers, resetFlowUsers } = this.props;
    const { value } = ev.target;

    return value ? predictFlowUsers(value) : resetFlowUsers();
  }
  handleFieldKeyDown(ev) {
    const { selected, selectNextFlowUser, selectPrevFlowUser, users } = this.props;

    switch(ev.key) {
      case 'Enter':
        ev.preventDefault();
        if (users.length) {
          this.chooseResult(users[selected]);
        }
        break;
      case 'Escape':
        ev.preventDefault();
        this.setState({ open: false });
        break;
      case 'ArrowUp':
        ev.preventDefault();
        selectPrevFlowUser();
        break;
      case 'ArrowDown':
        ev.preventDefault();
        selectNextFlowUser();
        break;
    }
  }
  handleFieldBlur() {
    if (this.props.query === '') {
      this.setState({ open: false });
    }
  }
  renderSpinner() {
    return (
      <div className="flow-form__chooser-loading">
        <Spinner size={24} />
      </div>
    );
  }
  renderResults() {
    const { selected, users } = this.props;

    return (
      <FlowFormChooserResults
        onResultClick={this.chooseResult.bind(this)}
        results={users}
        selected={selected}
      />
    );
  }
  render() {
    const { isFetching, limitReached, query } = this.props;
    const chooserClasses = classNames('flow-form__chooser', {
      'state--open': this.state.open,
      'state--disabled': limitReached,
    });

    return (
      <div className={chooserClasses}>
        <FlowFormChooserButton
          limitReached={limitReached}
          onClick={this.handleButtonClick.bind(this)}
        />
        <div className="flow-form__chooser-dropdown">
          <input
            className="flow-form__chooser-input"
            onBlur={this.handleFieldBlur.bind(this)}
            onChange={this.handleFieldChange.bind(this)}
            onKeyDown={this.handleFieldKeyDown.bind(this)}
            ref="field"
            type="text"
            value={query}
          />
          {isFetching ? this.renderSpinner() : this.renderResults()}
        </div>
      </div>
    );
  }
}

FlowFormChooser.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  limitReached: PropTypes.bool,
  onChoose: PropTypes.func.isRequired,
  predictFlowUsers: PropTypes.func.isRequired,
  query: PropTypes.string,
  resetFlowUsers: PropTypes.func.isRequired,
  selectNextFlowUser: PropTypes.func.isRequired,
  selectPrevFlowUser: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
};

export default connect(
  (state, ownProps) => {
    const { result, isFetching, query, selected } = state.flowUsers;

    return {
      ...ownProps,
      isFetching,
      query,
      selected,
      users: result.map((id) => state.entities.getIn([ 'tlog', String(id) ], emptyUser)),
    };
  },
  { predictFlowUsers, resetFlowUsers, selectNextFlowUser, selectPrevFlowUser }
)(FlowFormChooser);
