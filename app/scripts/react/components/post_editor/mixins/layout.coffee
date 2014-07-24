###* @jsx React.DOM ###

window.PostEditor_LayoutMixin =
  propTypes:
    isTlogPrivate: React.PropTypes.bool

  getDefaultProps: ->
    isTlogPrivate:  false

  getInitialState: ->
    previewMode:  false

  togglePreview: -> @setState previewMode: !@state.previewMode
  saveEntry:     -> @refs.editorContainer.saveEntry entryPrivacy: @state.entryPrivacy
  changePrivacy: (value) -> @setState entryPrivacy: value

  render: ->
    console.log @hasActivities()
    `<PostEditor_Layout backUrl={this.props.backUrl}>
      <PostActions entryPrivacy={this.state.entryPrivacy}
                   onChangePrivacy={this.changePrivacy}

                   isTlogPrivate={this.props.isTlogPrivate}

                   previewMode={this.state.previewMode}
                   onPreview={this.togglePreview}

                   isLoading={this.hasActivities()}

                   onSave={this.saveEntry} />

        <PostEditor_EditorContainer ref='editorContainer'
                                    entry={this.state.entry}
                                    activitiesHandler={this.activitiesHandler} />

        <PostEditorChoicer currentType={this.state.entryType} onChangeType={this.changeType} />

     </PostEditor_Layout>`

