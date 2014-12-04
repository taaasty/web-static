###* @jsx React.DOM ###

EmailConfirmRegistration          = require '../auth/email/confirm_registration'
SocialNetworksConfirmRegistration = require '../auth/social_networks/confirm_registration'

window.ConfirmRegistrationShellbox = React.createClass

  propTypes:
    type:         React.PropTypes.oneOf(['email', 'socialNetwork']).isRequired
    email:        React.PropTypes.string
    password:     React.PropTypes.string
    proposedSlug: React.PropTypes.string.isRequired

  getInitialState: ->
    isProcess: false

  render: ->
    ConfirmRegistration = switch @props.type
      when 'email'         then EmailConfirmRegistration
      when 'socialNetwork' then SocialNetworksConfirmRegistration
      else console.warn 'Unknown type of confirm registration component', @props.type

    return `<ShellBox>
              <ConfirmRegistration
                  email={ this.props.email }
                  password={ this.props.password }
                  proposedSlug={ this.props.proposedSlug } />
            </ShellBox>`