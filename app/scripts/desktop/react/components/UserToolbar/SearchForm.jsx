/*global i18n */
import React, { Component, PropTypes } from 'react';

class SearchForm extends Component {
  componentWillReceiveProps(nextProps) {
    // reset query on path change
    if (nextProps.query !== this.props.query && this.refs.input) {
      this.refs.input.value = nextProps.query || '';
    }
  }
  handleSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(this.refs.input.value);
  }
  render() {
    const { query } = this.props;

    return (
      <div className="search-field-wrapper">
        <span className="search-field__icon" onClick={this.handleSubmit.bind(this)}>
          <i className="icon icon--magnifier" />
        </span>
        <form className="search-field__form" onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="search-field__input"
            defaultValue={query}
            name="query"
            placeholder={i18n.t('new_thread_placeholder')}
            ref="input"
            type="search"
          />
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.string,
};

export default SearchForm;
