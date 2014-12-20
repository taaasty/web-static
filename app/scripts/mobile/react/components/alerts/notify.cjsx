TYPE    = 'success'
TIMEOUT = 3000

Notify = React.createClass
  displayName: 'Notify'

  propTypes:
    text:    React.PropTypes.string.isRequired
    type:    React.PropTypes.string
    timeout: React.PropTypes.number
    onClose: React.PropTypes.func.isRequired

  getDefaultProps: ->
    type:    TYPE
    timeout: TIMEOUT

  componentDidMount: ->
    @timeout = setTimeout @handleTimeout, @props.timeout

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout?

  render: ->
    <div className={ "alert alert--" + @props.type }>
      { @props.text }
    </div>

  handleTimeout: ->
    @props.onClose @

module.exports = Notify