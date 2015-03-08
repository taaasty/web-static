{ PropTypes } = React

PopupHeader = React.createClass

  propTypes:
    title:   PropTypes.string.isRequired
    onClose: PropTypes.func.isRequired

  render: ->
    <div className="popup__header">
      <div className="popup__headbox">
        <h3 className="popup__title">
          { @props.title }
        </h3>
      </div>
      <div className="popup__close"
           onClick={ @handleClick }>
        <i className="icon icon--cross" />
      </div>
    </div>

  handleClick: ->
    @props.onClose()

module.exports = PopupHeader