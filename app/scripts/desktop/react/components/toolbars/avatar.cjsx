CurrentUserStore  = require '../../stores/current_user'
ConnectStoreMixin = require '../../../../shared/react/mixins/connectStore'

AvatarToolbar = React.createClass
  displayName: 'AvatarToolbar'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  componentDidMount: ->
    link = @refs.link.getDOMNode()

    $(link).tooltip
      title: 'Мой дневник'
      placement: 'left'
      container: '.toolbar--avatar'

  componentWillUnmount: ->
    link = @refs.link.getDOMNode()

    $(link).tooltip 'destroy'

  render: ->
    if @state.logged
      <a ref="link"
         href={ @state.user.tlog_url }
         className="toolbar toolbar--avatar">
        <div className="toolbar__toggle">
          <UserAvatar
              user={ @state.user }
              size={ 56 } />
        </div>
      </a>
    else null

  getStateFromStore: ->
    user:   CurrentUserStore.getUser()
    logged: CurrentUserStore.isLogged()

module.exports = AvatarToolbar