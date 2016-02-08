import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import props2redux from './props2redux';

window.STATE_FROM_SERVER = window.STATE_FROM_SERVER || {};

const CLASS_NAME_ATTR = 'data-react-class';
const PROPS_ATTR = 'data-react-props';

function findReactDOMNodes() {
  const SELECTOR = `[${CLASS_NAME_ATTR}]`;

  return  window.jQuery
    ? window.jQuery(SELECTOR)
    : document.querySelectorAll(SELECTOR);
}

function mountReactComponents(root) {
  const nodes = findReactDOMNodes();
  let className, component, node, props, propsJson;

  for(let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    className = node.getAttribute(CLASS_NAME_ATTR);
    if (className === root.name) {
      propsJson = node.getAttribute(PROPS_ATTR);
      props = propsJson && JSON.parse(propsJson);

      window.STATE_FROM_SERVER = Object.assign(window.STATE_FROM_SERVER, { userToolbar: props.userToolbar });
      window.STATE_FROM_SERVER = Object.assign(window.STATE_FROM_SERVER, props2redux(props));

      render(createElement(root, null), node);
      return;
    }
  }

  for(let i = 0; i < nodes.length; i++) {
    node = nodes[i];
    className = node.getAttribute(CLASS_NAME_ATTR);

    component = window[className] || eval.call(window, className);
    if (component) {
      propsJson = node.getAttribute(PROPS_ATTR);
      props = propsJson && JSON.parse(propsJson);

      render(createElement(component, props), node);
    }
  }
}
  
function unmountReactComponents() {
  const nodes = findReactDOMNodes();

  for(let i = 0; i < nodes.length; i++) {
    unmountComponentAtNode(nodes[i]);
  }
}

export function initialize(root) {
  mountReactComponents(root);
  if (window.jQuery) {
    window.jQuery(document).on('page:change', mountReactComponents);
  }
}
