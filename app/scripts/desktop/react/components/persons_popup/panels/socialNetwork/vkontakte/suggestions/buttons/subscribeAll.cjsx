#TODO: i18n
SUBSCRIBE_ALL_BUTTON_TEXT     = 'Подписаться на всех'
SUBSCRIBE_ALL_SUCCESS_MESSAGE = 'Вы подписались на всех ваших друзей из Вконтакте'

VkontakteSubscribeAllButton = React.createClass
  mixins: [window.RequesterMixin]

  render: ->
    <button className="manage-persons-button"
            onClick={ @subscribeAll }>
      { SUBSCRIBE_ALL_BUTTON_TEXT }
    </button>

  subscribeAll: ->
    @createRequest
      url: ApiRoutes.suggestions_vkontakte()
      method: 'POST'
      success: ->
        RelationshipsDispatcher.handleServerAction
          type: 'suggestionsSubscribed'
          source: 'vkontakte'

        TastyNotifyController.notifySuccess SUBSCRIBE_ALL_SUCCESS_MESSAGE
      error: (data) =>
        TastyNotifyController.errorResponse data

module.exports = VkontakteSubscribeAllButton