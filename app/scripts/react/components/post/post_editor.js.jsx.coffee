###* @jsx React.DOM ###
#
rangy.init()

Highlighter = ->
  @button = document.createElement("button")
  @button.className = "medium-editor-action"
  @button.innerText = "H"
  @button.onclick = @onClick.bind(this)
  @classApplier = rangy.createCssClassApplier("highlight",
    elementTagName: "mark"
    normalize: true
  )
  return
Highlighter::onClick = ->
  @classApplier.toggleSelection()
  return

Highlighter::getButton = ->
  @button

Highlighter::checkState = (node) ->
  @button.classList.add "medium-editor-button-active"  if node.tagName is "MARK"
  return

window.PostEditor = React.createClass

  getDefaultProps: ->
    title: 'Да это же самый простой редактор в мире!'
    content: '<p>Только бы не сделать его слишком <a href="http://bling.by/map" title="простым">простым</a> и от этого непонятным. Чтобы этого не случилось, давайте поработаем только с текстовыми постами.</p><iframe width="712" height="400" src="//www.youtube.com/embed/yfGj75PTB5M" frameborder="0" allowfullscreen></iframe><p>NOTICE: This demo doesn`t include actual upload of images, because it`s hosted on GitHub. You can of course try to upload any file, but only our demo image will be displayed.</p>'

  componentDidMount: ->
    @titleEditor = new MediumEditor @refs.title.getDOMNode(),
      buttons: []
      anchorInputPlaceholder: 'Место для заголовка'
      forcePlainText: true
      cleanPastedHTML: true
      disableToolbar: true
      disableReturn: true

    @contentEditor = new MediumEditor @refs.content.getDOMNode(),
      buttons:       ['highlight', 'bold', 'italic', 'underline', 'quote']
      anchorInputPlaceholder:   'Начните набирать текст поста. Можно без заголовка, без картинки или без видео.'
      #allowMultiParagraphSelection: false
      firstHeader:   'h1'
      secondHeader:  'h2'
      targetBlank:   true
      cleanPastedHTML: true
      extensions:
        highlight: new Highlighter()
      #autofocus:    false

    @refs.content.getDOMNode().focus?()

  componentWillUnmount: ->
    @titleEditor.deactivate()
    @contentEditor.deactivate()

    #@titleEditor.destroy()
    #@contentEditor.destroy()


  render: ->
    # placeholder = <div class="tasty-editor-placeholder state--hidden">Начните набирать текст поста. Можно без заголовка, без картинки или без видео.</div>
    #<div class="tasty-editor-placeholder state--hidden">Место для заголовка, <span class="form-upload form-upload--image"><span class="form-upload__text">картинки</span><input id="text-image" class="form-upload__input" type="file" name="text-image" /></span> или <span class="form-upload form-upload--video"><span class="form-upload__text">видео</span><input id="text-video" class="form-upload__input" type="file" name="text-video" /></span></div>
    `<article className="post post--text post--edit">
      <header className="post__header">
        <div className="post__title tasty-editor">
          <div className="tasty-editor-content" ref="title" dangerouslySetInnerHTML={{ __html: this.props.title }}></div>
        </div>
      </header>
      <div className="post__content tasty-editor">
        <div className="tasty-editor-content" ref="content" dangerouslySetInnerHTML={{ __html: this.props.content }} />
      </div>
    </article>`

#mediumjs
  #componentDidMount: ->
    #@titleEditor = new Medium
      #debug:        true
      #element:      @refs.title.getDOMNode()
      #mode:         Medium.inlineMode
      #placeholder: 'Место для заголовка'
      #maxLength:    300
      #autofocus:    true

    #@contentEditor = new Medium
      #debug:        true
      #element:      @refs.content.getDOMNode()
      #mode:         Medium.richMode
      #placeholder: 'Начните набирать текст поста. Можно без заголовка, без картинки или без видео.'
      ##autofocus:    false


