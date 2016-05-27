/*global i18n, RequesterMixin, RelationshipsDispatcher */
import React, { createClass } from 'react';
import ApiRoutes from '../../../../../../shared/routes/api';
import NoticeService from '../../../../services/Notice';

const VkontakteSubscribeAllButton = createClass({
  mixins: [ RequesterMixin ],

  subscribeAll() {
    this.createRequest({
      url: ApiRoutes.suggestions_vkontakte(),
      method: 'POST',
      success: () => {
        RelationshipsDispatcher.handleServerAction({
          type: 'suggestionsSubscribed',
          source: 'vkontakte',
        });
        NoticeService.notifySuccess(i18n.t('vkontakte_subscribe_all_success'));
      },
      error: (data) => {
        NoticeService.errorResponse(data);
      },
    });
  },

  render() {
    return (
      <button className="manage-persons-button" onClick={this.subscribeAll}>
        {i18n.t('vkontakte_subscribe_all_button')}
      </button>
    );
  },
});

export default VkontakteSubscribeAllButton;
