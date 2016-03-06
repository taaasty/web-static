/*global i18n, Mousetrap */
import React, { Component, PropTypes } from 'react';

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
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
  render() {
    return (
      <div className="searchbox">
        <div className="searchbox__close" onClick={this.close.bind(this)}>
          <i className="icon icon--cross" />
        </div>
        <form action={this.props.searchUrl} className="searchbox__form">
          <h5 className="searchbox__title">
            {i18n.t(`searchbox_titles.${this.props.searchKey}`)}
          </h5>
          <input
            autoFocus="true"
            className="searchbox__input"
            name={this.props.searchParam}
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
  onClose: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
  searchParam: PropTypes.string,
  searchUrl: PropTypes.string.isRequired,
};

Searchbox.defaultProps = {
  searchParam: 'q',
};

export default Searchbox;
