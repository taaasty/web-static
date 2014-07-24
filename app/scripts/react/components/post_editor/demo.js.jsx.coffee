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
    entryType: 'text'
    entry: null

  componentDidMount: ->
    entryId = DEMO_IDS[@state.entryType]
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
    console.log 'change type', type
    @setState entryType: type
    @loadEntry DEMO_IDS[type]

  render: ->
    if @state.entry?
      `<PostEditor_Layout backUrl={this.props.backUrl} showChoicer={true} entryType={this.state.entryType} onChangeType={this.changeType}>
          <PostEditor_EditorContainer entry={this.state.entry} isTlogPrivate={this.props.isTlogPrivate} />
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
