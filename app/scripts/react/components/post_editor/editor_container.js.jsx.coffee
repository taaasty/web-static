###* @jsx React.DOM ###
#
window.PostEditor_EditorContainer = React.createClass
  mixins:         [PostEditor_LayoutMixin, ReactActivitiesMixin]
  propTypes:
    backUrl:       React.PropTypes.string
    isTlogPrivate: React.PropTypes.bool.isRequired
    entry:         React.PropTypes.object.isRequired

  getInitialState: ->
    entry:         @props.entry
    previewMode:   false
    isGoing:       false

  render: ->
    `<section className="posts posts--edit">
      <PostActions privacy={this.state.entry.privacy}
                   onChangePrivacy={this.changePrivacy}

                   isTlogPrivate={this.props.isTlogPrivate}

                   previewMode={this.state.previewMode}
                   onPreview={this.togglePreview}

                   isLoading={this.hasActivities() || this.state.isGoing}

                   onSave={this.saveEntry} />
     {this.editorComponent()}
    </section>`

  saveEntry: ->
    return unless @state.entry? && @refs.editor?
    @refs.editor.saveEntry()


