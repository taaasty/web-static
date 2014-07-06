###* @jsx React.DOM ###

module.experts = window.SettingsHeader = React.createClass
  propTypes:
    userCortex:    React.PropTypes.instanceOf(Cortex)
    spinnerLink:   React.PropTypes.object.isRequired
    saveCallback:  React.PropTypes.func.isRequired

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
            <Avatar userCortex={this.props.userCortex} />
            <span className="hero-simple__avatar-overlay">
              <span className="form-upload form-upload--icon">
                <span className="form-upload__text"><i className="icon icon--pencil"></i></span>
                <SettingsAvatar userCortex={this.props.userCortex} spinnerLink={this.props.spinnerLink}/>
              </span>
            </span>
          </div>
          <div className="hero-simple__name">{this.props.userCortex.name.val()}</div>
          <SettingsTitle title={this.props.title} saveCallback={this.props.saveCallback} />
        </div>
      </div>
    </div>`

