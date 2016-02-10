import React, { createClass, PropTypes } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Results from './Results';

const Dropdown = createClass({
  propTypes: {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  },
  mixins: [LinkedStateMixin],

  getInitialState() {
    return { query: '' };
  },

  componentDidMount() {
    this.refs.chooserInput.focus();
  },

  handleKeyDown(e) {
    const { onCancel, onSubmit } = this.props;
    const chooserResults = this.refs.chooserResults;

    switch (e.key) {
    case 'Enter':
      e.preventDefault();
      if (chooserResults) {
        onSubmit(chooserResults.getSelectedUserId());
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
        <input
          className="messages__chooser-input"
          onKeyDown={this.handleKeyDown}
          ref="chooserInput"
          type="text"
          valueLink={this.linkState('query')}
        />
        {query && 
         <Results
           onSubmit={this.props.onSubmit}
           query={query}
           ref="chooserResults"
         />
        }
      </div>
    );
  },
});

export default Dropdown;
