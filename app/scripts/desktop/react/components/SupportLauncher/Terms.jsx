/*global i18n */
import React from 'react';
import Routes from '../../../../shared/routes/routes';
import { Link } from 'react-router';

function Terms() {
  return (
    <div className="terms-panel">
      <ul className="terms-panel__list">
        <li className="terms-panel__item">
          <Link className="terms-panel__item-link" to={Routes.contacts()}>
            {i18n.t('terms.panel.contacts')}
          </Link>
        </li>
        <li className="terms-panel__item">
          <Link className="terms-panel__item-link" to={Routes.terms()}>
            {i18n.t('terms.panel.terms')}
          </Link>
        </li>
        <li className="terms-panel__item">
          <Link className="terms-panel__item-link" to={Routes.prices()}>
            {i18n.t('terms.panel.prices')}
          </Link>
        </li>
      </ul>
    </div>
  );
}

Terms.displayName = 'Terms';

export default Terms;
