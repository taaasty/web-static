###* @jsx React.DOM ###

window.PostEditor_ImageEditor = React.createClass
  mixins:    [PostEditor_PersistenceMixin]

  render: ->
    cx = React.addons.classSet post: true, 'post--image': true, 'post--edit': true, 'state--loading': @props.isLoading
    `<article className={cx}>
      <div className="post__content">
        <PostEditor_ImagesContainer entry={this.props.entry} isVisible={true} isLoading={this.props.isLoading} setLoading={this.props.setLoading} />
        <TastyEditor placeholder="Придумайте подпись, примерно 280 символов (не обязательно)"
                     ref="titleEditor"
                     content={this.props.entry.title}/>
      </div>
    </article>`

  data: ->
    title: @refs.titleEditor.content()
