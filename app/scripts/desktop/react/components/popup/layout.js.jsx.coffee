###* @jsx React.DOM ###

window.PopupLayout = React.createClass
  mixins: [ReactUnmountMixin]

  propTypes:
    onClose: React.PropTypes.func

  handleClick: (e)->
    if $(e.target).hasClass('popup-container__cell')
      e.preventDefault()
      @close()

  close: ->
    if @props.onClose?
      @props.onClose()
    else
      @unmount()

  render: ->
   `<div className='popup-container'>
      <div className='popup-container__main'>
        <div className='popup-container__cell' onClick={this.handleClick}>
          {this.props.children}
        </div>
      </div>
    </div>`