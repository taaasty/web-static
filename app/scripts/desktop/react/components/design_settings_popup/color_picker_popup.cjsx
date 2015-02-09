ColorPicker_Popup = React.createClass
  propTypes:
    color:    React.PropTypes.string
    isDrag:   React.PropTypes.func
    position: React.PropTypes.object

  getInitialState: ->
    currentColor: @props.color

  render: ->
    return <div className="color-picker-popup"
                style={{ top: this.props.position.top, left: this.props.position.left }}>
             <i className="color-picker-popup__arrow"></i>
             <VendorColorPicker defaultValue={ this.state.currentColor }
                                saturationWidth={ 140 }
                                saturationHeight={ 140 }
                                hueWidth={ 6 }
                                onDrag={ this.handleDrag } />
           </div>

  handleDrag: (color, c) ->
    @setState currentColor: color
    @props.onDrag color, c

module.exports = ColorPicker_Popup