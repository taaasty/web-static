###* @jsx React.DOM ###

window.EmbedComponent = React.createClass

  propTypes:
    coverImageUrl:  React.PropTypes.string.isRequired
    frameWidth:     React.PropTypes.number.isRequired
    frameHeight:    React.PropTypes.number.isRequired
    embedHtml:      React.PropTypes.string.isRequired

  render: ->
    coverStyle = backgroundImage: "url(#{@props.coverImageUrl})"
    figureStyle = width: @props.frameWidth, height: @props.frameHeight

    `<figure className="video" ref='topContainer' style={figureStyle}>
      <div className="video__cover" style={coverStyle}>
        <div className="video__overlay" onClick={this.play} />
        <div className="video__embed" ref="embedContainer" />
      </div>
      </figure>`

  play: ->
    $embed = $ @refs.embedContainer.getDOMNode()

    $embed.show().append @props.embedHtml
    $embed.width('100%')
    $embed.height('100%')

    $iframe = $embed.find("iframe")
    $iframe.attr width:   $embed.data('width')  || $embed.width()
    $iframe.attr height:  $embed.data('height') || $embed.height()

    $embed.height $iframe.height()

    $(@refs.topContainer.getDOMNode()).height $iframe.height()

