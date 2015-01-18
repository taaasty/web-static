{ PropTypes } = React

Spinner = React.createClass

  propTypes:
    size: PropTypes.number

  getDefaultProps: ->
    size: 8

  render: ->
    <span className={ 'spinner spinner--' + @getSize() }>
      <span className="spinner__icon" />
    </span>

  getSize: ->
    @props.size + 'x' + @props.size

module.exports = Spinner