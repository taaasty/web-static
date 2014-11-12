###* @jsx React.DOM ###

window.ScreenViewerItem = React.createClass
  propTypes:
    srcImg:   React.PropTypes.string.isRequired
    userName: React.PropTypes.string.isRequired
    tlogUrl:  React.PropTypes.string.isRequired

  render: ->
    style = "background-image": "url(#{@props.srcImg})"

    return `<div className="screen-viewer__item">
              <div style={ style }
                   className="screen-viewer__bg">
              </div>
              <div className="screen-viewer__user">
                <a href={ this.props.tlogUrl }
                   title={ this.props.userName }>Фотография – { this.props.userName }</a>
              </div>
            </div>`