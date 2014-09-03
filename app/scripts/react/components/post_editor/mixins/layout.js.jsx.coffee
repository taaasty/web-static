###* @jsx React.DOM ###

window.TLOG_TYPES = ['public', 'private', 'anonymous']

window.PostEditor_LayoutMixin =

  propTypes:
    tlogType: React.PropTypes.oneOf(TLOG_TYPES).isRequired
    backUrl:  React.PropTypes.string

  getInitialState: ->
    previewMode: false

  render: ->
   `<PostEditor_Layout backUrl={ this.props.backUrl }>

      <PostActions entryPrivacy={ this.state.entryPrivacy }
                   tlogType={ this.props.tlogType }
                   previewMode={ this.state.previewMode }
                   isLoading={ this.hasActivities() }
                   onSave={ this.saveEntry }
                   onChangePrivacy={ this.changePrivacy }
                   onPreview={ this.togglePreview } />

        <PostEditor_EditorContainer ref="editorContainer"
                                    entry={ this.state.entry }
                                    entryType={ this.state.entryType }
                                    entryPrivacy={ this.state.entryPrivacy }
                                    activitiesHandler={ this.activitiesHandler }
                                    onChanging={ this.onChanging } />

        <PostEditorChoicer currentType={ this.state.entryType }
                           onChangeType={ this.getChangeTypeCallback() } />

     </PostEditor_Layout>`

  saveEntry: ->
    @refs.editorContainer.saveEntry entryPrivacy: @state.entryPrivacy

  togglePreview: ->
    @setState previewMode: !@state.previewMode

  changePrivacy: (value) ->
    @setState entryPrivacy: value

  getChangeTypeCallback: ->
    if @props.onChangeType?
      @props.onChangeType
    else if @changeType?
      @changeType
    else
      null

  onChanging: ->
    @setState isChanged: true