###* @jsx React.DOM ###

window.PostEditor_ImageEditor = React.createClass
  propTypes:
    entry:       React.PropTypes.object.isRequired
    setLoading:  React.PropTypes.func.isRequired
    isLoading:   React.PropTypes.bool.isRequired

  componentDidMount: ->
    @titleEditor = new MediumEditor @refs.title.getDOMNode(),
      buttons: []
      anchorInputPlaceholder: 'Подпись'
      forcePlainText: true
      cleanPastedHTML: true
      disableToolbar: true
      disableReturn: true

    @refs.title.getDOMNode().focus?()

  componentWillUnmount: ->
    @titleEditor.deactivate()

  render: ->
    cx = React.addons.classSet post: true, 'post--text': true, 'post--image': true, 'post--edit': true, 'state--loading': @props.isLoading
    `<article className={cx}>
      <div className="post__content tasty-editor">
        <PostEditor_ImagesContainer entry={this.props.entry} isVisible={true} isLoading={this.props.isLoading} setLoading={this.props.setLoading} />
        <div className="tasty-editor-content" ref="title" dangerouslySetInnerHTML={{ __html: this.props.entry.title }} />
      </div>
    </article>`
