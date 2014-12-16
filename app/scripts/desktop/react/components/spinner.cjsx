window.Spinner = React.createClass

  # Известные размеры:
  # - 8x8
  # - 15x15
  # - 24x24
  # - 31x31
  # - 70x70

  propTypes:
    size: React.PropTypes.number

  getDefaultProps: ->
    size: 8

  render: ->
    <span className={ 'spinner spinner--' + this._getSize() }>
      <span className="spinner__icon" />
    </span>

  _getSize: -> @props.size + 'x' + @props.size