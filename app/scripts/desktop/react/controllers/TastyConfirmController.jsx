/*global $, isMobile, TastyConfirm */
import React from 'react';
import { render } from 'react-dom';

export default {
  show({ message, acceptButtonText, rejectButtonText, acceptButtonColor, onAccept }) {
    if (isMobile()) {
      const regex = /<br\s*[\/]?>/gi;
      const messageWithoutBR = message.replace(regex, '\n');

      if (confirm(messageWithoutBR)) {
        if (typeof onAccept === 'function') {
          onAccept.call();
        }
      }
    } else {
      let container = document.querySelectorAll('[tasty-confirm-container]')[0];

      if (!container) {
        container = $('<\div>', {'tasty-confirm-container': ''}).appendTo('body')[0];
      }

      render((
        <TastyConfirm
          acceptButtonColor={acceptButtonColor}
          acceptButtonText={acceptButtonText}
          message={message}
          onAccept={onAccept}
          rejectButtonText={rejectButtonText}
        />
      ), container);
    }
  },
};
