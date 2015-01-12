{ PropTypes } = React

TITLE = 'Смотреть все записи'

Pagination = React.createClass
  displayName: 'Pagination'

  propTypes:
    tlogUrl: PropTypes.string.isRequired

  render: ->
    <div className="pagination">
      <a className="pagination__item"
         href={ @props.tlogUrl }>
        { TITLE }
      </a>
    </div>

module.exports = Pagination