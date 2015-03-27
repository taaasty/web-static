{ PropTypes } = React

EditorMediaBoxProgess = React.createClass
  displayName: 'EditorMediaBoxProgess'

  propTypes:
    progress: PropTypes.number.isRequired

  render: ->
    progress = Math.min @props.progress, 100
    progress = Math.max @props.progress, 0

    <div className="media-box__loader">
      <div className="media-box__loader-fill"
           style={{ width: progress + '%' }} />
    </div>

module.exports = EditorMediaBoxProgess