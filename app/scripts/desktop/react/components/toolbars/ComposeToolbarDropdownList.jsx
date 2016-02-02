/*global i18n */
import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import PopupActionCreators from '../../actions/popup';
import Tooltip from '../common/Tooltip';

class ComposeToolbarDropdownList {
  createFlow(ev) {
    ev.preventDefault();
    PopupActionCreators.createFlow();
  }
  render() {
    const { isFlow, tlogSlug, userSlug } = this.props;
    const context = isFlow ? 'flow' : '';
    const contextSlug = isFlow ? tlogSlug : userSlug;

    return (
      <div className="toolbar__drops">
        <Tooltip placement="left" title={i18n.t('toolbar_new_text_entry', { context })}>
          <div className="toolbar__drop">
            <a className="button button--circle button--emerald" href={Routes.new_entry_url(contextSlug, 'text')}>
              <i className="icon icon--text-circle" />
            </a>
          </div>
        </Tooltip>
        <Tooltip placement="left" title={i18n.t('toolbar_new_image_entry', { context })}>
          <div className="toolbar__drop">
            <a className="button button--circle button--emerald" href={Routes.new_entry_url(contextSlug, 'image')}>
              <i className="icon icon--image-circle" />
            </a>
          </div>
        </Tooltip>
        <Tooltip placement="left" title={i18n.t('toolbar_new_anonymous_entry')}>
          <div className="toolbar__drop">
            <a className="button button--circle button--emerald" href={Routes.new_anonymous_entry_url(userSlug)}>
              <i className="icon icon--question-mark" />
            </a>
          </div>
        </Tooltip>
        <Tooltip placement="left" title={i18n.t('toolbar_new_flow')}>
          <div className="toolbar__drop">
            <a className="button button--circle button--emerald" href="#" onClick={this.createFlow}>
              <i className="icon icon--hash" />
            </a>
          </div>
        </Tooltip>
      </div>
    );
  }
}

ComposeToolbarDropdownList.propTypes = {
  isFlow: PropTypes.bool,
  tlogSlug: PropTypes.string.isRequired,
  userSlug: PropTypes.string.isRequired,
};

export default ComposeToolbarDropdownList;
