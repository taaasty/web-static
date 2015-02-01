{ PropTypes } = React

EntryPagination = React.createClass
  displayName: 'EntryPagination'

  propTypes:
    tlogUrl: PropTypes.string.isRequired

  render: ->
    <div className="pagination">
      <a className="pagination__item"
         href={ @props.tlogUrl }>
        { i18n.t('pagination.all_entries') }
      </a>
    </div>

module.exports = EntryPagination