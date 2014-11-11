###* @jsx React.DOM ###

window.PostEditor_NewDemo = window.PostEditor_NewPost

DEMO_IDS =
  image: 19322364

window.PostEditor_Demo = React.createClass
  mixins: ['ReactActivitiesMixin', RequesterMixin, ComponentManipulationsMixin]

  getInitialState: ->
    entryPrivacy: 'public'
    entryType:    'image'
    entry:        null

  componentDidMount: ->
    @loadEntry DEMO_IDS[@state.entryType]

  loadEntry: (entryId) ->
    @incrementActivities()
    @setState(entry: null)

    @createRequest
      url: ApiRoutes.entry_url(entryId)
      success: (data) =>
        @safeUpdateState {
          entry:        data
          entryType:    data.type
          entryPrivacy: data.privacy
        }
      error: (data) =>
        TastyNotifyController.errorResponse data
      complete: => @decrementActivities()

  changeType: (type) ->
    console.log 'change type', type
    @setState entryType: type
    @loadEntry DEMO_IDS[type]

  fallback: ->
    console.log 'fallback'

  render: ->
    console.log 'demo', @state.entry
    if @state.entry?
      `<PostEditor_EditPost entry={ this.state.entry }
                            backUrl={ this.props.backUrl } />`
    else
      `<PostEditor_Layout backUrl={this.props.backUrl}>
          <PostActions entryPrivacy='public'
                     onChangePrivacy={this.fallback}

                     tlogType='public'

                     previewMode={false}
                     onPreview={this.fallback}

                     isLoading={false}

                     onSave={this.fallback} />
                     <div>Loading demo posts..</div>

          <PostEditor_Choicer currentType={this.state.entryType} />
        </PostEditor_Layout>`