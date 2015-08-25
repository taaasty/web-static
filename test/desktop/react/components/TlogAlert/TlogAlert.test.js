import React, { addons, PropTypes } from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import TlogAlert from '../../../../../app/scripts/desktop/react/components/TlogAlert/TlogAlert';
const { renderIntoDocument } = addons.TestUtils;

describe('[Component] TlogAlert', () => {
  it('should render without errors', () => {
    const renderedComponent = renderIntoDocument(
      <TlogAlert text="Hello!" />
    );
    expect(renderedComponent).to.be.an('object');
  });
});