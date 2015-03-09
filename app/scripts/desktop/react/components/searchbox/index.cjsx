{ PropTypes } = React

Searchbox = React.createClass
  displayName: 'Searchbox'

  propTypes:
    searchUrl: PropTypes.string.isRequired
    searchParam: PropTypes.string
    onClose: PropTypes.func.isRequired

  getDefaultProps: ->
    searchParam: 'q'

  componentDidMount: ->
    Mousetrap.bind 'esc', @close

  componentWillUnmount: ->
    Mousetrap.unbind 'esc', @close

  render: ->
    <div className="searchbox">
      <div className="searchbox__close"
           onClick={ @close }>
        <i className="icon icon--cross" />
      </div>
      <form action={ @props.searchUrl }
            className="searchbox__form">
        <h5 className="searchbox__title">
          { i18n.t('searchbox_title') }
        </h5>
        <input type="text"
               name={ @props.searchParam }
               placeholder={ i18n.t('searchbox_placeholder') }
               autoFocus="true"
               onKeyDown={ @handleKeyDown }
               className="searchbox__input" />
      </form>
    </div>

  close: ->
    @props.onClose()

  handleKeyDown: (e) ->
    @close() if e.key is 'Escape'

module.exports = Searchbox