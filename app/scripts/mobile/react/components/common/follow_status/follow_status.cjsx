{ PropTypes } = React

module.exports = React.createClass
  displayName: 'FollowStatus'

  propTypes:
    status: PropTypes.string.isRequired

  render: ->
    <span className={ "follow-status __" + this.props.status }>
      <i className="follow-status__icon" />
    </span>