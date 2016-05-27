/*global i18n, RelationshipsDispatcher, RequesterMixin */
import React, { createClass } from 'react';
import ApiRoutes from '../../../../../../shared/routes/api';
import NoticeService from '../../../../services/Notice';

const FacebookSubscribeAllButton = createClass({
  mixins: [ RequesterMixin ],

  subscribeAll() {
    this.createRequest({
      url: ApiRoutes.suggestions_facebook(),
      method: 'POST',
      success: () => {
        RelationshipsDispatcher.handleServerAction({
          type: 'suggestionsSubscribed',
          source: 'facebook',
        });
        NoticeService.notifySuccess(i18n.t('facebook_subscribe_all_success'));
      },
      error: (data) => {
        NoticeService.errorResponse(data);
      },
    });
  },

  render() {
    return (
      <button className="manage-persons-button" onClick={this.subscribeAll}>
        {i18n.t('facebook_subscribe_all_button')}
      </button>
    );
  },
});

export default FacebookSubscribeAllButton;
