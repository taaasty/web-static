###* @jsx React.DOM ###

window.PostEditor_ImagesContainer = React.createClass
  mixins: [React.addons.PureRenderMixin]
  propTypes:
    entry:       React.PropTypes.object.isRequired
    setLoading:  React.PropTypes.func.isRequired
    isVisible:   React.PropTypes.bool
    isDragging:  React.PropTypes.bool.isRequired
    #progress:    React.PropTypes.number

  getDefaultProps: ->
    isVisible:  true
    isDragging: false
    #progress:   0

  render: ->
    postImageUrl = `<label className="media-box__form" htmlFor="media-box-image-url">
          <input id="media-box-image-url" className="media-box__form-input" type="text" />
        </label>`


    infoBox = `<div className="media-box__info">
          <div className="media-box__text">
            <span>Перетащите или </span>
            <span className="form-upload form-upload--image">
               <span className="form-upload__text">выберите</span>
               <input id="image" className="form-upload__input" accept="image/*" type="file" multiple={true} ref="input"/>
             </span>
            <span> картинку</span><br/><span>или вставьте ссылку на нее</span>
          </div>
        </div>`

    mediaboxState = null
    if @props.entry.images.length>0
      unless @props.isDragging
        mediaboxState = 'loaded'
        imagesDisplay = MediaBox_Collage imageAttachments: @props.entry.images

    mediaboxState = 'drag-hover' if @props.isDragging

    cx = React.addons.classSet 'media-box': true, 'state--hidden': !@isVisible()
    return ` <MediaBox_Layout type='image' state={mediaboxState} ref="dropZone">
                <MediaBox_LoadingProgress progress={this.props.progress} />
                {postImageUrl}
                {infoBox}
                <MediaBox_Actions onDelete={this.actionDelete} />
                {imagesDisplay}
              </MediaBox_Layout>`

