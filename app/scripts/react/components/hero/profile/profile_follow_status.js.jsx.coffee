###* @jsx React.DOM ###

window.HeroProfileFollowStatus = React.createClass

  propTypes:
    followStatus: React.PropTypes.string.isRequired

  render: ->
   `<span className={ "follow-status state--" + this.props.followStatus }>
      <i className="icon"></i>
    </span>`