/*global i18n */
import React from 'react';
import Helmet from 'react-helmet';

const supportEmail = 'support@taaasty.ru';

function ContactsPage() {
  const title = i18n.t('contacts.title');

  return (
    <div className="page__inner">
      <div className="page__paper">
        <div className="page-body">
          <div className="layout-outer">
            <Helmet title={title} />
            <div className="contacts-contents">
              <h1>
                {title}
              </h1>
              <h2>
                {'KesslerPro O\u00dc'}
              </h2>
              <address>
                {'Pae tn 25-47, Tallinna linn, Harju maakond, 11414'}
              </address>
              <phones>
                {'+79265394999, +79228560559'}
              </phones>
              <email>
                <a href={`mailto:${supportEmail}`} target="_blank">
                  {supportEmail}
                </a>
              </email>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
}

ContactsPage.displayName = 'ContactsPage';

export default ContactsPage;
