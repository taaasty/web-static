###* @jsx React.DOM ###

window.ScreenViewerItem = React.createClass
  propTypes:
    index:     React.PropTypes.number.isRequired
    srcImg:    React.PropTypes.string.isRequired
    user:      React.PropTypes.object.isRequired
    isActive:  React.PropTypes.bool
    onSuccess: React.PropTypes.func.isRequired

  getInitialState: ->
    isLoaded: false

  render: ->
    viewerItemClasses = React.addons.classSet {
      'screen-viewer__item': true
      'state--active':       @props.isActive
    }

    if @state.isLoaded
      style = "background-image": "url(#{@props.srcImg})"

    return `<div className={ viewerItemClasses }>
              <div data-url={ this.props.srcImg }
                   style={ style }
                   className="screen-viewer__bg">
                <img src={ this.props.srcImg }
                     alt={ this.props.user.name }
                     className="screen-viewer__bg-img"
                     onLoad={ this.handler }
                     onError={ this.handler } />
              </div>
              <div className="screen-viewer__user">
                <a href={ this.props.user.tlogUrl }
                   title={ this.props.user.name }>Фотография – { this.props.user.name }</a>
              </div>
            </div>`

  handler: (e) ->
    bool = e.type == 'load'

    @setState isLoaded: bool
    @props.onSuccess bool, @props.index