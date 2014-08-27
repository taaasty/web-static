###* @jsx React.DOM ###

window.HeroProfileHead = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  getInitialState: ->
    user: @props.user

  componentDidMount: ->
    TastyEvents.on TastyEvents.keys.user_property_changed( 'title', @state.user.id ), @_updateTitle
    TastyEvents.on TastyEvents.keys.user_property_changed( 'slug', @state.user.id ), @_updateSlug

  componentWillUnmount: ->
    TastyEvents.off TastyEvents.keys.user_property_changed( 'title', @state.user.id ), @_updateTitle
    TastyEvents.off TastyEvents.keys.user_property_changed( 'slug', @state.user.id ), @_updateSlug

  render: -> `<HeroProfileHeadStatic user={ this.state.user } />`

  _updateTitle: (value) ->
    newUser = @state.user
    newUser.title = value

    @setState user: newUser

  _updateSlug: (value) ->
    newUser = @state.user
    newUser.slug = value

    @setState user: newUser

window.HeroProfileHeadStatic = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  render: ->
   `<div className="hero__head">
      <div className="hero__mask"></div>
      <div className="hero__title">
        <span><a href={ this.props.user.tlog_url }>{ this.props.user.slug }</a></span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: this.props.user.title }} />
      </div>
    </div>`