###* @jsx React.DOM ###

module.experts = window.SettingsHeader = React.createClass
  propTypes:
    user:         React.PropTypes.object.isRequired
    spinnerLink:  React.PropTypes.object.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    isEditing:        false

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
                <span className="form-upload__text"><i className="icon icon--pencil"></i></span>
                <SettingsAvatar user={this.props.user} spinnerLink={this.props.spinnerLink}/>
              </span>
            </span>
          </div>
          <div className="hero-simple__name">{this.props.user.url}</div>
          <SettingsTitle title={this.props.title} saveCallback={this.props.saveCallback} />
        </div>
      </div>
    </div>`

