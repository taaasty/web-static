/*global i18n, moment */
import React, { PropTypes } from 'react';

export default class Page {
  static propTypes = {
    locale: PropTypes.string.isRequired,
  };
  componentWillMount() {
    const { locale } = this.props;
    
    if (locale !== i18n.lng()) {
      i18n.setLng(locale);
    }
    moment.locale(locale);
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
