window.MediaBox_LoadingProgress = React.createClass
  propTypes:
    progress: React.PropTypes.number.isRequired

  render: ->
    @props.progress = Math.min @props.progress, 100
    @props.progress = Math.max @props.progress, 0

    <div className="media-box__loader">
      <div className="media-box__loader-fill" style={{width: this.props.progress+'%'}} />
    </div>