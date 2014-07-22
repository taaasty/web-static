###* @jsx React.DOM ###

window.PostEditor_VideoEditor = React.createClass
  mixins:    [PostEditor_PersistenceMixin]

  getInitialState: ->
    embedUrl:  @props.entry.video_url
    embedHtml: @props.entry.iframely.html
    title:     @props.entry.title

  render: ->
    cx = React.addons.classSet post: true, 'post--video': true, 'post--edit': true, 'state--loading': @props.isLoading
    `<article className={cx}>
      <div className="post__content">
        <VideoMediaBox onSuccessLoad={this.successLoaded}
                       embedUrl={this.state.embedUrl}
                       embedHtml={this.state.embedHtml}/>
        <TastyEditor placeholder="Придумайте подпись, примерно 280 символов (не обязательно)"
                     ref="titleEditor"
                     content={this.state.title}/>
      </div>
    </article>`

  successLoaded: (iframely) ->
    @setState
      embedUrl:  iframely.url
      embedHtml: iframely.html
      title:     iframely.meta.description || iframely.meta.title

  data: ->
    title: @refs.titleEditor.content()
