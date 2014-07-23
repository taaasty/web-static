###* @jsx React.DOM ###

window.ImagesMediaBox_Welcome = React.createClass
  shouldComponentUpdate: -> false

  render: ->
    console.log 'render welcome'
    `<div className="media-box__info">
      <div className="media-box__text">
        <span>Перетащите или </span>
        <span className="form-upload form-upload--image">
           <span className="form-upload__text">выберите</span>
           <input id="image" className="form-upload__input" accept="image/*" type="file" multiple={true} ref="input"/>
         </span>
        <span> картинку</span><br/><span>или вставьте ссылку на нее</span>
      </div>
    </div>`
