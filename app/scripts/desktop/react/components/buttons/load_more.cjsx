window.LoadMoreButton = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    <div className="popup__more">
      <button onClick={ this.props.onClick }
              className="more-button">
        Показать ещё
      </button>
    </div>