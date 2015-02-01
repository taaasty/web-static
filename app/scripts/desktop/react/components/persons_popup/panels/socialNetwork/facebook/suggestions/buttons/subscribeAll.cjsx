FacebookSubscribeAllButton = React.createClass
  mixins: [window.RequesterMixin]

  render: ->
    <button className="manage-persons-button"
            onClick={ @subscribeAll }>
      { i18n.t('facebook_subscribe_all_button') }
    </button>

  subscribeAll: ->
    @createRequest
      url: ApiRoutes.suggestions_facebook()
      method: 'POST'
      success: ->
        RelationshipsDispatcher.handleServerAction
          type: 'suggestionsSubscribed'
          source: 'facebook'

        TastyNotifyController.notifySuccess i18n.t 'facebook_subscribe_all_success'
      error: (data) =>
        TastyNotifyController.errorResponse data

module.exports = FacebookSubscribeAllButton