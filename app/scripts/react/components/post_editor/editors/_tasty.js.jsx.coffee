###* @jsx React.DOM ###

EDITOR_MODES = ['inline', 'partial', 'rich']

EDITOR_OPTIONS =
  inline:
    disableToolbar:      true
    disableReturn:       true
    disableDoubleReturn: true
    cleanPastedHTML:     true

  partial:
    disableToolbar:      true
    disableReturn:       false
    disableDoubleReturn: true
    cleanPastedHTML:     true

  rich:
    buttons:             ['anchor', 'italic', 'quote', 'orderedlist', 'unorderedlist']
    disableToolbar:      false
    disableReturn:       false
    disableDoubleReturn: false
    cleanPastedHTML:     true
    targetBlank:         true

# Medium-Editor
window.TastyEditor = React.createClass

  propTypes:
    content:     React.PropTypes.string
    mode:        React.PropTypes.string
    placeholder: React.PropTypes.string
    isLoading:   React.PropTypes.bool
    className:   React.PropTypes.string

  getDefaultProps: ->
    mode:      'inline'
    className: 'tasty-editor-default'

  getInitialState: ->
    isEditing: false

  componentDidMount: ->
    options = placeholder: @placeholder()
    @$editor = $( @refs.content.getDOMNode() )
    @mediumEditor = new MediumEditor @$editor.get(0), _.extend(options, EDITOR_OPTIONS[@props.mode])

  componentDidUpdate: ->
    if @props.isLoading then @mediumEditor.deactivate?() else @mediumEditor.activate?()

    @_managePlaceholder()

  componentWillUnmount: ->
    @mediumEditor.deactivate?() # Medium-Editor

  render: ->
   `<div className={"tasty-editor " + this.props.className}>
      <div ref="content"
           className="tasty-editor-content"
           onInput={ this._managePlaceholder }
           dangerouslySetInnerHTML={{ __html: this.props.content }} />
    </div>`

  placeholder: ->
    @props.placeholder.replace '<br>', "\r\n"

  _managePlaceholder: ->
    if @$editor.html() != ''
      @$editor.removeClass 'medium-editor-placeholder'
    else
      @$editor.addClass 'medium-editor-placeholder'

  content: ->
    @refs.content.getDOMNode().innerHTML
