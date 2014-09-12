###* @jsx React.DOM ###

window.TLOG_TYPES = ['public', 'private', 'anonymous']

window.PostEditor_LayoutMixin =

  propTypes:
    tlogType: React.PropTypes.oneOf(TLOG_TYPES).isRequired
    backUrl:  React.PropTypes.string

  getInitialState: ->
    previewMode: false

  render: ->
   `<PostEditor_Layout backUrl={ this.props.backUrl }
                       isLoading={ this.hasActivities() }>

      <PostActions entryPrivacy={ this.state.entryPrivacy }
                   tlogType={ this.props.tlogType }
                   previewMode={ this.state.previewMode }
                   isLoading={ this.hasActivities() }
                   onSave={ this.saveEntry }
                   onChangePrivacy={ this.changePrivacy }
                   onPreview={ this.togglePreviewMode } />

      <PostEditor_EditorContainer ref="editorContainer"
                                  normalizedEntry={ this.state.normalizedEntry }
                                  entryType={ this.state.entryType }
                                  entryPrivacy={ this.state.entryPrivacy }
                                  activitiesHandler={ this.activitiesHandler } />

      <PostEditor_Choicer currentType={ this.state.entryType }
                          isLoading={ this.hasActivities() }
                          onChangeType={ this.changeType } />

    </PostEditor_Layout>`

  saveEntry: ->
    @refs.editorContainer.saveEntry entryPrivacy: @state.entryPrivacy

  togglePreviewMode: ->
    @setState previewMode: !@state.previewMode