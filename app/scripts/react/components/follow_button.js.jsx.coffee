###* @jsx React.DOM ###

module.experts = window.FollowButton = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    tlogId:       React.PropTypes.number.isRequired
    relationship: React.PropTypes.object.isRequired

  getInitialState: (a,b,c)->
    relationship:   @props.relationship
    isError:        false

  componentDidMount: ->
    @createRequest
      url: Routes.api.get_my_relationship_url(@props.tlogId)
      success: (data) =>
        @safeUpdateState => @setState relationship: data
      error: (data) =>
        @safeUpdateState => @setState isError: true
        TastyNotifyController.errorResponse data

  render: ->
    if @state.relationship?
      `<RelationshipFollowingButton relationship={this.state.relationship} />`
    else
      `<button className="follow-button">{this.title()}</button>`

  title: ->
    if @state.isError
      return 'ошибка'
    else
      return 'в процессе..'

