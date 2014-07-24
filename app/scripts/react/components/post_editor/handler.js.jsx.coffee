###* @jsx React.DOM ###

window.PostEditor_Handler = React.createClass
  propTypes:
    backUrl:       React.PropTypes.string
    isTlogPrivate: React.PropTypes.bool.isRequired
    entry:         React.PropTypes.object.isRequired

  changeType: (type) ->
    console.log 'change type'
    #@loadEntry IDS[type]
    #
  render: ->
    `<PostEditor_Layout backUrl={this.props.backUrl} showChoicer={true} entryType={this.props.entry.type} onChangeType={this.changeType}>
        <PostEditor_EditorContainer entry={this.props.entry} isTlogPrivate={this.props.isTlogPrivate} />
     </PostEditor_Layout>`
