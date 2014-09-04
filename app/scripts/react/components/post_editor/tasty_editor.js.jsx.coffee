###* @jsx React.DOM ###

EDITOR_MODES = ['inline', 'partial', 'rich']

EDITOR_OPTIONS =
  inline:
    disableToolbar:      true
    disableReturn:       true
    disableDoubleReturn: true
    cleanPastedHTML:     true

  rich:
    buttons:             ['anchor', 'italic', 'quote', 'orderedlist', 'unorderedlist'] #'pre
    disableToolbar:      false
    disableReturn:       false
    disableDoubleReturn: false
    cleanPastedHTML:     true
    targetBlank:         true

# Video title
EDITOR_OPTIONS['partial'] = EDITOR_OPTIONS['rich']

# Medium-Editor
window.TastyEditor = React.createClass

  propTypes:
    placeholder: React.PropTypes.string
    content:     React.PropTypes.string
    mode:        React.PropTypes.string
    isLoading:   React.PropTypes.bool
    className:   React.PropTypes.string
    onChange:    React.PropTypes.func.isRequired

  getDefaultProps: ->
    mode:      'inline' # 'rich'
    className: 'tasty-editor-default'

  getInitialState: ->
    isEditing: false

  componentDidMount: ->
    options = placeholder: @placeholder()

    @editor = new MediumEditor @refs.content.getDOMNode(), _.extend(options, EDITOR_OPTIONS[@props.mode])

  componentDidUpdate: ->
    if @props.isLoading then @editor.deactivate?() else @editor.activate?()

    #@editor.html.placeholders()
    #$editor = $ @refs.content.getDOMNode()
    #if @state.isEditing _.defer => $editor.focus()

  componentWillUnmount: ->
    element = @refs.content.getDOMNode()
    $(element).off 'input', @onInput if element?
    @editor.deactivate?() # Medium-Editor

  render: ->
   `<div className={"tasty-editor " + this.props.className}>
      <div className='tasty-editor-content' ref="content" dangerouslySetInnerHTML={{ __html: this.props.content }} />
    </div>`

  placeholder: ->
    @props.placeholder.replace '<br>', "\r\n"

  content: ->
    @refs.content.getDOMNode().innerHTML

  onInput: (event) ->
    @props.onChange? @content()

window.TastyEditor_MediumJS = React.createClass
  propTypes:
    className:   React.PropTypes.string
    placeholder: React.PropTypes.string
    content:     React.PropTypes.string
    mode:        React.PropTypes.string
    onChange:    React.PropTypes.func.isRequired

  getDefaultProps: ->
    className: 'tasty-editor-default'
    mode:      'inline' # 'rich'

  getInitialState: ->
    isEditing: false

  componentDidMount: ->
    switch @props.mode
      when 'rich'
        mode = Medium.richMode
      when 'partial'
        mode = Medium.partialMode
      else # inline
        mode = Medium.inlineMode

    element = @refs.content.getDOMNode()

    $(element).on 'input', @onInput

    @editor = new Medium
      mode:  mode
      debug: true
      element: element
      placeholder: @props.placeholder

    @editor.value @props.content

    console.warn? 'Medium mode', @editor.behavior() unless @editor.behavior() == 'domesticated'

  componentWillUnmount: ->
    element = @refs.content.getDOMNode()
    $(element).off 'input', @onInput if element?
    @editor.destroy?()    # Medium.JS
    @editor.deactivate?() # Medium-Editor

  onInput: (event) ->
    @props.onChange? @content()

  componentDidUpdate: ->
    @editor.html.placeholders()
    #$editor = $ @refs.content.getDOMNode()
    #if @state.isEditing _.defer => $editor.focus()

  content: ->
    @editor.value()
    #@refs.content.getDOMNode().innerHTML

  render: ->
    `<div className={"tasty-editor " + this.props.className}>
      <div className='tasty-editor-content' ref="content" dangerouslySetInnerHTML={{ __html: this.props.content }} />
      </div>`

  #placeholderClick: ->
    #_.defer => @setState isEditing: true

  #isPlaceholderVisible: ->
    #return false if @state.isEditing
    #return false if @props.content? && @props.content.length>0
    #return @props.placeholder? && @props.placeholder.length>0

  #render: ->
    #if @props.placeholder?
      #placeholderClasses = React.addons.classSet 'tasty-editor-placeholder': true, 'state--hidden': !@isPlaceholderVisible()
      #placeholder = React.DOM.div { onClick: this.placeholderClick, className:placeholderClasses,  ref:"placeholder" }, @props.placeholder

    #contentClasses = React.addons.classSet 'tasty-editor-content': true, 'state--hidden': @isPlaceholderVisible()

    #`<div className={"tasty-editor " + @props.className}>
        #{placeholder}
        #<div className={contentClasses} ref="content" dangerouslySetInnerHTML={{ __html: this.props.content }} />
      #</div>`

#componentDidMount: ->
