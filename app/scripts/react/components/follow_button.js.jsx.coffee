###* @jsx React.DOM ###

module.experts = window.FollowButton = React.createClass
  propTypes:
    tlogId:       React.PropTypes.number.isRequired

  getInitialState: (a,b,c)->
    relationship:   @props.relationship
    isError:        false

  componentDidMount: ->
    $.ajax
      url:     Routes.api.get_my_relationship_url(@props.tlogId)
      success: (data) =>
        @setState relationship: data
      error: (data)=>
        TastyNotifyController.errorResponse data
        @setState isError: true

  render: ->
    if @state.relationship?
      `<RelationshipFollowingButton relationship={this.state.relationship} />`
    else
      `<button className="button follow-button button--small">{this.title()}</button>`

  title: ->
    if @state.isError
      return 'ошибка'
    else
      return 'в процессе..'

