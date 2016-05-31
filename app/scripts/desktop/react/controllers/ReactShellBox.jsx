/*global $ */
import { defer } from 'lodash';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ShellBox from '../components/ShellBox';

class ReactShellBox {
  constructor() {
    let container = document.querySelectorAll('[shellbox-container]')[0];

    if (!container) {
      container = $('<\div>', {'shellbox-container': ''}).appendTo('body')[0];
    }

    this.shellboxContainer = container;
  }
  show(Component, args) {
    render((
      <ShellBox>
        <Component {...args} />
      </ShellBox>
    ), this.shellboxContainer);
  }
  close() {
    defer(() => unmountComponentAtNode(this.shellboxContainer));
  }
}

export default ReactShellBox;
