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
    let container = this.getContainer();

    React.render(
      <PadContainer {...props} onClose={this.close.bind(this)}>
        <Component />
      </PadContainer>
    , container);
  }

  close() {
    let container = this.getContainer();
    React.unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
  }
}

export default PadController;