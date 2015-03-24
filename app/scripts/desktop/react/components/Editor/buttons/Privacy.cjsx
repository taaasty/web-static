classSet = require 'react/lib/cx'
{ PropTypes } = React

EditorPrivacyButton = React.createClass
  displayName: 'EditorPrivacyButton'

  propTypes:
    live: PropTypes.bool.isRequired
    private: PropTypes.bool.isRequired
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
      'icon--unlock': !@props.private
      'icon--lock': @props.private

    return <button title={ @getTitle() }
                   className="button button--outline-grey post-settings-button"
                   onClick={ @handleClick }>
             <span className={ iconClasses } />
           </button>

  getTitle: ->
    title = if @props.private then i18n.t 'editor_private_entry' else i18n.t 'editor_public_entry'
    title = i18n.t 'editor_public_with_voting_entry' if @props.live
    title

  handleClick: ->
    $button = $( @getDOMNode() )
    $button.tooltip 'hide'
    @props.onClick()

module.exports = EditorPrivacyButton