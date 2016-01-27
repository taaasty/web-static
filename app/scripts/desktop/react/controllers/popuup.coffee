_ = require 'lodash'
{ render, unmountComponentAtNode } = require 'react-dom';
Popup = require '../components/PopupComponent/Popup'
PopupArea = require '../components/PopupComponent/PopupArea'

class PopupController
  containerAttribute: 'popup-container'
  popupBGContainerAttribute: 'popup-bg-container'

  addContainer: (containerAttribute) ->
    container = document.querySelector "[#{containerAttribute}]"

    unless container?
      container = document.createElement 'div'
      container.setAttribute containerAttribute, ''
      document.body.appendChild container

    container

  removeContainer: (container) ->
    container.parentNode?.removeChild container

  open: ({Component, props, popupProps, containerAttribute}) ->
    containerAttribute ?= @containerAttribute
    container = @addContainer containerAttribute
    popupProps.onClose = @handleClose.bind(@, containerAttribute)

    render (
      <Popup {...popupProps}>
        <Component {...props} />
      </Popup>
    ), container

  openWithBackground: ({Component, props, popupProps, containerAttribute}) ->
    containerAttribute ?= @popupBGContainerAttribute
    container = @addContainer containerAttribute

    $('body').addClass 'popup-enabled'

    onClose = =>
      _.defer =>
        @handleCloseWithBackground(containerAttribute)

    render (
      <PopupArea onClose={onClose}>
        <Popup {...popupProps} withBackground={true} onClose={onClose}>
          <Component {...props} />
        </Popup>
      </PopupArea>
    ), container

  openPopup: (PopupComponent, props, containerAttribute = @containerAttribute) ->
    container = @addContainer containerAttribute
    onClose = @handleClose.bind @, containerAttribute

    if props?.onClose
      onClose = =>
        props.onClose()
        @handleClose containerAttribute

    render <PopupComponent {...props} onClose={ onClose } />, container

  close: (containerAttribute = @containerAttribute) ->
    container = document.querySelector "[#{containerAttribute}]"

    unmountComponentAtNode container
    @removeContainer container

  handleClose: (containerAttribute) ->
    @close containerAttribute

  handleCloseWithBackground: (containerAttribute) ->
    $('body').removeClass 'popup-enabled'
    @close containerAttribute

module.exports = PopupController
