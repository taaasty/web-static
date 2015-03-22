classSet = require 'react/lib/cx'
{ PropTypes } = React

EditorVoteButton = React.createClass
  displayName: 'EditorVoteButton'

  propTypes:
    enabled: PropTypes.bool.isRequired
    onClick: PropTypes.func.isRequired

  componentDidMount: ->
    $button = $( @getDOMNode() )
    $button.tooltip placement: 'bottom'

  componentWillUnmount: ->
    $button = $( @getDOMNode() )
    $button.tooltip 'destroy'

  render: ->
    iconClasses = classSet
      'icon': true
      'post-settings-voting': true
      'post-settings-voted': @props.enabled

    return <button title={ @getTitle() }
                   className="button button--outline-grey post-settings-button"
                   onClick={ @handleClick }>
             <span className={ iconClasses } />
           </button>

  getTitle: ->
    if @props.enabled then i18n.t 'editor_disable_voting' else i18n.t 'editor_enable_voting'

  handleClick: ->
    $button = $( @getDOMNode() )
    $button.tooltip 'hide'
    @props.onClick()

module.exports = EditorVoteButton