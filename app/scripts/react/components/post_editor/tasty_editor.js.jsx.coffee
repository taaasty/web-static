###* @jsx React.DOM ###
#
window.TastyEditor = React.createClass
  propTypes:
    className:   React.PropTypes.string
    placeholder: React.PropTypes.string
    content:     React.PropTypes.string
    mode:        React.PropTypes.string

  getDefaultProps: ->
    className: 'tasty-editor-default'
    mode: 'inline' # 'rich'

  getInitialState: ->
    isEditing: false

  componentDidMount: ->
    if @props.mode=='inline'
      mode = Medium.inlineMode
    else
      mode = Medium.richMode

    @editor = new Medium
      mode:  mode
      debug: true
      element: @refs.content.getDOMNode()
      placeholder: @props.placeholder

    console.warn? 'Medium mode', @editor.behavior() unless @editor.behavior() == 'domesticated'

  componentWillUnmount: ->
    @editor.destroy?()    # Medium.JS
    @editor.deactivate?() # Medium-Editor

  componentDidUpdate: ->
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
  #@editor = new MediumEditor @refs.content.getDOMNode(),
    ## Неработает
    ##placeholder:            'aaaa'
    #buttons:                []
    #cleanPastedHTML:        true
    #disableReturn:          true
    #disableToolbar:         true
  #@contentEditor = new MediumEditor @refs.content.getDOMNode(),
    #buttons:                ['header1', 'anchor', 'italic', 'quote', 'orderedlist', 'unorderedlist', 'pre']
    #firstHeader:     'h1'
    #secondHeader:    'h2'
    #targetBlank:     true
    #cleanPastedHTML: true

  #@$editor = $ @refs.content.getDOMNode()

  #@$editor.focus => @setState isEditing: true
  #@$editor.blur  => @setState isEditing: false

  #console.log 'init editor', @editor

  ##@$editor.focus() unless @isPlaceholderVisible()


