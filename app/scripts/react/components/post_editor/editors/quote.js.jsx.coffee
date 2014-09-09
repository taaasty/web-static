###* @jsx React.DOM ###

window.PostEditor_QuoteEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser']

  propTypes:
    entryText:   React.PropTypes.string
    entrySource: React.PropTypes.string

  render: ->
   `<article className="post post--quote post--edit">
      <div className="post__content">
        <blockquote className="blockquote">
          <TastyEditor ref="textEditor"
                       placeholder="Текст цитаты (499 символов)"
                       mode="partial"
                       content={ this.props.entryText }
                       isLoading={ this.hasActivities() } />

          <div className="blockquote__caption">
            <span className="blockquote__dash">—</span>
            <TastyEditor ref="sourceEditor"
                         placeholder="Автор (не обязательно)"
                         content={ this.props.entrySource }
                         isLoading={ this.hasActivities() } />
          </div>
        </blockquote>
      </div>
    </article>`

  _getEditorData: ->
    text:   @refs.textEditor.content()
    source: @refs.sourceEditor.content()