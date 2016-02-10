/*global $ */
import React from 'react';
import { render } from 'react-dom';
import TastyLockingAlert from '../components/TastyLockingAlert';

const TastyLockingAlertController = {
  show({title, message, action}) {
    if (window.isMobile()) {
      window.alert(message.replace(/<br\s*[\/]?>/gi, '\n'));

      if (action) {
        action();
      }
    } else {
      let container = document.querySelectorAll('[tasty-alert-container]')[0];

      if (!container) {
        container = $('<\div>', {'tasty-alert-container': ''}).appendTo('body')[0];
      }

      render(
        <TastyLockingAlert
          action={action}
          message={message}
          title={title}
        />,
        container);
    }
  },
};

export default TastyLockingAlertController;
