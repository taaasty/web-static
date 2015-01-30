window.LoadMoreButton = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    <div className="popup__more">
      <button onClick={ this.props.onClick }
              className="more-button">
        { i18n.t('load_more_button') }
      </button>
    </div>