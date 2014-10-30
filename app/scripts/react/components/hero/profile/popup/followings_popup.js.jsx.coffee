###* @jsx React.DOM ###

window.HeroProfileStats_FollowingsPopup = React.createClass
  mixins: ['ReactActivitiesUser', ReactUnmountMixin, RequesterMixin
            ScrollerMixin, ComponentManipulationsMixin]

  propTypes:
    tlogId:  React.PropTypes.number.isRequired
    onClose: React.PropTypes.func

  getInitialState: ->
    relationships: null
    isError:       false
    isLoading:     false

  componentDidMount: -> @loadFollowings()

  render: ->
    if @state.relationships?.length > 0
      relationships = @state.relationships.map (relationship, i) =>
        `<HeroProfileStats_FollowingItem relationship={ relationship }
                                         key={ i } />`

      followingList = `<section className="users">{ relationships }</section>`
    else
      if @state.isError
        message = `<div className="popup__text">Ошибка загрузки.</div>`
      else if @state.isLoading
        message = `<div className="popup__text">Загружаю..</div>`
      else
        message = `<div className="popup__text">Список пуст.</div>`
      followingList = `<div className="grid-full"><div className="grid-full__middle">{ message }</div></div>`

    return `<div className="scroller scroller--users" ref="scroller">
              <div className="scroller__pane js-scroller-pane">{ followingList }</div>
              <div className="scroller__track js-scroller-track">
                  <div className="scroller__bar js-scroller-bar"></div>
              </div>
            </div>`

  loadFollowings: ->
    @safeUpdate => @incrementActivities()
    @setState isError: false, isLoading: true
    @createRequest
      url: ApiRoutes.tlog_followings(@props.tlogId)
      success: (data) =>
        @safeUpdateState relationships: data.relationships
      error:   (data) =>
        @safeUpdateState isError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdate => @decrementActivities()
        @safeUpdateState isLoading: false