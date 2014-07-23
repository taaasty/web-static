###* @jsx React.DOM ###

window.PostEditor_QuoteEditor = React.createClass
  mixins:    [PostEditor_PersistenceMixin, ReactActivitiesUser]

  render: ->
    `<article className="post post--quote post--edit">
      <div className="post__content">
        <blockquote className="blockquote">
          <TastyEditor placeholder="Текст цитаты (499 символов)" ref="textEditor" content={this.props.entry.text}/>
          <div className="blockquote__caption">
            <span className="blockquote__dash">—</span>
            <TastyEditor placeholder="Автор (не обязательно)" ref="sourceEditor" content={this.props.entry.source}/>
          </div>
        </blockquote>
      </div>
    </article>`

  data: ->
    text:    @refs.textEditor.content()
    source:  @refs.sourceEditor.content()

