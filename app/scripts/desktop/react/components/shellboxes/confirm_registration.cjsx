EmailConfirmRegistration          = require '../Auth/email/confirm_registration'
SocialNetworksConfirmRegistration = require '../Auth/social_networks/confirm_registration'

window.ConfirmRegistrationShellbox = React.createClass

  propTypes:
    type:         React.PropTypes.oneOf(['email', 'socialNetwork']).isRequired
    postUrl:      React.PropTypes.string.isRequired
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

    return <ShellBox>
             <ConfirmRegistration
                 email={ this.props.email }
                 postUrl={ this.props.postUrl }
                 password={ this.props.password }
                 proposedSlug={ this.props.proposedSlug } />
           </ShellBox>