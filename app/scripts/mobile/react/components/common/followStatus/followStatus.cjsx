RelationshipsStore = require '../../../stores/relationships'
ConnectStoreMixin  = require '../../../mixins/connectStore'
{ PropTypes } = React

FollowStatus = React.createClass
  displayName: 'FollowStatus'
  mixins: [ConnectStoreMixin(RelationshipsStore)]

  propTypes:
    userId: PropTypes.number.isRequired  
    status: PropTypes.string.isRequired

  render: ->
    if @state.status?
      <span className={ 'follow-status __' + @state.status }>
        <i className="follow-status__icon" />
      </span>
    else null

  getStateFromStore: ->
    status: RelationshipsStore.getStatus(@props.userId) || @props.status

module.exports = FollowStatus