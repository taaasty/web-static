###* @jsx React.DOM ###

window.PostEditor_QuoteEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser']

  render: ->
    `<article className="post post--quote post--edit">
      <div className="post__content">
        <blockquote className="blockquote">
          <TastyEditor ref="textEditor"
                       placeholder="Текст цитаты (499 символов)"
                       content={this.props.entry.text}
                       isLoading={ this.hasActivities() }
                       onChange={this.getChangeCallback('text')} />

          <div className="blockquote__caption">
            <span className="blockquote__dash">—</span>
            <TastyEditor ref="sourceEditor"
                         placeholder="Автор (не обязательно)"
                         content={ this.props.entry.source }
                         isLoading={ this.hasActivities() }
                         onChange={this.getChangeCallback('source')} />
          </div>
        </blockquote>
      </div>
    </article>`

  data: ->
    text:   @refs.textEditor.content()
    source: @refs.sourceEditor.content()