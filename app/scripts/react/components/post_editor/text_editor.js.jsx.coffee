###* @jsx React.DOM ###

window.PostEditor_TextEditor = React.createClass
  propTypes:
    entry:       React.PropTypes.object.isRequired
    setLoading:  React.PropTypes.func.isRequired
    isLoading:   React.PropTypes.bool.isRequired

  componentDidMount: ->
    @titleEditor = new MediumEditor @refs.title.getDOMNode(),
      anchorInputPlaceholder: 'Место для заголовка'
      buttons: []
      forcePlainText: true
      cleanPastedHTML: true
      disableToolbar: true
      disableReturn: true

    @contentEditor = new MediumEditor @refs.content.getDOMNode(),
      anchorInputPlaceholder: 'Начните набирать текст поста. Можно без заголовка, без картинки или без видео.'
      buttons:                ['header1', 'anchor', 'italic', 'quote', 'orderedlist', 'unorderedlist', 'pre']
      firstHeader:     'h1'
      secondHeader:    'h2'
      targetBlank:     true
      cleanPastedHTML: true

    @refs.content.getDOMNode().focus?()

  componentWillUnmount: ->
    @titleEditor.deactivate()
    @contentEditor.deactivate()

  render: ->
    cx = React.addons.classSet post: true, 'post--text': true, 'post--edit': true, 'state--loading': @props.isLoading
    `<article className={cx}>
      <header className="post__header">
        <div className="post__title tasty-editor">
          <div className="tasty-editor-content" ref="title" dangerouslySetInnerHTML={{ __html: this.props.entry.title }}></div>
        </div>
      </header>
      <div className="post__content tasty-editor">
        <div className="tasty-editor-content" ref="content" dangerouslySetInnerHTML={{ __html: this.props.entry.text }} />
      </div>
    </article>`

  savingUrl: ->
    if @props.entry.id?
      Routes.api.update_entry_url @props.entry
    else
      Routes.api.create_entry_url @props.entry.type

  savingMethod: ->
    if @props.entry.id?
      'PUT'
    else
      'POST'

  saveEntry: ->
    @props.setLoading true
    $.ajax
      url:     @savingUrl()
      method:  @savingMethod()
      data:
        title: @refs.title.getDOMNode().innerHTML
        text:  @refs.content.getDOMNode().innerHTML
      success: (data) =>
        @props.setLoading false
        @setState entry: data, type: data.type
      error:   (data) =>
        @props.setLoading false
        TastyNotifyController.errorResponse data


