###* @jsx React.DOM ###

window.HeroProfileSmartFollowStatus = React.createClass

  propTypes:
    followStatus: React.PropTypes.string.isRequired

  getInitialState: ->
    followStatus: @props.followStatus

  componentDidMount: ->
    TastyEvents.on 'follow_status:changed', (followStatus) =>
      @setState followStatus: followStatus

  render: ->
    `<HeroProfileFollowStatus followStatus={ this.state.followStatus } />`