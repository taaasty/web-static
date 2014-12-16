window.MediaBox_ImageWelcome = React.createClass
  mixins: [React.addons.PureRenderMixin]

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    <div className="media-box__info">
      <div className="media-box__text">
        <span>Перетащите или </span>
        <span className="form-upload form-upload--image">
           <span className="form-upload__text">выберите</span>
           <input ref="input"
                  type="file"
                  id="image"
                  className="form-upload__input"
                  accept="image/*"
                  multiple={ true } />
         </span>
        <span> картинку или</span><br />
        <a title="вставьте"
           onClick={ this.props.onClick }>
          вставьте
        </a>
        <span> ссылку на нее</span>
      </div>
    </div>