###* @jsx React.DOM ###

window.PostEditor_NewDemo = window.PostEditor_NewPost

DEMO_IDS=
  text:  18971012
  video: 18970969
  image: 18971001
  quote: 18971004

window.PostEditor_Demo = React.createClass
  mixins:         [ReactActivitiesMixin]

  getInitialState: ->
    entryPrivacy: 'public'
    entryType:    'text'
    entry:        null

  componentDidMount: ->
    @loadEntry DEMO_IDS[@state.entryType]

  loadEntry: (entryId) ->
    @incrementActivities()
    @setState entry: null
    $.ajax
      url:     Routes.api.entry_url(entryId)
      success: (data) =>
        @setState entry: data, entryType: data.type, entryPrivacy: data.privacy
      error:   (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

  changeType: (type) ->
    console.log 'change type', type
    @setState entryType: type
    @loadEntry DEMO_IDS[type]

  fallback: ->
    console.log 'fallback'

  render: ->
    console.log 'demo', @state.entry
    if @state.entry?
      `<PostEditor_EditPost backUrl={this.props.backUrl} entry={this.state.entry} onChangeType={this.changeType}/>`
    else
      `<PostEditor_Layout backUrl={this.props.backUrl}>
          <PostActions entryPrivacy='public'
                     onChangePrivacy={this.fallback}

                     isTlogPrivate={false}

                     previewMode={false}
                     onPreview={this.fallback}

                     isLoading={false}

                     onSave={this.fallback} />
                     <div>Loading demo posts..</div>

          <PostEditorChoicer currentType={this.state.entryType} onChangeType={this.changeType} />
        </PostEditor_Layout>`

