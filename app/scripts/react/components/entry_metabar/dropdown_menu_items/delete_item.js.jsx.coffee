###* @jsx React.DOM ###

POST_DELETE_ANIMATION_SPEED = 300

window.EntryMetabarDropdownMenuDeleteItem = React.createClass
  mixins: [RequesterMixin, 'ReactActivitiesUser']

  propTypes:
    entryId:          React.PropTypes.number.isRequired
    successDeleteUrl: React.PropTypes.string
    onDelete:         React.PropTypes.func

  getInitialState: ->
    isProcess: false

  render: ->
    if @state.isProcess
      icon = `<span className="spinner spinner--15x15">
                <span className="spinner__icon"></span>
              </span>`
    else
      icon = `<i className="icon icon--basket"></i>`

    `<a onClick={ this.onClick }
        className="meta-item__dropdown-item">
      { icon }
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
    @setState isProcess: true
    @incrementActivities()
    @createRequest
      url: Routes.api.entry_url @props.entryId
      method: 'DELETE'
      success: =>
        if @props.successDeleteUrl?
          window.location = @props.successDeleteUrl
        else
          @removeEntryFromDOM()
      error: (data) => TastyNotifyController.errorResponse data
      complete: =>
        @setState isProcess: false
        @decrementActivities()

  removeEntryFromDOM: ->
    $postNode = $("[data-id='#{@props.entryId}'")

    $postNode.slideUp(POST_DELETE_ANIMATION_SPEED, =>
      @props.onDelete() if @props.onDelete?
      $postNode.remove()
    )