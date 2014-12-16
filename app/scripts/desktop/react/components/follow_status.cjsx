window.FollowStatus = React.createClass

  propTypes:
    status: React.PropTypes.string.isRequired

  render: ->
    <span className={ "follow-status state--" + this.props.status }>
      <i className="icon"></i>
    </span>