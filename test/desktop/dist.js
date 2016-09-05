/*global global, describe, it */
import { expect } from 'chai';

const React = global.React;
const { isCompositeComponent, renderIntoDocument } = global.ReactTestUtils;

// Components
const components = {
  AppRoot: {},
  BrowserSupportContainer: {},
  ConfirmRegistrationShellbox: {
    type: 'email',
    postUrl: '',
    proposetSlug: '',
  },
};

Object.keys(components)
  .forEach((componentName) => {
    const props = components[componentName];
    const Component = global[componentName];
    describe(`[Desktop][Component] ${componentName}`, () => {
      it('should render into valid element', () => {
        const component = renderIntoDocument( <
          Component {...props }
          />
        );

        expect(isCompositeComponent(component))
          .to.be.true;
      });
    });
  });
