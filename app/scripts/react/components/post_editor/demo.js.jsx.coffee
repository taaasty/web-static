###* @jsx React.DOM ###
#
DEMO_IDS=
  text:  18971012
  video: 18970969
  image: 18971001
  quote: 18971004

window.PostEditor_Demo = React.createClass
  mixins:         [ReactActivitiesMixin]

  getDefaultProps: ->
    isTlogPrivate:  false
    #defaultPrivacy: 'public'

  getInitialState: ->
    type: 'text'

  componentDidMount: ->
    entryId = DEMO_IDS[@state.type]
    @loadEntry entryId

  loadEntry: (entryId) ->
    @incrementActivities()
    @setState entry: null
    $.ajax
      url:     Routes.api.entry_url(entryId)
      success: (data) =>
        @setState entry: data, type: data.type
      error:   (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

  changeType: (type) ->
    console.log 'change type'
    @loadEntry DEMO_IDS[type]

  render: ->
    if @state.entry
      `<PostEditor_Layout backUrl={this.props.backUrl} showChoicer={true} entryType={this.props.entry.type} onChangeType={this.changeType}>
          <PostEditor_EditorContainer entry={this.props.entry} isTlogPrivate={this.props.isTlogPrivate} />
       </PostEditor_Layout>`
    else
      `<div>Loading demo posts..</div>`
    #actions = PostActions
      #privacy:         @props.entry.privacy
      #isTlogPrivate:   @props.isTlogPrivate
      #previewMode:     false
      #onChangePrivacy: @changePrivacy
      #onPreview:       @togglePreview
      #onSave:          @saveEntry
      #isLoading:       true
