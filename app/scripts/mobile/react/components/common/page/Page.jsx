/*global i18n, moment */
import React, { Component, PropTypes } from 'react';

class Page extends Component {
  componentWillMount() {
    const { locale } = this.props;
    
    if (locale !== i18n.language) {
      i18n.changeLanguage(locale);
    }
    moment.locale(locale);
  }
  render() {
    const { children, className } = this.props;

    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  className: PropTypes.string,
  locale: PropTypes.string.isRequired,
};

export default Page;
