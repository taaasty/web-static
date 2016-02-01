import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import props2redux from './props2redux';

window.STATE_FROM_SERVER = window.STATE_FROM_SERVER || {};

const CLASS_NAME_ATTR = 'data-react-class';
const PROPS_ATTR = 'data-react-props';

const routedComponents = ['TlogPageContainer', 'EntryPageContainer'];

function findReactDOMNodes() {
  const SELECTOR = `[${CLASS_NAME_ATTR}]`;

  return  window.jQuery
    ? window.jQuery(SELECTOR)
    : document.querySelectorAll(SELECTOR);
}

function mountReactComponents(router) {
  const nodes = findReactDOMNodes();
  let spa = false;
  let className, component, node, props, propsJson;

  for(let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    className = node.getAttribute(CLASS_NAME_ATTR);
    if (routedComponents.indexOf(className) > -1) {
      spa = true;
    }
  }

  for(let i = 0; i < nodes.length; i++) {
    node = nodes[i];
    className = node.getAttribute(CLASS_NAME_ATTR);

    component = window[className] || eval.call(window, className);
    if (component) {
      propsJson = node.getAttribute(PROPS_ATTR);
      props = propsJson && JSON.parse(propsJson);

      if (false && className === 'UserToolbarContainer' && spa) {
        window.STATE_FROM_SERVER = Object.assign(window.STATE_FROM_SERVER, { userToolbar: props });
      } else if (router && routedComponents.indexOf(className) > -1) {
        window.STATE_FROM_SERVER = Object.assign(window.STATE_FROM_SERVER, props2redux(className, props));
        render(createElement(router, null, createElement(component, props)), node);
      } else {
        render(createElement(component, props), node);
      }
    }
  }
}
  
function unmountReactComponents() {
  const nodes = findReactDOMNodes();

  for(let i = 0; i < nodes.length; i++) {
    unmountComponentAtNode(nodes[i]);
  }
}

export function initialize(router) {
  mountReactComponents(router);
  if (window.jQuery) {
    window.jQuery(document).on('page:change', mountReactComponents);
  }
}
