{ PropTypes } = React

TYPE    = 'success'
TIMEOUT = 3000

Notify = React.createClass
  displayName: 'Notify'

  propTypes:
    text:    PropTypes.string.isRequired
    type:    PropTypes.string
    timeout: PropTypes.number
    onClose: PropTypes.func.isRequired

  getDefaultProps: ->
    type:    TYPE
    timeout: TIMEOUT

  componentDidMount: ->
    @timeout = setTimeout @props.onClose, @props.timeout

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout?

  render: ->
    <div className={ "alert alert--" + @props.type }>
      { @props.text }
    </div>

module.exports = Notify