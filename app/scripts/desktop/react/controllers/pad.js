import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PadContainer from '../components/Pad/PadContainer';

class PadController {
  constructor() {
    this.containerAttribute = 'pad-container';
  }

  getContainer() {
    let container = document.querySelector(`[${this.containerAttribute}]`);

    if (container == null) {
      container = document.createElement('div');
      container.setAttribute(this.containerAttribute, '');
      document.body.appendChild(container);
    }

    return container;
  }

  open(Component, props) {
    const container = this.getContainer();

    render(
      <PadContainer {...props} onClose={this.close.bind(this)}>
        <Component />
      </PadContainer>
    , container);
  }

  close() {
    let container = this.getContainer();
    unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
  }
}

export default PadController;
