VkontakteSubscribeAllButton = React.createClass
  mixins: [window.RequesterMixin]

  render: ->
    <button className="manage-persons-button"
            onClick={ @subscribeAll }>
      { i18n.t('vkontakte_subscribe_all_button') }
    </button>

  subscribeAll: ->
    @createRequest
      url: ApiRoutes.suggestions_vkontakte()
      method: 'POST'
      success: ->
        RelationshipsDispatcher.handleServerAction
          type: 'suggestionsSubscribed'
          source: 'vkontakte'

        NoticeService.notifySuccess i18n.t 'vkontakte_subscribe_all_success'
      error: (data) =>
        NoticeService.errorResponse data

module.exports = VkontakteSubscribeAllButton