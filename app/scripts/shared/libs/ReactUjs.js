import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

const CLASS_NAME_ATTR = 'data-react-class';
const PROPS_ATTR = 'data-react-props';

function findReactDOMNodes() {
  const SELECTOR = `[${CLASS_NAME_ATTR}]`;

  return  window.jQuery
    ? window.jQuery(SELECTOR)
    : document.querySelectorAll(SELECTOR);
}

function mountReactComponents() {
  const nodes = findReactDOMNodes();
  let className, component, node, props, propsJson;

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

export function initialize() {
  mountReactComponents();
  if (window.jQuery) {
    window.jQuery(document).on('page:change', mountReactComponents);
  }
}
