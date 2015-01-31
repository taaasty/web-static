PureRenderMixin = require 'react/lib/ReactComponentWithPureRenderMixin'

window.MediaBox_ImageWelcome = React.createClass
  mixins: [PureRenderMixin]

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    <div className="media-box__info">
      <div className="media-box__text">
        <span>{ i18n.t('editor_welcome_move_or') } </span>
        <span className="form-upload form-upload--image">
           <span className="form-upload__text">{ i18n.t('editor_welcome_choose') }</span>
           <input ref="input"
                  type="file"
                  id="image"
                  className="form-upload__input"
                  accept="image/*"
                  multiple={ true } />
         </span>
        <span> { i18n.t('editor_welcome_picture_or') }</span><br />
        <a title={ i18n.t('editor_welcome_insert') }
           onClick={ this.props.onClick }>
          { i18n.t('editor_welcome_insert') }
        </a>
        <span> { i18n.t('editor_welcome_link_to_it') }</span>
      </div>
    </div>