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
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  locale: PropTypes.string.isRequired,
};

export default Page;
