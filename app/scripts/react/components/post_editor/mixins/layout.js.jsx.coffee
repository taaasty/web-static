###* @jsx React.DOM ###

window.TLOG_TYPES = ['public', 'private', 'anonymous']

window.PostEditor_LayoutMixin =
  propTypes:
    tlogType:  React.PropTypes.oneOf(TLOG_TYPES).isRequired

  getInitialState: ->
    previewMode:  false

  togglePreview: -> @setState previewMode: !@state.previewMode
  saveEntry:     -> @refs.editorContainer.saveEntry entryPrivacy: @state.entryPrivacy
  changePrivacy: (value) -> @setState entryPrivacy: value

  onChanging: ->
    @setState isChanged: true

  getChangeTypeCallback: ->
    if @props.onChangeType?
      return @props.onChangeType
    else if @changeType?
      return @changeType
    else
      return null

  render: ->
    `<PostEditor_Layout backUrl={this.props.backUrl}>
      <PostActions entryPrivacy={this.state.entryPrivacy}
                   onChangePrivacy={this.changePrivacy}

                   tlogType={this.props.tlogType}

                   previewMode={this.state.previewMode}
                   onPreview={this.togglePreview}

                   isLoading={this.hasActivities()}

                   onSave={this.saveEntry} />

        <PostEditor_EditorContainer ref='editorContainer'
                                    entry={this.state.entry}
                                    entryType={this.state.entryType}
                                    onChanging={this.onChanging}
                                    activitiesHandler={this.activitiesHandler} />

        <PostEditorChoicer currentType={this.state.entryType} onChangeType={this.getChangeTypeCallback()} />

     </PostEditor_Layout>`



