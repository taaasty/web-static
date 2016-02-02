import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import TlogAlert from '../../../../../app/scripts/desktop/react/components/TlogAlert/TlogAlert';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('[Component] TlogAlert', () => {
  it('should render without errors', () => {
    const renderedComponent = renderIntoDocument(
      <TlogAlert text="Hello!" />
    );
    expect(renderedComponent).to.be.an('object');
  });
});
