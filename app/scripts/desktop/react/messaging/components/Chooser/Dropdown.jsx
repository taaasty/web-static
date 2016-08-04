/*global i18n */
import React, { createClass, PropTypes } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Results from './Results';

const Dropdown = createClass({
  propTypes: {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  },
  mixins: [ LinkedStateMixin ],

  getInitialState() {
    return { query: '' };
  },

  componentDidMount() {
    this.refs.chooserInput.focus();
  },

  handleSubmit(data) {
    this.setState({ query: '' });
    this.props.onSubmit(data);
    this.refs.chooserInput.focus();
  },

  handleKeyDown(e) {
    const { onCancel } = this.props;
    const chooserResults = this.refs.chooserResults;

    switch (e.key) {
    case 'Enter':
      e.preventDefault();
      if (chooserResults) {
        this.handleSubmit(chooserResults.getSelectedUser());
      }
      break;
    case 'Escape':
      e.preventDefault();
      onCancel();
      break;
    case 'ArrowUp':
      e.preventDefault();
      chooserResults.selectPreviousResult();
      break;
    case 'ArrowDown':
      e.preventDefault();
      chooserResults.selectNextResult();
      break;
    }
  },

  render() {
    const { query } = this.state;

    return (
      <div className="messages__chooser-dropdown">
        <div className="messages__chooser-input-wrapper">
          <span className="messages__chooser-input-icon">
            <i className="icon icon--magnifier" />
          </span>
          <input
            className="messages__chooser-input"
            onKeyDown={this.handleKeyDown}
            placeholder={i18n.t('new_thread_placeholder')}
            ref="chooserInput"
            type="text"
            valueLink={this.linkState('query')}
          />
        </div>
        {query && 
         <Results
           onSubmit={this.handleSubmit}
           query={query}
           ref="chooserResults"
         />
        }
      </div>
    );
  },
});

export default Dropdown;
