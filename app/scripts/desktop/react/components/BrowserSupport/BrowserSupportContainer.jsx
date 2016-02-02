/*global ReactApp */
import React, { Component } from 'react';
import bowser from 'bowser';
import BrowserSupport from './BrowserSupport';

const MINIMAL_BROWSER_VERSION = {
  'Chrome': 27,
  'Firefox': 25,
  'Safari': 6,
  'Opera': 15,
  'Internet Explorer': 10,
};

const UPDATE_URLS = {
  'Chrome': 'https://www.google.com/chrome/browser',
  'Firefox': 'https://www.mozilla.org/en-US/firefox/new/',
  'Safari': 'https://support.apple.com/en-us/HT204416',
  'Opera': 'http://www.opera.com/download',
  'Internet Explorer': 'https://www.microsoft.com/en-us/download/internet-explorer.aspx',
};

class BrowserSupportContainer extends Component {
  state = {
    name: null,
    version: null,
    updateUrl: null,
    incompatable: null,
  };
  componentDidMount() {
    // Показываем через секунду, чтобы страница успела прогрузиться и показалась
    // анимация и тд.
    window.setTimeout(this.checkCompatability.bind(this), 1000);
  }
  checkCompatability() {
    const name = bowser.browser.name;
    const version = parseFloat(bowser.browser.version);
    let incompatable = null;
    let updateUrl = null;

    if (version < MINIMAL_BROWSER_VERSION[name]) {
      incompatable = true;
      updateUrl = UPDATE_URLS[name];
    } else {
      incompatable = false;
    }

    if (incompatable) {
      ReactApp.layoutStatesController.toggleState('browserIncompatable', true);
    }

    this.setState({ name, version, incompatable, updateUrl });
  }
  render() {
    const { incompatable, name, updateUrl, version } = this.state;

    return incompatable
      ? <BrowserSupport
          name={name}
          updateUrl={updateUrl}
          version={version}
        />
      : null;
  }
}

export default BrowserSupportContainer;
