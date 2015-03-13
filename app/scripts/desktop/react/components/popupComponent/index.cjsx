PopupHeader = require './popupHeader'
{ PropTypes } = React

Popup = React.createClass
  displayName: 'Popup'

  propTypes:
    title: PropTypes.string.isRequired
    fullScreen: PropTypes.bool
    className: PropTypes.string
    children: PropTypes.element.isRequired
    onClose: PropTypes.func.isRequired

  getDefaultProps: ->
    fullScreen: false

  render: ->
    popupClasses = listClasses = ['popup', @props.className].join ' '

    popup = <div className={ popupClasses }>
              <PopupHeader
                  title={ @props.title }
                  onClose={ @props.onClose } />
              <div className="popup__body">
                { @props.children }
              </div>
            </div>

    if @props.fullScreen
      return <div className="popup-container">
               <div className="popup-container__main">
                 <div className="popup-container__cell">
                   { popup }
                 </div>
               </div>
             </div>
    else
      return popup

module.exports = Popup


