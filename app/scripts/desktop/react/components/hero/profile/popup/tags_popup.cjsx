window.HeroProfileStats_TagsPopup = React.createClass
  mixins: ['ReactActivitiesUser', ReactUnmountMixin, RequesterMixin
           ScrollerMixin, ComponentManipulationsMixin]

  propTypes:
    tlogId:  React.PropTypes.number.isRequired
    onClose: React.PropTypes.func

  getInitialState: ->
    tags:      null
    isError:   false
    isLoading: false

  componentDidMount: -> @loadTags()

  render: ->
    if @state.tags?.length > 0
      tags = @state.tags.map (tag, i) =>
        <HeroProfileStats_TagItem tag={ tag } key={ i } />

      tagList = <section className="users">{ tags }</section>
    else
      if @state.isError
        message = <div className="popup__text">{ i18n.t('hero_stats_popup_error') }</div>
      else if @state.isLoading
        message = <div className="popup__text">{ i18n.t('hero_stats_popup_loading') }</div>
      else
        message = <div className="popup__text">{ i18n.t('hero_stats_popup_empty') }</div>
      tagList = <div className="grid-full"><div className="grid-full__middle">{ message }</div></div>

    return <div className="scroller scroller--tags" ref="scroller">
             <div className="scroller__pane js-scroller-pane">{ tagList }</div>
             <div className="scroller__track js-scroller-track">
               <div className="scroller__bar js-scroller-bar"></div>
             </div>
           </div>

  loadTags: ->
    @safeUpdate => @incrementActivities()
    @setState isError: false, isLoading: true
    @createRequest
      url: ApiRoutes.tlog_tags(@props.tlogId)
      success: (data) =>
        @safeUpdateState tags: data
      error:   (data) =>
        @safeUpdateState isError: true
        NoticeService.errorResponse data
      complete: =>
        @safeUpdate => @decrementActivities()
        @safeUpdateState isLoading: false