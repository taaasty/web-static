{ PropTypes } = React

TITLE = 'Смотреть все записи'

EntryPagination = React.createClass
  displayName: 'EntryPagination'

  propTypes:
    tlogUrl: PropTypes.string.isRequired

  render: ->
    <div className="pagination">
      <a className="pagination__item"
         href={ @props.tlogUrl }>
        { TITLE }
      </a>
    </div>

module.exports = EntryPagination