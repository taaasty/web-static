###* @jsx React.DOM ###

POST_DELETE_ANIMATION_SPEED = 300

window.MetabarDropdownMenuDeleteItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    entryId:          React.PropTypes.number.isRequired
    successDeleteUrl: React.PropTypes.string.isRequired
    onDelete:         React.PropTypes.func

  render: ->
    `<a onClick={ this.onClick }
        className="meta-item__dropdown-item">
      <i className="icon icon--basket"></i>
      Удалить
    </a>`

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    TastyConfirmController.show
      message:          "Вы действительно хотите удалить запись?<br />Её нельзя будет восстановить."
      acceptButtonText: "Удалить запись"
      onAccept:         @deleteEntry

  deleteEntry: ->
    @createRequest
      url: Routes.api.entry_url @props.entryId
      method: 'DELETE'
      success: =>
        if @props.successDeleteUrl?
          window.location = @props.successDeleteUrl
        else
          @removeEntryFromDOM()
      error: (data) => TastyNotifyController.errorResponse data

  removeEntryFromDOM: ->
    $postNode = $("[data-id='#{@props.entryId}'")

    $postNode.slideUp(POST_DELETE_ANIMATION_SPEED, =>
      @props.onDelete() if @props.onDelete?
      $postNode.remove()
    )