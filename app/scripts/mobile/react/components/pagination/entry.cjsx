i18n = require 'i18next'
{ PropTypes } = React

BUTTON_TITLE = -> i18n.t 'pagination_all_entries'

EntryPagination = React.createClass
  displayName: 'EntryPagination'

  propTypes:
    tlogUrl: PropTypes.string.isRequired

  render: ->
    <div className="pagination">
      <a className="pagination__item"
         href={ @props.tlogUrl }>
        { BUTTON_TITLE() }
      </a>
    </div>

module.exports = EntryPagination