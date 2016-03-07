/*global i18n, Mousetrap */
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

class Searchbox extends Component {
  componentDidMount() {
    this.boundClose = this.close.bind(this);
    Mousetrap.bind('esc', this.boundClose);
  }
  componentWillUnmount() {
    Mousetrap.unbind('esc', this.boundClose);
  }
  close() {
    this.props.onClose();
  }
  handleKeyDown(ev) {
    if (ev.key === 'Escape') {
      this.close();
    }
  }
  handleSubmit(ev) {
    const { pathname, query } = this.props.location;
    const q = ev.target.elements && ev.target.elements.q && ev.target.elements.q.value;

    ev.preventDefault();
    browserHistory.push({ pathname, query: { ...query, q }});
  }
  render() {
    return (
      <div className="searchbox">
        <div className="searchbox__close" onClick={this.close.bind(this)}>
          <i className="icon icon--cross" />
        </div>
        <form
          className="searchbox__form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <h5 className="searchbox__title">
            {i18n.t(`searchbox_titles.${this.props.searchKey}`)}
          </h5>
          <input
            autoFocus="true"
            className="searchbox__input"
            name="q"
            onKeyDown={this.handleKeyDown.bind(this)}
            placeholder={i18n.t('searchbox_placeholder')}
            type="text"
          />
        </form>
      </div>
    );
  }
}

Searchbox.propTypes = {
  location: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
};

export default Searchbox;
