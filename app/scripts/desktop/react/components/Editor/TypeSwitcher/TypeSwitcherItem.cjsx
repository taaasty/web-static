classSet = require 'react/lib/cx'
{ PropTypes } = React

EditorTypeSwitcherItem = React.createClass
  displayName: 'EditorTypeSwitcherItem'

  propTypes:
    title: PropTypes.string.isRequired
    icon: PropTypes.string.isRequired
    active: PropTypes.bool.isRequired
    loading: PropTypes.bool.isRequired
    onClick: PropTypes.func

  componentDidMount: ->
    $button = $( @getDOMNode() )
    $button.tooltip()

  componentWillUnmount: ->
    $button = $( @getDOMNode() )
    $button.tooltip 'destroy'

  render: ->
    itemClasses = classSet
      'button': true
      'button--circle': true
      'state--disable': @props.loading
      'state--active' : @props.active

    return <button title={ @props.title }
                   className={ itemClasses }
                   onClick={ @handleClick }>
             <i className={ 'icon ' + @props.icon } />
           </button>

  handleClick: ->
    @props.onClick?() unless @props.loading and @props.active

module.exports = EditorTypeSwitcherItem