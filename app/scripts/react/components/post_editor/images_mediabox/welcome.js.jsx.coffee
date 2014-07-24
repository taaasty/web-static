###* @jsx React.DOM ###

window.ImagesMediaBox_Welcome = React.createClass
  mixins:       [React.addons.PureRenderMixin]

  propTypes:
    isDragging: React.PropTypes.bool.isRequired

  render: ->

    # Прикольрно, только пропажа input-а приводит к тому что отваливается fileupload
    #if @props.isDragging
      #`<div className="media-box__info">
        #<div className="media-box__text">
          #<span>Сюда, сюда, неси сюда!</span>
        #</div>
      #</div>`
    #else
    `<div className="media-box__info">
      <div className="media-box__text">
        <span>Перетащите или </span>
        <span className="form-upload form-upload--image">
           <span className="form-upload__text">выберите</span>
           <input id="image" className="form-upload__input" accept="image/*" type="file" multiple={true} ref="input"/>
         </span>
        <span> картинку</span>
      </div>
    </div>`


    # <br/><span>или вставьте ссылку на нее</span>
