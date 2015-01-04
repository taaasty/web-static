{ PropTypes } = React

# Известные размеры:
# - 8x8
# - 15x15
# - 24x24
# - 30x30

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