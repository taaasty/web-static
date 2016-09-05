/*global i18n */
import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import Tooltip from '../common/Tooltip';
import { Link } from 'react-router';
import uri from 'urijs';

function ComposeToolbarDropdownList({ isFlow, showFlowCreatorPopup, tlogSlug, userSlug }) {
  function handleFlowCreatorClick(ev) {
    ev.preventDefault();
    showFlowCreatorPopup();
  }

  const context = isFlow ? 'flow' : '';
  const contextSlug = isFlow ? tlogSlug : userSlug;

  return (
    <div className="toolbar__drops">
      <Tooltip
        container=".toolbar__drops"
        placement="left"
        title={i18n.t('toolbar_new_text_entry', { context })}
      >
        <div className="toolbar__drop">
          <Link
            className="button button--circle button--emerald"
            to={{ pathname: uri(Routes.new_entry_url(contextSlug)).path(), hash: '#text' }}
          >
            <i className="icon icon--text-circle" />
          </Link>
        </div>
      </Tooltip>
      <Tooltip
        container=".toolbar__drops"
        placement="left"
        title={i18n.t('toolbar_new_image_entry', { context })}
      >
        <div className="toolbar__drop">
          <Link
            className="button button--circle button--emerald"
            to={{ pathname: uri(Routes.new_entry_url(contextSlug)).path(), hash: '#image' }}
          >
            <i className="icon icon--image-circle" />
          </Link>
        </div>
      </Tooltip>
      <Tooltip
        container=".toolbar__drops"
        placement="left"
        title={i18n.t('toolbar_new_anonymous_entry')}
      >
        <div className="toolbar__drop">
          <Link
            className="button button--circle button--emerald"
            to={uri(Routes.new_anonymous_entry_url(userSlug)).path()}
          >
            <i className="icon icon--question-mark" />
          </Link>
        </div>
      </Tooltip>
      <Tooltip
        container=".toolbar__drops"
        placement="left"
        title={i18n.t('toolbar_new_flow')}
      >
        <div className="toolbar__drop">
          <a
            className="button button--circle button--emerald"
            href="#"
            onClick={handleFlowCreatorClick}
          >
            <i className="icon icon--hash" />
          </a>
        </div>
      </Tooltip>
    </div>
  );
}

ComposeToolbarDropdownList.propTypes = {
  isFlow: PropTypes.bool,
  showFlowCreatorPopup: PropTypes.func.isRequired,
  tlogSlug: PropTypes.string,
  userSlug: PropTypes.string,
};

export default ComposeToolbarDropdownList;
