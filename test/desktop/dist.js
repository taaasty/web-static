/*global global */
import { expect } from 'chai';

const React = global.React;
const { isCompositeComponent, renderIntoDocument } = global.ReactTestUtils;

// Components
const components = {
  AppRoot: {},
  ImageAttachmentsCollage: {
    imageAttachments: [],
  },
  ConfirmRegistrationShellbox: {
    type: 'email',
    postUrl: '',
    proposetSlug: '',
  },
  TlogAlertContainer: {},
};

Object.keys(components).forEach((componentName) => {
  const props = components[componentName];
  const Component = global[componentName];
  describe(`[Desktop][Component] ${componentName}`, () => {
    it('should render into valid element', () => {
      const component = renderIntoDocument(
          <Component {...props} />
      );

      expect(isCompositeComponent(component)).to.be.true;
    });
  });
});
