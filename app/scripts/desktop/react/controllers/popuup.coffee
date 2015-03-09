_ = require 'lodash'
# Popup = require '../components/popupComponent/index'

class PopupController
  containerAttribute: 'popup-container'

  addContainer: (containerAttribute) ->
    container = document.querySelector "[#{containerAttribute}]"

    unless container?
      container = document.createElement 'div'
      container.setAttribute containerAttribute, ''
      document.body.appendChild container

    container

  removeContainer: (container) ->
    container.parentNode?.removeChild container

  open: (Component, props, containerAttribute = @containerAttribute) ->
    container = @addContainer containerAttribute

    React.render <Popup onClose={ @handleClose.bind(@, containerAttribute) }>
                   <Component {...props} />
                 </Popup>, container

  openPopup: (PopupComponent, props, containerAttribute = @containerAttribute) ->
    container = @addContainer containerAttribute

    React.render <PopupComponent {...props}
                     onClose={ @handleClose.bind(@, containerAttribute) } />, container

  close: (containerAttribute = @containerAttribute) ->
    container = document.querySelector "[#{containerAttribute}]"

    React.unmountComponentAtNode container
    @removeContainer container

  handleClose: (containerAttribute) ->
    @close containerAttribute

module.exports = PopupController