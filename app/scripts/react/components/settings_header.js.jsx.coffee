###* @jsx React.DOM ###

module.experts = window.SettingsHeader = React.createClass
  propTypes:
    user:     React.PropTypes.object.isRequired

  render: ->
    style = 
      'background-image': 'url(/images/popup_settings_bg.jpg)'

    `<div className="settings__header">
      <div className="hero-simple hero-simple--settings" style={style}>
        <div className="hero-simple__overlay"></div>
        <div className="hero-simple__box">
          <div className="hero-simple__avatar">
            <Avatar user={this.props.user} />
            <span className="hero-simple__avatar-overlay">
              <span className="form-upload form-upload--icon">
                <span className="form-upload__text"><i className="icon icon--pencil"></i></span><input id="user-avatar" className="form-upload__input" type="file" name="user-avatar" />
              </span>
            </span>
          </div>
          <div className="hero-simple__name">{this.props.user.url}</div>
          <SettingsTitle user={this.props.user} />
        </div>
      </div>
    </div>`

