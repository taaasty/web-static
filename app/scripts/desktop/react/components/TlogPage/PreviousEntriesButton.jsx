/*global i18n */
import React, { Component, PropTypes } from 'react';
import queryString from 'query-string';

class PreviousEntriesButton extends Component {
  state = {
    visible: false,
  }
  componentDidMount() {
    const queryHash = queryString.parse(window.location.search);
    this.setState({ visible: queryHash.since_entry_id });
  }
  render() {
    return (
      this.state.visible
        ? <div className="previous-entries-button-container">
            <div className="previous-entries-button">
              <a href={this.props.href}>
                {i18n.t('buttons.load_previous_entries')}
              </a>
            </div>
          </div>
        : null
    );
  }
}

PreviousEntriesButton.propTypes = {
  href: PropTypes.string.isRequired,
};

export default PreviousEntriesButton;
