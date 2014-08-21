###* @jsx React.DOM ###

window.HeroProfileHead = React.createClass

  propTypes:
    slug:    React.PropTypes.string.isRequired
    title:   React.PropTypes.string.isRequired
    tlogUrl: React.PropTypes.string.isRequired

  getInitialState: ->
    slug:    @props.slug
    title:   @props.title
    tlogUrl: @props.tlogUrl

  componentDidMount: ->
    TastyEvents.on "settings:title:changed", @_updateTitle
    TastyEvents.on "settings:slug:changed",  @_updateSlug

  componentWillUnmount: ->
    TastyEvents.off "settings:title:changed", @_updateTitle
    TastyEvents.off "settings:slug:changed",  @_updateSlug

  render: ->
   `<div className="hero__head">
      <div className="hero__mask"></div>
      <div className="hero__title">
        <span><a href={ this.state.tlogUrl }>{ this.state.slug }</a></span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: this.state.title }} />
      </div>
    </div>`

  _updateTitle:   (value) -> @setState title: value
  _updateSlug:    (value) -> @setState slug: value
  _updateTlogUrl: (value) -> @setState tlogUrl: value