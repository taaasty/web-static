###* @jsx React.DOM ###

window.SettingsHeader = React.createClass

  propTypes:
    user:              React.PropTypes.instanceOf(Backbone.Model).isRequired
    saveCallback:      React.PropTypes.func.isRequired
    activitiesHandler: React.PropTypes.object.isRequired

  getInitialState: ->
    isEditing: false

  render: ->
    background_url = @props.user.get('design').background_url
    style = 'background-image': "url(#{background_url})"

    `<div className="settings__header">
      <div className="settings__hero" style={style}>
        <div className="settings__hero__overlay"></div>
        <div className="settings__hero__box">
          <div className="settings__hero__avatar">
            <Avatar userpic={ this.props.user.get('userpic') }
                    name={ this.props.user.get('name') } />
            <span className="settings__hero__avatar-overlay">
              <span className="form-upload form-upload--icon">
                <span className="form-upload__text"><i className="icon icon--pencil"></i></span>
                <SettingsAvatar user={this.props.user}
                                activitiesHandler={ this.props.activitiesHandler } />
              </span>
            </span>
          </div>
          <SettingsName name={ this.props.user.get('name') }
                        saveCallback={ this.props.saveCallback } />
          <SettingsTitle title={ this.props.user.get('title') }
                         saveCallback={ this.props.saveCallback } />
        </div>
      </div>
    </div>`